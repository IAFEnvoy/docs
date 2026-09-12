---
title: "Formation (formation)"
description: "Define a formation built from a structure template, with its radius, aura capacity bonus, costs, lifecycle actions and runtime aura override."
---

# Formation (formation)

A Formation defines a structure that players can build and activate: it declares the vanilla structure template it is built from, how far it reaches, what it consumes, the behaviours that run on activation, on every maintenance cycle and on failure, and an optional high-priority aura override for its area.

## File Location

Formation JSON files go in `data/<namespace>/mxt/formation/` within your data pack.

The filename corresponds to its ID. For example, `data/example/mxt/formation/spirit_gathering_array.json` has the ID `example:spirit_gathering_array`.

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `structure_template` | Identifier | **required** | The vanilla structure template ID. |
| `radius` | `NumberProvider` | **required** | The formation's area of effect radius. |
| `max_bonus` | `Map<Holder<resource>, NumberProvider>` | `{}` | The aura maximum bonus for each resource in the chunks within range; overlapping formations are handled per resource. |
| `activation_costs` | `List<ResourceCost>` | `[]` | Consumed on activation. |
| `maintenance_costs` | `List<ResourceCost>` | `[]` | Consumed every maintenance cycle; the formation fails when they cannot be paid. |
| `activate_action` | Block Action | `mxt:no_op` | The activation block behaviour. |
| `tick_action` | Block Action | `mxt:no_op` | The formation periodic block behaviour. |
| `deactivate_action` | Block Action | `mxt:no_op` | The failure block behaviour. |
| `entity_tick_action` | Entity Action | `mxt:no_op` | Executed for every entity within the radius. |
| `aura_zone` | `Holder<aura_zone>` | none | A high-priority runtime aura override. |

Each entry of `activation_costs` and `maintenance_costs` is a `ResourceCost` with an `id` and an `amount`; see [Shared Data Types](../types/shared_data_types.md) for its exact shape.

`max_bonus` is optional and defaults to `0` per resource: it appends a value to the effective maximum of the chunks within range, and overlapping formations take the highest bonus. `aura_zone` is an optional high-priority aura override created by the formation at runtime, and it replaces the aura types, element values, rules and display template of the lower-priority environment. After a formation fails, its maintenance fails or its structure is broken, the coverage disappears automatically.

All lifecycle extensions use the matching Action field uniformly; there is no domain behaviour registry.

## Example

```json
{
  "structure_template": "example:spirit_gathering_array",
  "radius": 8,
  "max_bonus": { "example:spirit_power": 50 },
  "aura_zone": "example:spirit_gathering"
}
```

A formation with costs, block behaviours and entity behaviour:

```json
{
  "structure_template": "example:spirit_gathering",
  "radius": 8,
  "max_bonus": { "example:spirit_power": 50 },
  "activation_costs": [{ "id": "example:spirit_power", "amount": 10 }],
  "maintenance_costs": [{ "id": "example:spirit_power", "amount": 1 }],
  "activate_action": { "type": "mxt:change_aura", "aura": { "example:spirit_power": 20 } },
  "tick_action": { "type": "mxt:change_aura", "aura": { "example:spirit_power": 2 } },
  "deactivate_action": { "type": "mxt:change_aura", "aura": { "example:spirit_power": -10 } },
  "entity_tick_action": {
    "type": "mxt:apply_effect",
    "effect": "minecraft:regeneration",
    "duration_ticks": 40
  },
  "aura_zone": "example:spirit_gathering"
}
```
