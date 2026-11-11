---
title: block_condition_type（方块条件）
description: 模组注册的所有内置方块条件类型，以及每种类型接受的 JSON 字段。
---

# block_condition_type（方块条件）

<span id="block-condition-type-方块条件" />

:::info 与 Saturn 共享的类型
本页只列 MXT 自有类型；与 Saturn 共享的类型（含 `mxt:` 别名写法）见 [Saturn 类型参考](../../../../../library/saturn/types/condition/block-condition.md)。
:::

**方块条件**检查世界里的一个方块位置，返回 `true` 或 `false`。要检查哪一级、哪个位置，由声明这条条件的定义决定，所以条件本身只管写"这个位置上的方块要满足什么"。

它是 Java（内置）注册表，`type` 只能从下面列出的 id 里挑，写的时候带 `mxt` 命名空间。数据包不会往这张表里加条目，也删不掉条目。想加自定义类型只能写 Java，或者用 KubeJS 桥接，见 [KubeJS API](../../../kubejs/api-reference.md)。

## 通用结构 {#通用结构}

一条条件就是一个 JSON 对象，`type` 指明内置类型，剩下的键全是这个类型自己的字段。

```json
{
  "type": "mxt:block_tag",
  "tag": "minecraft:logs"
}
```

条件通常作为值嵌在其他定义里，比如嵌在 `block_condition` 这样的字段下：

```json
"block_condition": {
  "type": "mxt:hardness",
  "comparison": ">=",
  "compare_to": 3.0
}
```

凡是收方块条件的地方也收数组。数组是 `mxt:and` 的简写，每一项都通过才通过：

```json
"block_condition": [
  { "type": "mxt:movement_blocking" },
  { "type": "mxt:height", "comparison": "<", "compare_to": 64 }
]
```

数组里解不出来的那一项会被丢掉，只在日志里留一条 `Ignoring invalid list element`，其余项照常求值。空数组同样合法，`mxt:and` 配空数组恒为 `true`。

:::info 比较字段
有一批类型拿一个数值和某个数比。`comparison`（运算符）和 `compare_to`（被比的数）始终是两个独立的键，直接写在条件对象上，跟上面的例子一样。运算符只有 `==`、`!=`、`<`、`<=`、`>`、`>=`，`compare_to` 始终是普通数字。
:::

:::tip 数据包可视化编辑器
[数据包可视化编辑器](https://datapack.mcdev.tech/) 能交互式地列出一个类型有哪些字段，核对字段名挺方便，不用翻本页的表。
:::

## 方块条件 {#方块条件}

这一组真正去看那个位置上的方块或环境。

### mxt:aura_range {#mxt-aura-range}

用每种灵气各自的要求检验该位置的灵气浓度。

| 字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `aura` | 灵气 id 到要求对象的映射 | **必填** | 键是 [aura](../../json/aura.md) 的 id，值是 `{ "min"?, "max" }`。 |

```json
{
  "type": "mxt:aura_range",
  "aura": {
    "example:azure_aura": { "min": 20, "max": 200 }
  }
}
```

要求对象里 `max` 必填、`min` 可选（默认 `0`），两者都接受 [数值提供器](../../../../../library/saturn/types/number.md)。列出的每一种灵气浓度都落在自己的区间内，条件才通过。浓度由服务端在求值位置解析。

映射里写不出键或值的条目会被丢掉并记一条日志，不是报错。
