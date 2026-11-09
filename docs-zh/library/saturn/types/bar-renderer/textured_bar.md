---
title: "贴图资源条"
sidebar_position: 10
---

`saturn:textured_bar`

使用背景与填充贴图绘制资源条。

用于 ResourceBar.renderer，负责显示资源快照，不修改资源。颜色写 #RRGGBB。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:textured_bar` |
| `background_sprite` | 资源 ID | 是 | — | 背景 GUI 精灵 ID。 |
| `fill_sprite` | 资源 ID | 是 | — | 填充 GUI 精灵 ID。 |
| `width` | 整数 | 是 | — | 宽度，单位为像素。 Codec 范围：`1, 1024`。 |
| `height` | 整数 | 是 | — | 高度，单位为像素。 Codec 范围：`1, 1024`。 |
| `fill_color` | #RRGGBB 字符串 | 否 | `"#FFFFFF"` | 填充 RGB 颜色字符串。 |
| `show_value` | 布尔值 | 否 | `false` | 是否显示数值。 |

## JSON 示例

```json
{
  "type": "saturn:textured_bar",
  "background_sprite": "minecraft:boss_bar/pink_background",
  "fill_sprite": "minecraft:boss_bar/pink_background",
  "width": 1,
  "height": 1
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.resourcebar.builtin.renderdata.TexturedRenderData`。本页按当前 26.1.2 源码的 Codec 整理。
