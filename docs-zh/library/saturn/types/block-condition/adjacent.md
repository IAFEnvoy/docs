---
title: "相邻方块"
sidebar_position: 10
---

`saturn:adjacent`

统计相邻位置中满足方块条件的数量。

检查上下文位置的方块或环境。嵌入 BlockCondition 字段。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:adjacent` |
| `adjacent_condition` | [方块条件](index.md) | 是 | — | 用于相邻方块的筛选条件。 |
| `comparison` | 枚举字符串 | 是 | — | 可用 `==`、`!=`、`<`、`<=`、`>`、`>=`。 |
| `compare_to` | 数值 | 是 | — | 用来比较的目标数值。 |

## JSON 示例

```json
{
  "type": "saturn:adjacent",
  "adjacent_condition": {
    "type": "saturn:always"
  },
  "comparison": ">=",
  "compare_to": 1
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.condition.builtin.block.AdjacentCondition`。本页按当前 26.1.2 源码的 Codec 整理。
