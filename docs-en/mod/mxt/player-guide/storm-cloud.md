---
title: Storm Cloud
description: Use mxt:storm_cloud to preview a rotating cloud with separately coloured lightning.
---

Use `/summon mxt:storm_cloud` to create a rotating cloud centred at the given position. Set its appearance and lifetime in the `cloud` object. The electrical arcs are visual effects.

Clients receive the cloud through vanilla entity tracking. The base horizontal tracking range is 24 chunks. Server and client view distances and the server's entity tracking settings determine the actual range. Players entering range see the animation at its current age.

```mcfunction
/summon mxt:storm_cloud ~ ~9 ~12
/summon mxt:storm_cloud ~ ~10 ~15 {cloud:{cloud_color:"#FF41345C",lightning_color:"#FFFFBB55",radius:16.0f,lifetime:300}}
```

| Parameter | Default | Description |
| --- | --- | --- |
| `cloud_color` | `"#FF584D82"` | Cloud colour in `#AARRGGBB` format. |
| `lightning_color` | `"#FFC2CDFF"` | Arc colour in `#AARRGGBB` format. |
| `radius` | `16.0` | Horizontal radius, from 0.5 to 64 blocks. |
| `thickness` | `6.0` | Total height of the vertical bounding box, from 0.25 to 32 blocks. |
| `lifetime` | `160` | Lifetime in ticks, from 1 to 1,200, including formation and dissipation. |

Set either colour's alpha to `00` to hide that part. For example, `lightning_color:"#00FFFFFF"` displays the cloud with the lightning hidden.

## Following an entity

Set the storm cloud's top-level `owner` field to an entity UUID. The cloud gradually follows that entity's X and Z coordinates at its original altitude. The binding is saved with the cloud. The cloud stays in place while its owner is in another dimension, unloaded, or dead. If an entity with the same UUID returns to the dimension, the cloud resumes following for the rest of its lifetime.

Run these commands in chat to summon a cloud and bind the nearest one to yourself.

```mcfunction
/summon mxt:storm_cloud ~ ~10 ~ {cloud:{lifetime:600}}
/data modify entity @e[type=mxt:storm_cloud,sort=nearest,limit=1] owner set from entity @s UUID
```

If you know the UUID, you can also supply `{owner:"entity UUID"}` when summoning the cloud. To clear the binding, use `/data remove entity @e[type=mxt:storm_cloud,sort=nearest,limit=1] owner`.
