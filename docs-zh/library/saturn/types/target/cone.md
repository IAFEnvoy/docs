---
title: "锥形目标"
sidebar_position: 10
---

`saturn:cone`

在指定长度和角度的视锥内选取目标。

用于技能的 target_selector。选择器取得候选后，技能仍会检查 target_condition。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:cone` |
| `length` | [数值提供器](../number/index.md) | 是 | — | 选择范围长度，以方块计。 |
| `angle` | [数值提供器](../number/index.md) | 是 | — | 锥形选择的角度。 |
| `include_actor` | 布尔值 | 否 | `false` | 是否把发起者本人列为候选目标。 |
| `limit` | 整数 | 否 | `0` | 目标数量上限；0 表示不在此处限制。 |
| `order` | 枚举字符串 | 否 | `"nearest"` | nearest、farthest 或 random。 可用值：`nearest`、`farthest`、`random`。 |

## JSON 示例

```json
{
  "type": "saturn:cone",
  "length": 1,
  "angle": 1
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.ability.target.ConeTargetSelector`。本页按当前 26.1.2 源码的 Codec 整理。
