---
title: "卡片模板"
sidebar_position: 1
---

文件：`assets/<namespace>/cards/<path>.json`，由客户端资源包加载。例如 `assets/system/cards/shop_catalog.json` 覆盖商城列表布局。服务端发送业务快照，客户端用 CardBuilder 的模板与参数创建卡片；修改模板不会修改价格、任务完成状态或发奖结果。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `style` | 字符串或字符串数组 | 否 | `"result_card"` | CSS 类名，数组用空格拼接。 |
| `show_title` | 布尔值 | 否 | `true` | 是否显示 CardBuilder 提供的主标题。 |
| `hide_summary` | 布尔值 | 否 | `false` | 是否隐藏宿主摘要。 |
| `body` | [节点](../types/node/index.md)数组 | 是 | — | 正文布局。 |
| `actions` | 操作显示设置 | 否 | 默认设置 | 见下表，不会创建服务端业务按钮。 |
| `actions.numbered` | 布尔值 | 否 | `true` | 是否为已有操作显示编号。 |
| `actions.label` | 节点数组 | 否 | `[]` | 操作标签格式，空数组使用原标签。 |

## 示例

```json title="assets/example/cards/result.json"
{
  "show_title": true,
  "hide_summary": true,
  "body": [
    {
      "type": "system:markdown",
      "text": "{{summary}}"
    },
    {
      "type": "system:flex",
      "source": "{{actions}}",
      "direction": "row",
      "children": [
        {
          "type": "system:button",
          "text": "{{actions.*.label}}",
          "click": "{{actions.*.click_type}}",
          "value": "{{actions.*.value}}",
          "disabled": "{{actions.*.disabled}}",
          "behavior": "{{actions.*.behavior}}"
        }
      ]
    }
  ]
}
```

按钮来源于服务端快照或客户端上下文。要使用此模板，CardBuilder 必须选择 `example:result`；只放一个新模板文件不会让现有消息自动切换。

## 纯文本约定

仅一个实现 `PlainMessageNode` 的正文元素（内置为 `system:text`），未使用 `repeat`，且没有操作按钮与额外标题/摘要内容时，可作为普通消息显示。`system:markdown` 保留自己的卡片布局。有按钮或其他内容仍作为卡片，通知的确认等底部控制由宿主代码提供。

## 模板、上下文与构建事件

卡片数据实现负责创建 CardBuilder，设置模板、标题、参数和按钮；客户端渲染阶段才访问界面、图标和回调。扩展可在卡片构建事件中增加参数，资源包再以占位符使用。完整约定见[卡片概览](./overview.md)、[节点公共字段](./node-common.md)和[编辑器](./editor.md)。
