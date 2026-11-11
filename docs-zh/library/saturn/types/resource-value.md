---
title: "资源取值"
sidebar_label: "资源取值 (ResourceValueProvider)"
sidebar_position: 14
---

# 资源取值

在资源上下文中读取数值，不负责增加或扣除资源。

### `saturn:constant` {#saturnconstant}

忽略当前资源，返回定义的固定数值。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:constant` |
| `value` | [数值提供器](./number.md) | 是 | — | 本类型使用的值或表达式。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:constant",
  "value": 1
}
```

</details>

### `saturn:current` {#saturncurrent}

读取资源当前值。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:current` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:current"
}
```

</details>

### `saturn:max` {#saturnmax}

读取资源最大值。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:max` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:max"
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
| `id` | 字符串 | 是 | — | 回调、选项或条目的标识符。 |
| `params` | 对象 | 否 | `{}` | 传给脚本或公式的参数对象。 |

仅在安装 KubeJS 时注册。JSON 只选择已有回调，不会直接执行 JSON 内的 JavaScript 字符串。

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:js",
  "id": "example_callback",
  "params": {}
}
```

</details>

### `saturn:missing` {#saturnmissing}

返回 max(0, 资源最大值 − 当前值)，不是缺失或错误标记。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:missing` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:missing"
}
```

</details>
