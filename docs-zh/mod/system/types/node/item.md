---
title: "物品图标"
sidebar_position: 10
---

`system:item`

渲染上下文中的物品快照，悬浮时显示物品提示。

节点写入资源包卡片模板的 body 或 children。除各自字段外，所有节点共享 id、style、when、unless、repeat；见[节点公共字段](../../cards/node-common.md)。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `system:item` |
| `item` | 字符串 | 是 | — | 物品 ID、谓词或上下文中的物品参数键。 |
| `size` | 整数 | 否 | `32` | 图标边长，单位为像素。 |
| `tooltip` | 卡片节点数组 | 否 | `[]` | 鼠标悬停时展示的节点列表。 |

## JSON 示例

```json
{
  "type": "system:item",
  "item": "{{reward_item}}",
  "size": 32
}
```

放入卡片模板的 `body` 或容器的 `children`。占位符来自服务端快照及客户端构建事件；仅修改 JSON 不会自动产生缺失的数据或业务处理器。

## Java 入口

`com.iafenvoy.system.screen.card.node.media.ItemNode`。本页按当前 26.1.2 源码的 Codec 整理。
