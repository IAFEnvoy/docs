---
title: "图片"
sidebar_position: 10
---

`system:image`

显示资源包内的图片。

节点写入资源包卡片模板的 body 或 children。除各自字段外，所有节点共享 id、style、when、unless、repeat；见[节点公共字段](../../cards/node-common.md)。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `system:image` |
| `source` | 字符串 | 是 | — | 输入集合、资源路径或上下文参数，详见本页用途。 |
| `alt` | 字符串 | 否 | `""` | 图片无法展示时使用的说明文字。 |
| `width` | 整数 | 否 | `32` | 宽度，单位为像素。 |
| `height` | 整数 | 否 | `32` | 高度，单位为像素。 |

## JSON 示例

```json
{
  "type": "system:image",
  "source": "example:textures/gui/logo.png",
  "width": 32,
  "height": 32
}
```

放入卡片模板的 `body` 或容器的 `children`。占位符来自服务端快照及客户端构建事件；仅修改 JSON 不会自动产生缺失的数据或业务处理器。

## Java 入口

`com.iafenvoy.system.screen.card.node.media.ImageNode`。本页按当前 26.1.2 源码的 Codec 整理。
