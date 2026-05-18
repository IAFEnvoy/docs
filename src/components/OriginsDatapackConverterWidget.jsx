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
  'origins:stacking_status_effect': 'origins:stacking_effect',
  'origins:toggle_night_vision': 'origins:night_vision',
  'origins:action_on_entity_set': 'origins:action_on_set',
  'origins:add_to_entity_set': 'origins:add_to_set',
  'origins:entity_set_size': 'origins:set_size',
  'origins:actor_action': 'origins:source_action',
  'origins:keybind': 'origins:tooltip',
};

const REMOVED_TYPES = new Set([
  'origins:add_velocity', 'origins:area_of_effect',
  'origins:fire_projectile', 'origins:modify_stat',
  'origins:remove_power', 'origins:revoke_all_powers',
  'origins:entity_group', 'origins:power',
  'origins:enchantment', 'origins:fireproof',
  'origins:harvest_level', 'origins:meat', 'origins:nbt',
  'origins:bypasses_armor', 'origins:explosive',
  'origins:from_falling', 'origins:out_of_world', 'origins:unblockable',
  'origins:category', 'origins:nothing',
  'origins:modify_type_tag',
  'origins:stacking_status_effect',
  'origins:command',
]);

const DELETE_CONTAINER_TYPES = new Set([
  'origins:modify_type_tag',
  'origins:entity_group',
]);

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
  'origins:night_vision': { active_by_default: null, key: null },
};

const GLOBAL_FIELDS = {
  is_ambient: 'ambient',
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

const POWER_MODIFIER_FIELDS = new Set([
  'origins:modify_falling',
]);

// ============================================================
// Conversion utilities
// ============================================================

const replaceNS = s => s.startsWith('apoli:') ? 'origins:' + s.slice(6) : s;

function effType(obj) {
  if (!obj || typeof obj !== 'object' || typeof obj.type !== 'string') return '';
  let t = replaceNS(obj.type);
  return TYPE_RENAMES[t] || t;
}

function deepConvert(obj, addLog, ctx, toggleMap, parentType) {
  if (!ctx) ctx = '';
  if (!toggleMap) toggleMap = {};
  if (!parentType) parentType = '';
  if (obj === null || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) {
    const out = obj.map((it, i) => deepConvert(it, addLog, `${ctx}[${i}]`, toggleMap, parentType));
    return out.filter(it => it !== null);
  }

  const selfType = effType(obj);
  if (DELETE_CONTAINER_TYPES.has(selfType)) {
    addLog('warn', `Removed ${selfType} object (${ctx})`);
    return null;
  }

  const typeRenames = TYPE_FIELDS[selfType] || {};
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

  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    let nk = key, nv = value;

    if (typeRenames.hasOwnProperty(key)) {
      if (typeRenames[key] === null) continue;
      nk = typeRenames[key];
    } else if (GLOBAL_FIELDS.hasOwnProperty(key)) {
      nk = GLOBAL_FIELDS[key];
    }

    if (key === 'tag' && !skipTagRename) nk = 'components';
    if (key === 'amount' && isModifier) nk = 'value';
    if (key === 'item' && !skipItemRename && typeof value === 'string' && !value.startsWith('#')) nk = 'id';
    // Reverse: `id` inside ingredient objects must become `item`
    if (key === 'id' && isIngredient && typeof value === 'string' && !value.startsWith('#')) nk = 'item';

    if (typeof value === 'string') {
      if (key === 'type') {
        nv = replaceNS(value);
        if (TYPE_RENAMES[nv]) { addLog('convert', `Renamed: ${value} -> ${TYPE_RENAMES[nv]} (${ctx})`); nv = TYPE_RENAMES[nv]; }
        if (REMOVED_TYPES.has(nv)) addLog('warn', `Removed type: ${nv} -> manual fix needed (${ctx})`);
      } else if (value.startsWith('apoli:')) {
        nv = replaceNS(value);
      }
      if (toggleMap[nv]) { addLog('convert', `Replaced toggle ref: ${nv} -> ${toggleMap[nv]} (${ctx})`); nv = toggleMap[nv]; }
      // wrap bare key string -> Key object, only if not already inside a Key
      if (nk === 'key' && typeof nv === 'string' && !insideKey) {
        nv = { key: nv, continuous: false };
      }
    } else if (typeof value === 'object' && !Array.isArray(value)) {
      const isKeyObj = nk === 'key' && value && typeof value === 'object' && 'key' in value;
      nv = deepConvert(value, addLog, `${ctx}.${key}`, toggleMap, isKeyObj ? '__key_wrapper__' : childParent);
      if (nv === null) continue;
    } else if (Array.isArray(value)) {
      nv = deepConvert(value, addLog, `${ctx}.${key}`, toggleMap, childParent);
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
  return result;
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

// Recursively flatten a multiple-power object into individual power files.
// Returns flat array of full IDs (e.g., ['ns:parent/child/grandchild', ...]) for splitMap.
function splitMultipleRecursive(outZip, obj, ns, basePath, splitMap, toggleMap, addLog, count, parentName, parentDesc, deletedIds) {
  const flatIds = [];
  const subKeys = Object.keys(obj).filter(k =>
    k !== 'type' && k !== 'name' && k !== 'description'
    && k !== 'hidden' && k !== 'condition' && k !== 'loading_priority'
  );

  const hasName = parentName || parentDesc;
  let firstName = true;

  for (const key of subKeys) {
    const val = JSON.parse(JSON.stringify(obj[key]));
    if (val === null || typeof val !== 'object') {
      addLog('warn', `Skipped non-object sub-key ${ns}:${basePath}/${key}`);
      continue;
    }

    const subId = ns + ':' + basePath + '/' + key;
    const subPath = basePath + '/' + key;
    const oldFlatRef = ns + ':' + basePath + '_' + key;

    if (typeof val.type === 'string') {
      const converted = deepConvert(val, addLog, `${ns}:${basePath}`, toggleMap, '');
      if (converted === null) {
        addLog('warn', `Removed power ${subId} (deleted container)`);
        if (deletedIds) deletedIds.add(subId);
        continue;
      }
      mergeModifiers(converted);
      fixModifierFields(converted, addLog, subId);

      // Propagate parent name/desc to first sub-power, hide others
      if (hasName) {
        if (firstName) {
          if (parentName && !converted.name) converted.name = parentName;
          if (parentDesc && !converted.description) converted.description = parentDesc;
          firstName = false;
        } else {
          if (!converted.hidden) converted.hidden = true;
        }
      }

      outZip.file(`data/${ns}/origins/power/${subPath}.json`, JSON.stringify(converted, null, 2));
      count.powers++;
      flatIds.push(subId);

      toggleMap[oldFlatRef] = subId;
      toggleMap['*:*_' + key] = subId;  // all sub-keys get wildcard: *:*_spawn, *:*_n, etc.
      if (converted.type === 'origins:toggle') {
        toggleMap[ns + ':' + key] = subId;
      }
    } else if (typeof val === 'object') {
      const nested = splitMultipleRecursive(outZip, val, ns, subPath, splitMap, toggleMap, addLog, count, parentName, parentDesc, deletedIds);
      flatIds.push(...nested);
      if (nested.length > 0) {
        if (!splitMap[subId]) splitMap[subId] = [];
        splitMap[subId].push(...nested);
        addLog('convert', `Mapped intermediate ${subId} -> ${nested.length} leaf powers`);
      }
    } else {
      addLog('warn', `Skipped non-power sub-key ${ns}:${basePath}/${key}`);
    }
  }

  return flatIds;
}

// Convert old float field `velocity` to modifier object for modify_falling power
function fixModifierFields(obj, addLog, subId) {
  if (!POWER_MODIFIER_FIELDS.has(obj.type)) return;
  if (typeof obj.velocity === 'number' && !obj.modifier) {
    addLog('convert', `Converted velocity->modifier in ${subId}`);
    obj.modifier = { operation: 'multiply_base_multiplicative', value: obj.velocity };
    delete obj.velocity;
  }
}

// Replace old multiple-power IDs with split sub-IDs in JSON trees
// Also handles intermediate paths (e.g. ns:parent/child -> leaf powers)
function replaceSplitIds(obj, splitMap, addLog, context, parentKey) {
  if (!context) context = '';
  if (!parentKey) parentKey = '';
  if (obj === null || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) {
    let changed = false;
    const out = [];
    for (const item of obj) {
      if (typeof item === 'string' && splitMap[item] && parentKey !== 'power'
        && parentKey !== 'entity_action' && parentKey !== 'bientity_action'
        && parentKey !== 'block_action' && parentKey !== 'item_action') {
        const subs = [...new Set(splitMap[item])];
        addLog('convert', `Fixed reference: ${item} -> ${subs.length} sub-powers (${context})`);
        out.push(...subs);
        changed = true;
      } else {
        const nested = replaceSplitIds(item, splitMap, addLog, context + '[]', '');
        if (nested !== item) changed = true;
        out.push(nested);
      }
    }
    return changed ? out : obj;
  }
  let changed = false;
  const result = {};
  // Fields that always expect a single object/ID, never an array
  const SINGLE_FIELDS = new Set(['power', 'power_type', 'entity_action', 'bientity_action',
    'block_action', 'item_action', 'target_action', 'self_action', 'attacker_action']);
  for (const [key, value] of Object.entries(obj)) {
    const isSingleField = SINGLE_FIELDS.has(key);
    if (isSingleField && typeof value === 'string' && splitMap[value]) {
      const subs = splitMap[value];
      const resolved = subs.find(s => s.includes('toggle')) || subs[0];
      addLog('convert', `Resolved single-ID reference: ${value} -> ${resolved} (${context}.${key})`);
      result[key] = resolved;
      changed = true;
    } else if (typeof value === 'string' && splitMap[value]) {
      const subs = [...new Set(splitMap[value])];
      addLog('convert', `Fixed reference: ${value} -> ${subs.length} sub-powers (${context}.${key})`);
      result[key] = subs.length === 1 ? subs[0] : subs;
      changed = true;
    } else if (typeof value === 'object') {
      const nested = replaceSplitIds(value, splitMap, addLog, `${context}.${key}`, key);
      if (nested !== value) changed = true;
      result[key] = nested;
    } else {
      result[key] = value;
    }
  }
  return changed ? result : obj;
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
    setProcessing(true);
    setLogs(prev => [...prev, { level: 'success', message: '=== Starting conversion... ===' }]);
    const count = { origins: 0, powers: 0, layers: 0, badges: 0, globalPowers: 0 };

    try {
      const zip = await JSZip.loadAsync(file);
      const outZip = new JSZip();
      const langOrigin = {};
      const langLayer = {};

      const toggleMap = {}; // collects *_toggle ->actual power ID mappings during Pass 1
      const splitMap = {};  // collects old multiple ID ->[split sub-IDs] for reference fixup
      const pendingTags = { power: {}, origin: {} }; // deferred tag generation (after splitMap resolution)
      const deletedIds = new Set(); // IDs of sub-powers removed during multiple split

      // ---- Pass 1: convert JSON files ----
      for (const [zipPath, zipEntry] of Object.entries(zip.files)) {
        if (zipEntry.dir || !zipPath.endsWith('.json')) continue;
        const raw = await zipEntry.async('string');
        let json;
        try { json = JSON.parse(raw); } catch { continue; }

        // --- origin (data/<ns>/origins/xxx.json) ---
        const originMatch = zipPath.match(/^data\/([^/]+)\/origins\/(.+)\.json$/);
        if (originMatch && !zipPath.includes('/origins/origin/') && !zipPath.includes('/origins/power/')
          && !zipPath.includes('/origins/layer/') && !zipPath.includes('/origins/badge/')
          && !zipPath.includes('/origins/global_powers/')) {
          const ns = originMatch[1];
          const rawId = originMatch[2];
          if (json.powers !== undefined) {
            json = deepConvert(json, addLog, '', toggleMap);
            if (json === null) { addLog('convert', `Skipped removed origin: ${zipPath}`); continue; }

            if (json.name) {
              langOrigin[`origin.${ns}.${rawId}.name`] = typeof json.name === 'string' ? json.name : JSON.stringify(json.name);
            }
            if (json.description) {
              langOrigin[`origin.${ns}.${rawId}.description`] = typeof json.description === 'string' ? json.description : JSON.stringify(json.description);
            }
            delete json.loading_priority;

            if (json.icon) json.icon = convertIcon(json.icon);

            // powers ->tag (deferred: tag generated in Pass 3.5 after splitMap resolution)
            if (Array.isArray(json.powers)) {
              const ids = json.powers.filter(p => typeof p === 'string' && !p.startsWith('#'));
              const tags = json.powers.filter(p => typeof p === 'string' && p.startsWith('#'));
              if (ids.length > 0) {
                const tagId = '#' + ns + ':' + rawId;
                tags.push(tagId);
                // store pending tag for post-splitMap generation
                pendingTags.power[`data/${ns}/tags/origins/power/${rawId}.json`] = ids;
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
          json = deepConvert(json, addLog, '', toggleMap);
          if (json === null) { addLog('convert', `Skipped removed power: ${zipPath}`); continue; }

          if (json.type === 'origins:multiple' || json.type === 'apoli:multiple') {
            const flatIds = splitMultipleRecursive(outZip, json, ns, rawId, splitMap, toggleMap, addLog, count, json.name, json.description, deletedIds);
            splitMap[ns + ':' + rawId] = flatIds;
            addLog('convert', `Split ${ns}:${rawId} ->${flatIds.length} individual powers (subfolder)`);
          } else {
            json.type = replaceNS(json.type || '');
            mergeModifiers(json);
            fixModifierFields(json, addLog, ns + ':' + rawId);
            outZip.file(`data/${ns}/origins/power/${rawId}.json`, JSON.stringify(json, null, 2));
            count.powers++;
          }
          continue;
        }

        // --- layer (data/<ns>/origin_layers/xxx.json) ---
        const layerMatch = zipPath.match(/^data\/([^/]+)\/origin_layers\/(.+)\.json$/);
        if (layerMatch) {
          const ns = layerMatch[1];
          const rawId = layerMatch[2];
          json = deepConvert(json, addLog, '', toggleMap);
          if (json === null) { addLog('convert', `Skipped removed layer: ${zipPath}`); continue; }

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
              // 如果是默->origin layer，直接合并到 #origins:origin tag 并跳过写->JSON
              if (ns === 'origins' && rawId === 'origin') {
                pendingTags.origin[`data/origins/tags/origins/origin/origin.json`] = [
                  ...(pendingTags.origin[`data/origins/tags/origins/origin/origin.json`] || []),
                  ...ids,
                ];
              } else {
                const tagId = '#' + ns + ':layer/' + rawId;
                tags.push(tagId);
                pendingTags.origin[`data/${ns}/tags/origins/origin/${rawId}.json`] = ids;
              }
            }
            json.origins = [...tags, ...conditioned];
          }

          // 默认 origin layer 不写->JSON 文件
          if (ns === 'origins' && rawId === 'origin') {
            addLog('convert', `Deferred default layer origins ->#origins:origin tag`);
          } else {
            outZip.file(`data/${ns}/origins/layer/${rawId}.json`, JSON.stringify(json, null, 2));
            count.layers++;
          }
          continue;
        }

        // --- badge (data/<ns>/badges/xxx.json) ---
        const badgeMatch = zipPath.match(/^data\/([^/]+)\/badges\/(.+)\.json$/);
        if (badgeMatch && !zipPath.includes('/origins/badge/')) {
          const ns = badgeMatch[1];
          const rawId = badgeMatch[2];
          json = deepConvert(json, addLog, '', toggleMap);
          if (json === null) { addLog('convert', `Skipped removed badge: ${zipPath}`); continue; }
          outZip.file(`data/${ns}/origins/badge/${rawId}.json`, JSON.stringify(json, null, 2));
          count.badges++;
          continue;
        }

        // --- global_powers (data/<ns>/global_powers/xxx.json) ---
        const gpMatch = zipPath.match(/^data\/([^/]+)\/global_powers\/(.+)\.json$/);
        if (gpMatch && !zipPath.includes('/origins/global_powers/')) {
          const ns = gpMatch[1];
          const rawId = gpMatch[2];
          json = deepConvert(json, addLog, '', toggleMap);
          if (json === null) { addLog('convert', `Skipped removed global_power: ${zipPath}`); continue; }
          delete json.order;
          outZip.file(`data/${ns}/origins/global_powers/${rawId}.json`, JSON.stringify(json, null, 2));
          count.globalPowers++;
          continue;
        }

        // --- existing tags (data/<ns>/tags/**/*.json) ---
        if (zipPath.startsWith('data/') && (zipPath.includes('/tags/'))) {
          outZip.file(zipPath, raw);
          addLog('convert', `Copied existing tag: ${zipPath}`);
          continue;
        }

      }

      // ---- Pass 2: resolve toggleMap references (including *:* wildcards) ----
      if (Object.keys(toggleMap).length > 0) {
        addLog('convert', `Resolving ${Object.keys(toggleMap).length} toggle pattern(s)...`);
        // build regex patterns for wildcard keys like *:*_climbing_toggle
        const wildcards = Object.entries(toggleMap)
          .filter(([k]) => k.includes('*'))
          .map(([pattern, replacement]) => {
            const regex = new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\\\*/g, '[a-z0-9_.-]+'), 'g');
            return { regex, replacement, pattern };
          });
        if (wildcards.length > 0) addLog('convert', `Found ${wildcards.length} wildcard pattern(s)`);

        for (const [zipPath] of Object.entries(outZip.files)) {
          if (!zipPath.endsWith('.json')) continue;
          let raw = await outZip.file(zipPath).async('string');
          let changed = false;
          for (const { regex, replacement, pattern } of wildcards) {
            if (regex.test(raw)) {
              raw = raw.replace(regex, replacement);
              changed = true;
              addLog('convert', `Resolved wildcard ${pattern} in ${zipPath}`);
            }
          }
          if (changed) outZip.file(zipPath, raw);
        }
      }

      // ---- Pass 3: fix references — replace old multiple IDs with split sub-IDs ----
      // Also cleans up existing copied tags: remove old multiple IDs, replace with sub-IDs
      if (Object.keys(splitMap).length > 0) {
        addLog('convert', `Fixing ${Object.keys(splitMap).length} multiple-power reference(s)`);
        for (const [zipPath] of Object.entries(outZip.files)) {
          if (!zipPath.endsWith('.json')) continue;
          const raw = await outZip.file(zipPath).async('string');
          let json;
          try { json = JSON.parse(raw); } catch { continue; }
          // For tags, also strip old multiple IDs and deleted sub-powers from values array
          if (zipPath.includes('/tags/') && Array.isArray(json.values)) {
            const cleaned = [];
            for (const v of json.values) {
              if (splitMap[v]) {                      // old multiple ID → expand to sub-IDs
                cleaned.push(...splitMap[v]);
              } else if (deletedIds.has(v)) {         // explicitly deleted sub-power
                addLog('convert', `Removed deleted ref from tag ${zipPath}: ${v}`);
              } else {
                // check if v belongs under a split multiple
                let belongsToMultiple = false;
                for (const [oldId, subs] of Object.entries(splitMap)) {
                  if (v.startsWith(oldId + '/')) {
                    belongsToMultiple = true;
                    if (subs.includes(v)) {
                      cleaned.push(v);                // still exists as a sub-power
                    } else {
                      addLog('convert', `Removed deleted sub-ref from tag ${zipPath}: ${v}`);
                    }
                    break;
                  }
                }
                if (!belongsToMultiple) {
                  cleaned.push(v);                    // unrelated entry, keep as-is
                }
              }
            }
            json.values = [...new Set(cleaned)];
            outZip.file(zipPath, JSON.stringify(json, null, 2));
            addLog('convert', `Cleaned tag: ${zipPath}`);
          }
          const updated = replaceSplitIds(json, splitMap, addLog, zipPath);
          if (updated !== json) {
            outZip.file(zipPath, JSON.stringify(updated, null, 2));
          }
        }
      }

      // ---- Pass 3.5: generate all deferred tags (after splitMap resolution) ----
      if (Object.keys(pendingTags.power).length > 0 || Object.keys(pendingTags.origin).length > 0) {
        addLog('convert', 'Generating deferred tags...');

        // power tags
        for (const [tagPath, ids] of Object.entries(pendingTags.power)) {
          // apply splitMap to IDs (resolve any remaining old multiple IDs)
          const resolvedIds = [];
          for (const id of ids) {
            if (splitMap[id]) {
              resolvedIds.push(...splitMap[id]);
            } else {
              resolvedIds.push(id);
            }
          }
          const uniq = [...new Set(resolvedIds)];
          outZip.file(tagPath, JSON.stringify({ replace: false, values: uniq }, null, 2));
          addLog('convert', `Generated power tag: ${tagPath} (${uniq.length} values)`);
        }

        // origin tags
        for (const [tagPath, ids] of Object.entries(pendingTags.origin)) {
          const resolvedIds = [];
          for (const id of ids) {
            if (splitMap[id]) {
              resolvedIds.push(...splitMap[id]);
            } else {
              resolvedIds.push(id);
            }
          }
          const uniq = [...new Set(resolvedIds)];
          // merge with existing tag if any (e.g., multiple origins:origin layers)
          let merged = uniq;
          try {
            const exRaw = outZip.file(tagPath);
            if (exRaw) {
              const ex = JSON.parse(await exRaw.async('string'));
              if (Array.isArray(ex.values)) merged = [...new Set([...ex.values, ...uniq])];
            }
          } catch { }
          outZip.file(tagPath, JSON.stringify({ replace: false, values: merged }, null, 2));
          addLog('convert', `Generated origin tag: ${tagPath} (${merged.length} values)`);
        }
      }

      // ---- Pass 4: sanitize power tags — remove values that don't exist as power files ----
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
            addLog('convert', `Sanitized power tag ${zipPath}: removed ${before - json.values.length} dead references`);
          }
        }
      }

      // ---- Pass 5: copy non-JSON files as-is ----
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
      setConvertedName(baseName + '_neoforge.zip');
      setStats(count);

      addLog('success', '=== Conversion done! ===');
      addLog('success', `Origin: ${count.origins}  Power: ${count.powers}  Layer: ${count.layers}  Badge: ${count.badges}  GlobalPower: ${count.globalPowers}`);

    } catch (err) {
      addLog('error', 'Conversion failed: ' + err.message);
      addLog('error', 'Stack: ' + (err.stack || '(no stack)'));
    } finally {
      setProcessing(false);
    }
  }, [file, addLog]);

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
