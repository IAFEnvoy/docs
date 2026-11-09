# Fluid Condition Types

Fluid conditions check properties of fluids at a position.

### `origins:empty`

Checks if there is no fluid at the position.

### `origins:in_tag`

Checks if the fluid is in a fluid tag.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `tag` | [Identifier](../basic_concepts#identifier) | **required** | Fluid tag ID |

### `origins:still`

Checks whether this state describes a still (i.e. not flowing, i.e. source) fluid.
