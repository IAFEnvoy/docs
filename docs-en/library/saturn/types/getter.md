---
title: "Entity getter"
sidebar_position: 22
---

# Entity getter

The full set of EntityValueGetter parameters determines the query identity. It reads only the passed view or an already captured snapshot; a missing value is not the same as a known 0, false, or empty collection.

### `saturn:abilities` {#saturnabilities}

Reads the ability information the entity holds.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:abilities` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:abilities"
}
```

</details>

### `saturn:absorption` {#saturnabsorption}

Reads the entity's absorption health.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:absorption` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:absorption"
}
```

</details>

### `saturn:advancements` {#saturnadvancements}

Reads the captured player advancement information.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:advancements` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:advancements"
}
```

</details>

### `saturn:air` {#saturnair}

Reads the entity's remaining air.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:air` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:air"
}
```

</details>

### `saturn:attribute` {#saturnattribute}

Reads the base or effective value of the given attribute from the captured attributes.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:attribute` |
| `attribute` | Resource ID | yes | — | Attribute ID. |
| `value` | Enum string | no | `"effective"` | Projection field to read; this is not an information expression. Available values: `base`, `effective`. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:attribute",
  "attribute": "minecraft:max_health",
  "value": "effective"
}
```

</details>

### `saturn:attributes` {#saturnattributes}

Reads the captured attribute list.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:attributes` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:attributes"
}
```

</details>

### `saturn:carried_item` {#saturncarried_item}

Reads the item the player currently carries on the cursor.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:carried_item` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:carried_item"
}
```

</details>

### `saturn:effect` {#saturneffect}

Reads the amplifier or duration of the given mob effect.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:effect` |
| `effect` | Resource ID | yes | — | Mob effect ID. |
| `value` | Enum string | no | `"amplifier"` | Selects the projected field to read; it is not an information expression. Available values: `amplifier`, `duration`. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:effect",
  "effect": "minecraft:speed",
  "value": "amplifier"
}
```

</details>

### `saturn:effects` {#saturneffects}

Reads the entity's current list of mob effects.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:effects` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:effects"
}
```

</details>

### `saturn:ender_chest` {#saturnender_chest}

Reads the captured contents of the player's ender chest.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:ender_chest` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:ender_chest"
}
```

</details>

### `saturn:equipment` {#saturnequipment}

Reads the entity's equipment slot information.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:equipment` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:equipment"
}
```

</details>

### `saturn:experience` {#saturnexperience}

Reads the player's experience points, level and progress.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:experience` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:experience"
}
```

</details>

### `saturn:food` {#saturnfood}

Reads the player's food level, saturation and exhaustion.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:food` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:food"
}
```

</details>

### `saturn:game_mode` {#saturngame_mode}

Reads the player's game mode.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:game_mode` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:game_mode"
}
```

</details>

### `saturn:health` {#saturnhealth}

Reads the entity's current health.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:health` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:health"
}
```

</details>

### `saturn:inventory` {#saturninventory}

Reads the captured contents of the player's inventory.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:inventory` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:inventory"
}
```

</details>

### `saturn:location` {#saturnlocation}

Reads the entity's position and dimension.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:location` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:location"
}
```

</details>

### `saturn:max_health` {#saturnmax_health}

Reads the entity's max health.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:max_health` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:max_health"
}
```

</details>

### `saturn:profile` {#saturnprofile}

Reads the player's UUID and name.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:profile` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:profile"
}
```

</details>

### `saturn:resource` {#saturnresource}

Reads the current value or bounds of the given resource from the captured resources.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:resource` |
| `resource` | Resource ID | yes | — | A registered Saturn resource ID. |
| `value` | Enum string | no | `"current"` | Selects the projected field to read; it is not an information expression. Available values: `current`, `minimum`, `maximum`. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:resource",
  "resource": "example:mana",
  "value": "current"
}
```

</details>

### `saturn:resources` {#saturnresources}

Reads the captured Saturn resource list.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:resources` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:resources"
}
```

</details>

### `saturn:score` {#saturnscore}

Reads the score of the given objective.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:score` |
| `objective` | String | yes | — | Scoreboard objective name. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:score",
  "objective": "kills"
}
```

</details>

### `saturn:scores` {#saturnscores}

Reads the captured scoreboard scores.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:scores` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:scores"
}
```

</details>

### `saturn:selected_slot` {#saturnselected_slot}

Reads the hotbar slot the player currently has selected.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:selected_slot` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:selected_slot"
}
```

</details>

### `saturn:statistics` {#saturnstatistics}

Reads the captured player statistics.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:statistics` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:statistics"
}
```

</details>

### `saturn:team` {#saturnteam}

Reads the captured scoreboard team information.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:team` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:team"
}
```

</details>
