---
title: "Item condition"
sidebar_position: 4
---

# Item condition

Checks a single ItemStack. An item ID string cannot be treated directly as an arbitrary ItemCondition.

### `saturn:amount` {#saturnamount}

Compares the count of the item stack.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:amount` |
| `comparison` | Enum string | yes | — | One of `==`, `!=`, `<`, `<=`, `>`, `>=`. |
| `compare_to` | Number | yes | — | The target number to compare against. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:amount",
  "comparison": ">=",
  "compare_to": 1
}
```

</details>

### `saturn:armor_value` {#saturnarmor_value}

Compares the armor value provided by the equipment.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:armor_value` |
| `comparison` | Enum string | yes | — | One of `==`, `!=`, `<`, `<=`, `>`, `>=`. |
| `compare_to` | Number | yes | — | The target number to compare against. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:armor_value",
  "comparison": ">=",
  "compare_to": 1
}
```

</details>

### `saturn:base_enchantment` {#saturnbase_enchantment}

Compares the level of the given base enchantment on the item.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:base_enchantment` |
| `enchantment` | Resource ID | yes | — | Enchantment ID or list of enchantments. |
| `comparison` | Enum string | yes | — | One of `==`, `!=`, `<`, `<=`, `>`, `>=`. |
| `compare_to` | Number | yes | — | The target number to compare against. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:base_enchantment",
  "enchantment": "minecraft:unbreaking",
  "comparison": ">=",
  "compare_to": 1
}
```

</details>

### `saturn:component` {#saturncomponent}

Checks the data of the given component on the item stack.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:component` |
| `component` | Resource ID | yes | — | Data component ID, or a switch for whether to read it as a text component. |
| `nbt` | Object | yes | — | Vanilla CompoundTag data. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:component",
  "component": "minecraft:custom_data",
  "nbt": {}
}
```

</details>

### `saturn:durability` {#saturndurability}

Compares the remaining durability of the item.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:durability` |
| `comparison` | Enum string | yes | — | One of `==`, `!=`, `<`, `<=`, `>`, `>=`. |
| `compare_to` | Number | yes | — | The target number to compare against. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:durability",
  "comparison": ">=",
  "compare_to": 1
}
```

</details>

### `saturn:fuel` {#saturnfuel}

Compares the burn time of the item as fuel.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:fuel` |
| `comparison` | Enum string | yes | — | One of `==`, `!=`, `<`, `<=`, `>`, `>=`. |
| `compare_to` | Number | yes | — | The target number to compare against. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:fuel",
  "comparison": ">=",
  "compare_to": 1
}
```

</details>

### `saturn:has_component` {#saturnhas_component}

Checks whether the item stack has the given data component.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:has_component` |
| `component` | Resource ID | yes | — | Data component ID, or a switch for whether to read it as a text component. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:has_component",
  "component": "minecraft:custom_data"
}
```

</details>

### `saturn:ingredient` {#saturningredient}

Matches items using a Minecraft Ingredient.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:ingredient` |
| `ingredient` | Vanilla Ingredient (item ID, #tag or item ID array) | yes | — | Vanilla Ingredient. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:ingredient",
  "ingredient": "#minecraft:logs"
}
```

</details>

### `saturn:is_equipable` {#saturnis_equipable}

Checks whether the item can be equipped in the given slot.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:is_equipable` |
| `slot` | Enum string | no | omitted | Equipment slot. Available values: `mainhand`, `offhand`, `feet`, `legs`, `chest`, `head`, `body`, `saddle`. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:is_equipable"
}
```

</details>

### `saturn:item_id` {#saturnitem_id}

Checks whether the item stack is the given item.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:item_id` |
| `item` | Resource ID | yes | — | Item ID, predicate, or an item parameter key in the context. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:item_id",
  "item": "minecraft:diamond"
}
```

</details>

### `saturn:item_matcher` {#saturnitem_matcher}

Checks the item stack against multiple item matcher entries.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:item_matcher` |
| `items` | Array of [item matcher entries](../item-matcher.md) | yes | — | Item matcher entries, item predicates or an item list. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:item_matcher",
  "items": [
    "minecraft:diamond"
  ]
}
```

</details>

### `saturn:item_tag` {#saturnitem_tag}

Checks whether the item belongs to the given tag.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:item_tag` |
| `tag` | Tag ID (with #) | yes | — | Registry tag, or the NBT data declared on this page. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:item_tag",
  "tag": "#minecraft:logs"
}
```

</details>

### `saturn:on_cooldown` {#saturnon_cooldown}

Checks whether the item in the context is on cooldown.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:on_cooldown` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:on_cooldown"
}
```

</details>

### `saturn:relative_durability` {#saturnrelative_durability}

Compares the ratio of the remaining durability to the max durability.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:relative_durability` |
| `comparison` | Enum string | yes | — | One of `==`, `!=`, `<`, `<=`, `>`, `>=`. |
| `compare_to` | Number | yes | — | The target number to compare against. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:relative_durability",
  "comparison": ">=",
  "compare_to": 1
}
```

</details>

### `saturn:tool_ability` {#saturntool_ability}

Checks whether the item supports the given NeoForge ItemAbility.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:tool_ability` |
| `ability` | Resource ID | yes | — | Ability ID or tool ability, depending on the field type. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:tool_ability",
  "ability": "example:heal"
}
```

</details>

## Meta types

These types do not test a concrete value themselves; they combine or delegate other types of the same kind and are embedded in the same fields.

### `saturn:always` {#saturnalways}

The condition is always true.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:always` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:always"
}
```

</details>

### `saturn:and` {#saturnand}

Matches only when every sub-condition holds.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:and` |
| `conditions` | Array of conditions of the same kind | yes | — | List of sub-conditions of the same kind. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:and",
  "conditions": []
}
```

</details>

### `saturn:chance` {#saturnchance}

Decides whether the check succeeds based on a given chance.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:chance` |
| `chance` | Number | yes | — | Hit chance; 0 never matches, 1 always matches. Codec range: `0.0D, 1.0D`. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:chance",
  "chance": 1
}
```

</details>

### `saturn:js` {#saturnjs}

Calls a callback registered by KubeJS and passes the params argument.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:js` |
| `id` | String | yes | — | Identifier of the callback, option or entry. |
| `params` | Object | no | `{}` | Parameter object passed to the script or formula. |

Registered only when KubeJS is installed. JSON only selects an existing callback; it never executes a JavaScript string inside the JSON directly.

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:js",
  "id": "example_callback",
  "params": {}
}
```

</details>

### `saturn:never` {#saturnnever}

The condition is always false.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:never` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:never"
}
```

</details>

### `saturn:not` {#saturnnot}

Inverts the match result of the sub-condition.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:not` |
| `condition` | [Item condition](./item-condition.md) | yes | — | The condition to check. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:not",
  "condition": {
    "type": "saturn:always"
  }
}
```

</details>

### `saturn:or` {#saturnor}

Matches when any sub-condition holds.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:or` |
| `conditions` | Array of conditions of the same kind | yes | — | List of sub-conditions of the same kind. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:or",
  "conditions": []
}
```

</details>
