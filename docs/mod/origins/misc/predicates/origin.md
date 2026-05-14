# Origin (Predicate)

Checks if the player has the specified origin.

**Type ID:** `origins:origin`

### Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `origin` | [Identifier](../../types/basic_concepts#identifier) | | The namespace and ID of the origin to check for. |
| `layer` | [Identifier](../../types/basic_concepts#identifier) | *optional* | If specified, checks if the specified origin is from this origin layer. |

### Examples

```json
{
    "condition": "origins:origin",
    "origin": "origins:human"
}
```

This example will check if the player has the `origins:human` origin.

```json
{
    "condition": "origins:origin",
    "origin": "origins:phantom",
    "layer": "origins:origin"
}
```

This example will check if the player has the `origins:phantom` origin in the `origins:origin` origin layer.
