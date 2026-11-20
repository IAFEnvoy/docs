---
title: Alchemy Wall Material (alchemy_wall_material)
description: The temperature rating of a furnace wall, how hot one casing block may get, and why a furnace takes the lowest value.
---

:::info Required addon
The workstation workflow and data types on this page are provided by **Alchemy Workstations** (`mxt_alchemy`), required on both client and server. Addon-owned registrations use `mxt_alchemy:*`, without legacy aliases or migration. Datapack authors choose entry IDs; MiXianTu provides shared items.
:::

# Alchemy Wall Material (alchemy_wall_material)

<span id="alchemy_wall_material" />

An `alchemy_wall_material` describes **one casing block** and nothing else: a finite temperature limit and an optional tier. Slots, capacity and cooling rate belong to the [furnace specification](./alchemy_furnace.md) and are not written here.

The casing temperature limit is the lowest `max_temperature` among the 18 casing blocks. The final ceiling is the minimum of this limit, the optional `max_temperature` in the [furnace specification](./alchemy_furnace.md), and the heat source maximum.

## File Location {#file-location}

Wall material files go in `data/<namespace>/mxt_alchemy/alchemy_wall_material/` within your data pack.

**Purpose**: The temperature limit and starting tier of one casing block.

The filename corresponds to its ID. For example, `data/example/mxt_alchemy/alchemy_wall_material/bronze.json` has the ID `example:bronze`.

## Fields {#fields}

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `quality` | Quality id | none | Optional. The tier a casing block of this material starts on. |
| `max_temperature` | Double | **required** | This material's temperature limit; finite and greater than `0`. |

```json
{
  "max_temperature": 800
}
```

This material has no text field: its name and description are derived from the entry id, so `example:bronze` has the name key `mxt_alchemy.alchemy_wall_material.example.bronze` and the description key is that plus `.description`. The value of `max_temperature` is yours to pick — the mod ships no table of copper, iron or spirit material temperatures.

`quality` is optional: casing blocks are the one kind of block every wall material shares, so the block item alone does not identify its tier — only the material the stack carries can: a casing block of this material starts on that tier. An `mxt:quality` component on the stack wins; with no `quality` here this layer provides no result and resolution continues to the [default_quality](../../../datapack/json/default_quality.md) registry.

## Carrying and Forming {#carrying-and-forming}

Casing items carry the material identity through the `mxt_alchemy:alchemy_wall_material` component: placing, saving, synchronizing, creative pick-block and a normal break all keep it. When the definition is not in the registry the material cannot form, and the mod does not fall back to a hard-coded number.

The core, the three stores and all 18 casings must be in place before the furnace forms, and the set point a player may enter is the lowest of the furnace specification's `max_temperature`, the furnace's temperature limit and the highest temperature the heat block gives — see [alchemy_furnace](./alchemy_furnace.md). Representative materials live only in the test data pack; production content comes from content packs.
