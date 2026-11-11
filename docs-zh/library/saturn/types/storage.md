---
title: "状态存储"
sidebar_label: "状态存储 (DataStorage)"
sidebar_position: 16
---

# 状态存储

DataStorage 是运行时状态的 Codec，不是独立数据包注册表。技能类型声明所需状态；宿主负责创建、tick、持久化以及修改后的 markDirty。

### `saturn:active_state` {#saturnactive_state}

保存运行时激活标记。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:active_state` |
| `active` | 布尔值 | 是 | — | 运行时激活标志。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:active_state",
  "active": true
}
```

</details>

### `saturn:cast_deadline` {#saturncast_deadline}

保存施法结束时刻。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:cast_deadline` |
| `ends_at` | 数值 | 是 | — | 计时器结束的游戏 tick。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:cast_deadline",
  "ends_at": 1
}
```

</details>

### `saturn:channel_pulse` {#saturnchannel_pulse}

保存下一次引导执行时刻。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:channel_pulse` |
| `next_tick` | 数值 | 是 | — | 下次执行的游戏 tick。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:channel_pulse",
  "next_tick": 1
}
```

</details>

### `saturn:charges` {#saturncharges}

保存最大充能、恢复间隔和当前剩余充能。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:charges` |
| `maximum` | [数值提供器](./number.md) | 是 | — | 最大值或上限。 |
| `recharge_ticks` | [数值提供器](./number.md) | 是 | — | 恢复一次充能所需的 tick 数。 |
| `last_change` | 整数 | 否 | `0` | 上次修改充能的游戏 tick。 |
| `remaining` | 数值 | 否 | 省略 | 剩余量的范围或运行时剩余值。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:charges",
  "maximum": 1,
  "recharge_ticks": 1
}
```

</details>

### `saturn:container` {#saturncontainer}

保存运行时物品槽内容。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:container` |
| `contents` | 物品堆数组 | 否 | `[]` | 槽位物品堆列表。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:container"
}
```

</details>

### `saturn:cooldown` {#saturncooldown}

保存冷却开始时刻和持续时长。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:cooldown` |
| `started_at` | 整数 | 否 | `0` | 冷却开始的游戏 tick。 |
| `duration` | 数值 | 否 | 省略 | 持续时长，通常以游戏 tick 计。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:cooldown"
}
```

</details>

### `saturn:entry_began` {#saturnentry_began}

保存时间轴节点是否已经开始。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:entry_began` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:entry_began"
}
```

</details>

### `saturn:idle_countdown` {#saturnidle_countdown}

保存等待节点剩余 tick 数。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:idle_countdown` |
| `remaining` | 整数 | 是 | — | 剩余量的范围或运行时剩余值。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:idle_countdown",
  "remaining": 1
}
```

</details>

### `saturn:resource` {#saturnresource}

保存资源引用和对应数量；未填值的对象只声明存储类型。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:resource` |
| `resource` | 资源 ID | 否 | 省略 | 已注册的 Saturn 资源 ID。 |
| `amount` | 数值 | 否 | 省略 | 数量或数值；数值提供器可使用数字、公式字符串或带 type 的对象。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:resource"
}
```

</details>

### `saturn:target_lock` {#saturntarget_lock}

保存锁定目标和可用距离。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:target_lock` |
| `range` | [数值提供器](./number.md) | 是 | — | 检查范围，以方块计。 |
| `target` | 字符串 | 否 | 省略 | 动作目标、目标 ID 或目标选择，具体见本页类型说明。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:target_lock",
  "range": 1
}
```

</details>

### `saturn:timer` {#saturntimer}

保存持续时长和计时结束 tick。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:timer` |
| `duration` | [数值提供器](./number.md) | 是 | — | 持续时长，通常以游戏 tick 计。 |
| `ends_at` | 数值 | 否 | 省略 | 计时器结束的游戏 tick。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:timer",
  "duration": 1
}
```

</details>

### `saturn:toggle` {#saturntoggle}

保存一个可变的开关状态。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:toggle` |
| `default` | 布尔值 | 否 | `false` | 初始开关值。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:toggle"
}
```

</details>

### `saturn:wait_countdown` {#saturnwait_countdown}

保存条件等待节点剩余 tick 数。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:wait_countdown` |
| `remaining` | 整数 | 是 | — | 剩余量的范围或运行时剩余值。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:wait_countdown",
  "remaining": 1
}
```

</details>

## 元类型

以下类型不直接判断具体值，只组合或委托其他同类类型；字段同样嵌入对应位置。

### `saturn:empty` {#saturnempty}

提供一个不执行额外行为的实现。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:empty` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:empty"
}
```

</details>
