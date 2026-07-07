---
sidebar_position: 0
title: "Origins JS"
---

# Origins JS (1.21.1)

:::warning

This document is for 1.21.1, for 1.20.1, see the [1.20 docs](./../origins-js).

:::

**Origins JS** is a KubeJS add-on that allows you to register custom actions, conditions, and powers using JavaScript. All custom types use the `origins_js:` namespace prefix.

### Sections

- **[API Reference](api-reference)** — Full method reference for HolderWrapper, HelperWrapper (recommended PowerHelper API), Static Shortcuts, and JS type registrations
- **[Examples](examples)** — Usage examples for managing origins/powers, HelperWrapper, custom actions, conditions, and JS powers

---

## Type Mappings

Origins JS wraps the standard Origins types. See the main documentation for details on each:

| JS Registration | JSON type | Docs |
|-----------------|-----------|------|
| `registerEntityAction` | `origins_js:js_entity_action` | [Entity Action Types](../types/action/entity_action_types) |
| `registerBlockAction` | `origins_js:js_block_action` | [Block Action Types](../types/action/block_action_types) |
| `registerItemAction` | `origins_js:js_item_action` | [Item Action Types](../types/action/item_action_types) |
| `registerBiEntityAction` | `origins_js:js_bientity_action` | [Bi-entity Action Types](../types/action/bientity_action_types) |
| `registerEntityCondition` | `origins_js:js_entity_condition` | [Entity Condition Types](../types/condition/entity_condition_types) |
| `registerBlockCondition` | `origins_js:js_block_condition` | [Block Condition Types](../types/condition/block_condition_types) |
| `registerItemCondition` | `origins_js:js_item_condition` | [Item Condition Types](../types/condition/item_condition_types) |
| `registerBiEntityCondition` | `origins_js:js_bientity_condition` | [Bi-entity Condition Types](../types/condition/bientity_condition_types) |
| `registerBiomeCondition` | `origins_js:js_biome_condition` | [Biome Condition Types](../types/condition/biome_condition_types) |
| `registerDamageCondition` | `origins_js:js_damage_condition` | [Damage Condition Types](../types/condition/damage_condition_types) |
| `registerFluidCondition` | `origins_js:js_fluid_condition` | [Fluid Condition Types](../types/condition/fluid_condition_types) |
| `powerBuilder(id)` | `origins_js:js_power` | [Power Types](../types/power/index) |
