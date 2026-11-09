---
title: "节点公共字段与交互"
sidebar_position: 2
---

每个卡片节点由公共包装与带 `type` 的内容组成，两组字段平铺在同一个 JSON 对象中。具体类型分别见[节点目录](../types/node/index.md)。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 节点类型 ID | 是 | — | 已注册的节点 Codec。 |
| `id` | 字符串 | 否 | `""` | 节点标识。 |
| `style` | 字符串或字符串数组 | 否 | 节点默认样式 | CSS 类名，不是内联 CSS 声明。 |
| `when` | 状态键 | 否 | `""` | 指定状态启用时显示。 |
| `unless` | 状态键 | 否 | `""` | 指定状态启用时隐藏。 |
| `repeat` | 集合占位符 | 否 | `""` | 为集合的每个元素重复节点。 |

## 上下文和占位符

整个卡片共享一份不可变上下文：状态表、参数表、回调表。参数使用小写键和 `{{key}}` 占位符，集合索引用 `*`，如 `{{entries.*.title}}`。类型读取失败或参数缺失不会凭空生成对应内容。状态与参数由 CardBuilder 或扩展事件提供；JSON 不执行任意 Java 代码。

```json
{
  "type": "system:text",
  "text": "{{entries.*.title}}",
  "repeat": "{{entries}}",
  "when": "show_entries"
}
```

## 文本字段

text、title 共用文本结构；markdown 独立解析 Markdown，FTBQ 原生带颜色文本继续用 text。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `text` | 字符串 | 否 | `""` | 可包含占位符。 |
| `translate` | 翻译键 | 否 | `""` | 非空时优先于 text。 |
| `args` | 字符串数组 | 否 | `[]` | 翻译参数，可含占位符。 |
| `inline` | 布尔值 | 否 | `false` | 使用行内文本。 |

## 按钮交互

| click | value | 执行位置 |
| --- | --- | --- |
| `link` | HTTP / HTTPS URL | 客户端走原版 URL 确认流程 |
| `return-val` | 服务端能识别的字符串 | 发包，由服务端解析并校验 |
| `local` | 上下文 callbacks 的键 | 客户端本地执行 |

`return-val` 不是任意 Minecraft 命令执行接口，也不会自动调用不存在的处理器。服务端复查玩家状态、权限与目标；旧卡片不能绕过业务校验。推荐复用快照中 actions 的 click_type、value、disabled 和 behavior，不在资源包里猜测协议。

`behavior` 支持值及通知替换规则见[按钮节点](../types/node/button.md)。通知底部的确定、关闭、返回等由宿主控制，正文 JSON 不替代这些控制；翻页和分组切换留在卡片控件内部处理，不重新排入通知队列。
