---
title: Types Reference
description: How built-in type dispatch works in MiXianTu and where each type family is documented.
---

# Types Reference

<span id="types-reference" />

:::info Division of labour with Saturn
MiXianTu is an extension of [Saturn](../../../../library/saturn/index.md): shared types such as actions, conditions, number providers, triggers and costs are registered and maintained by Saturn. This section only indexes MiXianTu's own types; shared types are documented in [Saturn's type reference](../../../../library/saturn/types/index.md).

The `mxt:` prefix covers more than MiXianTu's own types. At startup MiXianTu calls `SaturnAliases.add("mxt")` to register aliases for Saturn's data pack types, so spellings such as `mxt:heal` and `mxt:chance` resolve to the matching `saturn:` entries. Formula functions, formula variables, entity value getters and attachments are not aliased and still need the registry name.
:::

Actions, conditions, number providers and the like are **type tables held by the code of the mod**: every entry is registered under an ID, and a data pack writes `type` to pick one.

```json
{
  "type": "mxt:heal",
  "amount": 2
}
```

`type` goes in the object that carries the parameters, level with them, with no extra wrapper around it.

A data pack can **only pick an existing type**, never add one: an unknown `type` fails the load. New types are registered in code or from a script.

Always write `type` with its full ID: the built-in types live in the `mxt:` namespace, so `"and"` is read as `minecraft:and` and the load fails with "no such `type`".

Several families accept **shorthand**: a JSON number is `mxt:constant`, a string is `mxt:expression`, and an item ID such as `"minecraft:apple"` is the matcher entry `mxt:item`. Wherever a shorthand exists, writing the full typed object works just as well.

**One dispatch registry per page, hung under the definition page that writes it**: Ability Types, Ability Target Selector, Data Storage and Mount Renderers are under [`ability`](../../../../library/saturn/data/ability.md); Curse Types under [`curse`](../json/curse.md); Formation Actions under [`formation`](../json/formation.md); a formation's stroke kinds under [`formation_shape`](../json/formation_shape.md); Timeline Entries under [`tribulation`](../json/tribulation.md); Secret Realm Generations under [`secret_realm`](../json/secret_realm.md); the four resource bar families (context, renderer, visibility, value source) under [`resource`](../../../../library/saturn/data/resource.md); Aura Maximum under [`aura_zone`](../json/aura_zone.md); Triggers under [`trigger`](../../../../library/saturn/data/trigger.md). Actions, conditions, costs, the item matcher, number providers and formula variables are referenced all over a pack and belong to no single definition, so they stay in this group.

## Dispatched Fields {#dispatched-fields}

| Field | Type family | See |
| --- | --- | --- |
| `type` (top level of an ability) | Ability type `saturn:ability_type` | [Ability Types](./other/ability.md) |
| `render.type` | Mount renderer `mxt:mount_render_type` | [Mount Renderers](./other/mount-render.md) |
| `type` | Target selector `saturn:ability_target_selector_type` | [Ability Target Selector](../../../../library/saturn/types/target.md) |
| `type` | State kind `saturn:data_storage_type` | [Data Storage](../../../../library/saturn/types/storage.md) |
| `type` | Curse type `mxt:curse_type` | [Curse Types](./other/curse.md) |
| `type` | Trigger `saturn:trigger_type` | [Triggers](./other/trigger-type.md) |
| `type` | Cost `saturn:cost_type` | [Costs](./other/cost-type.md) |
| `type` | Formation module `mxt:formation_action_type` | [Formation Actions](./other/formation-action.md) |
| `type` (each stroke of a figure) | Formation stroke `mxt:formation_stroke_type` | [Formation Stroke Types](./other/formation-stroke-type.md) |
| `type` | Tribulation beat `saturn:timeline_entry_type` | [Timeline Entries](../../../../library/saturn/types/timeline.md) |
| `type` | Secret realm generation `mxt:secret_realm_generation_type` | [Secret Realm Generations](./other/secret-realm-generation.md) |
| `type` | Resource value source `saturn:resource_value_provider_type` | [Resource Value Providers](./other/resource-value-provider.md) |
| `type` | Aura maximum `mxt:aura_maximum_type` | [Aura Maximum](./other/aura-maximum.md) |
| `context` (ID string) | Resource bar context `saturn:resource_bar_context` | [Resource Bar Contexts](./other/resource-bar-context.md) |
| `renderer.type` | Resource bar renderer `saturn:resource_bar_render_data_type` | [Resource Bar Renderers](../../../../library/saturn/types/bar-renderer.md) |
| `visibility.type` | Resource bar visibility `saturn:resource_bar_visibility_type` | [Resource Bar Visibility](../../../../library/saturn/types/bar-visibility.md) |
| `type` | Item matcher entry `saturn:item_matcher_entry_type` | [Item Matcher](./other/item-matcher.md) |
| `type` | Entity action | [Entity Action Types](./action/entity_action_types.md) |
| `type` | Bi-entity action | [Bi-entity Action Types](./action/bientity_action_types.md) |
| `type` | Block action | [Block Action Types](./action/block_action_types.md) |
| `type` | Item action | [Item Action Types](./action/item_action_types.md) |
| `type` | Entity condition | [Entity Condition Types](./condition/entity_condition_types.md) |
| `type` | Bi-entity condition | [Bi-entity Condition Types](./condition/bientity_condition_types.md) |
| `type` | Block condition | [Block Condition Types](./condition/block_condition_types.md) |
| `type` | Item condition | [Item Condition Types](./condition/item_condition_types.md) |
| `type` | Damage condition | [Damage Condition Types](./condition/damage_condition_types.md) |
| `type` | Number provider `saturn:number_provider_type` | [Number Provider Types](../../../../library/saturn/types/number.md) |
| A name, not a field | Formula variable `saturn:formula_variable` | [Formula Variables](./formula_variables.md) |

Action and condition **arrays are shorthand** for running all of them, in order:

```json
"entity_action": [
  {"type": "mxt:heal", "amount": 2},
  {"type": "mxt:apply_curse", "curse": "example:burning", "stacks": 1}
]
```

## Shared Data Types {#shared-data-types}

Complex values shared by many fields are documented once in [Shared Data Types](./shared_data_types.md): `Cost`, `AuraGain`, `AttributeEntry`, icon references, holders and tags, `ItemMatcher`, and formulas.

## Types Handed to Scripts {#types-handed-to-scripts}

With a few exceptions every family pre-registers an `mxt:js` type, which is also the only type that hands behaviour to a script. A script registers a callback in `kubejs/server_scripts/` and a data pack refers to it by `id`:

| Dispatch | `mxt:js` fields | Register with |
| --- | --- | --- |
| Entity / bi-entity / block / item action | `id`, `params` | `MxtActions.entity` / `biEntity` / `block` / `item` |
| Entity / bi-entity / block / item / damage condition | `id`, `params` | `MxtConditions.entity` / `biEntity` / `block` / `item` / `damage` |
| Number provider | `id`, `params` | `MxtValues.number` |
| Resource value source | `id`, `params` | `MxtValues.resourceValue` |
| Cost | `id`, `params` | `MxtCosts.register` |
| Trigger | `signal`, `id`, `params` | `MxtTriggers.matcher` |
| Ability target selector | `id`, `params` | `MxtAbilities.selector` |
| Vanilla loot condition / function | `id`, `params` | `MxtLoot.condition` / `MxtLoot.function` |

A `mxt:js` trigger writes one extra field, `signal`: the runtime dispatches by signal layer. Callbacks run on the server. A missing or throwing callback falls back to a safe value each time — an action does nothing, a condition is false, a number resolves to `0`, a cost cannot be paid, a trigger never matches, a selector selects nobody — and logs a warning.

A `Trigger` needs that `signal` because the runtime indexes subscriptions as "signal → owner → subscriber". Apart from `Cost`, every callback also gets the formula context of the dispatch; `Cost` is only ever evaluated for a player, so its context is built from that player alone and carries no event payload. Loot conditions and functions are written inside a vanilla loot table (the `condition` / `function` dispatch keys) and likewise only run on the server while loot is generated.

## Related {#related}

- [Ability definition](../../../../library/saturn/data/ability.md) — where an ability's top-level `type` goes and which fields every ability shares
- [Arrays and shorthands](../overview.md) — how action and condition arrays are merged
