---
title: "纯文字资源条"
sidebar_position: 10
---

`saturn:text_only`

用格式文本显示资源值。

用于 ResourceBar.renderer，负责显示资源快照，不修改资源。颜色写 #RRGGBB。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:text_only` |
| `format` | 字符串 | 否 | `"%current%"` | 支持 %current% 与 %maximum% 替换，不使用 printf 格式。 |
| `color` | #RRGGBB 字符串 | 否 | `"#FFFFFF"` | RGB 颜色字符串。 |
| `show_maximum` | 布尔值 | 否 | `false` | 是否显示上限。 |

## JSON 示例

```json
{
  "type": "saturn:text_only"
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.resourcebar.builtin.renderdata.TextOnlyRenderData`。本页按当前 26.1.2 源码的 Codec 整理。
