---
title: Bi-entity Actions (bientity_action_type)
description: Every built-in bi-entity action type registered by the mod, and the JSON fields each type accepts.
---

# Bi-entity Actions (bientity_action_type)

<span id="bi-entity-actions-bientity-action-type" />

:::info Shared with Saturn
This page lists only MiXianTu's own types; types shared with Saturn (including their `mxt:` alias spellings) are documented in [Saturn's type reference](../../../../../library/saturn/types/action/bientity-action.md).
:::

A bi-entity action works on a pair of entities: an **actor** and a **target**. That pair comes from whichever definition declares the action; the action itself only describes what to do with the two entities it is handed, and never picks them.

`type` is written inside the action object, and its value is one of the ids listed below. These ids are registered by the mod and a data pack cannot add or remove them; custom types can only be introduced through KubeJS, see the [KubeJS API](../../../kubejs/api-reference.md). Apart from `type`, every other key is decided by the type.

## Common Structure {#common-structure}

An action is a JSON object, `type` names the type, and every other key is a field of that type:

```json
{
  "type": "mxt:damage_target",
  "amount": 4
}
```

Actions are usually nested in a field of another definition, for example `bientity_action`:

```json
"bientity_action": {
  "type": "mxt:actor_action",
  "action": {
    "type": "mxt:heal",
    "amount": 2
  }
}
```

The `action` nested in `mxt:actor_action` is an [entity action](./entity_action_types.md), so it takes entity action ids; a bi-entity action id such as `mxt:heal_target` in that position is wrong.

Anywhere a bi-entity action is expected, an array is accepted too. An array is shorthand for `mxt:sequence` and runs its entries in order:

```json
"bientity_action": [
  { "type": "mxt:mount" },
  { "type": "mxt:heal_target", "amount": 1 }
]
```

An optional action field that is left out is `mxt:no_op`. Loading does not complain about it - that entry simply does nothing.

:::info Field Types Are Shared
Fields that take a number generally accept a [number provider](../../../../../library/saturn/types/number.md) instead of a fixed number, so formulas and random values work anywhere a plain number does.
:::

:::info Nested Values
`mxt:if_else` takes a [bi-entity condition](../condition/bientity_condition_types.md); `mxt:actor_action` and `mxt:target_action` take [entity actions](./entity_action_types.md).
:::

:::tip Datapack Visual Editor
The [Datapack Visual Editor](https://datapack.mcdev.tech/) shows the field list of every type interactively, which is handy for confirming a field name without consulting the tables on this page.
:::

## Action Types {#action-types}

### mxt:damage_target {#mxt-damage-target}

Damages the target and records the actor as the attacker, so kill credit and aggro follow them; both layers of the [damage system](../../../technical/damage.md) apply.

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `amount` | Number provider | **required** | The damage amount. |
| `damage_type` | Damage type id | not declared | The source type this hit is built with. |
| `element` | Element id, or a list of `#element tag` entries | `[]` | The element this hit is declared as. |

```json
{
  "type": "mxt:damage_target",
  "amount": "8 + level",
  "damage_type": "minecraft:magic"
}
```

Settled on the server only. A non-finite `amount`, or one of `0` or less, means the hit does not happen at all.

With only `element` written, the first damage type that element claims is taken as `damage_type`; a `#element tag` gives nothing to infer a type from, so `damage_type` must be written yourself. With both written, the **first use** of this strike checks that the element really claims that type - a mismatch logs one line for each side - and the hit is still dealt as the declared `damage_type`.
