---
title: "Damage condition"
sidebar_position: 5
---

# Damage condition

Checks the damage source, damage amount and related entities. Embedded in DamageCondition fields.

### `saturn:amount_range` {#saturnamount_range}

Checks whether the damage amount is between min and max, inclusive.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:amount_range` |
| `min` | [Number provider](../number.md) | yes | — | Lower bound. |
| `max` | [Number provider](../number.md) | yes | — | Upper bound. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:amount_range",
  "min": 1,
  "max": 1
}
```

</details>

### `saturn:damage_type` {#saturndamage_type}

Checks the type of the damage source.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:damage_type` |
| `damage_type` | Resource ID | yes | — | A vanilla damage type ID. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:damage_type",
  "damage_type": "minecraft:generic"
}
```

</details>

### `saturn:damage_type_tag` {#saturndamage_type_tag}

Checks whether the damage type belongs to the given tag.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:damage_type_tag` |
| `tag` | Tag ID (without #) | yes | — | A registry tag, or the NBT data declared by this page. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:damage_type_tag",
  "tag": "example:tag"
}
```

</details>

### `saturn:directness` {#saturndirectness}

Checks whether the damage is direct damage.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:directness` |
| `direct` | Boolean | no | `true` | true requires direct damage, false requires indirect damage. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:directness"
}
```

</details>

### `saturn:fire` {#saturnfire}

Checks whether the damage source is fire damage.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:fire` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:fire"
}
```

</details>

### `saturn:magic` {#saturnmagic}

Checks whether the damage source is magic damage.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:magic` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:magic"
}
```

</details>

### `saturn:projectile` {#saturnprojectile}

Checks whether the damage comes from a projectile matching the type or condition.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:projectile` |
| `projectile` | Resource ID | no | omitted | Projectile entity type ID. |
| `projectile_condition` | [Entity condition](./entity-condition.md) | no | `{"type":"saturn:always"}` | Condition applied to the projectile entity. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:projectile"
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
| `condition` | [Damage condition](./damage-condition.md) | yes | — | The condition to check. |

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
