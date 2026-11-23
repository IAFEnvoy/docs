---
title: 数据包
description: 配置寿元行为、条件、公式变量与转生标签。
sidebar_position: 3
---

## 实体行为 {#actions}

这些类型可用于 [Saturn](../../library/saturn/index.md) 的实体行为字段。

| 类型 | 字段 | 作用 |
| --- | --- | --- |
| `reincarnation:add_lifespan` | 必填 `amount`（NumberProvider） | 同时增加剩余与总寿元。 |
| `reincarnation:remove_lifespan` | 必填 `amount`（NumberProvider） | 扣减剩余寿元，最低为零。总寿元保持不变。 |
| `reincarnation:unlimited_lifespan` | 无 | 关闭寿元账本。 |
| `reincarnation:reincarnate` | 可选 `mode` 与 `reason` | 排队转生。`mode` 默认 `configured`，也接受 `new_life` 和 `reset`。`reason` 为聊天组件。非玩家生物原地重置。 |

增寿与减寿的求值结果必须是有限非负数，单位为游戏刻，通过 `Math.round` 取整。零不改变账本。关闭自然老化后仍可对存活实体使用这些行为。

```json
{ "type": "reincarnation:add_lifespan", "amount": 2400 }
```

```json
{ "type": "reincarnation:reincarnate", "mode": "new_life", "reason": { "text": "重新开始" } }
```

## 实体条件 {#conditions}

| 类型 | 字段 | 判定方式 |
| --- | --- | --- |
| `reincarnation:lifespan` | 必填 `comparison` 与 `compare_to`，可选 `field` | 比较有限账本。`field` 默认 `remaining`，也接受 `total`、`spent`（总额减剩余）与 `fraction`（剩余除以总额，总额为零时取零）。 |
| `reincarnation:lifespan_state` | 必填 `state` | `finite` 包含剩余为零的有限账本。`unlimited` 包含未记账与已关闭账本。`unaccounted` 匹配未初始化账本的实体。`expired` 匹配剩余为零。 |
| `reincarnation:generation` | 必填 `comparison` 与 `compare_to` | 比较服务端玩家的可见世数，从 `1` 开始。 |

比较运算符支持 `<`、`<=`、`>`、`>=`、`==` 与 `!=`。

```json
{ "type": "reincarnation:lifespan", "field": "fraction", "comparison": "<", "compare_to": 0.1 }
```

## 公式变量 {#variables}

`lifespan_remaining` 和 `lifespan_total` 分别读取施法者的剩余寿元与总寿元，单位为刻。没有施法者时读取上下文玩家。负值或没有实体时返回 `NaN`。例如，已关闭账本的剩余值为 `NaN`，总额为 `0`。

## 死因筛选 {#death-filter}

同时开启死亡自动转生与死因筛选时，只有 `reincarnation:reincarnate_on_death` 标签内的伤害类型可在重生时触发换世。下例在内置寿元伤害的基础上加入坠落伤害。

```json title="data/reincarnation/tags/damage_type/reincarnate_on_death.json"
{
  "replace": false,
  "values": ["minecraft:fall"]
}
```

## 附件保留 {#attachment-retention}

在 `reincarnation:keep_on_rebirth` 中列出要保留的实体附件类型。附件须支持 NeoForge 死亡复制。完整换世时，转生会将选定的 ID 随前世归档，恢复时使用归档中的列表。清除未知模组数据的配置优先于标签和 Saturn 数值资源保留规则。

```json title="data/reincarnation/tags/neoforge/attachment_types/keep_on_rebirth.json"
{
  "replace": false,
  "values": ["saturn:resource_holder"]
}
```

## 档案信息行 {#information-rows}

档案使用 [Saturn 信息组和信息行](../../library/saturn/guides/information.md)。内置信息组及其信息行标签均为 `reincarnation:life`。扩展该标签可追加信息行。表达式 `{"type":"reincarnation:lifespan"}` 从选中的快照读取年龄与总寿元，并隐藏未记账的实体。使用 `{"type":"reincarnation:life","value":"generation"}` 可显示世数，将 `value` 改为 `reason` 可显示转生原因。
