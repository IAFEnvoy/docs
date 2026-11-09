---
title: "等待条件"
sidebar_position: 10
---

`saturn:wait_for`

等待实体条件成立，可指定超时和超时结果。

时间轴节点只描述本步行为。节点 ID、后继和整个时间轴由使用方组装，不是独立动态注册表。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:wait_for` |
| `condition` | [实体条件](../entity-condition/index.md) | 是 | — | 要检查的条件。 |
| `timeout` | [数值提供器](../number/index.md) | 否 | 省略 | 可选超时 tick 数，省略表示不设超时。 |
| `on_timeout` | 枚举字符串 | 否 | `"fail"` | 超时时使用的时间轴结果。 可用值：`fail`、`finish`。 |

## JSON 示例

```json
{
  "type": "saturn:wait_for",
  "condition": {
    "type": "saturn:always"
  }
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.timeline.builtin.WaitForEntry`。本页按当前 26.1.2 源码的 Codec 整理。
