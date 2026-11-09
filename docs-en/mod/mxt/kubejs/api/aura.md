---
title: 'MxtAura: World Aura'
description: Read the resolved world aura at a position, and add or remove persistent server-side aura areas.
---

# `MxtAura`: World Aura

<span id="mxtaura-world-aura" />

`MxtAura` is how a script reads world aura, and the only way a script can **write** it: it adds a persistent cuboid area to the server, which is how "this place carries this aura from now on" is expressed. The area itself is defined by an [`aura_zone`](../../datapack/json/aura_zone.md) in the data pack; the script only places it.

## Methods {#methods}

| Method | Parameters | Return value | Description |
| --- | --- | --- | --- |
| `get(level, pos)` | `Level`, `BlockPos` | `AuraResult` | Reads the fully resolved multi-resource aura at that position. Read-only, and the client can query its locally available state. |
| `addBox(level, zone, minX, minY, minZ, maxX, maxY, maxZ, priority)` | Server `Level`, a loaded aura zone ID, two block coordinates, integer priority | `string` | Adds a persistent cuboid area and returns the generated area ID. |
| `remove(level, area)` | Server `Level`, the area ID returned by `addBox` | `boolean` | Removes the matching persistent area. |

`addBox` only accepts a `ServerLevel`, and `zone` must be a loaded `aura_zone` data pack ID; otherwise it throws an exception. The commonly used read-only methods of `AuraResult` are `aura()`, `concentration()`, `maximum()`, `regenPerTick()`, `cultivationSpeed()`, `source()`, `sourceKind()` and `suppressCultivate()`.

```js
// kubejs/server_scripts/mxt_aura.js
const aura = MxtAura.get(player.level(), player.blockPosition())
if (aura.suppressCultivate()) {
  console.info('cultivation is suppressed here')
}

const area = MxtAura.addBox(player.level(), 'example:fire_vein',
  -8, 60, -8, 8, 72, 8, 10)
// The area can be taken back at any later point:
MxtAura.remove(player.level(), area)
```

## Related {#related}

- Data pack side: [`aura_zone`](../../datapack/json/aura_zone.md), [`aura`](../../datapack/json/aura.md), [`block_aura`](../../datapack/json/block_aura.md) and [`item_aura`](../../datapack/json/item_aura.md).
- How aura relates to elements: [MxtElements](./elements.md); how the pools are allocated: [Aura](../../technical/aura.md).
- [KubeJS API Reference](../api-reference.md).
