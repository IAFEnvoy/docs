---
title: Block Actions (block_action_type)
description: Every built-in block action type registered by the mod, and the JSON fields each type accepts.
---

# Block Actions (block_action_type)

<span id="block-actions-block-action-type" />

:::info Shared with Saturn
This page lists only MiXianTu's own types; types shared with Saturn (including their `mxt:` alias spellings) are documented in [Saturn's type reference](../../../../../library/saturn/types/action/block-action.md).
:::

A **block action** operates on one block position in the world. The level and the position are supplied by whatever definition declares the action, and some callers also supply a facing direction; the action itself only describes what to do at that position.

Block actions are a Java (built-in) registry: `type` ids are fixed, and a data pack can neither add entries to it nor remove them. `type` is written on the action object, side by side with its fields, and its value is one of the ids listed on this page, written with the `mxt` namespace. Adding a custom type means writing Java, or going through the KubeJS bridge — see the [KubeJS API](../../../kubejs/api-reference.md).

## Common Structure {#common-structure}

An action is a JSON object: `type` names the built-in type and every remaining key is a field of that type.

```json
{
  "type": "mxt:set_block",
  "block": "minecraft:stone"
}
```

Actions are values inside other definitions, so they usually appear nested under a field such as `block_action`:

```json
"block_action": {
  "type": "mxt:break_block",
  "drop": false
}
```

Anywhere a block action is accepted, an array is accepted too. The array is shorthand for `mxt:sequence` and runs its entries in the order they are written:

```json
"block_action": [
  { "type": "mxt:break_block" },
  { "type": "mxt:set_block", "block": "minecraft:air" }
]
```

:::info Mixing With Other Families
Several table types declare block fields and other action fields at the same time; an [entity action](./entity_action_types.md) can wrap a block action with `mxt:block_action`. Block conditions are a separate family — see [block condition types](../condition/block_condition_types.md).
:::

:::tip Datapack Visual Editor
The [Datapack Visual Editor](https://datapack.mcdev.tech/) lists a type's fields interactively, which is handy for checking field names without scrolling through the tables on this page.
:::

## Action Types {#action-types}

### mxt:change_aura {#mxt-change-aura}

Changes the aura stored in the chunk that contains the acted position.

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `aura` | Map of aura id to number provider | **required** | Keys are [aura](../../json/aura.md) ids and values are [number providers](../../../../../library/saturn/types/number.md): how much of that aura to add this time. |

```json
{
  "type": "mxt:change_aura",
  "aura": {
    "example:azure_aura": -20,
    "example:crimson_aura": "5 + level"
  }
}
```

:::info `mxt:change_aura`
Keys must be concrete aura ids; a `#tag` will not work. One action can change several aura pools at once. It is applied only on the server, and nothing changes on the client. If any value evaluates to a non-finite number, the whole change is dropped.
:::
