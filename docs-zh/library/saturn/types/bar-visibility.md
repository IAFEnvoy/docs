---
title: "资源条显示条件"
sidebar_label: "资源条显示条件 (ResourceBarVisibility)"
sidebar_position: 18
---

# 资源条显示条件

用于 ResourceBar.visibility，在资源条上下文中决定是否显示。

### `saturn:non_full` {#saturnnon_full}

当前资源未达到最大值时显示。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:non_full` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:non_full"
}
```

</details>

### `saturn:non_zero` {#saturnnon_zero}

当前资源不为零时显示。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:non_zero` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:non_zero"
}
```

</details>

### `saturn:recently_changed` {#saturnrecently_changed}

资源变化后保留显示指定 tick 数。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:recently_changed` |
| `hold_ticks` | 整数 | 否 | `60` | 变化后保留显示的 tick 数。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:recently_changed"
}
```

</details>

### `saturn:resource_range` {#saturnresource_range}

当前资源处于给定区间时显示。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:resource_range` |
| `min` | 数值 | 是 | — | 下限。 |
| `max` | 数值 | 是 | — | 上限。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:resource_range",
  "min": 1,
  "max": 1
}
```

</details>

## 元类型

以下类型不直接判断具体值，只组合或委托其他同类类型；字段同样嵌入对应位置。

### `saturn:always` {#saturnalways}

条件始终为真。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:always` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:always"
}
```

</details>

### `saturn:and` {#saturnand}

所有子条件都成立时才匹配。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:and` |
| `values` | [资源条显示条件](./bar-visibility.md)数组 | 是 | — | 子值或子表达式列表。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:and",
  "values": {
    "type": "saturn:always"
  }
}
```

</details>

### `saturn:not` {#saturnnot}

反转子条件的匹配结果。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:not` |
| `value` | [资源条显示条件](./bar-visibility.md) | 是 | — | 本类型使用的值或表达式。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:not",
  "value": {
    "type": "saturn:always"
  }
}
```

</details>

### `saturn:or` {#saturnor}

任一子条件成立即匹配。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:or` |
| `values` | [资源条显示条件](./bar-visibility.md)数组 | 是 | — | 子值或子表达式列表。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:or",
  "values": {
    "type": "saturn:always"
  }
}
```

</details>
