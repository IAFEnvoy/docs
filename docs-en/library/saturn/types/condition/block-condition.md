---
title: "Block condition"
sidebar_position: 3
---

Checks the block or environment at the context position. Embedded in BlockCondition fields.

## Types

### `saturn:adjacent` {#saturnadjacent}

Counts how many adjacent positions satisfy a block condition.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:adjacent` |
| `adjacent_condition` | [Block condition](./block-condition.md) | yes | — | Filter condition applied to adjacent blocks. |
| `comparison` | Enum string | yes | — | One of `==`, `!=`, `<`, `<=`, `>`, `>=`. |
| `compare_to` | Number | yes | — | The target number to compare against. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:adjacent",
  "adjacent_condition": {
    "type": "saturn:always"
  },
  "comparison": ">=",
  "compare_to": 1
}
```

</details>

### `saturn:air` {#saturnair}

Checks whether the block is air.

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

### `saturn:attachable` {#saturnattachable}

Checks whether any adjacent block face can support an attachment at this position.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:attachable` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:attachable"
}
```

</details>

### `saturn:biome_tag` {#saturnbiome_tag}

Checks whether the biome at the current position belongs to the given tag.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:biome_tag` |
| `tag` | Tag ID (with #) | yes | — | Registry tag, or the NBT data declared on this page. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:biome_tag",
  "tag": "#example:tag"
}
```

</details>

### `saturn:blast_resistance` {#saturnblast_resistance}

Compares the blast resistance of the block.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:blast_resistance` |
| `comparison` | Enum string | yes | — | One of `==`, `!=`, `<`, `<=`, `>`, `>=`. |
| `compare_to` | Number | yes | — | The target number to compare against. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:blast_resistance",
  "comparison": ">=",
  "compare_to": 1
}
```

</details>

### `saturn:block_entity` {#saturnblock_entity}

Checks whether a block entity exists at the target position.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:block_entity` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:block_entity"
}
```

</details>

### `saturn:block_id` {#saturnblock_id}

Checks whether the block at the current position is the given type.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:block_id` |
| `block` | Resource ID | yes | — | Block ID or block argument. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:block_id",
  "block": "minecraft:stone"
}
```

</details>

### `saturn:block_state` {#saturnblock_state}

Checks a boolean, serialized enum value or integer comparison of a block property.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:block_state` |
| `property` | String | yes | — | Block state property name. |
| `value` | Boolean | no | omitted | The boolean result, or the expected/new boolean block property value. |
| `enum` | String | no | omitted | Serialized property name, such as north or bottom. |
| `comparison` | Enum string | no | omitted | Comparison operator: `==`, `!=`, `<`, `<=`, `>` or `>=`. |
| `compare_to` | Number | no | omitted | Numeric comparison target, used with comparison. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:block_state",
  "property": "age",
  "comparison": ">=",
  "compare_to": 7
}
```

</details>

Use `value` for booleans, `enum` for enum properties, and both `comparison` and `compare_to` for integers. Wrong types, incomplete fields or missing properties return false.

### `saturn:block_tag` {#saturnblock_tag}

Checks whether the block belongs to the given tag.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:block_tag` |
| `tag` | Tag ID (with #) | yes | — | Registry tag, or the NBT data declared on this page. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:block_tag",
  "tag": "#minecraft:logs"
}
```

</details>

### `saturn:exposed_to_sky` {#saturnexposed_to_sky}

Checks whether the target block position can see the sky.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:exposed_to_sky` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:exposed_to_sky"
}
```

</details>

### `saturn:fluid` {#saturnfluid}

Checks whether the block’s fluid state matches the exact registered fluid.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:fluid` |
| `fluid` | Resource ID | yes | — | Registered fluid ID. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:fluid",
  "fluid": "minecraft:water"
}
```

</details>

### `saturn:hardness` {#saturnhardness}

Compares the hardness of the context block.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:hardness` |
| `comparison` | Enum string | yes | — | One of `==`, `!=`, `<`, `<=`, `>`, `>=`. |
| `compare_to` | Number | yes | — | The target number to compare against. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:hardness",
  "comparison": ">=",
  "compare_to": 1
}
```

</details>

### `saturn:height` {#saturnheight}

Compares the Y coordinate of the block position.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:height` |
| `comparison` | Enum string | yes | — | One of `==`, `!=`, `<`, `<=`, `>`, `>=`. |
| `compare_to` | Number | yes | — | The target number to compare against. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:height",
  "comparison": ">=",
  "compare_to": 1
}
```

</details>

### `saturn:in_rain` {#saturnin_rain}

Checks whether the target is exposed to rain at its current location.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:in_rain` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:in_rain"
}
```

</details>

### `saturn:in_snow` {#saturnin_snow}

Checks whether the target is exposed to snow at its current position.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:in_snow` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:in_snow"
}
```

</details>

### `saturn:in_thunderstorm` {#saturnin_thunderstorm}

Checks whether the target is exposed to rain during a thunderstorm.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:in_thunderstorm` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:in_thunderstorm"
}
```

</details>

### `saturn:light_blocking` {#saturnlight_blocking}

Checks whether the block state can occlude light.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:light_blocking` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:light_blocking"
}
```

</details>

### `saturn:light_level` {#saturnlight_level}

Compares the light level of the given light layer.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:light_level` |
| `light_type` | Object | no | omitted | Light layer, sky or block. Available values: `sky`, `block`. |
| `comparison` | Enum string | yes | — | One of `==`, `!=`, `<`, `<=`, `>`, `>=`. |
| `compare_to` | Number | yes | — | The target number to compare against. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:light_level",
  "comparison": ">=",
  "compare_to": 8,
  "light_type": "sky"
}
```

</details>

### `saturn:movement_blocking` {#saturnmovement_blocking}

Checks whether the block blocks movement.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:movement_blocking` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:movement_blocking"
}
```

</details>

### `saturn:nbt` {#saturnnbt}

Matches a subset of the target’s saved NBT, including subset matching for lists.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:nbt` |
| `nbt` | NBT object | yes | — | NBT subset to match, expressed as a JSON object. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:nbt",
  "nbt": {
    "Items": []
  }
}
```

</details>

Uses vanilla `NbtUtils.compareNbt` subset matching. Match the fields actually saved by this Minecraft version. Block conditions require a block entity and return false when none exists.

### `saturn:raining` {#saturnraining}

Checks whether the level currently reports rainy weather.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:raining` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:raining"
}
```

</details>

### `saturn:replaceable` {#saturnreplaceable}

Checks whether the block state can be replaced.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:replaceable` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:replaceable"
}
```

</details>

### `saturn:slipperiness` {#saturnslipperiness}

Compares the slipperiness of the block.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:slipperiness` |
| `comparison` | Enum string | yes | — | One of `==`, `!=`, `<`, `<=`, `>`, `>=`. |
| `compare_to` | Number | yes | — | The target number to compare against. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:slipperiness",
  "comparison": ">=",
  "compare_to": 1
}
```

</details>

### `saturn:thundering` {#saturnthundering}

Checks whether the level currently reports a thunderstorm.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:thundering` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:thundering"
}
```

</details>

### `saturn:water_loggable` {#saturnwater_loggable}

Checks whether the block implements LiquidBlockContainer.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:water_loggable` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:water_loggable"
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

### `saturn:constant` {#saturnconstant}

Returns the configured boolean value.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:constant` |
| `value` | Boolean | yes | — | The boolean result, or the expected/new boolean block property value. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:constant",
  "value": true
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
| `condition` | [Block condition](./block-condition.md) | yes | — | The condition to check. |

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

### `saturn:offset` {#saturnoffset}

Moves the block context by the given offset before checking or executing the sub-value.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:offset` |
| `condition` | [Block condition](./block-condition.md) | yes | — | The condition to check. |
| `x` | Integer | no | `0` | X coordinate, offset or vector component, depending on this page's behavior. |
| `y` | Integer | no | `0` | Y coordinate, offset or vector component, depending on this page's behavior. |
| `z` | Integer | no | `0` | Z coordinate, offset or vector component, depending on this page's behavior. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:offset",
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
