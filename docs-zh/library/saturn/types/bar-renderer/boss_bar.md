---
title: "Boss 样式资源条"
sidebar_position: 10
---

`saturn:boss_bar`

使用指定贴图的 Boss 血条样式。

用于 ResourceBar.renderer，负责显示资源快照，不修改资源。颜色写 #RRGGBB。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:boss_bar` |
| `sprite_location` | 资源 ID | 否 | `"saturn:textures/gui/resource_bar.png"` | 资源条贴图。 |
| `bar_index` | 整数 | 否 | `0` | 贴图内资源条的索引。 Codec 范围：`0, 24`。 |
| `inverted` | 布尔值 | 否 | `false` | 是否反转判断或显示方向。 |

## JSON 示例

```json
{
  "type": "saturn:boss_bar"
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.resourcebar.builtin.renderdata.OriginsRenderData`。本页按当前 26.1.2 源码的 Codec 整理。
