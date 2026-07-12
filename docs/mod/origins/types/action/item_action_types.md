# Item Action Types

Item actions perform operations on an item stack.

### `origins:add_enchantment`

Adds enchantments to the item.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `enchantment` | Enchantment->int Map | **required** | Enchantment ID to add |
| `override` | [Boolean](../basic_concepts#boolean) | `false` | Whether to force override existing enchantments |


<details>
<summary>Example</summary>

```json
"item_action": {
    "type": "origins:add_enchantment",
    "enchantment": {
        "minecraft:sharpness": 5
    }
}
```

This example will add the Sharpness enchantment with a level of 5 to the item.

</details>

### `origins:damage`

### `origins:consume`

Consumes one or more items from the stack.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `amount` | [Integer](../basic_concepts#integer) | `1` | Amount to consume |

<details>
<summary>Example</summary>

```json
"item_action": {
    "type": "origins:consume",
    "amount": 1
}
```

This example will "consume" (remove) 1 item from the item stack.

</details>

### `origins:damage`

Damages the item stack.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `amount` | [Integer](../basic_concepts#integer) | `1` | Damage amount |
| `ignore_unbreaking` | [Boolean](../basic_concepts#boolean) | `false` | Whether to ignore the Unbreaking enchantment |

### `origins:holder_action`

Executes an entity action on the item's holder.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `action` | [Entity Action](../action/entity_action_types) | **required** | Action to execute |

### `origins:merge_component`

Merges a data component into the item stack.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `component` | NBT | **required** | Data component to merge |

### `origins:modify`

Modifies the item stack.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `modifier` | [Modifier] | **required** | Value modifier |
| `item_action` | [Item Action](../action/item_action_types) | optional | Nested action |


<details>
<summary>Example</summary>

```json
"item_action": {
    "type": "origins:modify",
    "modifier": "example:stuff"
}
```

This example will apply the `example:stuff` (`data/example/item_modifiers/stuff.json`) item modifier to the item stack.

</details>

### `origins:remove_enchantment`

Removes an enchantment from the item.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `enchantment` | [Identifier](../basic_concepts#identifier) | optional | Enchantment ID to remove (all if not specified) |


<details>
<summary>Example</summary>

```json
"item_action": {
    "type": "origins:remove_enchantment",
    "enchantment": "minecraft:mending",
    "reset_repair_cost": true
}
```

This example will remove the Mending enchantment from the item whilst resetting its 'repair cost'.

</details>
