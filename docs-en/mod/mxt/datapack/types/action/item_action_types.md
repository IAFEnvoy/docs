---
title: Item Actions (item_action_type)
description: Every built-in item action type registered by the mod, with the JSON fields that each type accepts.
---

# Item Actions (item_action_type)

<span id="item-actions-item-action-type" />

:::info Shared with Saturn
This page lists only MiXianTu's own types; types shared with Saturn (including their `mxt:` alias spellings) are documented in [Saturn's type reference](../../../../../library/saturn/types/action/item-action.md).
:::

An **item action** operates on a single item stack. The holder entity and the stack are supplied by whatever definition declares the action, so the action itself only describes what to do with the stack it is handed.

Item actions are a Java (built-in) registry, so their `type` ids are fixed and a data pack cannot add new ones. `type` is written on the action object, side by side with its fields, and its value is one of the ids tabulated on this page, written with the `mxt` namespace. A data pack never adds or removes entries in this registry. Only Java code or the KubeJS bridge can introduce custom action types — see the [KubeJS API](../../../kubejs/api-reference.md).

```json
{
  "type": "mxt:damage_item",
  "amount": 1
}
```

Actions are normally nested as a value under a field of another definition, such as `item_action`:

```json
"item_action": {
  "type": "mxt:consume_item",
  "count": 1
}
```

Anywhere an item action is expected, an array is also accepted. The array is shorthand for [`mxt:sequence`](../../../../../library/saturn/types/action/item-action.md#saturnsequence) and runs its entries in order:

```json
"item_action": [
  { "type": "mxt:damage_item", "amount": 1 },
  { "type": "mxt:cooldown", "ticks": 40 }
]
```

Almost every action field is optional, and its default is `mxt:no_op`: a miss such as writing `condition` but forgetting `action` is not reported at load, that entry simply does nothing.

:::info Where Item Actions Run
An item action needs a stack to act on, so it is normally reached through a table that already supplies one — for example the [entity action](./entity_action_types.md) `mxt:equipped_item_action`, which also supplies the equipment slot. Without a stack the action does not run. [Item conditions](../condition/item_condition_types.md) are the matching predicate family.
:::

:::tip Datapack Visual Editor
The [Datapack Visual Editor](https://datapack.mcdev.tech/) shows the field list of every type interactively, which is handy for checking a field name without reading the tables here.
:::

## Action Types {#action-types}

| Type | Fields | Description |
| --- | --- | --- |
| `mxt:damage_item` | `amount` | Adds durability damage to the stack, clamped to its maximum damage. |
| `mxt:consume_item` | `count` | Shrinks the stack by the given count. |
| `mxt:charge_artifact` | `aura`, `amount`, `capacity?` | Adds to **one named aura's** stored amount on an artifact stack; `aura` (a concrete aura) and `amount` are both required. The ceiling is the `spirit_capacity` the `artifact` the stack matches declares for that aura; `capacity` (default `0`) is only the **fallback**: use it as the ceiling when no definition claims the stack, or when the definition does not declare that aura. |
| `mxt:consume_health` | `amount` | Deals one hit of vanilla **magic damage** to the holder — the "pay in blood" shape. It neither pre-checks nor refuses; whether the price is affordable is up to the table that declared it. |
| `mxt:cooldown` | `ticks` | Puts the stack on the holder's vanilla item cooldown for the given number of ticks. |
| `mxt:remove_enchantment` | `enchantment?`, `level?`, `reset_repair_cost?` | Removes or lowers enchantments on the stack and can reset its repair cost. |
| `mxt:add_enchantment` | `enchantments`, `override?` | Adds or upgrades enchantments on the stack. |
| `mxt:merge_components` | `components` | Merges a vanilla data component patch into the stack. |
| `mxt:add_ability` | `abilities` | Merges abilities into the stack's `mxt:item_abilities` data component: an entry that is already written is not written a second time, and the entries already in the component are all kept. It is that component's **dedicated producer**. |

### `mxt:charge_artifact` {#mxt-charge-artifact}

Adds to one named aura's stored amount on an artifact stack.

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `aura` | Aura id | **required** | The **concrete** aura to pour into, written as an id; no `#tag` and no array. |
| `amount` | Number provider | **required** | How much to pour; a value that evaluates to something non-finite or `0` or less does nothing. |
| `capacity` | Number provider | `0` | **Fallback** ceiling, used only when no definition claims this stack, or when the definition that claims it gives no valid ceiling for this aura. |

```json
"item_action": {
  "type": "mxt:charge_artifact",
  "aura": "example:spirit_qi",
  "amount": 10
}
```

The ceiling is taken first from the `spirit_capacity` the `artifact` matching this stack declares for that aura; when the definition declares one but it evaluates to something non-finite or `0` or less, it falls back to `capacity`, and when `capacity` is equally invalid the ceiling is `0`, nothing fits and nothing happens silently. The effective ceiling is the declared ceiling times the nurture bonus `1 + 0.5 × nurture`, **rounded down** after evaluation, so filling can exceed the declared value by up to 1.5 times. The amount actually taken is the smaller of `amount` and "ceiling minus stored", the stored amount only ever grows, and any part of a single take that goes past the ceiling is discarded — it never spills into another aura.

This action needs a server and a holder, and returns immediately without a holder. For every point really taken, nurture rises by "the amount taken ÷ this time's effective ceiling", and it only ever goes up.

### `mxt:add_ability` {#mxt-add-ability}

Merges abilities into the stack's `mxt:item_abilities` data component.

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `abilities` | List of ability ids | **required** | The abilities to write into the component; no `#tag`. |

```json
"claim_action": { "type": "mxt:add_ability", "abilities": ["example:sword_focus"] }
```

An entry that is already written is not written a second time, and the entries already in the component are all kept. An empty stack, or an empty `abilities` list, does nothing.

Besides the definition's own `abilities`, an item can carry abilities through the `mxt:item_abilities` data component (`{"abilities": ["example:foo"]}`): what the runtime reads is the **union of what the definition declares and what the component writes**, so two stacks claimed by one artifact definition can carry different abilities. The component stores **ability ids only** and takes no tags (tags are expanded on the definition's side, in its `abilities`), so every id written has to resolve in the ability registry, and entries that do not resolve are dropped. This action writes ids and reads the current registry, so a newly written id only takes effect at the point where the item is next read by the runtime.
