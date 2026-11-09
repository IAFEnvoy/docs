---
title: "玩家模型"
sidebar_position: 10
---

`system:player`

渲染上下文指定的玩家模型，可控制朝向、缩放和鼠标跟随。

节点写入资源包卡片模板的 body 或 children。除各自字段外，所有节点共享 id、style、when、unless、repeat；见[节点公共字段](../../cards/node-common.md)。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `system:player` |
| `player` | 字符串 | 否 | `"{{player_id}}"` | 原版玩家谓词；玩家模型节点中是玩家 UUID 参数。 |
| `follow_mouse` | 布尔值 | 否 | `false` | 玩家模型是否跟随鼠标旋转。 |
| `yaw` | 数值 | 否 | `15.0` | 不跟随鼠标时的水平朝向，单位为度。 |
| `pitch` | 数值 | 否 | `0.0` | 不跟随鼠标时的俯仰角，单位为度。 |
| `scale` | 数值 | 否 | `1.0` | 模型缩放倍率，必须为正数。 |
| `offset_x` | 数值 | 否 | `0.0` | X 方向偏移。 |
| `offset_y` | 数值 | 否 | `0.0` | Y 方向偏移。 |

## JSON 示例

```json
{
  "type": "system:player",
  "player": "{{player_id}}",
  "follow_mouse": false,
  "yaw": 15,
  "scale": 1
}
```

放入卡片模板的 `body` 或容器的 `children`。占位符来自服务端快照及客户端构建事件；仅修改 JSON 不会自动产生缺失的数据或业务处理器。

## Java 入口

`com.iafenvoy.system.screen.card.node.media.PlayerNode`。本页按当前 26.1.2 源码的 Codec 整理。
