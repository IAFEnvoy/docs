---
title: "Item matcher"
sidebar_position: 20
---

# Item matcher

Used for ItemMatcher entry fields such as `items`. Multiple entries are combined as a union; items, tags, wildcards, regex and vanilla ingredients are supported.

### `saturn:ingredient` {#saturningredient}

Matches items using a Minecraft Ingredient.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:ingredient` |
| `ingredient` | Vanilla Ingredient (item ID, #tag or item ID array) | yes | — | Vanilla Ingredient. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:ingredient",
  "ingredient": "#minecraft:logs"
}
```

</details>

### `saturn:item` {#saturnitem}

Matches a single item registry ID.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:item` |
| `item` | Resource ID | yes | — | Item ID, predicate, or an item parameter key in the context. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:item",
  "item": "minecraft:diamond"
}
```

</details>

### `saturn:regex` {#saturnregex}

Matches by a regular expression on the item ID.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:regex` |
| `pattern` | String | yes | — | Pattern used to match the item resource ID. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:regex",
  "pattern": "minecraft:.*_planks"
}
```

</details>

### `saturn:tag` {#saturntag}

Matches items in the given tag.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:tag` |
| `tag` | Tag ID (without #) | yes | — | Registry tag, or the NBT data declared on this page. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:tag",
  "tag": "minecraft:logs"
}
```

</details>

### `saturn:wildcard` {#saturnwildcard}

Matches by a wildcard pattern on the item ID.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:wildcard` |
| `pattern` | String | yes | — | Pattern used to match the item resource ID. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:wildcard",
  "pattern": "minecraft:*_planks"
}
```

</details>
