---
title: "资源区间"
sidebar_position: 10
---

`saturn:resource_range`

当前资源处于给定区间时显示。

用于 ResourceBar.visibility，在资源条上下文中决定是否显示。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:resource_range` |
| `min` | 数值 | 是 | — | 下限。 |
| `max` | 数值 | 是 | — | 上限。 |

## JSON 示例

```json
{
  "type": "saturn:resource_range",
  "min": 1,
  "max": 1
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.resourcebar.builtin.visibility.RangeVisibility`。本页按当前 26.1.2 源码的 Codec 整理。
