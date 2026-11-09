---
title: "分组容器"
sidebar_position: 10
---

`system:groups`

从当前查询结果构造分组，选择后只显示组内内容。

节点写入资源包卡片模板的 body 或 children。除各自字段外，所有节点共享 id、style、when、unless、repeat；见[节点公共字段](../../cards/node-common.md)。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `system:groups` |
| `source` | 字符串 | 是 | — | 输入集合、资源路径或上下文参数，详见本页用途。 |
| `filter` | 字符串 | 否 | `""` | 按索引读取的状态键，用于筛选集合。 |
| `group` | 字符串 | 是 | — | 每个结果的分组 ID 参数。 |
| `group_label` | 字符串 | 否 | `""` | 每个结果的分组标题参数。 |
| `section` | 字符串 | 否 | `""` | 分组的上层分类参数。 |
| `section_label` | 字符串 | 否 | `""` | 上层分类标题参数。 |
| `orientation` | 字符串 | 否 | `"vertical"` | 分组导航方向，vertical 或 horizontal。 |
| `options` | 对象数组 | 否 | `[]` | 预定义分组，每项包含 id 与 label。 |
| `children` | 卡片节点数组 | 是 | — | 子节点数组。 |

## options 条目

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `id` | 字符串 | 是 | — | 预设分组 ID。 |
| `label` | 字符串 | 是 | — | 显示标题，可含占位符。 |

## JSON 示例

```json
{
  "type": "system:groups",
  "source": "{{entries}}",
  "group": "{{entries.*.group}}",
  "children": [
    {
      "type": "system:grid",
      "source": "{{entries}}",
      "columns": 3,
      "max_row": 3,
      "children": [
        {
          "type": "system:text",
          "text": "{{entries.*.name}}"
        }
      ]
    }
  ],
  "group_label": "{{entries.*.group_label}}"
}
```

放入卡片模板的 `body` 或容器的 `children`。占位符来自服务端快照及客户端构建事件；仅修改 JSON 不会自动产生缺失的数据或业务处理器。

## Java 入口

`com.iafenvoy.system.screen.card.node.container.GroupsNode`。本页按当前 26.1.2 源码的 Codec 整理。
