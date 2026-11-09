---
title: "按钮"
sidebar_position: 10
---

`system:button`

执行客户端回调、打开 URL 或向服务端发送字符串。

节点写入资源包卡片模板的 body 或 children。除各自字段外，所有节点共享 id、style、when、unless、repeat；见[节点公共字段](../../cards/node-common.md)。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `system:button` |
| `value` | 字符串 | 否 | `""` | 本类型使用的值或表达式。 |
| `click` | 字符串 | 否 | `""` | 按钮行为：link、return-val 或 local。 |
| `text` | 字符串 | 否 | `""` | 显示文本，支持 `{{参数名}}` 占位符。 |
| `label` | 字符串 | 否 | `""` | 用于文字或可访问名称的标签。 |
| `icon` | 字符串 | 否 | `""` | FTB 图标参数键或按钮图标名。 |
| `selected` | 字符串 | 否 | `""` | 控制按钮选中状态的状态键。 |
| `disabled` | 字符串 | 否 | `""` | 控制按钮禁用状态的状态键。 |
| `binding` | 字符串 | 否 | `""` | 可选的宿主动作绑定。 |
| `behavior` | 字符串 | 否 | `"replace"` | 业务动作完成后的显示行为：close、wait、replace、push。 |
| `children` | 卡片节点数组 | 否 | `[]` | 子节点数组。 |

示例字符串只演示传输形式，服务端必须注册对应解析逻辑。复用已有按钮时优先读取 actions 快照；行为和权限见[公共交互约定](../../cards/node-common.md#按钮交互)。

## JSON 示例

```json
{
  "type": "system:button",
  "text": "查看详情",
  "click": "return-val",
  "value": "example:details reference-123"
}
```

放入卡片模板的 `body` 或容器的 `children`。占位符来自服务端快照及客户端构建事件；仅修改 JSON 不会自动产生缺失的数据或业务处理器。

## Java 入口

`com.iafenvoy.system.screen.card.node.interaction.ButtonNode`。本页按当前 26.1.2 源码的 Codec 整理。
