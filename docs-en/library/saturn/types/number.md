---
title: "Number provider"
sidebar_position: 12
---

# Number provider

A NumberProvider can be written as a number, a formula string, or an object with a `type` from this section. Game-time fields default to ticks; 20 ticks is usually one second.

### `saturn:binomial` {#saturnbinomial}

Generates a binomial random value from n trials and a per-trial probability p.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:binomial` |
| `n` | Number provider | yes | — | Number of trials in the binomial distribution. |
| `p` | Number provider | yes | — | Per-trial success probability of the binomial distribution. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:binomial",
  "n": 4,
  "p": 0.5
}
```

</details>

### `saturn:conditional` {#saturnconditional}

Checks entity conditions in order and uses the value of the first matching branch.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:conditional` |
| `branches` | Array of branch objects | no | `[]` | Ordered conditional branches; each entry contains condition and value. |
| `fallback` | Number or formula string | no | omitted | Fallback value used when there is no matching or known value. |

#### branches entries

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `condition` | Entity condition | yes | — | Checked in order; the first matching branch takes effect. |
| `value` | Number provider | yes | — | Value of this branch. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:conditional",
  "branches": [
    {
      "condition": {
        "type": "saturn:sneaking"
      },
      "value": 2
    }
  ],
  "fallback": 1
}
```

</details>

### `saturn:constant` {#saturnconstant}

Returns the fixed value in the definition.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:constant` |
| `value` | Number | yes | — | The value or expression used by this type. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:constant",
  "value": 1
}
```

</details>

### `saturn:context_variable` {#saturncontext_variable}

Reads a context or registered formula variable; unknown variables can use a fallback value.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:context_variable` |
| `variable` | String | yes | — | Formula variable name that is registered or present in the context. |
| `fallback` | Number | no | `0.0` | Fallback value used when there is no matching or known value. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:context_variable",
  "variable": "health",
  "fallback": 0
}
```

</details>

### `saturn:expression` {#saturnexpression}

Evaluates an exp4j expression; params can override expression parameters.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:expression` |
| `expression` | String | yes | — | exp4j formula string. |
| `params` | String | no | `{}` | Parameter object passed to the script or formula. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:expression",
  "expression": "base + 2",
  "params": {
    "base": 8
  }
}
```

</details>

### `saturn:sum` {#saturnsum}

Sums multiple number providers.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:sum` |
| `summands` | Array of [number providers](./number.md) | yes | — | Number providers to sum, at least one entry. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:sum",
  "summands": [
    2,
    3
  ]
}
```

</details>

### `saturn:uniform` {#saturnuniform}

Samples uniformly between the given minimum and maximum.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:uniform` |
| `min` | [Number provider](./number.md) | yes | — | Lower bound. |
| `max` | [Number provider](./number.md) | yes | — | Upper bound. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:uniform",
  "min": 1,
  "max": 5
}
```

</details>

### `saturn:weighted_list` {#saturnweighted_list}

Picks a value from the distribution entries by weight.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:weighted_list` |
| `distribution` | Array of weighted entries (value, weight) | yes | — | Weighted entry array; each entry contains a value and a weight. |

Each entry contains a number provider `value` and an integer `weight`; the default weight is 1. The list must have at least one entry, negative weights are treated as 0, and when the total weight is not positive a diagnostic is logged and 0 is returned.

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:weighted_list",
  "distribution": [
    {
      "value": 1,
      "weight": 3
    },
    {
      "value": 5,
      "weight": 1
    }
  ]
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
