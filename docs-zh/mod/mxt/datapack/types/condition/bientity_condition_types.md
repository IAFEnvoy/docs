---
title: bientity_condition_type（双实体条件）
description: 模组注册的全部内置双实体条件类型，以及每种类型接受的 JSON 字段。
---

# bientity_condition_type（双实体条件）

<span id="bientity-condition-type-双实体条件" />

:::info 与 Saturn 共享的类型
本页只列 MXT 自有类型；与 Saturn 共享的类型（含 `mxt:` 别名写法）见 [Saturn 类型参考](../../../../../library/saturn/types/condition/bientity-condition.md)。
:::

**双实体条件**检查两个实体之间的关系：一个**施动者**（actor）、一个**目标**（target）。这一对实体由写条件的那个字段提供，条件自己不能挑实体，只描述要检查这两个实体的什么。多数类型区分两端，交换施动者与目标会改变结果。

双实体条件是 Java（内置）注册表，`type` id 固定，数据包不能新增条目、也不能移除条目。`type` 选择一个内置类型，取值是本页列出的 id 之一，用 `mxt` 命名空间书写。只有 Java 代码或 KubeJS 桥接能引入自定义条件类型，见 [KubeJS API](../../../kubejs/api-reference.md)。字段名后带 `?` 的可以省略，其余字段必须写。

## 通用结构 {#通用结构}

`type` 与其余所有键都写在同一层：

```json
{
  "type": "mxt:distance",
  "maximum": 8
}
```

条件会作为值嵌在别的定义里，通常就落在 `bientity_condition` 这样的字段下：

```json
"bientity_condition": {
  "type": "mxt:actor_condition",
  "condition": {
    "type": "mxt:entity_type",
    "entity_type": "minecraft:player"
  }
}
```

任何要双实体条件的地方也接受条件数组。数组是 `mxt:and` 的简写，只有每一项都通过时才通过：

```json
"bientity_condition": [
  { "type": "mxt:can_see" },
  { "type": "mxt:distance", "maximum": 16 }
]
```

数组简写只在条件本身的位置生效：`mxt:and` 与 `mxt:or` 的 `conditions` 里每一项仍要写一个条件对象，不能再套数组。

`mxt:always`、`mxt:never`、`mxt:js`、`mxt:and`、`mxt:or`、`mxt:not`、`mxt:chance` 这七个不检查实体本身，只回答恒真、恒假、调用脚本或组合别的条件；其余类型都要看传进来的施动者与目标。

:::info 有向与无向用法
大多数双实体条件会区分施动者与目标，交换这两个实体会改变结果。`mxt:undirected` 会把嵌套条件按两个方向各跑一次、任一方向成立就算通过，`mxt:mutual` 是它的对偶——两个方向**都**成立才通过（"两人互相为友"就写它），而 `mxt:both` / `mxt:either` 是刻意把同一条实体条件应用到两端。嵌套的实体检查用[实体条件类型](./entity_condition_types.md)。
:::

:::tip 数据包可视化编辑器
[数据包可视化编辑器](https://datapack.mcdev.tech/) 以交互方式展示每种类型的字段列表，用来核对字段名很方便，不必翻这里的表。
:::

## 条件类型 {#条件类型}

### `mxt:friend` {#mxt-friend}

当施动者把目标当自己人时通过。

| 字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| — | — | — | 没有字段。 |

```json
{"type": "mxt:friend"}
```

### `mxt:element_overcomes` {#mxt-element-overcomes}

当施动者的灵根元素中至少有一个克制目标灵根的某个元素时通过。

| 字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| — | — | — | 没有字段。 |

```json
{"type": "mxt:element_overcomes"}
```

它只问这条克制关系是否存在，不问它值多少——这条克制关系的倍率属于[伤害系统](../../../technical/damage.md)，因此只需要这层配对关系的内容写 `1.0`。

### `mxt:element_adapted_to` {#mxt-element-adapted-to}

当施动者适应（`adapted_to`）目标携带的某个元素时通过。

| 字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| — | — | — | 没有字段。 |

```json
{"type": "mxt:element_adapted_to"}
```

它是 `mxt:element_overcomes` 的防御镜像，回答的是"我抗不抗你"；同样只问关系是否存在，倍率仍属于[伤害系统](../../../technical/damage.md)。
