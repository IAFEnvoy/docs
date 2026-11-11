---
title: "Bi-entity condition"
sidebar_position: 2
---

# Bi-entity condition

Checks the relationship between the actor and the target. Swapping the two sides changes the meaning of some conditions.

### `saturn:can_see` {#saturncan_see}

Checks the line of sight between the two sides with a block and fluid ray.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:can_see` |
| `shape_type` | Object | no | `"visual"` | Block shape mode used by the line-of-sight ray. Available values: `collider`, `outline`, `visual`, `falldamage_resetting`. |
| `fluid_handling` | Object | no | `"none"` | How the line-of-sight ray handles fluids. Available values: `none`, `source_only`, `any`, `water`. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:can_see"
}
```

</details>

### `saturn:distance` {#saturndistance}

Checks whether the distance between the actor and the target is within the maximum.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:distance` |
| `maximum` | [Number provider](../number.md) | yes | — | The maximum value, or upper bound. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:distance",
  "maximum": 1
}
```

</details>

### `saturn:relation` {#saturnrelation}

Checks whether the actor and the target are allied to each other.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:relation` |
| `allied` | Boolean | no | `true` | Expected alliance state. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:relation"
}
```

</details>

### `saturn:relative_rotation` {#saturnrelative_rotation}

Compares the rotation difference between the actor and the target on the given axes.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:relative_rotation` |
| `axis` | Array of enum strings | no | `["x","y","z"]` | Rotation axes included in the calculation. Available values: `x`, `y`, `z`. |
| `actor_rotation` | Enum string | no | `"head"` | Whether the actor uses head or body rotation. Available values: `head`, `body`. |
| `target_rotation` | Enum string | no | `"body"` | Whether the target uses head or body rotation. Available values: `head`, `body`. |
| `comparison` | Enum string | yes | — | One of `==`, `!=`, `<`, `<=`, `>`, `>=`. |
| `compare_to` | Number | yes | — | The target number to compare against. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:relative_rotation",
  "comparison": ">=",
  "compare_to": 1
}
```

</details>

### `saturn:riding_recursive` {#saturnriding_recursive}

Checks multi-level riding relationships.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:riding_recursive` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:riding_recursive"
}
```

</details>

### `saturn:same_team` {#saturnsame_team}

Checks whether the actor and the target are on the same team.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:same_team` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:same_team"
}
```

</details>

### `saturn:team` {#saturnteam}

Reads or checks the scoreboard team of the entity.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:team` |
| `same_team` | Boolean | no | `true` | true requires the same team, false requires different teams. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:team"
}
```

</details>

## Meta types

These types do not test a concrete value themselves; they combine or delegate other types of the same kind and are embedded in the same fields.

### `saturn:actor_condition` {#saturnactor_condition}

Lets the actor be checked by an entity condition.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:actor_condition` |
| `condition` | [Entity condition](./entity-condition.md) | yes | — | The condition to check. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:actor_condition",
  "condition": {
    "type": "saturn:always"
  }
}
```

</details>

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
| `conditions` | Array of conditions of the same kind | yes | — | List of sub-conditions of the same kind. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:and",
  "conditions": []
}
```

</details>

### `saturn:both` {#saturnboth}

Checks the same entity condition against both the actor and the target; matches only when both hold.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:both` |
| `condition` | [Entity condition](./entity-condition.md) | yes | — | The condition to check. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:both",
  "condition": {
    "type": "saturn:always"
  }
}
```

</details>

### `saturn:chance` {#saturnchance}

Decides whether the check succeeds based on a given chance.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:chance` |
| `chance` | Number | yes | — | Hit chance; 0 never matches, 1 always matches. Codec range: `0.0D, 1.0D`. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:chance",
  "chance": 1
}
```

</details>

### `saturn:either` {#saturneither}

Checks the same entity condition against the actor and the target; matches when at least one side holds.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:either` |
| `condition` | [Entity condition](./entity-condition.md) | yes | — | The condition to check. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:either",
  "condition": {
    "type": "saturn:always"
  }
}
```

</details>

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

### `saturn:mutual` {#saturnmutual}

Requires the bi-entity condition to hold both in the original order and with the actor and target swapped.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:mutual` |
| `condition` | [Bi-entity condition](./bientity-condition.md) | yes | — | The condition to check. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:mutual",
  "condition": {
    "type": "saturn:always"
  }
}
```

</details>

### `saturn:never` {#saturnnever}

The condition is always false.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:never` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:never"
}
```

</details>

### `saturn:not` {#saturnnot}

Inverts the match result of the sub-condition.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:not` |
| `condition` | [Bi-entity condition](./bientity-condition.md) | yes | — | The condition to check. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:not",
  "condition": {
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
| `conditions` | Array of conditions of the same kind | yes | — | List of sub-conditions of the same kind. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:or",
  "conditions": []
}
```

</details>

### `saturn:target_condition` {#saturntarget_condition}

Lets the target be checked by an entity condition.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:target_condition` |
| `condition` | [Entity condition](./entity-condition.md) | yes | — | The condition to check. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:target_condition",
  "condition": {
    "type": "saturn:always"
  }
}
```

</details>

### `saturn:undirected` {#saturnundirected}

Matches if the original order or the swapped actor and target order matches once.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:undirected` |
| `condition` | [Bi-entity condition](./bientity-condition.md) | yes | — | The condition to check. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:undirected",
  "condition": {
    "type": "saturn:always"
  }
}
```

</details>
