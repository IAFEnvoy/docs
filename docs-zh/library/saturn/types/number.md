---
title: "数值提供器"
sidebar_label: "数值提供器 (NumberProvider)"
sidebar_position: 12
---

# 数值提供器

NumberProvider 可写为数字、公式字符串，或本目录的带 type 对象。游戏时间字段默认使用 tick，20 tick 通常为一秒。

### `saturn:binomial` {#saturnbinomial}

按 n 次试验和单次概率 p 生成二项分布随机值。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:binomial` |
| `n` | 数值提供器 | 是 | — | 二项分布的试验次数。 |
| `p` | 数值提供器 | 是 | — | 二项分布单次成功概率。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:binomial",
  "n": 4,
  "p": 0.5
}
```

</details>

### `saturn:conditional` {#saturnconditional}

依次检查实体条件，使用首个命中分支的数值。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:conditional` |
| `branches` | 条件分支对象数组 | 否 | `[]` | 有序条件分支，每项包含 condition 与 value。 |
| `fallback` | 数值或公式字符串 | 否 | 省略 | 没有匹配或已知值时使用的回退值。 |

#### branches 条目

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `condition` | 实体条件 | 是 | — | 依次判断，首个命中分支生效。 |
| `value` | 数值提供器 | 是 | — | 该分支的数值。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:conditional",
  "branches": [
    {
      "condition": {
        "type": "saturn:sneaking"
      },
      "value": 2
    }
  ],
  "fallback": 1
}
```

</details>

### `saturn:constant` {#saturnconstant}

返回定义中的固定值。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:constant` |
| `value` | 数值 | 是 | — | 本类型使用的值或表达式。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:constant",
  "value": 1
}
```

</details>

### `saturn:context_variable` {#saturncontext_variable}

读取上下文或已注册的公式变量，未知变量可使用回退值。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:context_variable` |
| `variable` | 字符串 | 是 | — | 注册或上下文中的公式变量名。 |
| `fallback` | 数值 | 否 | `0.0` | 没有匹配或已知值时使用的回退值。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:context_variable",
  "variable": "health",
  "fallback": 0
}
```

</details>

### `saturn:expression` {#saturnexpression}

计算 exp4j 表达式，params 可覆盖表达式参数。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:expression` |
| `expression` | 字符串 | 是 | — | exp4j 公式字符串。 |
| `params` | 字符串 | 否 | `{}` | 传给脚本或公式的参数对象。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:expression",
  "expression": "base + 2",
  "params": {
    "base": 8
  }
}
```

</details>

### `saturn:sum` {#saturnsum}

求多个数值提供器之和。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:sum` |
| `summands` | 数值提供器数组 | 是 | — | 参与求和的数值提供器列表，至少一项。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:sum",
  "summands": [
    2,
    3
  ]
}
```

</details>

### `saturn:uniform` {#saturnuniform}

在给定最小值和最大值之间均匀取样。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:uniform` |
| `min` | 数值提供器 | 是 | — | 下限。 |
| `max` | 数值提供器 | 是 | — | 上限。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:uniform",
  "min": 1,
  "max": 5
}
```

</details>

### `saturn:weighted_list` {#saturnweighted_list}

按权重从分布条目选择数值。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:weighted_list` |
| `distribution` | 加权条目数组（value、weight） | 是 | — | 加权条目数组，每项包含 value 与 weight。 |

每项包含数值提供器 value 与整数 weight，默认权重 1。列表至少一项，负权重按 0 处理；总权重非正时记录诊断并返回 0。

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:weighted_list",
  "distribution": [
    {
      "value": 1,
      "weight": 3
    },
    {
      "value": 5,
      "weight": 1
    }
  ]
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
