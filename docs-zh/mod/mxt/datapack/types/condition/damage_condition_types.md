---
title: damage_condition_type（伤害条件）
description: 模组注册的所有内置伤害条件类型，以及每种类型接受的 JSON 字段。
---

# damage_condition_type（伤害条件）

<span id="damage-condition-type-伤害条件" />

:::info 与 Saturn 共享的类型
本页只列 MXT 自有类型；与 Saturn 共享的类型（含 `mxt:` 别名写法）见 [Saturn 类型参考](../../../../../library/saturn/types/condition/damage-condition.md)。
:::

**伤害条件**检查一次即将到来的伤害：它的来源，以及它的数值，返回 `true` 或 `false`。来源与数值由声明这条条件的定义提供，所以条件本身只描述要检查这两样里的什么。

它是 Java（内置）注册表，`type` 只能从下面列出的 id 里挑，写的时候带 `mxt` 命名空间。数据包不会往这张表里加条目，也删不掉条目。想加自定义类型只能写 Java，或者用 KubeJS 桥接，见 [KubeJS API](../../../kubejs/api-reference.md)。

## 通用结构 {#通用结构}

一条条件就是一个 JSON 对象，`type` 指明内置类型，剩下的键全是这个类型自己的字段：

```json
{
  "type": "mxt:damage_type_tag",
  "tag": "minecraft:is_fire"
}
```

条件通常作为值嵌在其他定义里，比如嵌在 `damage_condition` 这样的字段下：

```json
"damage_condition": {
  "type": "mxt:amount_range",
  "min": 4,
  "max": 20
}
```

凡是收伤害条件的地方也收数组。数组是 `mxt:and` 的简写，每一项都通过才通过：

```json
"damage_condition": [
  { "type": "mxt:projectile" },
  { "type": "mxt:amount_range", "min": 2, "max": 10 }
]
```

:::info 伤害注册表
`damage_type` 接受已注册伤害类型的 id，例如 `minecraft:fall`；`damage_type_tag` 接受伤害类型标签，例如 `minecraft:is_fire`。两者都读原版的伤害类型注册表，所以数据包新增的伤害类型与标签在这里是可见的。
:::

:::tip 数据包可视化编辑器
[数据包可视化编辑器](https://datapack.mcdev.tech/) 能交互式地列出一个类型有哪些字段，核对字段名挺方便，不用翻本页的表。
:::

## 条件类型 {#条件类型}

### `mxt:element` {#mxt-element}

按这一击的**元素**匹配。

| 字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `elements` | 元素 id、`#标签` 或它们的数组 | **必填** | 这一击的元素里出现列出的一个就通过；至少写一项。 |

```json
{ "type": "mxt:element", "elements": ["#example:fire", "example:metal"] }
```

这一击的元素就是伤害管线读的那一份：伤害类型的认领者，没人认领时才回落到攻击者灵根。所以条件说的元素与目标实际吃到的倍率永远一致，元素一旦认领 `minecraft:lava`，岩浆伤害也会命中这条条件。`elements` 至少写一项：写空数组会在加载期被拒绝，不会变成一条恒不成立的条件。
