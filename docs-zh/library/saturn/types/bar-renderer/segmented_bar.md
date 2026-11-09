---
title: "分段资源条"
sidebar_position: 10
---

`saturn:segmented_bar`

使用多个色块表示资源量。

用于 ResourceBar.renderer，负责显示资源快照，不修改资源。颜色写 #RRGGBB。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:segmented_bar` |
| `segments` | 整数 | 是 | — | 分段数量。 Codec 范围：`1, 256`。 |
| `gap` | 整数 | 否 | `1` | 分段间隔，单位为像素。 Codec 范围：`0, 32`。 |
| `full_color` | #RRGGBB 字符串 | 否 | `"#FFFFFF"` | 已填充分段颜色。 |
| `empty_color` | #RRGGBB 字符串 | 否 | `"#555555"` | 空分段颜色。 |

## JSON 示例

```json
{
  "type": "saturn:segmented_bar",
  "segments": 1
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.resourcebar.builtin.renderdata.SegmentedRenderData`。本页按当前 26.1.2 源码的 Codec 整理。
