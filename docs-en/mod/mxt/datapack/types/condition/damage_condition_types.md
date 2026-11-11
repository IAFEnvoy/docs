---
title: Damage Conditions (damage_condition_type)
description: Every built-in damage condition type registered by the mod, and the JSON fields each type accepts.
---

# Damage Conditions (damage_condition_type)

<span id="damage-conditions-damage-condition-type" />

:::info Shared with Saturn
This page lists only MiXianTu's own types; types shared with Saturn (including their `mxt:` alias spellings) are documented in [Saturn's type reference](../../../../../library/saturn/types/condition/damage-condition.md).
:::

A **damage condition** inspects an incoming hit: its source and its amount, and returns `true` or `false`. The source and the amount come from the definition that declares the condition, so the condition itself only describes what to check about those two.

It is a Java (built-in) registry, so `type` has to be one of the ids listed below, written with the `mxt` namespace. A data pack can neither add entries to this registry nor remove them. Custom types take Java or the KubeJS bridge — see the [KubeJS API](../../../kubejs/api-reference.md).

## Common Structure {#common-structure}

A condition is a JSON object: `type` names the built-in type, and every other key is a field of that type:

```json
{
  "type": "mxt:damage_type_tag",
  "tag": "minecraft:is_fire"
}
```

A condition is usually a value nested inside another definition, under a field such as `damage_condition`:

```json
"damage_condition": {
  "type": "mxt:amount_range",
  "min": 4,
  "max": 20
}
```

Anywhere a damage condition is accepted, an array is accepted too. The array is shorthand for `mxt:and` and passes only when every entry passes:

```json
"damage_condition": [
  { "type": "mxt:projectile" },
  { "type": "mxt:amount_range", "min": 2, "max": 10 }
]
```

:::info Damage Registries
`damage_type` accepts the id of a registered damage type, for example `minecraft:fall`; `damage_type_tag` accepts a damage type tag such as `minecraft:is_fire`. Both read the vanilla damage type registry, so damage types and tags added by data packs are visible here.
:::

:::tip Datapack Visual Editor
The [Datapack Visual Editor](https://datapack.mcdev.tech/) lists a type's fields interactively, which is handy for checking a field name without digging through the tables on this page.
:::

## Condition Types {#condition-types}

### `mxt:element` {#mxt-element}

Matches the hit by its **elements**.

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `elements` | Element id, `#` tag, or an array of them | **required** | Passes when one of the listed elements is among the hit's elements; at least one entry. |

```json
{ "type": "mxt:element", "elements": ["#example:fire", "example:metal"] }
```

The hit's elements are the ones the damage pipeline reads: the damage type's claimants, falling back to the attacker's spirit roots only when nobody claims it. So the elements a condition names always agree with the multiplier the target actually takes, and once an element claims `minecraft:lava`, lava damage answers this condition too. `elements` needs at least one entry: an empty array is refused at load rather than turning into a condition that never passes.
