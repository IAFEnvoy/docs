---
title: "表格展示"
sidebar_position: 10
---

`saturn:table`

遍历输入集合，按列定义生成表格。

信息表达式只读传入的 PlayerView。原始数字、字符串、布尔值可直接作为常量；操作对象必须有 type。见[玩家信息](../../guides/information.md)。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:table` |
| `source` | [表达式](index.md) | 是 | — | 输入集合、资源路径或上下文参数，详见本页用途。 |
| `as` | 字符串 | 否 | `"item"` | 循环变量名。 |
| `row_id` | [表达式](index.md) | 否 | 省略 | 生成每行标识的可选表达式。 |
| `columns` | 对象数组 | 是 | — | 表格列定义或网格列数。 |

## columns 条目

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `id` | 字符串 | 是 | — | 列标识，同一表格内不能重复。 |
| `label` | 文本组件 | 是 | — | 列标题。 |
| `value` | 信息表达式 | 是 | — | 对当前行求值；使用 local 读取 as 绑定。 |

## JSON 示例

```json
{
  "type": "saturn:table",
  "source": {
    "type": "saturn:constant",
    "value": [
      {
        "name": "A",
        "count": 1
      }
    ]
  },
  "columns": [
    {
      "id": "name",
      "label": {
        "text": "名称"
      },
      "value": {
        "type": "saturn:text",
        "value": {
          "type": "saturn:local",
          "path": [
            "name"
          ]
        }
      }
    }
  ]
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.information.expression.builtin.TableExpression`。本页按当前 26.1.2 源码的 Codec 整理。
