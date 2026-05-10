# Item Action Types

Item actions perform operations on an item stack.

## Built-in Actions

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

---

## Meta Actions

### `origins:and`

Executes multiple item actions in sequence.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `actions` | List of [Item Action](../action/item_action_types) | **required** | Actions to execute |

### `origins:chance`

Executes with a probability.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `action` | [Item Action](../action/item_action_types) | **required** | Action to execute |
| `chance` | [Float](../basic_concepts#float) | **required** | Chance (0-1) |
| `fail_action` | [Item Action](../action/item_action_types) | optional | Action if chance fails |

### `origins:choice`

Selects from a weighted list.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `actions` | List of WeightedAction | **required** | Weighted action list |

### `origins:delay`

Delays execution.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `action` | [Item Action](../action/item_action_types) | **required** | Action |
| `ticks` | [Integer](../basic_concepts#integer) | **required** | Delay in ticks |

### `origins:if_else`

Conditional execution.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `condition` | [Item Condition](../condition/item_condition_types) | **required** | Condition |
| `if_action` | [Item Action](../action/item_action_types) | optional | Action if true |
| `else_action` | [Item Action](../action/item_action_types) | optional | Action if false |

### `origins:if_else_list`

Evaluates condition-action pairs.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `actions` | List of IfElseEntry | **required** | Condition-action pairs |

### `origins:side`

Executes on a specific side.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `action` | [Item Action](../action/item_action_types) | **required** | Action |
| `side` | [String](../basic_concepts#string) | **required** | `client` or `server` |
