---
title: "条件数值"
sidebar_position: 10
---

`saturn:conditional`

依次检查实体条件，使用首个命中分支的数值。

NumberProvider 可写为数字、公式字符串，或本目录的带 type 对象。游戏时间字段默认使用 tick，20 tick 通常为一秒。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:conditional` |
| `branches` | 条件分支对象数组 | 否 | `[]` | 有序条件分支，每项包含 condition 与 value。 |
| `fallback` | 数值或公式字符串 | 否 | 省略 | 没有匹配或已知值时使用的回退值。 |

## branches 条目

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `condition` | 实体条件 | 是 | — | 依次判断，首个命中分支生效。 |
| `value` | 数值提供器 | 是 | — | 该分支的数值。 |

## JSON 示例

```json
{
  "type": "saturn:conditional",
  "branches": [
    {
      "condition": {
        "type": "saturn:sneaking"
      },
      "value": 2
    }
  ],
  "fallback": 1
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.util.formula.number.Conditional`。本页按当前 26.1.2 源码的 Codec 整理。
