---
title: "Resource bar visibility"
sidebar_position: 18
---

# Resource bar visibility

Used for ResourceBar.visibility; decides whether the bar is shown in the resource bar context.

### `saturn:non_full` {#saturnnon_full}

Shown while the current resource is below its maximum.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:non_full` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:non_full"
}
```

</details>

### `saturn:non_zero` {#saturnnon_zero}

Shown while the current resource is not zero.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:non_zero` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:non_zero"
}
```

</details>

### `saturn:recently_changed` {#saturnrecently_changed}

Keeps the bar shown for the given number of ticks after the resource changes.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:recently_changed` |
| `hold_ticks` | Integer | no | `60` | Number of ticks the bar stays shown after a change. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:recently_changed"
}
```

</details>

### `saturn:resource_range` {#saturnresource_range}

Shown while the current resource is within the given range.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:resource_range` |
| `min` | Number | yes | — | Lower bound. |
| `max` | Number | yes | — | Upper bound. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:resource_range",
  "min": 1,
  "max": 1
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
| `values` | Array of [Resource bar visibility](./bar-visibility.md) | yes | — | List of sub-values or sub-expressions. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:and",
  "values": {
    "type": "saturn:always"
  }
}
```

</details>

### `saturn:not` {#saturnnot}

Inverts the match result of the sub-condition.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:not` |
| `value` | [Resource bar visibility](./bar-visibility.md) | yes | — | The value or expression used by this type. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:not",
  "value": {
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
| `values` | Array of [Resource bar visibility](./bar-visibility.md) | yes | — | List of sub-values or sub-expressions. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:or",
  "values": {
    "type": "saturn:always"
  }
}
```

</details>
