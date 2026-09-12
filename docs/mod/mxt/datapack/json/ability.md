---
title: "Ability"
description: "Defines an active, passive or triggered ability with its costs, cooldown, conditions and behaviour."
sidebar_position: 11
---

# Ability

An `ability` defines an active, passive or triggered ability, including its resource costs, cooldown, availability condition and the behaviour it executes.

## File Location

Ability files go in `data/<namespace>/mxt/ability/` within your datapack.

The filename corresponds to its ID. For example, `data/example/mxt/ability/fireball.json` has the ID `example:fireball`.

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `ability` | `AbilityType` object | **required** | Built-in ability type object; the object must contain a `type` dispatch key. |
| `costs` | `List<ResourceCost>` | `[]` | Resources deducted before the ability executes. |
| `cast_time` | `NumberProvider` | `0` | Cast time. |
| `cooldown` | `NumberProvider` | `0` | Cooldown. |
| `components` | `List<AbilityComponent>` | `[]` | State components such as cooldown, charges, toggling and duration. |
| `modifiers` | `List<AttributeEntry>` | `[]` | Passive vanilla attribute modifiers; an entry contains `attribute`, `id`, `amount` and `operation`, plus an optional `value` formula. |
| `damage_condition` | `DamageCondition` | `mxt:always_true` | Restriction on damage triggers. |
| `condition` | `EntityCondition` | `mxt:always_true` | Condition for the ability to be usable. |
| `entity_action` | `EntityAction` | `mxt:no_op` | Behaviour executed on the caster. |
| `target_condition` | `BiEntityCondition` | `mxt:always_true` | Target relation condition. |
| `bi_entity_action` | `BiEntityAction` | `mxt:no_op` | Behaviour executed on the caster and the target. |
| `element_affinity` | `HolderOrTag<element>[]` | `[]` | Element affinity markers of the ability. |

### ability.type

`ability.type` is an extensible built-in dispatch table, `mxt:ability_type`, with the built-in types `empty`, `active`, `triggered`, `modifier`, `aura`, `channelled`, `composite` and `word`. Two of these types change when behaviour is executed:

| Type | Exclusive Fields | Behaviour Execution Timing |
|------|------------------|----------------------------|
| `mxt:channelled` | `tick_interval` (default `1`), `upkeep_costs` (default `[]`) | Executes `entity_action` and the target behaviour once on activation, then once per `tick_interval` after the upkeep resources have been deducted successfully, until it is released or the upkeep fails. It is the only behaviour entry point of a sustained effect. |
| `mxt:composite` | `abilities` (**required**), `all_required` (default `true`) | Does not execute behaviour itself; with `all_required: false` only the first ability in the list is executed, while with `true` the costs of every ability are submitted in list order and then the behaviour of each child ability is executed in turn. |

The effects of `mxt:channelled` and `mxt:composite` are both produced through the same set of fields: `entity_action` applies to the caster, `target_selector` and `bi_entity_action` apply to the selected target, while the `word` type is a terminal payload that does not execute target behaviour any more.

## Example

```json
{
  "ability": {
    "type": "mxt:triggered",
    "triggers": [{"type": "mxt:item_use"}]
  },
  "costs": [
    {"id": "example:qi", "amount": "10 + level"}
  ],
  "cooldown": 100,
  "condition": {"type": "mxt:sneaking"},
  "entity_action": {"type": "mxt:damage", "amount": "4 + level"}
}
```

A channelled ability that pays upkeep every 20 ticks:

```json
{
  "ability": { "type": "mxt:channelled", "tick_interval": 20, "upkeep_costs": [{"id": "example:qi", "amount": 1}] },
  "entity_action": {"type": "mxt:add_resource", "resource": "example:qi", "amount": 2}
}
```

A top-level ability that should be a channelled ability released from the ability hotbar must use `mxt:channelled` as a child ability of `mxt:composite`: `mxt:active` and `mxt:channelled` are mutually exclusive single `type`s, and only the child abilities of a composite ability become the active channel.

```json
{
  "ability": { "type": "mxt:composite", "abilities": ["example:meditate_channel"] },
  "cooldown": 100
}
```

:::info Server-authoritative
Numeric fields of abilities uniformly use `NumberProvider`. An ability must pass its condition and all resource costs before its behaviour is executed. Ability behaviour is handled on the server; the client hotbar only sends use and cancel requests.

Abilities can read the entity variables plus the ability and trigger variables (`element_modifier`, `damage`, `target_health`, …); see [Formula Variables](../types/number_provider_types.md#formula-variables).
:::
