---
title: "Resource Definitions"
sidebar_position: 2
---

File: `data/<namespace>/saturn/resource/<path>.json`. For example, the following file defines `example:mana`. A resource stores an entity's current value, while the definition supplies the bounds and the display method; merely creating a definition does not automatically initialise the resource for every entity or grant abilities.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `default_value` | [Number provider](../types/number/index.md) | yes | — | Value used when the resource is initialised. |
| `min` | Number provider | no | `0` | Lower bound of the resource. |
| `max` | Number provider | yes | — | Upper bound of the resource. |
| `icon` | [Icon](./common.md#items-and-icons) | no | omitted | Texture ID or item template. |
| `particle_color` | RGB string | no | `"#FFFFFF"` | Particle colour. |
| `bars` | Array of [resource bars](./resource-bar.md) | no | `[]` | Display bars for this resource. |

## Example

```json title="data/example/saturn/resource/mana.json"
{
  "default_value": 50,
  "min": 0,
  "max": 100,
  "icon": {
    "id": "minecraft:lapis_lazuli"
  },
  "particle_color": "#4488FF",
  "bars": [
    {
      "anchor": "left",
      "renderer": {
        "type": "saturn:text_only",
        "format": "%current% / %maximum%",
        "color": "#4488FF"
      }
    }
  ]
}
```

Use [add_resource](../types/entity-action/add_resource.md) to add or remove resources as an effect, and a [resource cost](../types/cost/resource.md) to charge a payment. For initialisation and transactional interfaces on the development side, see the [Java API](../development/api.md).
