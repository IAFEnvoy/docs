---
title: "折叠容器"
sidebar_position: 10
---

`system:details`

用可点击摘要展开或收起子节点。

节点写入资源包卡片模板的 body 或 children。除各自字段外，所有节点共享 id、style、when、unless、repeat；见[节点公共字段](../../cards/node-common.md)。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `system:details` |
| `summary` | 字符串 | 是 | — | 折叠区摘要文字。 |
| `children` | 卡片节点数组 | 是 | — | 子节点数组。 |
| `open` | 布尔值 | 否 | `false` | 是否默认展开。 |

## JSON 示例

```json
{
  "type": "system:details",
  "summary": "来源摘要",
  "children": [
    {
      "type": "system:text",
      "text": "{{source_summary}}"
    }
  ]
}
```

放入卡片模板的 `body` 或容器的 `children`。占位符来自服务端快照及客户端构建事件；仅修改 JSON 不会自动产生缺失的数据或业务处理器。

## Java 入口

`com.iafenvoy.system.screen.card.node.container.DetailsNode`。本页按当前 26.1.2 源码的 Codec 整理。
