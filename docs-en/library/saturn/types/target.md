---
title: "Target selector"
sidebar_position: 13
---

# Target selector

Used in an ability's target_selector. After the selector has gathered candidates, the ability still checks target_condition.

### `saturn:area` {#saturnarea}

Selects targets within a radius, with optional control over the count and the ordering.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:area` |
| `radius` | [Number provider](./number.md) | yes | — | Radius in blocks; in a resource bar it is in pixels. |
| `include_actor` | Boolean | no | `false` | Whether to include the actor themselves as a candidate target. |
| `limit` | Integer | no | `0` | Upper limit on the number of targets; 0 means no limit here. |
| `order` | Enum string | no | `"nearest"` | nearest, farthest or random. Available values: `nearest`, `farthest`, `random`. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:area",
  "radius": 1
}
```

</details>

### `saturn:cone` {#saturncone}

Selects targets within a view cone of the given length and angle.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:cone` |
| `length` | [Number provider](./number.md) | yes | — | Length of the selection range, in blocks. |
| `angle` | [Number provider](./number.md) | yes | — | Angle of the cone selection. |
| `include_actor` | Boolean | no | `false` | Whether to include the actor themselves as a candidate target. |
| `limit` | Integer | no | `0` | Upper limit on the number of targets; 0 means no limit here. |
| `order` | Enum string | no | `"nearest"` | nearest, farthest or random. Available values: `nearest`, `farthest`, `random`. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:cone",
  "length": 1,
  "angle": 1
}
```

</details>

### `saturn:ray` {#saturnray}

Selects entities near a ray along the user's facing direction.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:ray` |
| `length` | [Number provider](./number.md) | yes | — | Length of the selection range, in blocks. |
| `radius` | [Number provider](./number.md) | no | `0.5` | Radius in blocks; in a resource bar it is in pixels. |
| `include_actor` | Boolean | no | `false` | Whether to include the actor themselves as a candidate target. |
| `limit` | Integer | no | `0` | Upper limit on the number of targets; 0 means no limit here. |
| `order` | Enum string | no | `"nearest"` | nearest, farthest or random. Available values: `nearest`, `farthest`, `random`. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:ray",
  "length": 1
}
```

</details>

### `saturn:self` {#saturnself}

Targets the user themselves.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:self` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:self"
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

Registered only when KubeJS is installed. JSON only selects an existing callback; it never executes a JavaScript string inside the JSON directly.

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
