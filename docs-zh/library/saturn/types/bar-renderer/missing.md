---
title: "缺失值"
sidebar_position: 10
---

`saturn:missing`

表示没有可用实现或取值。

用于 ResourceBar.renderer，负责显示资源快照，不修改资源。颜色写 #RRGGBB。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:missing` |

## JSON 示例

```json
{
  "type": "saturn:missing"
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.resourcebar.builtin.renderdata.MissingRenderData`。本页按当前 26.1.2 源码的 Codec 整理。
