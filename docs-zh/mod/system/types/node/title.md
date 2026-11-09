---
title: "标题"
sidebar_position: 10
---

`system:title`

显示标题文字，并允许宿主抽取为卡片主标题。

节点写入资源包卡片模板的 body 或 children。除各自字段外，所有节点共享 id、style、when、unless、repeat；见[节点公共字段](../../cards/node-common.md)。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `system:title` |
| `level` | 整数 | 否 | `1` | 标题级别，1 至 4。 |
| `text` | 字符串 | 否 | `""` | 显示文本，支持 `{{参数名}}` 占位符。 |
| `translate` | 字符串 | 否 | `""` | 翻译键，非空时优先于 text。 |
| `args` | 字符串数组 | 否 | `[]` | 翻译参数字符串列表，可包含占位符。 |
| `inline` | 布尔值 | 否 | `false` | 是否使用行内展示。 |

## JSON 示例

```json
{
  "type": "system:title",
  "text": "任务详情",
  "level": 2
}
```

放入卡片模板的 `body` 或容器的 `children`。占位符来自服务端快照及客户端构建事件；仅修改 JSON 不会自动产生缺失的数据或业务处理器。

## Java 入口

`com.iafenvoy.system.screen.card.node.text.TitleNode`。本页按当前 26.1.2 源码的 Codec 整理。
