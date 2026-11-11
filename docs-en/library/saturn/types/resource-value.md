---
title: "Resource value"
sidebar_position: 14
---

# Resource value

Reads a value in the resource context; it does not add or deduct resources.

### `saturn:constant` {#saturnconstant}

Ignores the current resource and returns the defined fixed value.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:constant` |
| `value` | [Number provider](./number.md) | yes | — | Value or expression used by this type. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:constant",
  "value": 1
}
```

</details>

### `saturn:current` {#saturncurrent}

Reads the current value of the resource.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:current` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:current"
}
```

</details>

### `saturn:max` {#saturnmax}

Reads the maximum value of the resource.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:max` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:max"
}
```

</details>

## Meta types

These types do not test a concrete value themselves; they combine or delegate other types of the same kind and are embedded in the same fields.

### `saturn:js` {#saturnjs}

Calls a callback registered by KubeJS and passes the params argument.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:js` |
| `id` | String | yes | — | Identifier of the callback, option or entry. |
| `params` | Object | no | `{}` | Parameter object passed to the script or formula. |

Registered only when KubeJS is installed. JSON only selects an existing callback; it never executes a JavaScript string inside the JSON.

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

### `saturn:missing` {#saturnmissing}

Returns `max(0, resource maximum − current value)`; it is not a missing or error marker.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:missing` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:missing"
}
```

</details>
