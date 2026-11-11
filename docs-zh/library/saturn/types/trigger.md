---
title: "触发器"
sidebar_label: "触发器 (Trigger)"
sidebar_position: 23
---

# 触发器

触发器匹配已发布的服务端信号。它可以用于触发规则或触发型技能；注册本身不执行动作。见[触发器生命周期](../guides/triggers.md)。

### `saturn:advancement_completed` {#saturnadvancement_completed}

在整个 Minecraft 成就完成时发布信号，可按成就 ID 筛选。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:advancement_completed` |
| `advancement` | 资源 ID | 否 | 省略 | Minecraft 成就 ID；省略则接受任意成就完成。 |

当前源码新增：信号为 `TriggerSignals.ADVANCEMENT_COMPLETED`，`TriggerPayload.ADVANCEMENT` 保存完成成就的 `Identifier`。包含隐藏成就与配方解锁；登录不补发，撤销后再次完成会再次触发。订阅者负责持久化去重。系统尚未接入，现有 `system-advancements.json` 保持原行为。

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:advancement_completed",
  "advancement": "minecraft:story/mine_diamond"
}
```

</details>

### `saturn:attack` {#saturnattack}

实体攻击目标时发布信号。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:attack` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:attack"
}
```

</details>

### `saturn:block_break` {#saturnblock_break}

玩家破坏方块时发布信号。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:block_break` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:block_break"
}
```

</details>

### `saturn:block_use` {#saturnblock_use}

玩家与方块交互时发布信号。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:block_use` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:block_use"
}
```

</details>

### `saturn:bred_animals` {#saturnbred_animals}

动物成功繁殖时向相关玩家发布信号。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:bred_animals` |
| `player` | 原版谓词 | 否 | 省略 | 原版玩家谓词；玩家模型节点中是玩家 UUID 参数。 |
| `parent` | 原版谓词 | 否 | 省略 | 父代实体谓词。 |
| `partner` | 原版谓词 | 否 | 省略 | 配偶实体谓词。 |
| `child` | 原版谓词 | 否 | 省略 | 子代实体谓词。 |

参数复用 Minecraft 26.1.2 对应准则的 Codec，但信号由 Saturn 发布，不创建或授予原版成就。原版 player / entity / item 谓词与 Saturn EntityCondition / ItemCondition 是不同格式。

原版准则的可选范围省略或写空范围对象时表示不增加该范围限制；player 谓词仍遵从该准则的原版格式。

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:bred_animals"
}
```

</details>

### `saturn:brewed_potion` {#saturnbrewed_potion}

玩家酿造药水时匹配原版酿造准则参数。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:brewed_potion` |
| `player` | 原版谓词 | 否 | 省略 | 原版玩家谓词；玩家模型节点中是玩家 UUID 参数。 |
| `potion` | 资源 ID | 否 | 省略 | 药水 ID。 |

参数复用 Minecraft 26.1.2 对应准则的 Codec，但信号由 Saturn 发布，不创建或授予原版成就。原版 player / entity / item 谓词与 Saturn EntityCondition / ItemCondition 是不同格式。

原版准则的可选范围省略或写空范围对象时表示不增加该范围限制；player 谓词仍遵从该准则的原版格式。

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:brewed_potion"
}
```

</details>

### `saturn:changed_dimension` {#saturnchanged_dimension}

玩家发生维度切换时发布信号。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:changed_dimension` |
| `player` | 原版谓词 | 否 | 省略 | 原版玩家谓词；玩家模型节点中是玩家 UUID 参数。 |
| `from` | 资源 ID | 否 | 省略 | 起点维度 ID。 |
| `to` | 资源 ID | 否 | 省略 | 目标维度 ID。 |

参数复用 Minecraft 26.1.2 对应准则的 Codec，但信号由 Saturn 发布，不创建或授予原版成就。原版 player / entity / item 谓词与 Saturn EntityCondition / ItemCondition 是不同格式。

原版准则的可选范围省略或写空范围对象时表示不增加该范围限制；player 谓词仍遵从该准则的原版格式。

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:changed_dimension"
}
```

</details>

### `saturn:consume_item` {#saturnconsume_item}

减少上下文物品堆的数量。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:consume_item` |
| `player` | 原版谓词 | 否 | 省略 | 原版玩家谓词；玩家模型节点中是玩家 UUID 参数。 |
| `item` | 原版谓词 | 否 | 省略 | 原版 ItemPredicate，筛选本次事件中的物品。 |

参数复用 Minecraft 26.1.2 对应准则的 Codec，但信号由 Saturn 发布，不创建或授予原版成就。原版 player / entity / item 谓词与 Saturn EntityCondition / ItemCondition 是不同格式。

原版准则的可选范围省略或写空范围对象时表示不增加该范围限制；player 谓词仍遵从该准则的原版格式。

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:consume_item"
}
```

</details>

### `saturn:death` {#saturndeath}

实体死亡时发布信号。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:death` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:death"
}
```

</details>

### `saturn:effects_changed` {#saturneffects_changed}

玩家的状态效果发生变化时发布信号。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:effects_changed` |
| `player` | 原版谓词 | 否 | 省略 | 原版玩家谓词；玩家模型节点中是玩家 UUID 参数。 |
| `effects` | 原版谓词 | 否 | 省略 | 状态效果列表或原版效果谓词。 |
| `source` | 原版谓词 | 否 | 省略 | 输入集合、资源路径或上下文参数，详见本页用途。 |

参数复用 Minecraft 26.1.2 对应准则的 Codec，但信号由 Saturn 发布，不创建或授予原版成就。原版 player / entity / item 谓词与 Saturn EntityCondition / ItemCondition 是不同格式。

原版准则的可选范围省略或写空范围对象时表示不增加该范围限制；player 谓词仍遵从该准则的原版格式。

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:effects_changed"
}
```

</details>

### `saturn:enter_block` {#saturnenter_block}

轮询玩家进入的方块并匹配方块状态。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:enter_block` |
| `player` | 原版谓词 | 否 | 省略 | 原版玩家谓词；玩家模型节点中是玩家 UUID 参数。 |
| `block` | 资源 ID | 否 | 省略 | 方块 ID 或方块参数。 |
| `state` | 原版谓词 | 否 | 省略 | 方块状态属性谓词。 |

参数复用 Minecraft 26.1.2 对应准则的 Codec，但信号由 Saturn 发布，不创建或授予原版成就。原版 player / entity / item 谓词与 Saturn EntityCondition / ItemCondition 是不同格式。

原版准则的可选范围省略或写空范围对象时表示不增加该范围限制；player 谓词仍遵从该准则的原版格式。

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:enter_block"
}
```

</details>

### `saturn:entity_hurt_player` {#saturnentity_hurt_player}

玩家受到实体伤害时发布信号。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:entity_hurt_player` |
| `player` | 原版谓词 | 否 | 省略 | 原版玩家谓词；玩家模型节点中是玩家 UUID 参数。 |
| `damage` | 原版谓词 | 否 | 省略 | 原版伤害谓词。 |

参数复用 Minecraft 26.1.2 对应准则的 Codec，但信号由 Saturn 发布，不创建或授予原版成就。原版 player / entity / item 谓词与 Saturn EntityCondition / ItemCondition 是不同格式。

原版准则的可选范围省略或写空范围对象时表示不增加该范围限制；player 谓词仍遵从该准则的原版格式。

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:entity_hurt_player"
}
```

</details>

### `saturn:entity_killed_player` {#saturnentity_killed_player}

玩家被实体击杀时发布信号。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:entity_killed_player` |
| `player` | 原版谓词 | 否 | 省略 | 原版玩家谓词；玩家模型节点中是玩家 UUID 参数。 |
| `entity` | 原版谓词 | 否 | 省略 | 原版实体谓词。 |
| `killing_blow` | 原版谓词 | 否 | 省略 | 致死伤害源谓词。 |

参数复用 Minecraft 26.1.2 对应准则的 Codec，但信号由 Saturn 发布，不创建或授予原版成就。原版 player / entity / item 谓词与 Saturn EntityCondition / ItemCondition 是不同格式。

原版准则的可选范围省略或写空范围对象时表示不增加该范围限制；player 谓词仍遵从该准则的原版格式。

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:entity_killed_player"
}
```

</details>

### `saturn:equip` {#saturnequip}

实体装备发生变化时发布信号。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:equip` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:equip"
}
```

</details>

### `saturn:fall_after_explosion` {#saturnfall_after_explosion}

匹配爆炸造成的移动和后续下落。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:fall_after_explosion` |
| `player` | 原版谓词 | 否 | 省略 | 原版玩家谓词；玩家模型节点中是玩家 UUID 参数。 |
| `start_position` | 原版谓词 | 否 | 省略 | 起点位置谓词。 |
| `distance` | 原版谓词 | 否 | 省略 | 距离或原版距离谓词。 |
| `cause` | 原版谓词 | 否 | 省略 | 造成事件的实体谓词。 |

参数复用 Minecraft 26.1.2 对应准则的 Codec，但信号由 Saturn 发布，不创建或授予原版成就。原版 player / entity / item 谓词与 Saturn EntityCondition / ItemCondition 是不同格式。

原版准则的可选范围省略或写空范围对象时表示不增加该范围限制；player 谓词仍遵从该准则的原版格式。

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:fall_after_explosion"
}
```

</details>

### `saturn:fall_from_height` {#saturnfall_from_height}

根据记录的下落起点与距离匹配信号。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:fall_from_height` |
| `player` | 原版谓词 | 否 | 省略 | 原版玩家谓词；玩家模型节点中是玩家 UUID 参数。 |
| `start_position` | 原版谓词 | 否 | 省略 | 起点位置谓词。 |
| `distance` | 原版谓词 | 否 | 省略 | 距离或原版距离谓词。 |

参数复用 Minecraft 26.1.2 对应准则的 Codec，但信号由 Saturn 发布，不创建或授予原版成就。原版 player / entity / item 谓词与 Saturn EntityCondition / ItemCondition 是不同格式。

原版准则的可选范围省略或写空范围对象时表示不增加该范围限制；player 谓词仍遵从该准则的原版格式。

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:fall_from_height"
}
```

</details>

### `saturn:filled_bucket` {#saturnfilled_bucket}

玩家完成装桶行为时匹配结果物品。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:filled_bucket` |
| `player` | 原版谓词 | 否 | 省略 | 原版玩家谓词；玩家模型节点中是玩家 UUID 参数。 |
| `item` | 原版谓词 | 否 | 省略 | 原版 ItemPredicate，筛选本次事件中的物品。 |

参数复用 Minecraft 26.1.2 对应准则的 Codec，但信号由 Saturn 发布，不创建或授予原版成就。原版 player / entity / item 谓词与 Saturn EntityCondition / ItemCondition 是不同格式。

原版准则的可选范围省略或写空范围对象时表示不增加该范围限制；player 谓词仍遵从该准则的原版格式。

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:filled_bucket"
}
```

</details>

### `saturn:fishing_rod_hooked` {#saturnfishing_rod_hooked}

钓鱼完成时匹配钓竿、实体和渔获参数。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:fishing_rod_hooked` |
| `player` | 原版谓词 | 否 | 省略 | 原版玩家谓词；玩家模型节点中是玩家 UUID 参数。 |
| `rod` | 原版谓词 | 否 | 省略 | 钓竿物品谓词。 |
| `entity` | 原版谓词 | 否 | 省略 | 原版实体谓词。 |
| `item` | 原版谓词 | 否 | 省略 | 原版 ItemPredicate，筛选本次事件中的物品。 |

参数复用 Minecraft 26.1.2 对应准则的 Codec，但信号由 Saturn 发布，不创建或授予原版成就。原版 player / entity / item 谓词与 Saturn EntityCondition / ItemCondition 是不同格式。

原版准则的可选范围省略或写空范围对象时表示不增加该范围限制；player 谓词仍遵从该准则的原版格式。

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:fishing_rod_hooked"
}
```

</details>

### `saturn:hurt` {#saturnhurt}

实体受到伤害时发布信号。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:hurt` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:hurt"
}
```

</details>

### `saturn:inventory_changed` {#saturninventory_changed}

根据背包快照变化匹配原版物品和槽位谓词。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:inventory_changed` |
| `player` | 原版谓词 | 否 | 省略 | 原版玩家谓词；玩家模型节点中是玩家 UUID 参数。 |
| `slots` | 原版槽位范围对象 | 否 | `{}` | 原版背包槽位数量谓词。 |
| `items` | 原版谓词数组 | 否 | `[]` | 物品匹配条目、物品谓词或物品列表。 |

参数复用 Minecraft 26.1.2 对应准则的 Codec，但信号由 Saturn 发布，不创建或授予原版成就。原版 player / entity / item 谓词与 Saturn EntityCondition / ItemCondition 是不同格式。

原版准则的可选范围省略或写空范围对象时表示不增加该范围限制；player 谓词仍遵从该准则的原版格式。

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:inventory_changed"
}
```

</details>

### `saturn:item_durability_changed` {#saturnitem_durability_changed}

匹配物品耐久与耐久变化量。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:item_durability_changed` |
| `player` | 原版谓词 | 否 | 省略 | 原版玩家谓词；玩家模型节点中是玩家 UUID 参数。 |
| `item` | 原版谓词 | 否 | 省略 | 原版 ItemPredicate，筛选本次事件中的物品。 |
| `durability` | 数值或范围对象 | 否 | `{}` | 本类型的 durability 参数。 |
| `delta` | 数值或范围对象 | 否 | `{}` | 耐久变化量范围。 |

参数复用 Minecraft 26.1.2 对应准则的 Codec，但信号由 Saturn 发布，不创建或授予原版成就。原版 player / entity / item 谓词与 Saturn EntityCondition / ItemCondition 是不同格式。

原版准则的可选范围省略或写空范围对象时表示不增加该范围限制；player 谓词仍遵从该准则的原版格式。

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:item_durability_changed"
}
```

</details>

### `saturn:item_use` {#saturnitem_use}

实体完成一次物品使用时发布信号。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:item_use` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:item_use"
}
```

</details>

### `saturn:kill` {#saturnkill}

实体击杀其他实体时发布信号。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:kill` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:kill"
}
```

</details>

### `saturn:levitation` {#saturnlevitation}

轮询玩家漂浮过程中的距离和持续时间。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:levitation` |
| `player` | 原版谓词 | 否 | 省略 | 原版玩家谓词；玩家模型节点中是玩家 UUID 参数。 |
| `distance` | 原版谓词 | 否 | 省略 | 距离或原版距离谓词。 |
| `duration` | 数值或范围对象 | 否 | `{}` | 持续时长，通常以游戏 tick 计。 |

参数复用 Minecraft 26.1.2 对应准则的 Codec，但信号由 Saturn 发布，不创建或授予原版成就。原版 player / entity / item 谓词与 Saturn EntityCondition / ItemCondition 是不同格式。

原版准则的可选范围省略或写空范围对象时表示不增加该范围限制；player 谓词仍遵从该准则的原版格式。

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:levitation"
}
```

</details>

### `saturn:lightning_strike` {#saturnlightning_strike}

发生闪电事件时匹配相关玩家、闪电和附近实体。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:lightning_strike` |
| `player` | 原版谓词 | 否 | 省略 | 原版玩家谓词；玩家模型节点中是玩家 UUID 参数。 |
| `lightning` | 原版谓词 | 否 | 省略 | 闪电实体谓词。 |
| `bystander` | 原版谓词 | 否 | 省略 | 旁观实体谓词。 |

参数复用 Minecraft 26.1.2 对应准则的 Codec，但信号由 Saturn 发布，不创建或授予原版成就。原版 player / entity / item 谓词与 Saturn EntityCondition / ItemCondition 是不同格式。

原版准则的可选范围省略或写空范围对象时表示不增加该范围限制；player 谓词仍遵从该准则的原版格式。

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:lightning_strike"
}
```

</details>

### `saturn:location` {#saturnlocation}

读取实体位置和维度。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:location` |
| `player` | 原版谓词 | 否 | 省略 | 原版玩家谓词；玩家模型节点中是玩家 UUID 参数。 |

参数复用 Minecraft 26.1.2 对应准则的 Codec，但信号由 Saturn 发布，不创建或授予原版成就。原版 player / entity / item 谓词与 Saturn EntityCondition / ItemCondition 是不同格式。

原版准则的可选范围省略或写空范围对象时表示不增加该范围限制；player 谓词仍遵从该准则的原版格式。

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:location"
}
```

</details>

### `saturn:nether_travel` {#saturnnether_travel}

匹配下界旅行的起点与距离。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:nether_travel` |
| `player` | 原版谓词 | 否 | 省略 | 原版玩家谓词；玩家模型节点中是玩家 UUID 参数。 |
| `start_position` | 原版谓词 | 否 | 省略 | 起点位置谓词。 |
| `distance` | 原版谓词 | 否 | 省略 | 距离或原版距离谓词。 |

参数复用 Minecraft 26.1.2 对应准则的 Codec，但信号由 Saturn 发布，不创建或授予原版成就。原版 player / entity / item 谓词与 Saturn EntityCondition / ItemCondition 是不同格式。

原版准则的可选范围省略或写空范围对象时表示不增加该范围限制；player 谓词仍遵从该准则的原版格式。

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:nether_travel"
}
```

</details>

### `saturn:player_hurt_entity` {#saturnplayer_hurt_entity}

玩家对实体造成伤害时发布信号。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:player_hurt_entity` |
| `player` | 原版谓词 | 否 | 省略 | 原版玩家谓词；玩家模型节点中是玩家 UUID 参数。 |
| `damage` | 原版谓词 | 否 | 省略 | 原版伤害谓词。 |
| `entity` | 原版谓词 | 否 | 省略 | 原版实体谓词。 |

参数复用 Minecraft 26.1.2 对应准则的 Codec，但信号由 Saturn 发布，不创建或授予原版成就。原版 player / entity / item 谓词与 Saturn EntityCondition / ItemCondition 是不同格式。

原版准则的可选范围省略或写空范围对象时表示不增加该范围限制；player 谓词仍遵从该准则的原版格式。

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:player_hurt_entity"
}
```

</details>

### `saturn:player_interacted_with_entity` {#saturnplayer_interacted_with_entity}

玩家与实体交互时发布信号。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:player_interacted_with_entity` |
| `player` | 原版谓词 | 否 | 省略 | 原版玩家谓词；玩家模型节点中是玩家 UUID 参数。 |
| `item` | 原版谓词 | 否 | 省略 | 原版 ItemPredicate，筛选本次事件中的物品。 |
| `entity` | 原版谓词 | 否 | 省略 | 原版实体谓词。 |

参数复用 Minecraft 26.1.2 对应准则的 Codec，但信号由 Saturn 发布，不创建或授予原版成就。原版 player / entity / item 谓词与 Saturn EntityCondition / ItemCondition 是不同格式。

原版准则的可选范围省略或写空范围对象时表示不增加该范围限制；player 谓词仍遵从该准则的原版格式。

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:player_interacted_with_entity"
}
```

</details>

### `saturn:player_killed_entity` {#saturnplayer_killed_entity}

玩家击杀实体时发布信号。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:player_killed_entity` |
| `player` | 原版谓词 | 否 | 省略 | 原版玩家谓词；玩家模型节点中是玩家 UUID 参数。 |
| `entity` | 原版谓词 | 否 | 省略 | 原版实体谓词。 |
| `killing_blow` | 原版谓词 | 否 | 省略 | 致死伤害源谓词。 |

参数复用 Minecraft 26.1.2 对应准则的 Codec，但信号由 Saturn 发布，不创建或授予原版成就。原版 player / entity / item 谓词与 Saturn EntityCondition / ItemCondition 是不同格式。

原版准则的可选范围省略或写空范围对象时表示不增加该范围限制；player 谓词仍遵从该准则的原版格式。

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:player_killed_entity"
}
```

</details>

### `saturn:ride_entity_in_lava` {#saturnride_entity_in_lava}

匹配玩家在熔岩中骑乘的移动距离。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:ride_entity_in_lava` |
| `player` | 原版谓词 | 否 | 省略 | 原版玩家谓词；玩家模型节点中是玩家 UUID 参数。 |
| `start_position` | 原版谓词 | 否 | 省略 | 起点位置谓词。 |
| `distance` | 原版谓词 | 否 | 省略 | 距离或原版距离谓词。 |

参数复用 Minecraft 26.1.2 对应准则的 Codec，但信号由 Saturn 发布，不创建或授予原版成就。原版 player / entity / item 谓词与 Saturn EntityCondition / ItemCondition 是不同格式。

原版准则的可选范围省略或写空范围对象时表示不增加该范围限制；player 谓词仍遵从该准则的原版格式。

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:ride_entity_in_lava"
}
```

</details>

### `saturn:shot_crossbow` {#saturnshot_crossbow}

玩家用弩射击时发布信号。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:shot_crossbow` |
| `player` | 原版谓词 | 否 | 省略 | 原版玩家谓词；玩家模型节点中是玩家 UUID 参数。 |
| `item` | 原版谓词 | 否 | 省略 | 原版 ItemPredicate，筛选本次事件中的物品。 |

参数复用 Minecraft 26.1.2 对应准则的 Codec，但信号由 Saturn 发布，不创建或授予原版成就。原版 player / entity / item 谓词与 Saturn EntityCondition / ItemCondition 是不同格式。

原版准则的可选范围省略或写空范围对象时表示不增加该范围限制；player 谓词仍遵从该准则的原版格式。

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:shot_crossbow"
}
```

</details>

### `saturn:slept_in_bed` {#saturnslept_in_bed}

玩家在床上睡眠时发布信号。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:slept_in_bed` |
| `player` | 原版谓词 | 否 | 省略 | 原版玩家谓词；玩家模型节点中是玩家 UUID 参数。 |

参数复用 Minecraft 26.1.2 对应准则的 Codec，但信号由 Saturn 发布，不创建或授予原版成就。原版 player / entity / item 谓词与 Saturn EntityCondition / ItemCondition 是不同格式。

原版准则的可选范围省略或写空范围对象时表示不增加该范围限制；player 谓词仍遵从该准则的原版格式。

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:slept_in_bed"
}
```

</details>

### `saturn:started_riding` {#saturnstarted_riding}

玩家开始骑乘时发布信号。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:started_riding` |
| `player` | 原版谓词 | 否 | 省略 | 原版玩家谓词；玩家模型节点中是玩家 UUID 参数。 |

参数复用 Minecraft 26.1.2 对应准则的 Codec，但信号由 Saturn 发布，不创建或授予原版成就。原版 player / entity / item 谓词与 Saturn EntityCondition / ItemCondition 是不同格式。

原版准则的可选范围省略或写空范围对象时表示不增加该范围限制；player 谓词仍遵从该准则的原版格式。

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:started_riding"
}
```

</details>

### `saturn:tame_animal` {#saturntame_animal}

玩家成功驯服动物时发布信号。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:tame_animal` |
| `player` | 原版谓词 | 否 | 省略 | 原版玩家谓词；玩家模型节点中是玩家 UUID 参数。 |
| `entity` | 原版谓词 | 否 | 省略 | 原版实体谓词。 |

参数复用 Minecraft 26.1.2 对应准则的 Codec，但信号由 Saturn 发布，不创建或授予原版成就。原版 player / entity / item 谓词与 Saturn EntityCondition / ItemCondition 是不同格式。

原版准则的可选范围省略或写空范围对象时表示不增加该范围限制；player 谓词仍遵从该准则的原版格式。

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:tame_animal"
}
```

</details>

### `saturn:thrown_item_picked_up_by_player` {#saturnthrown_item_picked_up_by_player}

玩家拾取有投掷者信息的物品时发布信号。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:thrown_item_picked_up_by_player` |
| `player` | 原版谓词 | 否 | 省略 | 原版玩家谓词；玩家模型节点中是玩家 UUID 参数。 |
| `item` | 原版谓词 | 否 | 省略 | 原版 ItemPredicate，筛选本次事件中的物品。 |
| `entity` | 原版谓词 | 否 | 省略 | 原版实体谓词。 |

参数复用 Minecraft 26.1.2 对应准则的 Codec，但信号由 Saturn 发布，不创建或授予原版成就。原版 player / entity / item 谓词与 Saturn EntityCondition / ItemCondition 是不同格式。

原版准则的可选范围省略或写空范围对象时表示不增加该范围限制；player 谓词仍遵从该准则的原版格式。

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:thrown_item_picked_up_by_player"
}
```

</details>

### `saturn:tick` {#saturntick}

在服务端实体 tick 时发布信号。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:tick` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:tick"
}
```

</details>

### `saturn:used_totem` {#saturnused_totem}

玩家消耗图腾避免死亡时发布信号。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:used_totem` |
| `player` | 原版谓词 | 否 | 省略 | 原版玩家谓词；玩家模型节点中是玩家 UUID 参数。 |
| `item` | 原版谓词 | 否 | 省略 | 原版 ItemPredicate，筛选本次事件中的物品。 |

参数复用 Minecraft 26.1.2 对应准则的 Codec，但信号由 Saturn 发布，不创建或授予原版成就。原版 player / entity / item 谓词与 Saturn EntityCondition / ItemCondition 是不同格式。

原版准则的可选范围省略或写空范围对象时表示不增加该范围限制；player 谓词仍遵从该准则的原版格式。

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:used_totem"
}
```

</details>

### `saturn:using_item` {#saturnusing_item}

检查实体是否正在使用物品。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:using_item` |
| `player` | 原版谓词 | 否 | 省略 | 原版玩家谓词；玩家模型节点中是玩家 UUID 参数。 |
| `item` | 原版谓词 | 否 | 省略 | 原版 ItemPredicate，筛选本次事件中的物品。 |

参数复用 Minecraft 26.1.2 对应准则的 Codec，但信号由 Saturn 发布，不创建或授予原版成就。原版 player / entity / item 谓词与 Saturn EntityCondition / ItemCondition 是不同格式。

原版准则的可选范围省略或写空范围对象时表示不增加该范围限制；player 谓词仍遵从该准则的原版格式。

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:using_item"
}
```

</details>

### `saturn:villager_trade` {#saturnvillager_trade}

玩家完成与村民的交易时发布信号。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:villager_trade` |
| `player` | 原版谓词 | 否 | 省略 | 原版玩家谓词；玩家模型节点中是玩家 UUID 参数。 |
| `villager` | 原版谓词 | 否 | 省略 | 村民实体谓词。 |
| `item` | 原版谓词 | 否 | 省略 | 原版 ItemPredicate，筛选本次事件中的物品。 |

参数复用 Minecraft 26.1.2 对应准则的 Codec，但信号由 Saturn 发布，不创建或授予原版成就。原版 player / entity / item 谓词与 Saturn EntityCondition / ItemCondition 是不同格式。

原版准则的可选范围省略或写空范围对象时表示不增加该范围限制；player 谓词仍遵从该准则的原版格式。

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:villager_trade"
}
```

</details>

## 元类型

以下类型不直接判断具体值，只组合或委托其他同类类型；字段同样嵌入对应位置。

### `saturn:js` {#saturnjs}

调用由 KubeJS 注册的回调，并传入 params 参数。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:js` |
| `signal` | 资源 ID | 是 | — | 脚本触发器订阅的信号 ID。 |
| `id` | 字符串 | 是 | — | 回调、选项或条目的标识符。 |
| `params` | 对象 | 否 | `{}` | 传给脚本或公式的参数对象。 |

仅在安装 KubeJS 时注册。JSON 只选择已有回调，不会直接执行 JSON 内的 JavaScript 字符串。

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:js",
  "signal": "saturn:tick",
  "id": "example_callback",
  "params": {}
}
```

</details>
