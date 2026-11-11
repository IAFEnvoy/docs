---
title: item_action_type（物品行为）
description: 模组注册的全部内置物品行为类型，以及每种类型接受的 JSON 字段。
---

# item_action_type（物品行为）

<span id="item-action-type-物品行为" />

:::info 与 Saturn 共享的类型
本页只列 MXT 自有类型；与 Saturn 共享的类型（含 `mxt:` 别名写法）见 [Saturn 类型参考](../../../../../library/saturn/types/action/item-action.md)。
:::

**物品行为**作用于单个物品堆。持有者实体与物品堆由声明该行为的那个定义提供，行为本身只描述要对交给它的物品堆做什么。

物品行为属于 Java（内置）注册表，`type` id 固定，数据包无法新增。`type` 写在行为对象里，与它的字段平级，取值是带 `mxt` 命名空间、列在本页表中的 id 之一。数据包不会在这个注册表中新增或删除条目，只有 Java 代码或 KubeJS 桥接能引入自定义行为类型——见 [KubeJS API](../../../kubejs/api-reference.md)。

```json
{
  "type": "mxt:damage_item",
  "amount": 1
}
```

行为通常作为值嵌在其他定义的字段下，例如 `item_action`：

```json
"item_action": {
  "type": "mxt:consume_item",
  "count": 1
}
```

任何需要物品行为的地方也接受数组。数组是 [`mxt:sequence`](../../../../../library/saturn/types/action/item-action.md#saturnsequence) 的简写，按顺序执行其中的条目：

```json
"item_action": [
  { "type": "mxt:damage_item", "amount": 1 },
  { "type": "mxt:cooldown", "ticks": 40 }
]
```

行为字段几乎都是可选的，默认值就是 `mxt:no_op`：写了 `condition` 却忘了 `action` 这类漏写在加载期不报错，只是那一项什么都不做。

:::info 物品行为的运行位置
物品行为需要一个物品堆作为作用对象，因此通常经由已经提供物品堆的那张表到达——例如[实体行为](./entity_action_types.md) `mxt:equipped_item_action`，它同时提供装备槽位。没有物品堆时行为不跑。[物品条件](../condition/item_condition_types.md)是与之配对的条件家族。
:::

:::tip 数据包可视化编辑器
[数据包可视化编辑器](https://datapack.mcdev.tech/) 能够交互式地展示每种类型的字段列表，便于在不查阅本页表格的情况下确认字段名。
:::

## 行为类型 {#行为类型}

| 类型 | 字段 | 说明 |
| --- | --- | --- |
| `mxt:damage_item` | `amount` | 给该物品堆增加耐久损伤，并夹取到其最大损伤值。 |
| `mxt:consume_item` | `count` | 按给定数量缩减该物品堆。 |
| `mxt:charge_artifact` | `aura`、`amount`、`capacity?` | 给一件法器物品堆的**某一种灵气**增加存量；`aura`（具体灵气）与 `amount` 都必填。上限取该物品堆匹配到的 `artifact` 为这种灵气声明的 `spirit_capacity`；`capacity`（默认 `0`）只是**回退**：物品堆没有任何定义认领、或定义没有声明这种灵气时，用它当上限。 |
| `mxt:consume_health` | `amount` | 对持有者造成一次原版**秘法伤害**——「以血为代价」的写法。它不预检也不拒绝，付不付得起由声明它的那张表决定。 |
| `mxt:cooldown` | `ticks` | 让该物品堆在持有者身上进入原版物品冷却，持续给定的 tick 数。 |
| `mxt:remove_enchantment` | `enchantment?`、`level?`、`reset_repair_cost?` | 移除或降低该物品堆上的附魔，并可选择重置其修复成本。 |
| `mxt:add_enchantment` | `enchantments`、`override?` | 给该物品堆添加或升级附魔。 |
| `mxt:merge_components` | `components` | 把一份原版数据组件补丁合并进该物品堆。 |
| `mxt:add_ability` | `abilities` | 把技能并进该物品堆的 `mxt:item_abilities` 数据组件：已经写过的一条不会写第二遍，组件里原有的条目一律保留。它是这个组件的**专用生产者**。 |

### `mxt:charge_artifact` {#mxt-charge-artifact}

给一件法器物品堆的某一种灵气增加存量。

| 字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `aura` | 灵气 id | **必填** | 要灌的**具体**灵气，写 id；不接受 `#标签`，也不接受数组。 |
| `amount` | 数值提供器 | **必填** | 要灌的量；求值不是有限值或小于等于 `0` 时什么都不做。 |
| `capacity` | 数值提供器 | `0` | 上限的**回退值**，只在这件物品堆没有定义认领、或认领它的定义没给出这种灵气的有效上限时生效。 |

```json
"item_action": {
  "type": "mxt:charge_artifact",
  "aura": "example:spirit_qi",
  "amount": 10
}
```

上限优先取这件物品堆匹配到的 `artifact` 为这种灵气声明的 `spirit_capacity`；定义声明了但求值结果不是有限值或小于等于 `0` 时落回 `capacity`，`capacity` 也一样无效时上限按 `0`，灌不进去且静默无事发生。有效上限是声明上限乘以温养加成 `1 + 0.5 × 温养度`，求值后**向下取整**，所以灌满允许超过声明值、最多到 1.5 倍。实收量是 `amount` 与「上限减存量」里的较小值，存量只增不减；一次收下的量里超出上限的部分直接丢弃，不会溢出到别的灵气。

这条行为需要服务端与一个持有者，没有持有者时直接返回。每真的收下一点，温养度按「收下的量 ÷ 本次有效上限」上涨，只升不降。

### `mxt:add_ability` {#mxt-add-ability}

把技能并进该物品堆的 `mxt:item_abilities` 数据组件。

| 字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `abilities` | 技能 id 的列表 | **必填** | 要写进组件的技能；不接受 `#标签`。 |

```json
"claim_action": { "type": "mxt:add_ability", "abilities": ["example:sword_focus"] }
```

已经写过的一条不会写第二遍，组件里原有的条目一律保留。物品堆为空、或 `abilities` 为空列表时什么都不做。

除了定义里的 `abilities`，一件物品还能靠数据组件 `mxt:item_abilities`（`{"abilities": ["example:foo"]}`）自带技能：运行时读的是**定义声明的与组件写的并集**，所以同一件法器定义认领的两堆物品可以带不一样的技能。组件里只存**技能 id**，不收标签（标签在定义那一侧的 `abilities` 里展开），所以写下的每个 id 都要能在技能注册表里解析出来，解析不出来的条目会被丢掉。这条行为写入的是 id，读的是当前注册表，因此新写下的 id 要在物品重新被运行时读到那一步才生效。
