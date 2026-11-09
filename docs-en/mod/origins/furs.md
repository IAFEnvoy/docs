---
sidebar_position: 6
---

# Origins Furs

This mod is an addon for the Origins mod that adds custom furry models (furs) to origins.

## File Location

Fur model JSON files are placed under:

```
assets/<namespace>/furs/<origin_name>.json
```

The filename corresponds to the origin's ID. For example, a fur for `origins:avian` would be located at `assets/origins/furs/avian.json`.

## Naming & Namespaces

### Avoiding Name Conflicts

If two origin packs define origins with the same name (e.g. both `example1` and `example2` have an origin called `phantom`), you can prefix the filename with the origin's namespace to prevent conflicts:

```
assets/<namespace>/furs/<origin_namespace>.<origin_name>.json
```

For example: `assets/some_namespace/furs/example1.phantom.json` and `assets/some_namespace/furs/example2.phantom.json`.

### Origins Classes (Or other addons)

If you create a custom class with **Origins Classes**, the fur filename follows the format `origins-classes.<class_name>.json`. As always, including the namespace is recommended for redundancy.

### Subfolders as Namespaces

If your origin is inside a subfolder (e.g. `origins/roiraces/impact1/elf.json`), the subfolder path acts as a namespace. You **must** use the full dotted path as the filename:

```
roiraces.impact1.elf.json
```

Omitting the namespace (in this case `roiraces`) will likely cause the fur to not load.

:::warning[Reserved Namespace]
The namespace `orif-defaults` is reserved. Furs using this namespace will **not** override existing ones.
:::

## Model Creation Tips

When creating a new model, if any cubes are **zero-width** (flat on any axis), make sure **one face** of that cube is fully transparent. This is required because translucency is supported, and non-transparent zero-width faces will cause rendering clipping.

## JSON Format

| Field | Type | Description |
|-------|------|-------------|
| `model` | Resource Location | Custom GeckoLib model (`.geo.json`) |
| `texture` | Resource Location | Main texture for the model |
| `fullbrightTexture` | Resource Location | Emissive (fullbright) texture |
| `animation` | Resource Location | Animation file, plays indefinitely |
| `elytraTexture` | Resource Location | Custom elytra texture for this origin |
| `playerInvisible` | Boolean | If `true`, hides the player's default model entirely |
| `hidden` | String[] | Player body parts to hide. Valid values: `head`, `hat`, `body`, `jacket`, `leftArm`, `rightArm`, `leftLeg`, `rightLeg`, `leftPants`, `rightPants` |
| `overlay` | Resource Location | Texture drawn on top of the player's skin (Steve/wide model) |
| `overlay_slim` | Resource Location | Same as `overlay`, but for Alex/slim model. When defined, `overlay` is used exclusively for wide models |
| `emissive_overlay` | Resource Location | Emissive texture drawn on top of the player's skin (Steve/wide model) |
| `emissive_overlay_slim` | Resource Location | Same as `emissive_overlay`, but for Alex/slim model. When defined, `emissive_overlay` is used exclusively for wide models |
| `rendering_offsets` | Object | Item rendering position offsets |
| `rendering_offsets.left` | Vec3 | Left arm item rendering offset `[x, y, z]` |
| `rendering_offsets.right` | Vec3 | Right arm item rendering offset `[x, y, z]` |

## Example

```json
{
  "model": "some_namespace:geo/custommodel.geo.json",
  "texture": "some_namespace:textures/custom/customorigin.png",
  "fullbrightTexture": "some_namespace:textures/custom/customorigin_emission.png",
  "animation": "some_namespace:animations/custommodel.animation.json",
  "elytraTexture": "some_namespace:textures/custom/custom_elytra.png",
  "playerInvisible": true,
  "overlay": "some_namespace:textures/custom/skin_overlay.png",
  "emissive_overlay": "some_namespace:textures/custom/emissive_skin_overlay.png",
  "hidden": [
    "leftArm", "rightArm", "body", "jacket",
    "head", "hat", "leftLeg", "rightLeg",
    "leftPants", "rightPants"
  ],
  "rendering_offsets": {
    "left": [0, 0.3, 0],
    "right": [0, 0.3, 0]
  }
}
```
  