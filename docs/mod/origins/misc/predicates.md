# Predicates

Predicates are conditions that can be used in data pack files such as advancements, loot tables, and `predicate` files.

### `origins:origin`

Checks if the player has the specified origin.

### Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `origin` | [Identifier](../types/basic_concepts#identifier) | | The namespace and ID of the origin to check for. |
| `layer` | [Identifier](../types/basic_concepts#identifier) | *optional* | If specified, checks if the specified origin is from this origin layer. |

<details>
<summary>Example1</summary>

```json
{
    "condition": "origins:origin",
    "origin": "origins:human"
}
```

This example will check if the player has the `origins:human` origin.

</details>

<details>
<summary>Example2</summary>

```json
{
    "condition": "origins:origin",
    "origin": "origins:phantom",
    "layer": "origins:origin"
}
```

This example will check if the player has the `origins:phantom` origin in the `origins:origin` origin layer.

</details>

### `origins:power`

Checks if the entity has the specified power.

### Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `power` | [Identifier](../types/basic_concepts#identifier) | | The namespace and ID of the power to check for. |
| `source` | [Identifier](../types/basic_concepts#identifier) | *optional* | If specified, checks if the specified power is from this power source. |

<details>
<summary>Example1</summary>

```json
{
    "condition": "origins:power",
    "power": "origins:arcane_skin"
}
```

This example will check if the player has the `origins:arcane_skin` power.

</details>

<details>
<summary>Example2</summary>

```json
{
    "condition": "origins:power",
    "power": "origins:water_breathing",
    "source": "origins:merling"
}
```

This example will check if the player has the `origins:water_breathing` power from the `origins:merling` power source.

</details>

