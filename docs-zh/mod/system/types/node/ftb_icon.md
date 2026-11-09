---
title: "FTB 图标"
sidebar_position: 10
---

`system:ftb_icon`

显示服务端快照中的 FTB 任务或奖励图标。

节点写入资源包卡片模板的 body 或 children。除各自字段外，所有节点共享 id、style、when、unless、repeat；见[节点公共字段](../../cards/node-common.md)。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `system:ftb_icon` |
| `icon` | 字符串 | 是 | — | FTB 图标参数键或按钮图标名。 |

## JSON 示例

```json
{
  "type": "system:ftb_icon",
  "icon": "{{quest_icon}}"
}
```

放入卡片模板的 `body` 或容器的 `children`。占位符来自服务端快照及客户端构建事件；仅修改 JSON 不会自动产生缺失的数据或业务处理器。

## Java 入口

`com.iafenvoy.system.screen.card.node.media.FtbIconNode`。本页按当前 26.1.2 源码的 Codec 整理。
