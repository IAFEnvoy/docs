---
title: "弹性布局"
sidebar_position: 10
---

`system:flex`

横向或纵向组织子节点，可遍历集合并分页。

节点写入资源包卡片模板的 body 或 children。除各自字段外，所有节点共享 id、style、when、unless、repeat；见[节点公共字段](../../cards/node-common.md)。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `system:flex` |
| `direction` | 字符串 | 否 | `"row"` | 布局方向，row 或 column。 |
| `wrap` | 布尔值 | 否 | `true` | 是否允许换行。 |
| `source` | 字符串 | 否 | `""` | 输入集合、资源路径或上下文参数，详见本页用途。 |
| `filter` | 字符串 | 否 | `""` | 按索引读取的状态键，用于筛选集合。 |
| `page_size` | 整数 | 否 | `0` | 分页容量；0 不主动分页。 |
| `children` | 卡片节点数组 | 是 | — | 子节点数组。 |
| `text_separator` | 字符串 | 否 | 省略 | 提取为纯文本时的连接符，不改变可视布局。 |

## JSON 示例

```json
{
  "type": "system:flex",
  "children": [
    {
      "type": "system:text",
      "text": "宿主"
    },
    {
      "type": "system:text",
      "text": "{{player_name}}"
    }
  ],
  "direction": "row"
}
```

放入卡片模板的 `body` 或容器的 `children`。占位符来自服务端快照及客户端构建事件；仅修改 JSON 不会自动产生缺失的数据或业务处理器。

## Java 入口

`com.iafenvoy.system.screen.card.node.layout.FlexNode`。本页按当前 26.1.2 源码的 Codec 整理。
