---
title: "Technique Binding (technique_binding)"
description: "Binds an existing book, jade slip or other item to a cultivation technique through the mxt:technique_binding datapack registry."
---

# Technique Binding (technique_binding)

A technique binding maps an existing book, jade slip, or other item to one `cultivation_technique`. Like every other binding it only matches already registered items, so the physical item must come from Minecraft, a content mod, or KubeJS. Right-clicking the bound item attempts to learn the technique; every learned technique remains enabled and contributes its passive effects.

## File Location

Technique binding JSON files go in `data/<namespace>/mxt/technique_binding/` within your data pack.

The filename corresponds to its ID. For example, `data/example/mxt/technique_binding/fire_manual.json` has the ID `example:fire_manual`.

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `items` | `ItemMatcher` | **required** | Matches existing books, jade slips and similar items |
| `technique` | `Holder<cultivation_technique>` | **required** | The cultivation technique that right-clicking attempts to learn |
| `quality_group` | `Tag<item_quality>` | none | The allowed quality group |
| `conditions` | `EntityCondition[]` | `[]` | The conditions checked before learning; supports inline conditions or described condition objects |

### `items`

The `items` matcher accepts one item ID, one item tag (such as `"#example:manuals"`), or a mixed array of both; one binding can therefore cover many physical items. When multiple bindings match an item, the matcher selects the definition with the lowest `priority` first, and all four binding types currently use priority `0`.

### `quality_group`

`quality_group` must be a native item-quality tag reference prefixed with `#`. Its `values` order defines the group's quality order. When no explicit `mxt:item_quality` component or forge result exists, the last member not disabled by the `mxt:disabled` tag becomes the default quality.

The item cannot be used when its current quality is outside the group, the group has no usable member, a binding condition fails, or the quality's own `condition` fails. See [Item Quality](./item_quality.md).

### `conditions`

`conditions` is optional. Each entry may be an inline `EntityCondition`, or an object with `condition` and an optional translation-key `description`. Described entries are shown in the item tooltip with a green `✓` when true or a red `✗` when false. The check runs before learning.

### `technique`

`technique` is a required holder reference to `mxt:cultivation_technique`. Its own `learn_condition`, already-learned check, exclusive-tag conflict check, and event cancellation remain authoritative. A matching technique binding claims the item interaction even when learning fails, so the item's normal right-click behavior cannot bypass these checks. See [Cultivation Technique](./cultivation_technique.md).

## Example

```json
// data/example/mxt/technique_binding/fire_manual.json
{
  "items": "kubejs:fire_manual",
  "technique": "example:fire_manual",
  "quality_group": "#example:group/manual",
  "conditions": [{"type": "mxt:realm", "realm": "example:foundation"}]
}
```

The condition ids used inside `conditions` come from the [Entity Condition Types](../types/condition/entity_condition_types.md) list.
