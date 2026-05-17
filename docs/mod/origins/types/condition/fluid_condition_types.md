# Fluid Condition Types

Fluid conditions check properties of fluids at a position.

## Built-in Conditions

### `origins:empty`

Checks if there is no fluid at the position.

### `origins:in_tag`

Checks if the fluid is in a fluid tag.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `tag` | [Identifier](../basic_concepts#identifier) | **required** | Fluid tag ID |

### `origins:still`

Checks whether this state describes a still (i.e. not flowing, i.e. source) fluid.

---

## Meta Conditions

### `origins:and`

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `conditions` | List of [Fluid Condition](../condition/fluid_condition_types) | **required** | Conditions |

### `origins:or`

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `conditions` | List of [Fluid Condition](../condition/fluid_condition_types) | **required** | Conditions |

### `origins:not`

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `condition` | [Fluid Condition](../condition/fluid_condition_types) | **required** | Condition to invert |

### `origins:chance`

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `chance` | [Float](../basic_concepts#float) | **required** | Probability (0-1) |

### `origins:constant`

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `value` | [Boolean](../basic_concepts#boolean) | `true` | Constant value |
