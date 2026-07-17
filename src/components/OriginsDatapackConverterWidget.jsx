/**
 * ConverterWidget.jsx — Origins Datapack Online Converter (React Component)
 *
 * Features:
 *   - Drag & drop / click to upload old Origins datapack (.zip)
 *   - Auto-convert to NeoForge format in the browser
 *   - Download the converted datapack
 *   - Warning log displayed at the bottom
 *
 * Embed in Docusaurus .mdx file:
 *   import ConverterWidget from '@site/src/components/ConverterWidget';
 *   <ConverterWidget />
 *
 * Dependencies: jszip, file-saver
 *   npm install jszip file-saver
 */

import React, { useState, useCallback, useRef } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

// ============================================================
// Styles
// ============================================================

const S = {
  container: {
    fontFamily: 'system-ui, -apple-system, sans-serif',
    maxWidth: 700,
    margin: '20px auto',
    padding: 20,
    border: '1px solid #e0e0e0',
    borderRadius: 12,
    background: '#fafafa',
  },

  uploadZone: (dragging) => ({
    border: `2px dashed ${dragging ? '#4caf50' : '#bbb'}`,
    borderRadius: 12,
    padding: '40px 20px',
    textAlign: 'center',
    cursor: 'pointer',
    background: dragging ? '#e8f5e9' : '#fff',
    transition: 'all 0.2s',
    marginBottom: 16,
  }),

  uploadIcon: { fontSize: 48, marginBottom: 8 },
  uploadText: { fontSize: 16, color: '#555', margin: 0 },
  uploadHint: { fontSize: 12, color: '#999', marginTop: 4 },

  fileInfo: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '10px 14px', background: '#e3f2fd',
    borderRadius: 8, marginBottom: 16,
  },
  fileName: { fontWeight: 600, fontSize: 14, color: '#1565c0' },

  buttonRow: { display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap' },

  btn: (bg, disabled) => ({
    padding: '10px 24px', color: '#fff', border: 'none', borderRadius: 8,
    fontWeight: 600, fontSize: 14, cursor: disabled ? 'not-allowed' : 'pointer',
    background: disabled ? '#90a4ae' : bg,
  }),

  progress: { padding: '10px 0', fontSize: 13, color: '#1976d2', fontWeight: 500 },

  stats: {
    background: '#f5f5f5', borderRadius: 8, padding: '12px 16px',
    marginBottom: 16, display: 'flex', flexWrap: 'wrap', gap: '12px 24px', fontSize: 13,
  },
  statItem: { color: '#333' },
  statValue: { fontWeight: 700, color: '#1565c0' },

  logContainer: {
    background: '#1a1a2e', color: '#ccc', borderRadius: 8,
    padding: 12,
    fontFamily: "'Fira Code', 'Cascadia Code', 'JetBrains Mono', monospace",
    fontSize: 12, lineHeight: 1.7,
  },
  logSuccess: { color: '#66bb6a' },
  logConvert: { color: '#42a5f5' },
  logWarn: { color: '#ffa726' },
  logError: { color: '#ef5350' },
  emptyLog: { color: '#546e7a', fontStyle: 'italic' },
};

// ============================================================
// Mapping tables
// ============================================================

const TYPE_RENAMES = {
  'origins:give': 'origins:give_item',
  'origins:clear_effect': 'origins:remove_effect',
  'origins:biome': 'origins:biome_in',
  'origins:status_effect': 'origins:mob_effect',
  'origins:block': 'origins:block_id',
  'origins:replacable': 'origins:replaceable',
  'origins:merge_nbt': 'origins:merge_component',
  'origins:is_equippable': 'origins:is_equipable',
  'origins:name': 'origins:id',
  'origins:all_of': 'origins:and',
  'origins:any_of': 'origins:or',
  'origins:sequence': 'origins:and',
  'origins:random_chance': 'origins:chance',
  'origins:simple': 'origins:empty',
  'origins:dummy': 'origins:empty',
  'origins:action_on_key_press': 'origins:active_self',
  'origins:action_on_block_placed': 'origins:action_on_block_place',
  'origins:stacking_status_effect': 'origins:stacking_effect',
  'origins:toggle_night_vision': 'origins:night_vision',
  'origins:action_on_entity_set': 'origins:action_on_set',
  'origins:add_to_entity_set': 'origins:add_to_set',
  'origins:entity_set_size': 'origins:set_size',
  'origins:actor_action': 'origins:source_action',
};

const REMOVED_TYPES = new Set([
  'origins:area_of_effect',
  'origins:modify_stat',
  'origins:remove_power', 'origins:revoke_all_powers',
  'origins:power',
  'origins:enchantment', 'origins:fireproof',
  'origins:harvest_level', 'origins:meat', 'origins:nbt',
  'origins:category', 'origins:nothing',
  'origins:modify_type_tag',
  'origins:stacking_status_effect',
  'origins:command',
]);

// entity_group -> in_tag mapping (group value -> minecraft tag)
const ENTITY_GROUP_TO_TAG = {
  undead: 'minecraft:undead',
  arthropod: 'minecraft:arthropod',
  illager: 'minecraft:illager',
  aquatic: 'minecraft:aquatic',
};

// Damage conditions that become origins:in_tag with a minecraft damage type tag
const DAMAGE_TO_TAG = {
  'origins:bypasses_armor': 'minecraft:bypasses_armor',
  'origins:explosive': 'minecraft:is_explosion',
  'origins:fire': 'minecraft:is_fire',
  'origins:from_falling': 'minecraft:is_fall',
  'origins:unblockable': 'minecraft:bypasses_shield',
};

// Damage conditions that become origins:id with a minecraft damage type ID
const DAMAGE_TO_ID = {
  'origins:out_of_world': 'minecraft:out_of_world',
};

// Type-specific field renames: effectiveType -> { oldField: newField, ... }
// null value means delete the field entirely.
const TYPE_FIELDS = {
  'origins:emit_game_event': { event: 'action' },
  'origins:set_on_fire': { duration: 'tick' },
  'origins:equipped_item_action': { equipment_slot: 'slot' },
  'origins:drop_inventory': { inventory_type: null, slots: 'slot' },
  'origins:id': { name: 'value' },
  'origins:overlay': { sprite: 'texture' },
  'origins:effect_immunity': { effects: 'effect' },
  'origins:attribute_modify_transfer': { class: 'target' },
  'origins:night_vision': { active_by_default: null, key: null }
};

const GLOBAL_FIELDS = {
  is_ambient: 'ambient',
};

const PLURAL_LIST_FIELDS = {
  biomes: 'biome', criteria: 'criterion', effects: 'effect', enchantments: 'enchantment',
  events: 'event', modifiers: 'modifier', slots: 'slot', stacks: 'stack',
  status_effects: 'effect', texts: 'text',
};

const TAG_REF_TYPES = new Set([
  'origins:in_tag', 'apoli:in_tag',
]);
const INGREDIENT_TYPES = new Set([
  'origins:ingredient', 'apoli:ingredient',
]);
const RECIPE_TYPES = new Set([
  'origins:recipe', 'apoli:recipe',
]);
// Removed type IDs that had item conditions as their child — their tag field means Identifier reference
const ITEM_CONDITION_TYPES = new Set([
  'origins:meat', 'apoli:meat',
  'origins:ignore_diet', 'apoli:ignore_diet',
]);
const ATTR_ENTRY_TYPES = new Set([
  'origins:attribute', 'apoli:attribute',
  'origins:conditioned_attribute', 'apoli:conditioned_attribute',
]);
const ATTR_OPS = { addition: 'add_value', multiply_base: 'add_multiplied_base', multiply_total: 'add_multiplied_total' };
// Origins' own modifier operations (used in modify_break_speed, modify_exhaustion, etc.)
// Old names from Fabric modifier system → new names (lowed by ModifierOperation#getSerializedName)
const MODIFIER_OPS = { addition: 'add_base_early', multiply_base: 'multiply_base_multiplicative', multiply_total: 'multiply_total_multiplicative' };

// ============================================================
// Conversion utilities
// ============================================================

const replaceNS = s => {
  if (s.startsWith('apoli:')) return 'origins:' + s.slice(6);
  if (s.startsWith('apugli:')) return 'origins:' + s.slice(7);
  return s;
};

function effType(obj) {
  if (!obj || typeof obj !== 'object' || typeof obj.type !== 'string') return '';
  let t = replaceNS(obj.type);
  return TYPE_RENAMES[t] || t;
}

function deepConvert(obj, addLog, ctx, parentType) {
  if (!ctx) ctx = '';
  if (!parentType) parentType = '';
  if (obj === null || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) {
    const out = obj.map((it, i) => deepConvert(it, addLog, `${ctx}[${i}]`, parentType));
    return out.filter(it => it !== null);
  }

  const selfType = effType(obj);
  // Convert entity_group to in_tag (default -> complement of vanilla group tags).
  if (selfType === 'origins:entity_group') {
    const group = typeof obj.group === 'string' ? obj.group.toLowerCase() : '';
    if (group === 'default') {
      addLog('convert', `Converted entity_group group=default -> inverse group tags (${ctx})`);
      return defaultEntityGroupCondition();
    }
    const tag = ENTITY_GROUP_TO_TAG[group === 'water' ? 'aquatic' : group];
    if (tag) {
      addLog('convert', `Converted entity_group group=${group} -> in_tag ${tag} (${ctx})`);
      return { type: 'origins:in_tag', tag };
    }
    addLog('warn', `Unknown entity_group group: ${group} (${ctx})`);
    return null;
  }

  // Convert legacy damage conditions to in_tag or id
  if (DAMAGE_TO_TAG[selfType]) {
    const tag = DAMAGE_TO_TAG[selfType];
    addLog('convert', `Converted damage condition ${selfType} -> in_tag ${tag} (${ctx})`);
    return { type: 'origins:in_tag', tag };
  }
  if (DAMAGE_TO_ID[selfType]) {
    const id = DAMAGE_TO_ID[selfType];
    addLog('convert', `Converted damage condition ${selfType} -> id ${id} (${ctx})`);
    return { type: 'origins:id', id };
  }

  // Handle objects whose type is no longer supported in NeoForge
  let typeFallback = false;
  if (REMOVED_TYPES.has(selfType)) {
    const pKey = ctx.split('.').pop().replace(/\[\d+\]$/, '');
    const isAction = /^(entity_action|bientity_action|block_action|item_action|action|actions)$/.test(pKey);
    const isCondition = /^(condition|conditions|damage_condition)$/.test(pKey);
    if (isAction) {
      addLog('warn', `Replaced unsupported action ${selfType} -> origins:no_op (${ctx})`);
      obj.legacy_type = selfType;
      obj.type = 'origins:no_op';
      typeFallback = true;
    } else if (isCondition) {
      addLog('warn', `Replaced unsupported condition ${selfType} -> origins:always_true (${ctx})`);
      obj.legacy_type = selfType;
      obj.type = 'origins:always_true';
      typeFallback = true;
    } else {
      addLog('warn', `Removed unsupported type: ${selfType} (${ctx})`);
      return null;
    }
  }

  const typeRenames = typeFallback ? {} : (TYPE_FIELDS[selfType] || {});
  const isModifier = 'operation' in obj;
  // detect if this object is an ingredient (only from explicit type/context)
  const isIngredient = INGREDIENT_TYPES.has(selfType) || INGREDIENT_TYPES.has(parentType);
  const isRecipeCtx = RECIPE_TYPES.has(parentType) || RECIPE_TYPES.has(selfType);
  const skipTagRename = TAG_REF_TYPES.has(selfType) || isIngredient || isRecipeCtx;
  const skipItemRename = isIngredient || isRecipeCtx;
  // propagate recipe/ingredient context through arrays, but don't let vanilla Minecraft types override
  const childParent = (selfType && !selfType.startsWith('minecraft:')) ? selfType : parentType;
  const insideKey = ctx.endsWith('.key') || parentType === '__key_wrapper__';
  const isAttrEntry = 'attribute' in obj;
  // Detect status effect instance objects (no type field, has effect string + effect-specific fields)
  const isStatusEffect = !selfType && typeof obj.effect === 'string' && obj.effect.includes(':') && (
    'duration' in obj || 'amplifier' in obj || 'show_particles' in obj || 'show_icon' in obj
  );

  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    let nk = key, nv = value;

    if (typeRenames.hasOwnProperty(key)) {
      if (typeRenames[key] === null) continue;
      nk = typeRenames[key];
    } else if (GLOBAL_FIELDS.hasOwnProperty(key)) {
      nk = GLOBAL_FIELDS[key];
    }

    if (PLURAL_LIST_FIELDS[key] && !Object.prototype.hasOwnProperty.call(obj, PLURAL_LIST_FIELDS[key])
      && (Array.isArray(value) || (value && typeof value === 'object'))) {
      nk = PLURAL_LIST_FIELDS[key];
    }

    if (key === 'tag' && !skipTagRename) nk = 'components';
    if (key === 'amount' && isModifier) nk = 'value';
    if (key === 'item' && !skipItemRename && typeof value === 'string' && !value.startsWith('#')) nk = 'id';
    // Reverse: `id` inside ingredient objects must become `item`
    if (key === 'id' && isIngredient && typeof value === 'string' && !value.startsWith('#')) nk = 'item';
    // Status effect instance: inner `effect` field → `id` (NeoForge uses `id` for mob effect references)
    if (key === 'effect' && isStatusEffect && typeof value === 'string') {
      nk = 'id';
      addLog('convert', `Renamed status effect field: effect -> id = ${nv} (${ctx})`);
    }

    if (typeof value === 'string') {
      if (key === 'type') {
        // === TYPE field: handled in complete isolation, no other transforms touch it ===
        nv = replaceNS(value);
        if (TYPE_RENAMES[nv]) { addLog('convert', `Renamed: ${value} -> ${TYPE_RENAMES[nv]} (${ctx})`); nv = TYPE_RENAMES[nv]; }
        if (REMOVED_TYPES.has(nv)) addLog('warn', `Removed type: ${nv} -> manual fix needed (${ctx})`);
        if (nk !== key && result.hasOwnProperty(nk)) continue;
        result[nk] = nv;
        continue;
      }
      if (value.startsWith('apoli:') || value.startsWith('apugli:')) {
        nv = replaceNS(value);
      }

      // wrap bare key string -> Key object, only if not already inside a Key
      if (nk === 'key' && typeof nv === 'string' && !insideKey) {
        nv = { key: nv, continuous: false };
      }
    } else if (typeof value === 'object' && !Array.isArray(value)) {
      const isKeyObj = nk === 'key' && value && typeof value === 'object' && 'key' in value;
      nv = deepConvert(value, addLog, `${ctx}.${key}`, isKeyObj ? '__key_wrapper__' : childParent);
      if (nv === null) continue;
    } else if (Array.isArray(value)) {
      nv = deepConvert(value, addLog, `${ctx}.${key}`, childParent);
      if (nv === null) continue;
    }

    // convert operation names based on context:
    // AttributeEntry (has 'attribute' key) → vanilla operations (add_value, etc.)
    // Origins modifier (no 'attribute' key) → add_base_early, multiply_base_multiplicative, etc.
    if (nk === 'operation' && typeof nv === 'string') {
      if (isAttrEntry && ATTR_OPS[nv]) {
        addLog('convert', `Renamed attr op: ${nv} -> ${ATTR_OPS[nv]} (${ctx})`);
        nv = ATTR_OPS[nv];
      } else if (!isAttrEntry && MODIFIER_OPS[nv]) {
        addLog('convert', `Renamed modifier op: ${nv} -> ${MODIFIER_OPS[nv]} (${ctx})`);
        nv = MODIFIER_OPS[nv];
      }
    }

    if (nk !== key && result.hasOwnProperty(nk)) continue;
    result[nk] = nv;
  }

  // Auto-wrap conditions that have inverted:true with origins:not
  if (result.inverted === true && result.type) {
    delete result.inverted;
    addLog('convert', `Wrapped inverted condition: origins:not (${ctx})`);
    return { type: 'origins:not', condition: result };
  }

  return result;
}

function defaultEntityGroupCondition() {
  return {
    type: 'origins:not',
    condition: {
      type: 'origins:or',
      conditions: Object.values(ENTITY_GROUP_TO_TAG).map(tag => ({ type: 'origins:in_tag', tag })),
    },
  };
}

function mergeModifiers(obj) {
  if (obj.modifiers !== undefined) {
    if (obj.modifier === undefined) {
      obj.modifier = obj.modifiers;
    } else if (Array.isArray(obj.modifier) && Array.isArray(obj.modifiers)) {
      obj.modifier = [...obj.modifier, ...obj.modifiers];
    }
    delete obj.modifiers;
  }
  if (obj.hardness_modifiers !== undefined) {
    if (obj.hardness_modifier === undefined) {
      obj.hardness_modifier = obj.hardness_modifiers;
    }
    delete obj.hardness_modifiers;
  }
  // Remove modifiers with id="*:*" (wildcard that resolves to nothing)
  if (Array.isArray(obj.modifier)) {
    obj.modifier = obj.modifier.filter(m => !(m && m.id === '*:*'));
    if (obj.modifier.length === 0) delete obj.modifier;
  }
  if (Array.isArray(obj.hardness_modifier)) {
    obj.hardness_modifier = obj.hardness_modifier.filter(m => !(m && m.id === '*:*'));
    if (obj.hardness_modifier.length === 0) delete obj.hardness_modifier;
  }
}

function convertIcon(icon) {
  if (typeof icon === 'string') return icon;
  const result = {};
  if (icon.item) result.id = icon.item;
  else if (icon.id) result.id = icon.id;
  if (icon.count !== undefined) result.count = icon.count;
  else if (icon.amount !== undefined) result.count = icon.amount;
  if (icon.components) result.components = icon.components;
  else if (icon.tag) result.components = icon.tag;
  return result;
}

// ============================================================
// React Component
// ============================================================

export default function ConverterWidget() {
  const [file, setFile] = useState(null);
  const [converted, setConverted] = useState(null);
  const [convertedName, setConvertedName] = useState('');
  const [logs, setLogs] = useState([]);
  const [stats, setStats] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef(null);

  // level: 'success' | 'convert' | 'warn' | 'error'
  const addLog = useCallback((level, message) => {
    setLogs(prev => [...prev, { level, message }]);
  }, []);

  const handleFile = useCallback((f) => {
    const isJar = f.name.endsWith('.jar');
    const isZip = f.name.endsWith('.zip');
    if (!isZip && !isJar) {
      addLog('error', 'Please upload a .zip datapack or .jar mod file');
      return;
    }
    if (isJar) {
      addLog('warn', 'JAR mod files contain compiled code. The converter extracts only data/ and assets/. Java code (.class) must be ported separately.');
      addLog('convert', `JAR detected: ${f.name} — will extract data pack resources only`);
    }
    setFile(f);
    setConverted(null);
    setStats(null);
    setLogs([{ level: 'success', message: `File selected: ${f.name} (${(f.size / 1024).toFixed(1)} KB)${isJar ? ' [JAR mode]' : ''}` }]);
  }, [addLog]);

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }, [handleFile]);

  const onDragOver = useCallback((e) => { e.preventDefault(); setDragging(true); }, []);
  const onDragLeave = useCallback(() => setDragging(false), []);

  const onFileSelect = useCallback((e) => {
    const f = e.target.files[0];
    if (f) handleFile(f);
  }, [handleFile]);

  const onClickZone = useCallback(() => { fileInputRef.current?.click(); }, []);

  const doConvert = useCallback(async () => {
    if (!file) return;
    const conversionLogs = [{ level: 'success', message: '=== Starting conversion... ===' }];
    const log = (level, message) => conversionLogs.push({ level, message });
    setProcessing(true);
    setLogs(conversionLogs);
    const count = {
      origins: 0,
      powers: 0,
      layers: 0,
      badges: 0,
      globalPowers: 0,
      jsonScanned: 0,
      jsonCopied: 0,
      invalidJson: 0,
      skipped: 0,
    };

    try {
      const zip = await JSZip.loadAsync(file);
      const outZip = new JSZip();
      const langOrigin = {};
      const langLayer = {};



      // ---- Pass 1: convert JSON files ----
      for (const [zipPath, zipEntry] of Object.entries(zip.files)) {
        if (zipEntry.dir || !zipPath.endsWith('.json')) continue;
        count.jsonScanned++;
        const raw = await zipEntry.async('string');
        let json;
        try {
          json = JSON.parse(raw);
        } catch {
          count.invalidJson++;
          outZip.file(zipPath, raw);
          log('warn', `Copied invalid JSON without conversion: ${zipPath}`);
          continue;
        }

        // --- origin (data/<ns>/origins/xxx.json) ---
        const originMatch = zipPath.match(/^data\/([^/]+)\/origins\/(.+)\.json$/);
        if (originMatch && !zipPath.includes('/origins/origin/') && !zipPath.includes('/origins/power/')
          && !zipPath.includes('/origins/layer/') && !zipPath.includes('/origins/badge/')
          && !zipPath.includes('/origins/global_powers/')) {
          const ns = originMatch[1];
          const rawId = originMatch[2];
          if (json.powers !== undefined) {
            json = deepConvert(json, log, '');
            if (json === null) { count.skipped++; log('convert', `Skipped removed origin: ${zipPath}`); continue; }

            if (json.name) {
              langOrigin[`origin.${ns}.${rawId}.name`] = typeof json.name === 'string' ? json.name : JSON.stringify(json.name);
            }
            if (json.description) {
              langOrigin[`origin.${ns}.${rawId}.description`] = typeof json.description === 'string' ? json.description : JSON.stringify(json.description);
            }
            delete json.loading_priority;

            if (json.icon) json.icon = convertIcon(json.icon);

            // powers ->tag
            if (Array.isArray(json.powers)) {
              const ids = json.powers.filter(p => typeof p === 'string' && !p.startsWith('#'));
              const tags = json.powers.filter(p => typeof p === 'string' && p.startsWith('#'));
              if (ids.length > 0) {
                const tagId = '#' + ns + ':' + rawId;
                tags.push(tagId);
                outZip.file(`data/${ns}/tags/origins/power/${rawId}.json`, JSON.stringify({ replace: false, values: ids }, null, 2));
              }
              json.powers = tags;
            }

            outZip.file(`data/${ns}/origins/origin/${rawId}.json`, JSON.stringify(json, null, 2));
            count.origins++;
          }
          continue;
        }

        // --- power (data/<ns>/powers/xxx.json) ---
        const powerMatch = zipPath.match(/^data\/([^/]+)\/powers\/(.+)\.json$/);
        if (powerMatch && !zipPath.includes('/origins/power/')) {
          const ns = powerMatch[1];
          const rawId = powerMatch[2];
          json = deepConvert(json, log, '');
          if (json === null) { count.skipped++; log('convert', `Skipped removed power: ${zipPath}`); continue; }

          json.type = replaceNS(json.type || '');
          mergeModifiers(json);
          outZip.file(`data/${ns}/origins/power/${rawId}.json`, JSON.stringify(json, null, 2));
          count.powers++;
          continue;
        }

        // --- layer (data/<ns>/origin_layers/xxx.json) ---
        const layerMatch = zipPath.match(/^data\/([^/]+)\/origin_layers\/(.+)\.json$/);
        if (layerMatch) {
          const ns = layerMatch[1];
          const rawId = layerMatch[2];
          json = deepConvert(json, log, '');
          if (json === null) { count.skipped++; log('convert', `Skipped removed layer: ${zipPath}`); continue; }

          if (json.name) {
            langLayer[`layer.${ns}.${rawId}.name`] = typeof json.name === 'string' ? json.name : JSON.stringify(json.name);
          }
          delete json.name;
          delete json.replace;
          delete json.missing_name;
          delete json.missing_description;
          delete json.loading_priority;

          if (json.choose_origin || json.view_origin) {
            const gui = {};
            if (json.choose_origin) { gui.choose_origin = json.choose_origin; delete json.choose_origin; }
            if (json.view_origin) { gui.view_origin = json.view_origin; delete json.view_origin; }
            json.gui_title = gui;
          }

          // origins ->tag
          if (Array.isArray(json.origins)) {
            const ids = [];
            const tags = [];
            const conditioned = [];
            for (const o of json.origins) {
              if (typeof o === 'string' && o.startsWith('#')) tags.push(o);
              else if (typeof o === 'string') ids.push(o);
              else conditioned.push(o);
            }
            if (ids.length > 0) {
              // Merge into #origins:origin tag (skip writing layer JSON for default layer)
              if (ns === 'origins' && rawId === 'origin') {
                let existing = [];
                try {
                  const exRaw = outZip.file(`data/origins/tags/origins/origin/origin.json`);
                  if (exRaw) { const ex = JSON.parse(await exRaw.async('string')); if (Array.isArray(ex.values)) existing = ex.values; }
                } catch { }
                const merged = [...new Set([...existing, ...ids])];
                outZip.file(`data/origins/tags/origins/origin/origin.json`, JSON.stringify({ replace: false, values: merged }, null, 2));
              } else {
                const tagId = '#' + ns + ':layer/' + rawId;
                tags.push(tagId);
                outZip.file(`data/${ns}/tags/origins/origin/${rawId}.json`, JSON.stringify({ replace: false, values: ids }, null, 2));
              }
            }
            json.origins = [...tags, ...conditioned];
          }

          // Default origin layer — skip writing layer JSON (merged into tag above)
          if (ns === 'origins' && rawId === 'origin') {
            log('convert', `Merged default layer origins ->#origins:origin tag`);
          } else {
            outZip.file(`data/${ns}/origins/layer/${rawId}.json`, JSON.stringify(json, null, 2));
            count.layers++;
            log('convert', `Written layer: data/${ns}/origins/layer/${rawId}.json`);
          }
          continue;
        }

        // --- badge (data/<ns>/badges/xxx.json) ---
        const badgeMatch = zipPath.match(/^data\/([^/]+)\/badges\/(.+)\.json$/);
        if (badgeMatch && !zipPath.includes('/origins/badge/')) {
          const ns = badgeMatch[1];
          const rawId = badgeMatch[2];
          json = deepConvert(json, log, '');
          if (json === null) { count.skipped++; log('convert', `Skipped removed badge: ${zipPath}`); continue; }
          if (!json.type) { json.type = 'origins:keybind'; log('convert', `Added default badge type: keybind (${zipPath})`); }
          outZip.file(`data/${ns}/origins/badge/${rawId}.json`, JSON.stringify(json, null, 2));
          count.badges++;
          continue;
        }

        // --- global_powers (data/<ns>/global_powers/xxx.json) ---
        const gpMatch = zipPath.match(/^data\/([^/]+)\/global_powers\/(.+)\.json$/);
        if (gpMatch && !zipPath.includes('/origins/global_powers/')) {
          const ns = gpMatch[1];
          const rawId = gpMatch[2];
          json = deepConvert(json, log, '');
          if (json === null) { count.skipped++; log('convert', `Skipped removed global_power: ${zipPath}`); continue; }
          delete json.order;
          outZip.file(`data/${ns}/origins/global_powers/${rawId}.json`, JSON.stringify(json, null, 2));
          count.globalPowers++;
          continue;
        }

        // --- existing tags (data/<ns>/tags/**/*.json) ---
        if (zipPath.startsWith('data/') && zipPath.includes('/tags/')) {
          outZip.file(zipPath, raw);
          count.jsonCopied++;
          log('convert', `Copied existing tag: ${zipPath}`);
          continue;
        }

        // Keep JSON outside the legacy Origins layout intact. Datapacks frequently include
        // recipes, loot tables, advancements, tags, language files, or already-native entries.
        outZip.file(zipPath, raw);
        count.jsonCopied++;
        log('convert', `Copied unrecognized JSON without conversion: ${zipPath}`);

      }

      // ---- Pass 2: sanitize power tags — remove values that don't exist as power files ----
      const existingPowers = new Set();
      for (const [zp] of Object.entries(outZip.files)) {
        const m = zp.match(/^data\/([^/]+)\/origins\/power\/(.+)\.json$/);
        if (m) existingPowers.add(m[1] + ':' + m[2]);
      }
      if (existingPowers.size > 0) {
        for (const [zipPath] of Object.entries(outZip.files)) {
          if (!zipPath.includes('/tags/origins/power/') || !zipPath.endsWith('.json')) continue;
          const raw = await outZip.file(zipPath).async('string');
          let json;
          try { json = JSON.parse(raw); } catch { continue; }
          if (!Array.isArray(json.values)) continue;
          const before = json.values.length;
          json.values = json.values.filter(v => {
            if (existingPowers.has(v)) return true;
            if (typeof v === 'string' && v.startsWith('#')) return true;
            return false;
          });
          if (json.values.length !== before) {
            outZip.file(zipPath, JSON.stringify(json, null, 2));
            log('convert', `Sanitized power tag ${zipPath}: removed ${before - json.values.length} dead references`);
          }
        }
      }

      // ---- Pass 3: copy non-JSON files as-is ----
      for (const [zipPath, zipEntry] of Object.entries(zip.files)) {
        if (zipEntry.dir) continue;
        // skip files we already processed as JSON in pass 1
        if (zipPath.endsWith('.json')) continue;
        const blob = await zipEntry.async('uint8array');
        outZip.file(zipPath, blob);
      }

      // language file — only if input already had an assets/ folder
      const hasAssets = Object.keys(zip.files).some(p => p.startsWith('assets/'));
      if (hasAssets && (Object.keys(langOrigin).length > 0 || Object.keys(langLayer).length > 0)) {
        const allLang = { ...langOrigin, ...langLayer };
        outZip.file('assets/origins/lang/en_us.json', JSON.stringify(allLang, null, 2));
      }

      // fallback pack.mcmeta
      const hasMcmeta = Object.keys(zip.files).some(p => p === 'pack.mcmeta');
      if (!hasMcmeta) {
        outZip.file('pack.mcmeta', JSON.stringify({
          pack: { pack_format: 48, description: 'Converted by Origins NeoForge converter' }
        }, null, 2));
      }

      const baseName = file.name.replace(/\.zip$/i, '');
      const outBlob = await outZip.generateAsync({ type: 'blob' });
      setConverted(outBlob);
      setConvertedName(baseName + ' - Neoforged.zip');
      setStats(count);

      log('success', '=== Conversion done! ===');
      log('success', `Origin: ${count.origins}  Power: ${count.powers}  Layer: ${count.layers}  Badge: ${count.badges}  GlobalPower: ${count.globalPowers}`);
      log('success', `JSON scanned: ${count.jsonScanned}  copied unchanged: ${count.jsonCopied}  invalid: ${count.invalidJson}  skipped: ${count.skipped}`);

    } catch (err) {
      log('error', 'Conversion failed: ' + err.message);
      log('error', 'Stack: ' + (err.stack || '(no stack)'));
    } finally {
      setLogs([...conversionLogs]);
      setProcessing(false);
    }
  }, [file]);

  const doDownload = useCallback(() => {
    if (converted && convertedName) saveAs(converted, convertedName);
  }, [converted, convertedName]);

  // ============================================================
  // Render
  // ============================================================

  const LOG_ICONS = { error: '\u2716', warn: '\u26A0', convert: '\u2192', success: '\u2714' };

  return (
    <div style={S.container}>

      {/* Upload zone */}
      <div
        style={S.uploadZone(dragging)}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onClick={onClickZone}
      >
        <div style={S.uploadIcon}>{'\u{1F4E6}'}</div>
        <p style={S.uploadText}>
          {file ? file.name : 'Drop Origins datapack .zip or mod .jar here'}
        </p>
        <p style={S.uploadHint}>or click to browse</p>
        <input ref={fileInputRef} type="file" accept=".zip,.jar" onChange={onFileSelect} style={{ display: 'none' }} />
      </div>

      {/* File info */}
      {file && (
        <div style={S.fileInfo}>
          <span style={S.fileName}>{'\u{1F4CE}'} {file.name}</span>
          <span style={{ fontSize: 12, color: '#666' }}>{(file.size / 1024).toFixed(1)} KB</span>
        </div>
      )}

      {/* Buttons */}
      <div style={S.buttonRow}>
        <button style={S.btn('#1976d2', !file || processing)} disabled={!file || processing} onClick={doConvert}>
          {processing ? '\u23F3 Converting...' : '\u{1F504} Convert'}
        </button>
        {converted && (
          <button style={S.btn('#2e7d32', false)} onClick={doDownload}>
            {'\u2B07'} Download Result
          </button>
        )}
      </div>

      {processing && <div style={S.progress}>Processing datapack, please wait...</div>}

      {/* Stats panel */}
      {stats && (
        <div style={S.stats}>
          <span style={S.statItem}>Origin: <span style={S.statValue}>{stats.origins}</span></span>
          <span style={S.statItem}>Power: <span style={S.statValue}>{stats.powers}</span></span>
          <span style={S.statItem}>Layer: <span style={S.statValue}>{stats.layers}</span></span>
          <span style={S.statItem}>Badge: <span style={S.statValue}>{stats.badges}</span></span>
          <span style={S.statItem}>GlobalPower: <span style={S.statValue}>{stats.globalPowers}</span></span>
          <span style={S.statItem}>JSON scanned: <span style={S.statValue}>{stats.jsonScanned}</span></span>
          <span style={S.statItem}>Copied unchanged: <span style={S.statValue}>{stats.jsonCopied}</span></span>
          <span style={S.statItem}>Invalid JSON: <span style={S.statValue}>{stats.invalidJson}</span></span>
          <span style={S.statItem}>Skipped: <span style={S.statValue}>{stats.skipped}</span></span>
        </div>
      )}

      {/* Log */}
      <div style={{ marginTop: 4 }}>
        <h4 style={{ margin: '0 0 8px', fontSize: 14, color: '#333' }}>
          {'\u{1F4CB}'} Conversion Log
          {logs.length > 0 && (
            <span style={{ fontWeight: 400, fontSize: 12, color: '#999', marginLeft: 8 }}>
              ({logs.length} entries)
            </span>
          )}
        </h4>
        <div style={S.logContainer}>
          {logs.length === 0 ? (
            <span style={S.emptyLog}>Waiting for conversion...</span>
          ) : (
            logs.map((log, i) => {
              const icon = LOG_ICONS[log.level] || '?';
              const style = log.level === 'error' ? S.logError : log.level === 'warn' ? S.logWarn : log.level === 'convert' ? S.logConvert : S.logSuccess;
              return (
                <div key={i} style={style}>
                  {icon} {log.message}
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  );
}
