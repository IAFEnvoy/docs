---
title: Item Conditions (item_condition_type)
description: Every built-in item condition type registered by the mod, and the JSON fields each type accepts.
---

# Item Conditions (item_condition_type)

<span id="item-conditions-item-condition-type" />

:::info Shared with Saturn
This page lists only MiXianTu's own types; types shared with Saturn (including their `mxt:` alias spellings) are documented in [Saturn's type reference](../../../../../library/saturn/types/condition/item-condition.md).
:::

An **item condition** checks a single item stack and returns `true` or `false`. The holder entity and the stack come from whichever definition declares the condition, so a condition only describes what the stack it is handed has to satisfy.

Item conditions are built-in types with fixed `type` ids, and a data pack can neither add nor remove entries. Every value is listed on this page, all of them in the `mxt` namespace. Custom types take Java or the KubeJS bridge — see the [KubeJS API](../../../kubejs/api-reference.md).

A condition is a JSON object: `type` picks the type, and every other key is a field of that type:

```json
{
  "type": "mxt:item_tag",
  "tag": "minecraft:swords"
}
```

Elsewhere a condition is used as a value, so it usually sits nested under a field such as `item_condition`:

```json
"item_condition": {
  "type": "mxt:relative_durability",
  "comparison": "<=",
  "compare_to": 0.25
}
```

Anywhere an item condition is accepted, an array of conditions is accepted too. The array is shorthand for `mxt:and` and passes only when every entry passes:

```json
"item_condition": [
  { "type": "mxt:item_tag", "tag": "minecraft:swords" },
  { "type": "mxt:relative_durability", "comparison": ">", "compare_to": 0.5 }
]
```

:::info Where It Is Checked
The stack usually comes from the table that declares the condition, for example the `mxt:equipped_item` entity condition or an item action field. Every type that compares numbers uses the same operators: `==`, `!=`, `<`, `<=`, `>`, `>=`.
:::

:::tip Datapack Visual Editor
The [Datapack Visual Editor](https://datapack.mcdev.tech/) lists each type's fields interactively, handy for confirming a field name without digging through the tables here.
:::

## Meta Conditions {#meta-conditions}

Meta conditions do not check the stack itself; they decide how other conditions are evaluated. Their fields are just one `conditions` array or one `condition`.

| Type | Fields | Description |
| --- | --- | --- |
| `mxt:always` | — | Always passes. |
| `mxt:never` | — | Always fails. |
| `mxt:js` | `id`, `params?` | Calls an item condition handler registered through the KubeJS bridge. |
| `mxt:and` | `conditions` | Passes when every nested item condition passes. |
| `mxt:or` | `conditions` | Passes when at least one nested item condition passes. |
| `mxt:not` | `condition` | Negates the nested item condition. |
| `mxt:chance` | `chance` | Passes randomly with the given probability. |

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `id` | String | **required** | The handler id of `mxt:js`, the one written to `MxtConditions.item(id, callback)`. |
| `params` | JSON object | `{}` | Arguments handed to the handler, which receives them unchanged. |
| `conditions` | Item condition array | **required** | The nested conditions of `mxt:and` / `mxt:or`. |
| `condition` | Item condition | **required** | The nested condition of `mxt:not`. |
| `chance` | Double | **required** | Probability of passing, from `0` to `1`; out of range is a load error. |

An unregistered handler for `mxt:js`, or a callback that throws, counts as failing. `mxt:chance` at `0` never passes and at `1` always passes. The array shorthand is the same thing as `mxt:and`, and it nests to any depth.

`mxt:always` and `mxt:never` have no fields, and `{"type": "mxt:always"}` is the whole condition. An optional condition field left out means `mxt:always`.

## Condition Types {#condition-types}

### `mxt:owned_by` {#mxt-owned-by}

Passes when the stack's artifact owner (the `owner_uuid` of `mxt:artifact_state`) is the current holder. A stack with no owner does not pass.

No fields.

```json
{ "type": "mxt:owned_by" }
```

### `mxt:energy_range` {#mxt-energy-range}

Checks whether the stored amount of **one named aura** on the stack lies between `min` and `max`, inclusive. One artifact can hold several auras, so this names the one to ask about.

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `aura` | Aura id or `#` tag | **required** | The one aura to ask about. |
| `min` | Number or formula | **required** | Lower bound, inclusive. |
| `max` | Number or formula | **required** | Upper bound, inclusive. |

```json
{ "type": "mxt:energy_range", "aura": "example:fire_qi", "min": 10, "max": 100 }
```

`min` and `max` are evaluated in the current formula context. If either side fails to produce a finite number, or `min > max`, the condition does not pass.

### `mxt:spirit_storage_not_full` {#mxt-spirit-storage-not-full}

Matches chargeable items whose stored spirit power is below their capacity.

No fields.

```json
{ "type": "mxt:spirit_storage_not_full" }
```

Capacity comes from the definition this stack currently resolves to. A stack that resolves to no spirit storage ability does not pass.

### `mxt:item_element` {#mxt-item-element}

Passes when the item carries one of the listed elements.

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `elements` | Element id, `#` tag or array of them | **required** | At least one entry. |

```json
{ "type": "mxt:item_element", "elements": ["example:fire", "#example:hot"] }
```

It reads "the element of an item": the `mxt:element` component on the stack plus the `element` declared by `weapon_binding` / `item_binding` / `artifact` (all of them unioned), and only when none of those declares one does it fall back to the `aura_type` of the aura the item carries. Both elements and element tags are accepted, and an empty list is refused at load. See [weapon_binding](../../json/weapon_binding.md).

### `mxt:curse_container` {#mxt-curse-container}

Checks which [curses](../../json/curse.md) are sealed in the stack's `mxt:curse_container` component.

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `curse` | Curse id, `#` tag or array of them | omitted means any curse | The curse entries to ask about. |
| `stacks` | `{min?, max?}` | omitted means any stack count | The inclusive window of the stack count that entry **would apply**. |

```json
{ "type": "mxt:curse_container", "curse": "#example:curses", "stacks": { "min": 2 } }
```

`stacks` compares the stack count the entry **would apply**, and its formula is evaluated in the current context; a non-finite bound makes that entry fail. A stack without this component does not pass.

It asks **what the item has sealed inside**, which is a different question from the `mxt:has_curse` entity condition (which asks what the holder already carries), so unequipped armor still answers.

### `mxt:item_quality` {#mxt-item-quality}

Checks the [quality](../../json/quality.md) tier the stack resolves to.

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `quality` | Quality id, `#` tag or array of them | — | Membership: is the tier the stack resolves to one of these. |
| `min_quality` | Quality id | — | **At least this tier**: compared by position on that tier's own chain, and a cross-chain minimum answers no; on its own, an item with no tier answers no. |

```json
{ "type": "mxt:item_quality", "quality": ["example:fine", "#example:high_tier"] }
```

```json
{ "type": "mxt:item_quality", "min_quality": "example:tier_3" }
```

It follows the same resolution order as the quality gate and the tooltip (**three layers**, first hit wins: the `mxt:quality` component on the stack → the `quality` declared by the definition the stack carries → the `default_quality` registry), so the tier that layer gives counts too. **This is the condition, not the component**: the component is `mxt:quality` (which writes a whole quality object), so the two names differ. At least one of the two fields has to be written; writing neither is refused at load (an empty condition would silently always pass). An item that resolves to no tier at all answers false rather than falling back to the lowest tier.

`min_quality` compares positions on **the chain that tier is on** (the same implementation as upgrading and `/quality chain`) — positions on different chains mean nothing to each other, so **a cross-chain minimum always answers no**. Use it for "at least this tier" instead of maintaining a quality tag that lists every tier above. The same requirement is attached at two more places (the `mxt:quality` matcher entry and the `mxt:quality` ingredient, the latter being how a forging blueprint's `input` asks for a tier); see [Quality · Filtering items by tier](../../json/quality.md#gating).

### `mxt:item_abilities` {#mxt-item-abilities}

Checks the mxt [abilities](../../../../../library/saturn/data/ability.md) the stack grants.

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `abilities` | Ability id, `#` tag or array of them | **required** | At least one entry. |

```json
{ "type": "mxt:item_abilities", "abilities": ["example:sword_focus"] }
```

It reads the union the runtime uses: the `abilities` the definition declares plus the ids written in the `mxt:item_abilities` component. An empty list is refused at load.
