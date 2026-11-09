---
title: 'MxtSouls: Souls'
description: Reclaim an entity's transferable soul through the authoritative flow.
---

# `MxtSouls`: Souls

<span id="mxtsouls-souls" />

`MxtSouls` is the script-side entry point for souls: it uses the authoritative reclaim flow, only applies to **transferable** souls, and fires the reclaim pre/post events of `soul` (a script can veto it in `Pre`). Soul **transfer** has no script entry point: items and content trigger it themselves, and a script can only watch or cancel it through the events.

## Methods {#methods}

| Method | Parameters | Return value | Description |
| --- | --- | --- | --- |
| `reclaim(entity)` | `Entity` | `boolean` | Uses the authoritative soul reclaim flow. It only applies to transferable souls, and it fires the reclaim pre/post events of `soul`. |

Pass the original entity that created the soul. The associated soul must be loaded and have a matching origin; otherwise this returns `false`. Valid unloaded associations are retained; expired associations are cleared. It neither force-loads chunks nor restores a body or items. Administrators can explicitly create an apparition with the [soul commands](../../player-guide/soul.md). Automatic expiry does not fire reclaim pre/post events.

```js
// kubejs/server_scripts/mxt_soul.js
if (!MxtSouls.reclaim(player)) {
  console.info('nothing reclaimable here')
}
```

## Related {#related}

- Callbacks around reclaiming and transferring: `soul` in [MxtEvents](./events.md).
- [KubeJS API Reference](../api-reference.md).
