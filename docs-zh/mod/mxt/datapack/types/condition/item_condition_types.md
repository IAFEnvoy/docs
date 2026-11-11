---
title: item_condition_type（物品条件）
description: 模组注册的所有内置物品条件类型，以及每种类型接受的 JSON 字段。
---

# item_condition_type（物品条件）

<span id="item-condition-type-物品条件" />

:::info 与 Saturn 共享的类型
本页只列 MXT 自有类型；与 Saturn 共享的类型（含 `mxt:` 别名写法）见 [Saturn 类型参考](../../../../../library/saturn/types/condition/item-condition.md)。
:::

**物品条件**检查单个物品堆，返回 `true` 或 `false`。持有者实体与物品堆由声明该条件的那个定义提供，所以条件只描述"交给它的这堆东西"要满足什么。

物品条件是内置类型，`type` id 固定，数据包不能新增或删除条目。这一页列的就是全部取值，都带 `mxt` 命名空间。要加自定义类型只能写 Java 或走 KubeJS 桥接，见 [KubeJS API](../../../kubejs/api-reference.md)。

条件是一个 JSON 对象，`type` 选择类型，其余键都是该类型自己的字段：

```json
{
  "type": "mxt:item_tag",
  "tag": "minecraft:swords"
}
```

条件在别处是作为值用的，所以通常嵌在 `item_condition` 这类字段下：

```json
"item_condition": {
  "type": "mxt:relative_durability",
  "comparison": "<=",
  "compare_to": 0.25
}
```

凡是要物品条件的地方也收条件数组。数组等于 `mxt:and` 的简写，每一项都通过才通过：

```json
"item_condition": [
  { "type": "mxt:item_tag", "tag": "minecraft:swords" },
  { "type": "mxt:relative_durability", "comparison": ">", "compare_to": 0.5 }
]
```

:::info 在哪里被检查
物品堆一般由声明该条件的那张表提供，例如实体条件 `mxt:equipped_item` 或某个物品行为字段。需要比较数值的类型都用同一组运算符：`==`、`!=`、`<`、`<=`、`>`、`>=`。
:::

:::tip 数据包可视化编辑器
[数据包可视化编辑器](https://datapack.mcdev.tech/) 能交互式列出每种类型的字段，懒得翻表时可以用它确认字段名。
:::

## 元条件 {#元条件}

元条件不检查物品堆本身，它们决定别的条件怎么算。字段就一个 `conditions` 数组或一个 `condition`。

| 类型 | 字段 | 说明 |
| --- | --- | --- |
| `mxt:always` | — | 始终通过。 |
| `mxt:never` | — | 始终失败。 |
| `mxt:js` | `id`、`params?` | 调用通过 KubeJS 桥接注册的物品条件处理器。 |
| `mxt:and` | `conditions` | 所有嵌套物品条件都通过时通过。 |
| `mxt:or` | `conditions` | 至少有一个嵌套物品条件通过时通过。 |
| `mxt:not` | `condition` | 对嵌套物品条件取反。 |
| `mxt:chance` | `chance` | 以给定概率随机通过。 |

| 字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `id` | String | **必填** | `mxt:js` 的处理器 id，写给 `MxtConditions.item(id, callback)` 的那个 id。 |
| `params` | JSON 对象 | `{}` | 透传给处理器的参数，处理器原样收到。 |
| `conditions` | 物品条件数组 | **必填** | `mxt:and` / `mxt:or` 的嵌套条件。 |
| `condition` | 物品条件 | **必填** | `mxt:not` 的嵌套条件。 |
| `chance` | Double | **必填** | 通过的概率，取值 `0` 到 `1`；超出范围在加载期报错。 |

`mxt:js` 的处理器未注册、或回调抛异常，都算不通过。`mxt:chance` 取 `0` 永远不通过、取 `1` 永远通过。数组简写和 `mxt:and` 是同一件事，嵌套几层都行。

`mxt:always` 与 `mxt:never` 没有字段，`{"type": "mxt:always"}` 就是整个条件。可选条件字段不写时等于 `mxt:always`。

## 条件类型 {#条件类型}

### `mxt:owned_by` {#mxt-owned-by}

当物品堆的法器归属（`mxt:artifact_state` 的 `owner_uuid`）就是当前持有者时通过。没有归属的物品堆不通过。

没有字段。

```json
{ "type": "mxt:owned_by" }
```

### `mxt:energy_range` {#mxt-energy-range}

检查物品堆上**某一种灵气**的已存量是否落在 `min` 与 `max` 之间，含两端。一件法器可以存好几种灵气，所以这里点名问哪一种。

| 字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `aura` | 灵气 id 或 `#标签` | **必填** | 要问的那一种灵气。 |
| `min` | 数值或公式 | **必填** | 下界，含端点。 |
| `max` | 数值或公式 | **必填** | 上界，含端点。 |

```json
{ "type": "mxt:energy_range", "aura": "example:fire_qi", "min": 10, "max": 100 }
```

`min` 与 `max` 在当前的公式上下文里求值。任一边求不出有限数、或 `min > max`，条件都不通过。

### `mxt:spirit_storage_not_full` {#mxt-spirit-storage-not-full}

匹配可充能物品中已存灵力低于其容量的那些。

没有字段。

```json
{ "type": "mxt:spirit_storage_not_full" }
```

容量按这件物品堆当前解析出的那份定义算。解析不出储灵能力的物品堆不通过。

### `mxt:item_element` {#mxt-item-element}

当物品携带所列元素之一时通过。

| 字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `elements` | 元素 id、`#标签` 或它们的数组 | **必填** | 至少一项。 |

```json
{ "type": "mxt:item_element", "elements": ["example:fire", "#example:hot"] }
```

读的是"物品的元素"：堆上的 `mxt:element` 组件，加上 `weapon_binding` / `item_binding` / `artifact` 声明的 `element`（全部取并集），一个都没声明时才回落到物品携带的灵气的 `aura_type`。元素与元素标签都接受，空列表在加载期被拒。见 [weapon_binding](../../json/weapon_binding.md)。

### `mxt:curse_container` {#mxt-curse-container}

检查物品堆的 `mxt:curse_container` 组件里封着哪些[诅咒](../../json/curse.md)。

| 字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `curse` | 诅咒 id、`#标签` 或它们的数组 | 不写就是任意诅咒 | 要问的诅咒条目。 |
| `stacks` | `{min?, max?}` | 不写就是任意层数 | 该条目将会施加的层数的窗口，含两端。 |

```json
{ "type": "mxt:curse_container", "curse": "#example:curses", "stacks": { "min": 2 } }
```

`stacks` 比较的是该条目**将会施加**的层数，它的公式用当前上下文求值；非有限的边界让这一项不通过。物品堆没有这个组件时不通过。

它问的是**物品封着什么**，与实体条件 `mxt:has_curse`（问持有者身上已有）是两件事，所以未装备的护甲照样答得出。

### `mxt:item_quality` {#mxt-item-quality}

检查物品堆解析出来的[品质](../../json/quality.md)档位。

| 字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `quality` | 品质 id、`#标签` 或它们的数组 | — | 成员判定：解析出的那一档在不在里面。 |
| `min_quality` | 品质 id | — | **至少到这一档**：按这一档所在的链比位置，跨链答否；只写它时没有档的物品答否。 |

```json
{ "type": "mxt:item_quality", "quality": ["example:fine", "#example:high_tier"] }
```

```json
{ "type": "mxt:item_quality", "min_quality": "example:tier_3" }
```

走的是与品质闸门、tooltip 相同的解析顺序（**三层**，先命中的赢：堆上的 `mxt:quality` 组件 → 这一堆携带的定义自己声明的 `quality` → 注册表 `default_quality`），所以这一层给的那一档也算数。**这是条件，不是组件**：组件叫 `mxt:quality`（写整份品质对象），两者名字不同。两个字段至少写一个，都不写在加载期被拒（空条件会静默恒真）；解析不出任何一档的物品答否，而不是回落到最低档。

`min_quality` 按**这一档所在的那条链**比位置（与升级、`/quality chain` 同一份实现）——不同链的序号没有可比性，所以**跨链一律答否**。要"至少某档"就用它，不必再维护一条把高档位列进去的品质标签。同一份要求还挂在另外两个口子上（匹配器条目 `mxt:quality`、自定义材料 `mxt:quality`——后者也是锻造蓝图 `input` 里"材料至少某档"的写法），见[品质 · 按档位筛物品](../../json/quality.md#gating)。

### `mxt:item_abilities` {#mxt-item-abilities}

检查物品堆授予的 mxt [技能](../../../../../library/saturn/data/ability.md)。

| 字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `abilities` | 技能 id、`#标签` 或它们的数组 | **必填** | 至少一项。 |

```json
{ "type": "mxt:item_abilities", "abilities": ["example:sword_focus"] }
```

读的是运行时用的那份并集：定义声明的 `abilities` 加上 `mxt:item_abilities` 组件写下的 id。空表在加载期被拒。
