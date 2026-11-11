---
title: "时间轴节点"
sidebar_label: "时间轴节点 (TimelineEntry)"
sidebar_position: 15
---

# 时间轴节点

时间轴节点只描述本步行为。节点 ID、后继和整个时间轴由使用方组装，不是独立动态注册表。

### `saturn:action` {#saturnaction}

在时间轴中执行一个实体动作。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:action` |
| `action` | [实体动作](./action/entity-action.md) | 是 | — | 要执行的子动作；动作种类必须与当前字段要求一致。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:action",
  "action": {
    "type": "saturn:no_op"
  }
}
```

</details>

### `saturn:branch` {#saturnbranch}

在时间轴中按条件选择后续路径。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:branch` |
| `condition` | [实体条件](./condition/entity-condition.md) | 是 | — | 要检查的条件。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:branch",
  "condition": {
    "type": "saturn:always"
  }
}
```

</details>

### `saturn:idle` {#saturnidle}

在时间轴中等待指定 tick 数。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:idle` |
| `duration` | [数值提供器](./number.md) | 是 | — | 持续时长，通常以游戏 tick 计。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:idle",
  "duration": 1
}
```

</details>

### `saturn:wait_for` {#saturnwait_for}

等待实体条件成立，可指定超时和超时结果。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:wait_for` |
| `condition` | [实体条件](./condition/entity-condition.md) | 是 | — | 要检查的条件。 |
| `timeout` | [数值提供器](./number.md) | 否 | 省略 | 可选超时 tick 数，省略表示不设超时。 |
| `on_timeout` | 枚举字符串 | 否 | `"fail"` | 超时时使用的时间轴结果。 可用值：`fail`、`finish`。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:wait_for",
  "condition": {
    "type": "saturn:always"
  }
}
```

</details>
