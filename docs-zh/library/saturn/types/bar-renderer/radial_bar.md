---
title: "环形资源条"
sidebar_position: 10
---

`saturn:radial_bar`

在指定角度范围内绘制环形进度。

用于 ResourceBar.renderer，负责显示资源快照，不修改资源。颜色写 #RRGGBB。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:radial_bar` |
| `radius` | 整数 | 是 | — | 半径，以方块计；资源条中以像素计。 Codec 范围：`1, 512`。 |
| `thickness` | 整数 | 是 | — | 圆环厚度，单位为像素。 Codec 范围：`1, 128`。 |
| `start_angle` | 数值 | 否 | `0.0` | 起始角度，单位为度。 |
| `end_angle` | 数值 | 否 | `360.0` | 结束角度，单位为度。 |
| `fill_color` | #RRGGBB 字符串 | 否 | `"#FFFFFF"` | 填充 RGB 颜色字符串。 |

## JSON 示例

```json
{
  "type": "saturn:radial_bar",
  "radius": 1,
  "thickness": 1
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.resourcebar.builtin.renderdata.RadialRenderData`。本页按当前 26.1.2 源码的 Codec 整理。
