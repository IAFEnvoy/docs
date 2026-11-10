---
title: 能力与延后动作
description: 用 Outcome 将最终选择与属性转换为 Saturn 能力和延后动作。
sidebar_position: 4
---

Plan 和 Option 都可以配置 `outcomes`。Plan 奖励按最终状态判断一次，Option 奖励还要求此项份数大于零。选择或切换预设期间不授予能力，也不执行动作。

## Outcome 字段

| 字段 | 类型 | 必填 | 默认值 | 作用 |
| --- | --- | --- | --- | --- |
| `key` | 非空字符串 | 是 | — | 奖励的稳定标识，同一所属定义内不可重复 |
| `condition` | Saturn EntityCondition | 否 | 通过 | 最终快照上的触发条件 |
| `abilities` | Saturn ability ID 数组 | 否 | `[]` | 要授予的永久能力 |
| `actions` | 延后动作数组 | 否 | `[]` | 提交后等待执行的动作 |

以下片段放入 Plan 或 Option。引用的 `example:strong_body` 需另行定义：

```json
{
  "outcomes": [
    {
      "key": "strong_body",
      "condition": {
        "type": "spb:compare",
        "left": "resource_example_strength",
        "operator": ">=",
        "right": 4
      },
      "abilities": ["example:strong_body"],
      "actions": [
        {
          "key": "starter_food",
          "delay": 1,
          "repeat": 1,
          "action": {
            "type": "saturn:give_item",
            "stack": {"id": "minecraft:bread", "count": 2}
          }
        }
      ]
    }
  ]
}
```

能力文件使用 Saturn 的[能力格式](../../../library/saturn/data/ability.md)，例如 `data/example/saturn/ability/strong_body.json`。能力由本模组按方案维护授予来源；编辑草稿不会临时获得这些能力。

## 延后动作字段

| 字段 | 类型 | 必填 | 默认值 | 作用 |
| --- | --- | --- | --- | --- |
| `key` | 非空字符串 | 是 | — | 同一 Outcome 内唯一的动作标识 |
| `delay` | NumberProvider | 否 | `1` | 向上取整，至少 1 个在线服务端 tick |
| `repeat` | NumberProvider | 否 | `1` | 向下取整后的执行次数，必须非负 |
| `action` | Saturn EntityAction | 是 | — | 提交时冻结的动作定义 |

当前每次提交最多产生 `1024` 个展开后的任务，延迟最多 `72000` tick。超过限制会阻止提交。正常 20 TPS 下，20 tick 约为 1 秒；离线期间不推进等待时间。

选项买多份不会自动复制奖励。需要按训练份数发放时，在该选项动作中显式写 `"repeat": "selected_example_train"`。每次执行都会运行完整 `action`，例如 2 个面包的动作重复 4 次会发放 8 个面包。

`condition`、`delay`、`repeat` 和本次公式变量在确认时求值或冻结。后续更改数据包不会把已提交动作替换成新定义；执行期间普通 `caster_*` 变量仍对应当时的玩家，`resource_*` 则是冻结的开局结果。

## 中断与恢复

重复提交不会重复发奖。动作执行前保存 `RUNNING` 检查点，执行后保存结果；失败或恢复时残留的运行中任务会进入需要管理员检查的状态，不自动重放。

普通 Saturn 动作没有通用的成功回执，因此不保证任意世界改动在崩溃后精确执行一次。需要此保证的自定义奖励应使用任务标识实现幂等处理。管理员操作见[任务恢复](../usage.md)。

## 从 Saturn 动作打开方案

在接受 EntityAction 的字段中嵌入：

```json
{
  "type": "spb:open_plan",
  "plan": "example:first_start"
}
```

`type` 必填；`plan` 为可选方案 ID。省略时继续当前会话，或在没有会话时选择适用的自动方案。只对服务端玩家生效，也检查当前会话与完成记录。这是嵌入式动作，不需要创建 `spb/entity_action` 文件。
