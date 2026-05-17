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
};

const FIELD_RENAMES = {
  'event': 'action',
  'equipment_slot': 'slot',
  'duration': 'tick',
  'inventory_type': null,
  'slots': 'slot',
  'is_ambient': 'ambient',
  'tag': 'components',
  'nbt': 'component',
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
]);

// ============================================================
// Conversion utility functions
// ============================================================

function replaceNamespace(s) {
  if (s.startsWith('apoli:')) return 'origins:' + s.slice(6);
  return s;
}

function deepConvert(obj, addLog, context) {
  if (!context) context = '';
  if (obj === null || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) {
    return obj.map((item, i) => deepConvert(item, addLog, `${context}[${i}]`));
  }

  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    let newKey = key;
    let newVal = value;

    // field rename
    if (FIELD_RENAMES.hasOwnProperty(key)) {
      const mapped = FIELD_RENAMES[key];
      if (mapped === null) continue;
      newKey = mapped;
    }

    if (typeof value === 'string') {
      if (key === 'type') {
        newVal = replaceNamespace(value);
        if (TYPE_RENAMES[newVal]) {
          addLog('convert', `Renamed: ${value} → ${TYPE_RENAMES[newVal]} (${context})`);
          newVal = TYPE_RENAMES[newVal];
        }
        if (REMOVED_TYPES.has(newVal)) {
          addLog('warn', `Removed type: ${newVal} — manual fix needed (${context})`);
        }
      } else if (value.startsWith('apoli:')) {
        newVal = replaceNamespace(value);
      } else if (key === 'item' && !value.startsWith('#')) {
        newKey = 'id';
      }
    } else if (typeof value === 'object') {
      newVal = deepConvert(value, addLog, `${context}.${key}`);
    }

    result[newKey] = newVal;
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
    if (!f.name.endsWith('.zip')) {
      addLog('error', 'Please upload a .zip datapack file');
      return;
    }
    setFile(f);
    setConverted(null);
    setStats(null);
    setLogs([{ level: 'success', message: `File selected: ${f.name} (${(f.size / 1024).toFixed(1)} KB)` }]);
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
    setLogs(prev => [...prev, { level: 'success', message: '═══ Starting conversion... ═══' }]);
    const count = { origins: 0, powers: 0, layers: 0, badges: 0, globalPowers: 0 };

    try {
      const zip = await JSZip.loadAsync(file);
      const outZip = new JSZip();
      const langOrigin = {};
      const langLayer = {};

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
            json = deepConvert(json, addLog);

            if (json.name) {
              langOrigin[`origin.${ns}.${rawId}.name`] = typeof json.name === 'string' ? json.name : JSON.stringify(json.name);
            }
            if (json.description) {
              langOrigin[`origin.${ns}.${rawId}.description`] = typeof json.description === 'string' ? json.description : JSON.stringify(json.description);
            }
            delete json.name;
            delete json.description;
            delete json.loading_priority;

            if (json.icon) json.icon = convertIcon(json.icon);

            // powers → tag
            if (Array.isArray(json.powers)) {
              const ids = json.powers.filter(p => typeof p === 'string' && !p.startsWith('#'));
              const tags = json.powers.filter(p => typeof p === 'string' && p.startsWith('#'));
              if (ids.length > 0) {
                const tagId = '#' + ns + ':origin/' + rawId;
                tags.push(tagId);
                const tagJson = { replace: false, values: ids };
                outZip.file(`data/${ns}/tags/origins/power/${rawId}.json`, JSON.stringify(tagJson, null, 2));
                addLog('convert', `Generated power tag: #${ns}:origin/${rawId}`);
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
          json = deepConvert(json, addLog);

          if (json.type === 'origins:multiple' || json.type === 'apoli:multiple') {
            const subKeys = Object.keys(json).filter(k =>
              k !== 'type' && k !== 'name' && k !== 'description'
              && k !== 'hidden' && k !== 'condition' && k !== 'loading_priority'
            );
            for (const key of subKeys) {
              const sub = JSON.parse(JSON.stringify(json[key]));
              sub.type = replaceNamespace(sub.type || '');
              mergeModifiers(sub);
              outZip.file(`data/${ns}/origins/power/${rawId}/${key}.json`, JSON.stringify(sub, null, 2));
              count.powers++;
            }
            addLog('convert', `Split ${ns}:${rawId} → ${subKeys.length} individual powers`);
          } else {
            json.type = replaceNamespace(json.type || '');
            mergeModifiers(json);
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
          json = deepConvert(json, addLog);

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

          // origins → tag
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
              // 如果是默认 origin layer，直接合并到 #origins:origin tag 并跳过写出 JSON
              if (ns === 'origins' && rawId === 'origin') {
                const defaultTagPath = `data/origins/tags/origins/origin/origin.json`;
                const existing = { replace: false, values: [] };
                const existingRaw = outZip.file(defaultTagPath);
                if (existingRaw) {
                  try {
                    const parsed = JSON.parse(existingRaw);
                    if (Array.isArray(parsed.values)) existing.values = parsed.values;
                  } catch { }
                }
                const merged = [...new Set([...existing.values, ...ids])];
                outZip.file(defaultTagPath, JSON.stringify({ replace: false, values: merged }, null, 2));
                addLog('convert', `Merged ${ids.length} origins into #origins:origin tag (layer JSON skipped)`);
              } else {
                const tagId = '#' + ns + ':layer/' + rawId;
                tags.push(tagId);
                const tagJson = { replace: false, values: ids };
                outZip.file(`data/${ns}/tags/origins/origin/${rawId}.json`, JSON.stringify(tagJson, null, 2));
                addLog('convert', `Generated origin tag: #${ns}:layer/${rawId}`);
              }
            }
            json.origins = [...tags, ...conditioned];
          }

          // 默认 origin layer 不写出 JSON 文件
          if (ns === 'origins' && rawId === 'origin') {
            addLog('convert', `Skipped default layer JSON: origins:origin`);
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
          json = deepConvert(json, addLog);
          outZip.file(`data/${ns}/origins/badge/${rawId}.json`, JSON.stringify(json, null, 2));
          count.badges++;
          continue;
        }

        // --- global_powers (data/<ns>/global_powers/xxx.json) ---
        const gpMatch = zipPath.match(/^data\/([^/]+)\/global_powers\/(.+)\.json$/);
        if (gpMatch && !zipPath.includes('/origins/global_powers/')) {
          const ns = gpMatch[1];
          const rawId = gpMatch[2];
          json = deepConvert(json, addLog);
          delete json.order;
          outZip.file(`data/${ns}/origins/global_powers/${rawId}.json`, JSON.stringify(json, null, 2));
          count.globalPowers++;
          continue;
        }

        // --- other files: copy as-is ---
        if (zipPath === 'pack.mcmeta' || zipPath === 'pack.png'
          || zipPath.startsWith('assets/') || zipPath.startsWith('data/')) {
          outZip.file(zipPath, raw);
        }
      }

      // language file
      const allLang = { ...langOrigin, ...langLayer };
      if (Object.keys(allLang).length > 0) {
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

      addLog('success', `═══ Conversion done! ═══`);
      addLog('success', `Origin: ${count.origins}  Power: ${count.powers}  Layer: ${count.layers}  Badge: ${count.badges}  GlobalPower: ${count.globalPowers}`);

    } catch (err) {
      addLog('error', 'Conversion failed: ' + err.message);
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
        <div style={S.uploadIcon}>📦</div>
        <p style={S.uploadText}>
          {file ? file.name : 'Drop Origins datapack .zip here'}
        </p>
        <p style={S.uploadHint}>or click to browse</p>
        <input ref={fileInputRef} type="file" accept=".zip" onChange={onFileSelect} style={{ display: 'none' }} />
      </div>

      {/* File info */}
      {file && (
        <div style={S.fileInfo}>
          <span style={S.fileName}>📎 {file.name}</span>
          <span style={{ fontSize: 12, color: '#666' }}>{(file.size / 1024).toFixed(1)} KB</span>
        </div>
      )}

      {/* Buttons */}
      <div style={S.buttonRow}>
        <button style={S.btn('#1976d2', !file || processing)} disabled={!file || processing} onClick={doConvert}>
          {processing ? '⏳ Converting...' : '🔄 Convert'}
        </button>
        {converted && (
          <button style={S.btn('#2e7d32', false)} onClick={doDownload}>
            ⬇ Download Result
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
          📋 Conversion Log
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
              const icon = log.level === 'error' ? '✖' : log.level === 'warn' ? '⚠' : log.level === 'convert' ? '→' : '✔';
              const style = log.level === 'error' ? S.logError : log.level === 'warn' ? S.logWarn : log.level === 'convert' ? S.logConvert : S.logSuccess;
              return (
                <div key={i} style={style}>
                  {icon}
                  {log.message}
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  );
}
