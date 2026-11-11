---
title: item_matcher_entry_type（物品匹配器）
description: item_matcher_entry_type 的七个条目，各自的字段与匹配规则。
---

# item_matcher_entry_type（物品匹配器）

<span id="item-matcher-entry-type-物品匹配器" />

:::info 与 Saturn 共享的类型
本页只列 MXT 自有类型；与 Saturn 共享的类型（含 `mxt:` 别名写法）见 [Saturn 类型参考](../../../../../library/saturn/types/item-matcher.md)。
:::

`item_matcher_entry_type` 是 [`ItemMatcher`](../shared_data_types.md#itemmatcher) 里每一项的类型族：一个 `ItemMatcher` 就是一个或多个这样的条目，每一项在 `type` 里写上下面某个 ID 来选择一种匹配方式；没有 `type` 的字符串按裸物品 ID 或 `#物品标签` 处理。

`mxt:technique`、`mxt:spirit_storage` 与 `mxt:resource_container` 没有字段；`mxt:item`、`mxt:tag`、`mxt:wildcard`、`mxt:regex`、`mxt:ingredient` 由 Saturn 提供，见 [Saturn 物品匹配器](../../../../../library/saturn/types/item-matcher.md#saturningredient)。数组里的条目可以是纯字符串、带 `type` 的对象，或两者混在一起。

这些条目由模组注册，数据包只能选用，不能新增。

## `item_matcher_entry_type` {#item-matcher-entry-type}

| `type` | 字段 |
| --- | --- |
| `mxt:technique` | 无 |
| `mxt:spirit_storage` | 无 |
| `mxt:resource_container` | 无 |
| `mxt:herb_tag` | `element`、`material` |
| `mxt:quality` | `items`、`quality`、`min_quality` |

```json
"items": [
  "minecraft:apple",
  {"type": "mxt:wildcard", "pattern": "minecraft:*_sword"},
  {"type": "mxt:regex", "pattern": "othermod:(ruby|jade)_gem"}
]
```

### `mxt:technique` {#mxt-technique}

匹配堆上带 `mxt:technique` 组件的物品，也就是「一叠功法手册」。

| 字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| — | — | — | 没有字段 |

```json
{"type": "mxt:technique"}
```

认的是这一堆教的哪一门功法，而不是物品 ID。它只问组件：被某条 `technique_binding` 的 `items` 认领、却不带 `mxt:technique` 组件的物品不算命中。

### `mxt:spirit_storage` {#mxt-spirit-storage}

匹配每一个能存储灵气的物品，也就是能按住右键灌注灵气的那些（见[物品灵气数据包](../../json/item_aura.md)）。

| 字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| — | — | — | 没有字段 |

```json
{"type": "mxt:spirit_storage"}
```

它是唯一按能力而非按 ID 匹配的条目，因此之后新增的、能存储灵气的物品无需修改声明该匹配器的文件就会被覆盖。

### `mxt:herb_tag` {#mxt-herb-tag}

匹配这样一个物品：它是一个[灵植](../../json/spirit_herb.md)，且其 `element_tags` / `material_tags` 与给定的查询相交。

| 字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `element` | 元素 id 或 `#标签` | 无 | 匹配的灵植的元素归属 |
| `material` | Identifier | 无 | 匹配的灵植必须在 `material_tags` 中列出的材料 ID；`element` 与 `material` 至少要给出一个 |

```json
{"type": "mxt:herb_tag", "element": "example:fire"}
```

```json
{"type": "mxt:herb_tag", "element": "#example:fire_like", "material": "example:herb"}
```

`mxt:herb_tag` 是读取 `mxt:spirit_herb` 数据包注册表、而不只是原版物品注册表的条目：它匹配这样一个物品——它是一条[灵植](../../json/spirit_herb.md)，即某条 `mxt:spirit_herb` 定义自己的匹配器接受该物品堆——然后再问那条定义的归属：`element` 查 `element_tags`、`material` 查 `material_tags`，两者都写就要同时满足，两个都不写会被加载期拒绝。

`element` 与 `element_tags` 两边都写元素注册表的引用（条目或 `#` 标签），并**双向**展开成元素集合再取交集——草写的是「火灵草」、问的是 `#warm_elements` 也能匹配，反过来亦然，所以标签写在哪一边都不影响结果。`material` 仍是普通标识符。标签是草的属性而不是物品的属性，所以内容可以写「任意火属性灵草」而不必知道之后有哪些物品被绑到那条草上。灵植注册表只在服务器运行时存在，因此在客户端该条目直接报告不匹配。

实体条件里可以套在 `mxt:item_matcher` 中使用（它的 `items` 就是一个 `ItemMatcher`），例如用 `mxt:has_equipped_item` 判断「手上拿着火属性灵草」：

```json
{
  "type": "mxt:has_equipped_item",
  "item_condition": {
    "type": "mxt:item_matcher",
    "items": [
      {"type": "mxt:item", "item": "minecraft:blaze_powder"},
      {"type": "mxt:herb_tag", "element": "example:fire"},
      {"type": "mxt:herb_tag", "material": "example:herb"}
    ]
  }
}
```

## `mxt:quality` {#mxt-quality}

先按 `items` 自己匹配（同样是一个条目数组，可以嵌套任意条目），再要求这一堆**解析出来的[品质档位](../../json/quality.md#resolution)**满足那份要求：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `items` | `ItemMatcher` | **必填**，至少一项。它是 OR 列表，不写物品约束就表达不了「必须是符纸且至少三档」。 |
| `quality` | 品质 id、`#标签` 或数组 | 可选，成员判定。 |
| `min_quality` | 品质 id | 可选，**至少到这一档**（按这一档所在的链比位置，跨链答否）。 |

```json
{ "type": "mxt:quality", "items": ["mxt:blank_talisman"], "min_quality": "example:tier_3" }
```

`quality` 与 `min_quality` 至少要写一个，两个都不写会被加载期拒绝。这个条目读的是堆上的档位，所以 `itemLevel()` 是假——按物品开缓存的调用方（例如长按识别）必须每个堆问一次。按档筛物品的各个口子见[品质 · 按档位筛物品](../../json/quality.md#gating)。

### `mxt:resource_container` {#mxt-resource-container}

匹配任何带 `mxt:resource_container` 组件（资源容器）的物品堆。它是按能力而不是按 ID 匹配，因此内容包自己的容器物品不需要被任何匹配器文件点名。

| 字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| — | — | — | 没有字段 |

```json
{"type": "mxt:resource_container"}
```

空容器也算命中：条目只看组件是否存在，能不能倒出东西由使用它的逻辑判断。`itemLevel()` 为假——同一个物品的不同堆可能有不同内容。

## 简写 {#简写}

裸字符串和 `#标签` 字符串分别是 `mxt:item` 与 `mxt:tag` 的简写（这两个条目由 Saturn 注册），三种写法可以混在一个数组里：

```json
"items": ["minecraft:apple", "#minecraft:logs", "othermod:token"]
```

`mxt:item` 对应 `{"type": "mxt:item", "item": ...}`，`mxt:tag` 对应 `{"type": "mxt:tag", "tag": ...}`。数组里每一项保留为条目或标签，重复值不会自动改变语义。

## 匹配顺序 {#匹配顺序}

匹配器只引用已经注册的物品。多个定义同时命中同一个目标时，按各自声明的 `priority` **从高到低**选择（字段默认 `0`；按物品认领的那十张注册表都接受它，按方块认领的 `heat_source` 与 `spirit_herb` 也接受）。同分回落到注册表顺序。「谁赢」由定义自己写死、与文件名无关（与 `aura_zone`、`element_reaction` 的 `priority` 同一个方向）。**这与匹配条目是哪一种无关**：一条定义只要命中就按它自己声明的那个数参与排序，点名物品并不会让它更靠前。`block_aura` 没有 `priority`，命中同一个方块的多条定义都生效、相加。

通配符和正则条目是针对物品 ID 匹配的，例如 `minecraft:apple`，而不是针对显示名。
