---
title: "递归坐骑"
sidebar_position: 10
---

`saturn:riding_recursive`

检查多层骑乘关系。

检查 actor 和 target 的关系。交换双方会改变部分条件的含义。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:riding_recursive` |

## JSON 示例

```json
{
  "type": "saturn:riding_recursive"
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.condition.builtin.bientity.RidingRecursiveCondition`。本页按当前 26.1.2 源码的 Codec 整理。
