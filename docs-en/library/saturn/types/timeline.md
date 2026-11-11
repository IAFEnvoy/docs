---
title: "Timeline node"
sidebar_position: 15
---

# Timeline node

A timeline node only describes the behavior of this step. Node IDs, successors and the whole timeline are assembled by the consumer; it is not a standalone dynamic registry.

### `saturn:action` {#saturnaction}

Runs an entity action inside a timeline.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:action` |
| `action` | [Entity action](./action/entity-action.md) | yes | — | The sub-action to run; its kind must match what this field expects. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:action",
  "action": {
    "type": "saturn:no_op"
  }
}
```

</details>

### `saturn:branch` {#saturnbranch}

Chooses the next path inside a timeline based on a condition.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:branch` |
| `condition` | [Entity condition](./condition/entity-condition.md) | yes | — | The condition to check. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:branch",
  "condition": {
    "type": "saturn:always"
  }
}
```

</details>

### `saturn:idle` {#saturnidle}

Waits for the given number of ticks inside a timeline.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:idle` |
| `duration` | [Number provider](./number.md) | yes | — | Duration, usually in game ticks. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:idle",
  "duration": 1
}
```

</details>

### `saturn:wait_for` {#saturnwait_for}

Waits until an entity condition holds, with an optional timeout and timeout result.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:wait_for` |
| `condition` | [Entity condition](./condition/entity-condition.md) | yes | — | The condition to check. |
| `timeout` | [Number provider](./number.md) | no | omitted | Optional timeout in ticks; when omitted, no timeout is set. |
| `on_timeout` | Enum string | no | `"fail"` | Timeline result used when the timeout is reached. Available values: `fail`, `finish`. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:wait_for",
  "condition": {
    "type": "saturn:always"
  }
}
```

</details>
