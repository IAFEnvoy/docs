---
title: entity_condition_type（实体条件）
description: 模组注册的全部内置实体条件类型，以及每种类型接受的 JSON 字段。
---

# entity_condition_type（实体条件）

<span id="entity-condition-type-实体条件" />

:::info 与 Saturn 共享的类型
本页只列 MXT 自有类型；与 Saturn 共享的类型（含 `mxt:` 别名写法）见 [Saturn 类型参考](../../../../../library/saturn/types/condition/entity-condition.md)。
:::

**实体条件**检查单个实体的状态并返回 `true` 或 `false`。被检查的实体由声明该条件的那个定义提供，条件本身只描述要检查什么。

实体条件是 Java（内置）注册表，`type` id 固定，数据包不能新增条目、也不能移除条目。只有 Java 代码或 KubeJS 桥接能引入自定义条件类型，见 [KubeJS API](../../../kubejs/api-reference.md)。

`type` 选择一个内置类型，取值是本页列出的 id 之一，用 `mxt` 命名空间书写。字段名后带 `?` 的可选，其余列出的字段都必须填写；「字段」列列出的是直接取自该类型 codec 的 JSON 键。

## 元条件 {#元条件}

`type` 与其余所有键都写在同一层：

```json
{
  "type": "mxt:health",
  "comparison": "<",
  "compare_to": 10
}
```

条件会作为值嵌在别的定义里，通常就落在 `condition` 这样的字段下：

```json
"condition": {
  "type": "mxt:has_spirit_root",
  "spirit_root": "example:azure_root"
}
```

任何要实体条件的地方也接受条件数组。数组是 `mxt:and` 的简写，只有每一项都通过时才通过：

```json
"condition": [
  { "type": "mxt:sneaking" },
  { "type": "mxt:on_block", "condition": {"type": "mxt:block_tag", "tag": "minecraft:logs"} }
]
```

| 类型 | 字段 | 说明 |
| --- | --- | --- |
| `mxt:always` | — | 始终通过。 |
| `mxt:never` | — | 始终失败。 |
| `mxt:and` | `conditions` | 只有当所有嵌套实体条件都通过时才通过。 |
| `mxt:or` | `conditions` | 只要有一个嵌套实体条件通过就通过。 |
| `mxt:not` | `condition` | 对嵌套实体条件取反。 |
| `mxt:chance` | `chance` | 按给定概率随机通过，概率取值在 `0` 与 `1` 之间。 |
| `mxt:js` | `id`、`params?` | 调用通过 KubeJS 桥接注册的实体条件处理器。 |

`mxt:js` 的 `id` 是 `MxtConditions.entity(...)` 注册的回调；回调缺失时判定为 `false`。

:::info 比较字段
有若干类型把一个数值与某个数字相比较。类型把 `comparison` 与 `compare_to` 列为两个独立键时，它们直接写在条件对象上，如上面的示例。少数类型只写一个 `comparison` 键，其值是一个嵌套的比较对象，内部含有 `comparison` 与 `compare_to`；这些类型会在自己的说明里注明。比较运算符为 `==`、`!=`、`<`、`<=`、`>` 和 `>=`，而 `compare_to` 本身始终是普通数字。
:::

:::tip 数据包可视化编辑器
[数据包可视化编辑器](https://datapack.mcdev.tech/) 以交互方式展示每种类型的字段列表，用来核对字段名很方便，不必翻这里的表。
:::

## 状态、身份与修炼 {#状态、身份与修炼}

### `mxt:has_curse` {#mxt-has-curse}

检查实体是否持有一条满足**全部**给定筛选条件的 [诅咒](../../json/curse.md)。

| 字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `curse?` | 诅咒 id 或 `#标签` | 不限 | 必须是这一条定义。 |
| `tags?` | `#标签` 或数组 | 不限 | 这一条实例必须同时带有列出的全部标签。 |
| `stacks?` | `{min?, max?}` | 不限 | 层数范围。 |
| `remaining_ticks?` | `{min?, max?}` | 不限 | 剩余 tick 范围。 |

```json
{"type": "mxt:has_curse", "stacks": {"min": 2}, "remaining_ticks": {"min": 1}}
```

`stacks` 与 `remaining_ticks` 都是 `{min?, max?}` 窗口，闭区间。永不过期的诅咒按无限计，因此它能回答 `min`，却永远不会满足 `max`。完全不写筛选条件时，问的是是否持有任意诅咒。

### `mxt:has_spirit_root` {#mxt-has-spirit-root}

检查实体当前是否持有给定的 [灵根](../../json/spirit_root.md)。

| 字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `spirit_root` | 条目、`#标签` 或数组 | **必填** | 要查的灵根。 |

```json
{"type": "mxt:has_spirit_root", "spirit_root": "#example:fire_roots"}
```

`spirit_root` 接受条目、`#` 标签或它们的数组，所以"任意火属灵根"写一条标签即可。读的是身体持有的那份账本，"现在生效"与否见[灵根与体质的开关](../../json/spirit_root.md)。

### `mxt:has_physique` {#mxt-has-physique}

检查实体当前是否持有给定的 [体质](../../json/physique.md)。

| 字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `physique` | 体质 id | **必填** | 要查的体质。 |

### `mxt:realm` {#mxt-realm}

把实体的[境界阶段](../../json/realm_stage.md)与 `realm` 比较。**只问 `realm` 自己所属的那条境界链**：同一链上的两个阶段按链内序号比，别的灵气的境界一律不成立。

| 字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `realm` | 境界阶段 | **必填** | 比较的基准境界，同时指出问的是哪条链。 |
| `comparison?` | `==` / `!=` / `<` / `<=` / `>` / `>=` | `==` | 怎么比，按链内序号。 |
| `min_minor_stage?` | Integer | 不限 | 要求在该境界上达到过的最高层数不小于它，`0` 起。 |

```json
{"type": "mxt:realm", "realm": "example:foundation", "comparison": ">="}
```

**还没进入这条链的身体算站在它的首境界上**（也就是凡人）：所以点名首境界时凡人也成立，`>=` 之类的下界同样成立；一旦身体进入了链，比的才真正是当下所在的那一档。

`min_minor_stage` 与公式变量 `minor_stage` 是同一套编号。它读的是**只增不减的层数记录**，所以"炼气期层数达到过 500"这类门槛在突破离开之后仍然成立；想表达"此刻就在这一层的窗口里"就配 `comparison: "=="`。

### `mxt:has_realm` {#mxt-has-realm}

对已针对给定[灵气](../../json/aura.md)进入境界链的实体通过。

| 字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `aura` | 灵气 id | **必填** | 要查的境界链所属灵气。 |

### `mxt:technique` {#mxt-technique}

检查实体**学过**哪些[功法](../../json/technique.md)。

| 字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `techniques?` | 条目、`#标签` 或数组 | 空表 | 要查的功法。 |
| `match?` | `any` / `all` | `any` | `any` 命中其一即可，`all` 写下的每一项都要满足。 |

```json
{"type": "mxt:technique", "techniques": ["example:azure_sword"], "match": "all"}
```

空表就是"学过任意一门"。空表配 `all` 会在加载期被拒绝，免得静默变成恒真。读的是"学过"而不是"正在生效"，功法没有启用开关（灵根与体质才有）；要表达"没有功法"就写 `mxt:not` 套一条。

### `mxt:cultivating` {#mxt-cultivating}

检查实体**是不是正在运功**，也可以要求它正好在跑某一条[法门](../../json/cultivation.md)。

| 字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `action?` | 法门 id | 不限定 | 点名一条 `cultivation`，只有正在跑它的实体才通过。 |

```json
{"type": "mxt:cultivating"}
{"type": "mxt:cultivating", "action": "example:azure_meditation"}
```

运功状态在**开始运功的那一刻**就已经写好，所以同一趟运功里这个答案恒定，不是"结算过才为真"。它天然是给"还继续不继续修炼"（`tick_condition`）用的——**开始之前它必然为假**，所以别拿它去筛"此刻能不能修"；要判"同伴此刻能不能一起拿成果"，用 `mxt:partner` 问对方**手上拿着什么**。

### `mxt:progression` {#mxt-progression}

检查身体持有的进度爬到了哪一级。

| 字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `level` | 进度等级 id | **必填** | 点名一级。 |
| `comparison?` | `==` / `!=` / `<` / `<=` / `>` / `>=` | `==` | 怎么比，比较走缓存索引出来的链内序号。 |
| `owner?` | 所有者定义 id，可写数组 | 这个身体持有的每一种进度 | 把问题限定到某些所有者。 |

```json
{"type": "mxt:progression", "level": "example:stage_three", "comparison": ">=", "owner": "example:azure_sword"}
```

不写 `owner` 就问这个身体持有的每一种进度，任一命中即成立。它只收所有者定义的 id（单个或数组），不收 `#标签`。读的是**身体到达过的那一级**，没有晋升过就是所有者的 `default_level`；没有 `default_level`、或缓存没能索引出这条链的所有者永远答否。

### `mxt:contract` {#mxt-contract}

读实体身上那份契约记录。

| 字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `bound?` | Boolean | `true` | 身上有没有一份契约记录。 |
| `type?` | 契约类型 id、`#标签` 或数组 | `[]` | 把问题限定到某几种契约类型。 |
| `behavior?` | 行为 id 或数组 | `[]` | 它当前那条命令是不是其中之一（`mxt:follow` / `mxt:wander` / `mxt:stay` / `mxt:recall`）。 |

```json
{"type": "mxt:contract"}
```

没有记录的生物对 `bound: true` 答否、对 `bound: false` 答是。`bound: false` 与 `type` 或 `behavior` 同时写会在**加载期**被拒——"没契约"与"它是哪一种契约、听谁的命令"互相矛盾。典型用法是「只有灵宠能长」：把等级那一级的 `condition` 写成 `{"type": "mxt:contract"}`。

### `mxt:has_element` {#mxt-has-element}

当实体的**启用**灵根所命名的元素中有一个出现在 `elements` 里时通过。

| 字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `elements` | 元素条目、`#标签` 或数组 | **必填** | 要查的元素。 |

```json
{"type": "mxt:has_element", "elements": "#example:fire"}
```

"任意火属灵根"写一条 `#` 标签即可，之后新加的同类灵根无需改动这里。元素类条件的 `elements` 都至少写一项：写空表/空数组会在加载期被拒绝，而不是变成一条"恒真"或"恒假"的条件。

### `mxt:in_secret_realm` {#mxt-in-secret-realm}

判定实体是否在某份[秘境实例](../../json/secret_realm.md)里。

| 字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `definition?` | 一条 `mxt:secret_realm` 定义或 `#标签` | 不限定 | 限定是哪一份定义。 |
| `role?` | `any` / `owner` / `guest` | `any` | 在里面算什么身份。 |

`any` 表示在里面即可，`owner` 表示自己是主人，`guest` 表示在里面但不是主人。不在任何实例里时恒为 `false`，因此 `owner` 与 `guest` 都隐含"在里面"。

### `mxt:element_attachment` {#mxt-element-attachment}

读取元素在实体身上的积累量（`mxt:element_attachment` 附件，见 [element_reaction](../../json/element_reaction.md)）。

| 字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `elements` | 元素 id 到窗口的映射 | **必填** | 每一项都是一段元素 id 到 `max`／`min` 的窗口，每一项都要通过。 |
| `elements.<id>.max` | Double | **必填** | 该元素积累量的上限。 |
| `elements.<id>.min` | Double | 不限 | 该元素积累量的下限。 |

```json
{"type": "mxt:element_attachment", "elements": {"#example:fire": {"min": 20, "max": 100}}}
```

写空表会在加载期被拒绝而不是当成"恒真"。这是积累系统的只读一侧：可以让效果取决于身上攒了多少火，而不需要任何反应触发。

## 环境与位置 {#环境与位置}

### `mxt:aura_range` {#mxt-aura-range}

把服务端解析出的实体所在位置的灵气浓度与逐灵气的需求相比较。

| 字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `aura` | 灵气 id 到要求的映射 | **必填** | 每一项都是一段灵气 id 到 `max`／`min` 的要求。 |
| `aura.<id>.max` | [数值提供器](../../../../../library/saturn/types/number.md) | **必填** | 该灵气浓度的上限。 |
| `aura.<id>.min` | [数值提供器](../../../../../library/saturn/types/number.md) | `0` | 该灵气浓度的下限。 |

```json
{"type": "mxt:aura_range", "aura": {"example:fire_qi": {"min": 10, "max": 100}}}
```

逐灵气比较实体所在位置的浓度，写下的每一种都要满足。

### `mxt:aura_element` {#mxt-aura-element}

按**元素**而不是按具名灵气测试实体所在位置的灵气。

| 字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `elements` | 元素 id 到要求的映射 | **必填** | 每一项都是一段元素 id 到 `max`／`min` 的要求，每一项都要通过。 |
| `elements.<id>.max` | [数值提供器](../../../../../library/saturn/types/number.md) | **必填** | 该元素浓度的上限。 |
| `elements.<id>.min` | [数值提供器](../../../../../library/saturn/types/number.md) | `0` | 该元素浓度的下限。 |

该位置上所有携带这个元素的**存活**灵气会先求和再比较，每一项都要通过。给区域再加另一种同元素灵气即可满足要求，不必改动查询。

### `mxt:formation_member` {#mxt-formation-member}

当实体在当前维度拥有任意已注册的[阵法](../../json/formation.md)时通过（**归属名单**上有它就算）。

| 字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| — | — | — | 没有字段。 |

### `mxt:formation_owner` {#mxt-formation-owner}

当实体是当前正在求值的阵法的阵主**之一**时通过（归属是一组 UUID，名单上任何一位都算）。

| 字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| — | — | — | 没有字段。 |

在阵法上下文之外恒为 `false`。

### `mxt:formation_ally` {#mxt-formation-ally}

当当前正在求值的阵法的**某一位**阵主把该实体视为友军时通过（任一位认得它就算）。

| 字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| — | — | — | 没有字段。 |

## 生命、状态与数值 {#生命、状态与数值}

### `mxt:pill_toxicity` {#mxt-pill-toxicity}

比较实体身上累计的丹毒。

| 字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `comparison` | 比较运算符 | **必填** | `==`、`!=`、`<`、`<=`、`>` 或 `>=`。 |
| `compare_to` | Double | **必填** | 比较的数值。 |

```json
{"type": "mxt:pill_toxicity", "comparison": ">=", "compare_to": 100}
```

形状与 `mxt:health` 相同。从未服过丹药的实体读 `0`，也不会因此多出一份空记录。丹毒怎么涨、阈值在哪、过量后剩多少写在 [pill](../../json/pill.md)；要直接改写这个数用 `mxt:modify_pill_toxicity`。

### `mxt:has_equipped_item` {#mxt-has-equipped-item}

当实体穿戴或手持的物品堆满足一条[物品条件](./item_condition_types.md)时通过。

| 字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `item_condition?` | [物品条件](./item_condition_types.md) | 无条件 | 对每一堆物品测的条件。 |
| `slots?` | 槽位名或数组 | 全部原版槽位与全部 Curios 槽位 | 限定要检查的槽位。 |

```json
{"type": "mxt:has_equipped_item", "item_condition": {"type": "mxt:item_tag", "tag": "#example:swords"}}
```

这是把被动 `mxt:modifier` 绑定在装备上的自然做法。`slots` 可以写原版装备槽名（`mainhand`、`offhand`、`head`、`chest`、`legs`、`feet`、`body`），也可以写带 `curios:` 前缀的 Curios 槽位（`curios:back_weapon`）；不写则询问全部原版槽位与全部 Curios 槽位。匹配不到任何东西的名字只是永远不通过。

## Reincarnation 寿元 {#reincarnation-寿元}

### `reincarnation:lifespan` {#reincarnation-lifespan}

比较有限寿元。field 默认为 remaining，还可选 total、fraction、spent；fraction 为剩余/总额（总额 0 时按 0），spent 为总额减剩余。无限账本返回 false。

```json
{"type":"reincarnation:lifespan","field":"fraction","comparison":"<","compare_to":0.1}
```

### `reincarnation:lifespan_state` {#reincarnation-lifespan-state}

state 必填：finite 包含剩余为 0；unlimited 包含未记账与关闭账本；unaccounted 表示从未记账；expired 表示剩余为 0。

```json
{"type":"reincarnation:lifespan_state","state":"expired"}
```

### `reincarnation:generation` {#reincarnation-generation}

比较服务端玩家可见的世代编号，从 1 起；非玩家返回 false。

```json
{"type":"reincarnation:generation","comparison":">=","compare_to":2}
```
