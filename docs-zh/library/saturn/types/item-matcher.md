---
title: "物品匹配器"
sidebar_label: "物品匹配器 (ItemMatcher)"
sidebar_position: 20
---

# 物品匹配器

用于 items 等 ItemMatcher 条目字段。多个条目取并集；支持物品、标签、通配、正则和原版材料。

### `saturn:ingredient` {#saturningredient}

使用 Minecraft Ingredient 匹配物品。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:ingredient` |
| `ingredient` | 原版 Ingredient（物品 ID、#tag 或物品 ID 数组） | 是 | — | 原版 Ingredient。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:ingredient",
  "ingredient": "#minecraft:logs"
}
```

</details>

### `saturn:item` {#saturnitem}

匹配一个物品注册 ID。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:item` |
| `item` | 资源 ID | 是 | — | 物品 ID、谓词或上下文中的物品参数键。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:item",
  "item": "minecraft:diamond"
}
```

</details>

### `saturn:regex` {#saturnregex}

按物品 ID 的正则表达式匹配。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:regex` |
| `pattern` | 字符串 | 是 | — | 用于匹配物品资源 ID 的模式。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:regex",
  "pattern": "minecraft:.*_planks"
}
```

</details>

### `saturn:tag` {#saturntag}

匹配指定标签中的物品。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:tag` |
| `tag` | 标签 ID（不带 #） | 是 | — | 注册表标签，或本页声明的 NBT 数据。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:tag",
  "tag": "minecraft:logs"
}
```

</details>

### `saturn:wildcard` {#saturnwildcard}

按物品 ID 的通配模式匹配。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:wildcard` |
| `pattern` | 字符串 | 是 | — | 用于匹配物品资源 ID 的模式。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:wildcard",
  "pattern": "minecraft:*_planks"
}
```

</details>
