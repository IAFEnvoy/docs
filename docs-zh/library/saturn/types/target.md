---
title: "目标选择器"
sidebar_label: "目标选择器 (TargetSelector)"
sidebar_position: 13
---

# 目标选择器

用于技能的 target_selector。选择器取得候选后，技能仍会检查 target_condition。

### `saturn:area` {#saturnarea}

在半径内选取目标，可控制数量和排序。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:area` |
| `radius` | [数值提供器](./number.md) | 是 | — | 半径，以方块计；资源条中以像素计。 |
| `include_actor` | 布尔值 | 否 | `false` | 是否把发起者本人列为候选目标。 |
| `limit` | 整数 | 否 | `0` | 目标数量上限；0 表示不在此处限制。 |
| `order` | 枚举字符串 | 否 | `"nearest"` | nearest、farthest 或 random。 可用值：`nearest`、`farthest`、`random`。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:area",
  "radius": 1
}
```

</details>

### `saturn:cone` {#saturncone}

在指定长度和角度的视锥内选取目标。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:cone` |
| `length` | [数值提供器](./number.md) | 是 | — | 选择范围长度，以方块计。 |
| `angle` | [数值提供器](./number.md) | 是 | — | 锥形选择的角度。 |
| `include_actor` | 布尔值 | 否 | `false` | 是否把发起者本人列为候选目标。 |
| `limit` | 整数 | 否 | `0` | 目标数量上限；0 表示不在此处限制。 |
| `order` | 枚举字符串 | 否 | `"nearest"` | nearest、farthest 或 random。 可用值：`nearest`、`farthest`、`random`。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:cone",
  "length": 1,
  "angle": 1
}
```

</details>

### `saturn:ray` {#saturnray}

沿使用者朝向选取射线附近的实体。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:ray` |
| `length` | [数值提供器](./number.md) | 是 | — | 选择范围长度，以方块计。 |
| `radius` | [数值提供器](./number.md) | 否 | `0.5` | 半径，以方块计；资源条中以像素计。 |
| `include_actor` | 布尔值 | 否 | `false` | 是否把发起者本人列为候选目标。 |
| `limit` | 整数 | 否 | `0` | 目标数量上限；0 表示不在此处限制。 |
| `order` | 枚举字符串 | 否 | `"nearest"` | nearest、farthest 或 random。 可用值：`nearest`、`farthest`、`random`。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:ray",
  "length": 1
}
```

</details>

### `saturn:self` {#saturnself}

以使用者自身作为目标。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:self` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:self"
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
