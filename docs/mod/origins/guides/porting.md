# Porting Guide: Fabric → NeoForge

This document explains the differences between the original Fabric version (Apace100/origins-fabric) and the NeoForge rewrite (IAFEnvoy/Origins-NeoForge). Use it to convert existing data packs, add-ons, or documentation from the Fabric version to the NeoForge version.

---

## Data Path Changes

All JSON files moved from custom paths to **Vanilla DataPack Registry** paths.

| Content | Fabric Path | NeoForge Path |
|---------|------------|---------------|
| Origin | `data/<ns>/origins/` | `data/<ns>/origins/origin/` |
| Power | `data/<ns>/powers/` | `data/<ns>/origins/power/` |
| Layer | `data/<ns>/origin_layers/` | `data/<ns>/origins/layer/` |
| Badge | (not in Fabric) | `data/<ns>/origins/badge/` |
| Global Power Set | `data/<ns>/global_powers/` | :x: Not yet implemented |

> **Action:** Move files and add registry subfolder (`origin/`, `power/`, `layer/`, `badge/`).

---

## Origin JSON Changes

| Field | Status | Notes |
|-------|--------|-------|
| `name` | :x: Removed | Use translation key `origin.<ns>.<path>.name` |
| `description` | :x: Removed | Use translation key `origin.<ns>.<path>.description` |
| `loading_priority` | :x: Removed | Data packs now override by priority naturally |
| `powers` | Changed | Now supports `#tag` references. **Prefer `#tag` over listing individual power IDs** |
| `icon` | Changed | From Item+Damage+NBT to `{"id": "minecraft:feather"}` |
| `order` | Changed | Default changed from `0` to `Integer.MAX_VALUE` |
| `impact` | Same | 0=None, 1=Low, 2=Medium, 3=High |
| `unchoosable` | Same | |
| `upgrades` | Same | |

> **Action:** Remove `name`/`description`/`loading_priority` from all origin JSONs. Add `name`/`description` via language files instead. Update `icon` to the new `{"id": "..."}` format. Use `#tag` references in `powers` instead of listing each power ID individually whenever possible.

---

## Layer JSON Changes

| Field | Status | Notes |
|-------|--------|-------|
| `replace` | :x: Removed | Use data pack override behavior |
| `name` | :x: Removed | Use translation key `layer.<ns>.<path>.name` |
| `missing_name` | :x: Removed | Not needed |
| `missing_description` | :x: Removed | Not needed |
| `origins` | Changed | Now supports `#tag` references. **Prefer `#tag` over listing individual origin IDs** |
| `gui_title.choose_origin` | Renamed | Was `choose_origin` (top-level); now nested under `gui_title` |
| `gui_title.view_origin` | Renamed | Was `view_origin` (top-level); now nested under `gui_title` |
| `order` | Same | |
| `enabled` | Same | |
| `allow_random` | Same | |
| `hidden` | Same | |
| `auto_choose` | New | Auto-choose if only one origin is available |
| `default_origin` | New | Default origin for new players |
| `allow_random_unchoosable` | New | |
| `exclude_random` | New | |

> **Action:** Move `choose_origin`/`view_origin` under `gui_title`. Remove `replace`/`name`/`missing_name`/`missing_description`. Use `#tag` references in `origins` instead of listing each origin ID individually whenever possible.

---

## Power JSON Changes

| Field | Status | Notes |
|-------|--------|-------|
| `hidden` | Same | |
| `condition` | Same | Entity Condition |
| `loading_priority` | Same | |
| `badges` | Same | Supports inline `{badge}` objects |
| `type` | Same | Power type ID |

> **Action:** Power JSONs are mostly compatible. Translate power names/descriptions via `power.<ns>.<path>.name` / `.description` keys.

### `origins:multiple` — Split into individual files

Fabric's `origins:multiple` power type (which bundled several sub-powers into one JSON file) **does not exist** in NeoForge. Each sub-power must be extracted into its own standalone power JSON file.

| Fabric | NeoForge |
|--------|----------|
| One `multiple` JSON with nested sub-powers | One file per power, referenced individually |
| `"type": "origins:multiple"` with `"powers": [...]` | Each power gets its own file in `data/<ns>/origins/power/` |

> **Action:** For each entry in the `powers` list of an `origins:multiple`, create a separate power JSON file. Reference all the split power IDs in the origin's `powers` field or a power `#tag`.

---

## Condition Type Changes

### `origins:attacker` — Moved to BiEntity & Damage conditions

In Fabric, `origins:attacker` was an entity condition used inside bientity conditions. In NeoForge:

| Registry | Type ID | Category | Field |
|----------|---------|----------|-------|
| `origins:bientity_condition` | `origins:attacker` | [Bi-entity Condition] | Checks if the actor attacked the target |
| `origins:damage_condition` | `origins:attacker` | [Damage Condition] | Checks the attacker via `entity_condition` |

> **Action:** Replace nested entity-condition `attacker` with the corresponding BiEntity/Damage condition variant.

### `origins:attack_target`

Same as above: in Fabric it was nested inside bientity conditions. In NeoForge it's a direct BiEntity condition (`origins:attack_target`) checking if the actor is targeting the target.

| Registry | Type ID | Category |
|----------|---------|----------|
| `origins:bientity_condition` | `origins:attack_target` | [Bi-entity Condition] |

---

## Removed Condition Types

| Fabric Type | Status in NeoForge | Note|
|-------------|-------------------|-------|
| `origins:command` | :x: Removed ||
| `origins:entity_group` | :x: Removed | 1.21.1 no longer has entity groups, use `origins:in_tag` instead |
| `origins:category` (biome) | :x: Removed | 1.21.1 no longer has biome categories, use `origins:in_tag` instead |
| `origins:high_humidity` (biome) | :x: Removed | 1.21.1 no longer has humidity conditions, use  `origins:in_tag` instead` |
| `origins:owner` (bientity) | :x: Removed | Will be added later |

---

## Not Yet Implemented

These features existed in Fabric but are **not yet available** in NeoForge:

| Feature | Status |
|---------|--------|
| `origins:chose_origin` advancement trigger | :x: Not yet implemented |
| `/resource` command | :x: Not yet implemented |
| `origins:origin` predicate | :x: Not yet implemented |
| `apoli:power` predicate | :x: Not yet implemented |
| `Global Power Set` | :x: Not yet implemented |
| Conditioned Origins in Layers | :x: Not yet implemented |
| `origins:edible_item` power type | :x: Not yet implemented |
| `origins:modify_enchantment_level` power type | :x: Not yet implemented |

---

## New Features

| Feature | Notes |
|---------|-------|
| **DataPack Registry System** | All Origins JSON uses Vanilla's datapack registry |
| **Power Tags** | Reference `#tag` in origin `powers` and layer `origins` |
| **Default Origin** | Layer field: assign default on join |
| **Badge Registry** | Badges use Vanilla registry at `origins:badge` |
| **Inline Badge Definitions** | `badges` in powers can take inline `{badge}` objects |
| **ColorSettings** | `red`/`green`/`blue`/`alpha` floats + single `color` hex integer |

---

## Key API Differences

| Fabric (Apoli) API | NeoForge API |
|--------------------|--------------|
| `PowerTypeRegistry` | `PowerRegistries.POWER_KEY` via `Registry` |
| `OriginsRegistry` | `OriginRegistries.ORIGIN_KEY` |
| `OriginLayerRegistry` | `LayerRegistries.LAYER_KEY` |
| `OriginsAPI` | `OriginDataHolder.get(entity)` as attachment |
| `PowerType` interface | `Power` abstract class with `MapCodec` |
| `PowerHolderComponent` | `OriginDataHolder` (NeoForge attachment) |
| `PowerTypeRegistry#register` | `BuiltInRegistries` + DeferredRegister pattern |

> **Action:** For Java add-ons targeting NeoForge, port from Apoli's `PowerTypeRegistry` to NeoForge's `DeferredRegister<MapCodec<? extends Power>>` pattern.

---

## AI Porting Prompt

When converting Fabric Origins data packs to NeoForge, use this prompt:

```
You are porting an Origins Fabric data pack to the NeoForge version (IAFEnvoy/Origins-NeoForge).

Changes to apply:
1. Move all JSON files to datapack registry paths:
   - origin JSONs: data/<ns>/origins/ → data/<ns>/origins/origin/
   - power JSONs: data/<ns>/powers/ → data/<ns>/origins/power/
   - layer JSONs: data/<ns>/origin_layers/ → data/<ns>/origins/layer/
2. Remove from Origin JSONs: name, description, loading_priority.
   Add translations to language file: "origin.<ns>.<id>.name" and ".description".
3. Remove from Layer JSONs: replace, name, missing_name, missing_description.
   Move choose_origin/view_origin under a new "gui_title" object.
   Add translations: "layer.<ns>.<id>.name".
   Use #tag references in origins instead of listing individual origin IDs.
4. Update icon format: old "item"/"damage"/"nbt" → new {"id": "minecraft:..."}
   Use #tag references in powers instead of listing individual power IDs.
5. Split any origins:multiple powers into individual power JSON files.
6. Replace removed condition types (command, entity_group, category, high_humidity, owner) with equivalent alternatives or JS scripts.
7. origins:attacker and origins:attack_target are now BiEntity conditions directly — no longer nested entity conditions inside bientity conditions.
8. Do NOT nest comparison/compare_to fields — they remain as flat top-level keys.
9. Check the porting guide at porting.md for the full list of differences.
```
