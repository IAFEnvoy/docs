---
title: "分页网格"
sidebar_position: 10
---

`system:grid`

只构建当前页的格子，按列数和最大行数计算分页容量。

节点写入资源包卡片模板的 body 或 children。除各自字段外，所有节点共享 id、style、when、unless、repeat；见[节点公共字段](../../cards/node-common.md)。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `system:grid` |
| `source` | 字符串 | 否 | `""` | 输入集合、资源路径或上下文参数，详见本页用途。 |
| `filter` | 字符串 | 否 | `""` | 按索引读取的状态键，用于筛选集合。 |
| `columns` | 整数 | 否 | `6` | 表格列定义或网格列数。 |
| `compact_columns` | 整数 | 否 | `3` | 简约或紧凑布局的最大列数。 |
| `max_row` | 整数 | 否 | `3` | 每页最大行数。 |
| `cell` | 整数 | 否 | `104` | 单个网格单元高度，单位为像素。 |
| `children` | 卡片节点数组 | 是 | — | 子节点数组。 |

## JSON 示例

```json
{
  "type": "system:grid",
  "children": [
    {
      "type": "system:text",
      "text": "{{entries.*.name}}"
    }
  ],
  "source": "{{entries}}",
  "columns": 3,
  "max_row": 3,
  "cell": 104
}
```

放入卡片模板的 `body` 或容器的 `children`。占位符来自服务端快照及客户端构建事件；仅修改 JSON 不会自动产生缺失的数据或业务处理器。

## Java 入口

`com.iafenvoy.system.screen.card.node.layout.GridNode`。本页按当前 26.1.2 源码的 Codec 整理。
