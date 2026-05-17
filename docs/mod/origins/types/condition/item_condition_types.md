# Item Condition Types

Item conditions check properties of an item stack.

## Built-in Conditions

### `origins:amount`

Checks the item stack size.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `comparison` | [String](../basic_concepts#string) | **required** | Comparison operator |
| `compare_to` | [Integer](../basic_concepts#integer) | **required** | Stack size to compare against |

### `origins:armor_value`

Checks the item's armor protection value.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `comparison` | [String](../basic_concepts#string) | **required** | Comparison operator |
| `compare_to` | [Integer](../basic_concepts#integer) | **required** | Value to compare against |


<details>
<summary>Example</summary>

```json
"item_condition": {
    "type": "origins:armor_value",
    "comparison": ">",
    "compare_to": 3
}
```

This example will check if the armor item (in this context, a chestplate) has a higher armor value than 3, which is the armor value for the leather chestplate armor item.

</details>

### `origins:component`

Checks a specific data component value.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `component` | [Identifier](../basic_concepts#identifier) | **required** | Data component ID |
| `value` | NBT | optional | Expected value |

### `origins:durability`

Checks the item's current durability.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `comparison` | [String](../basic_concepts#string) | **required** | Comparison operator |
| `compare_to` | [Integer](../basic_concepts#integer) | **required** | Durability to compare against |


<details>
<summary>Example</summary>

```json
"item_condition": {
    "type": "origins:durability",
    "comparison": "<=",
    "compare_to": 100
}
```

This example will check if the item has a durability value of 100 or less.

</details>

### `origins:empty`

Checks if the item stack is empty.

### `origins:enchantable`

Checks if the item can be enchanted.


### `origins:food`

Checks if the item is a food item.

### `origins:fuel`


<details>
<summary>Example</summary>

Checks if the item can be used as furnace fuel.

```json
"item_condition": {
    "type": "origins:fuel",
    "comparison": ">=",
    "compare_to": 10
}
```

This example will check if the item fuel time value of 10 or more.

</details>

### `origins:has_component`

Checks if the item has a specific data component.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `component` | [Identifier](../basic_concepts#identifier) | **required** | Data component ID |

### `origins:has_power`

Checks if the item has a specific power (from Origins items).

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `power` | [Identifier](../basic_concepts#identifier) | **required** | Power ID |


<details>
<summary>Example</summary>

```json
"item_condition": {
    "type": "origins:has_power",
    "power": "origins:water_breathing"
}
```

This example will check if the item has Merling's Gills *(`origins:water_breathing`)* power embedded to it.

</details>

### `origins:ingredient`

Checks if the item matches an ingredient (item, tag, or list).

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `ingredient` | [Ingredient] | **required** | Item, tag, or List of items/tags |

Ingredient format: `{"item": "minecraft:diamond"}` or `{"tag": "minecraft:planks"}` or `[{"item": "..."}, {"tag": "..."}]`

<details>
<summary>Example</summary>

```json
"item_condition": {
  "type": "origins:ingredient",
  "ingredient": {
    "tag": "minecraft:wool"
  }
}
```

An ingredient which matches a diamond.

</details>

### `origins:in_tag`

Checks if the item is in an item tag.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `tag` | [Identifier](../basic_concepts#identifier) | **required** | Item tag ID |

<details>
<summary>Example</summary>

```json
"item_condition": {
  "type": "origins:in_tag",
  "tag": "origins:meat"
}
```

This example will check if the armor item (in this context, a chestplate) has a higher armor value than 3, which is the armor value for the leather chestplate armor item.

</details>

### `origins:is_damageable`

Checks if the item is damageable (i.e. has durability).

### `origins:is_equipable`

Checks if the item can be equipped in a specific slot.

### `origins:power_count`

Checks the number of powers the item has.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `comparison` | [String](../basic_concepts#string) | **required** | Comparison operator |
| `compare_to` | [Integer](../basic_concepts#integer) | **required** | Value to compare against |


<details>
<summary>Example</summary>

```json
"item_condition": {
    "type": "origins:power_count",
    "comparison": ">",
    "compare_to": 0
}
```

This example will check if the item has more than 0 powers embedded in it.

</details>

### `origins:relative_durability`

Checks the item's durability as a percentage.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `comparison` | [String](../basic_concepts#string) | **required** | Comparison operator |
| `compare_to` | [Float](../basic_concepts#float) | **required** | Percentage (0-1) to compare against |


<details>
<summary>Example</summary>

```json
"item_condition": {
    "type": "origins:relative_durability",
    "comparison": ">=",
    "compare_to": 0.9
}
```

This example will check if the item has a 90% durability or greater.

</details>

### `origins:smeltable`

Checks if the item can be smelted in a furnace. (i.e. has a furnace recipe)

### `origins:tool_ability`

Checks if the item is the correct tool for a specific block-mining ability.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `ability` | [String](../basic_concepts#string) | **required** | Tool ability name |

---

## Meta Conditions

### `origins:and`

All conditions must be true.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `conditions` | List of [Item Condition](../condition/item_condition_types) | **required** | Conditions to evaluate |

### `origins:or`

At least one condition must be true.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `conditions` | List of [Item Condition](../condition/item_condition_types) | **required** | Conditions to evaluate |

### `origins:not`

Inverts a condition.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `condition` | [Item Condition](../condition/item_condition_types) | **required** | Condition to invert |

### `origins:chance`

Random chance.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `chance` | [Float](../basic_concepts#float) | **required** | Probability (0-1) |

### `origins:constant`

Always true or false.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `value` | [Boolean](../basic_concepts#boolean) | `true` | Constant value |
