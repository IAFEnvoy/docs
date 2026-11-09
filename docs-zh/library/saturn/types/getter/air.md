---
title: "空气值"
sidebar_position: 10
---

`saturn:air`

读取实体剩余空气值。

EntityValueGetter 的完整参数决定查询身份。只读取传入视图或已采集快照；缺失与已知的 0、false、空集合不同。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:air` |

## JSON 示例

```json
{
  "type": "saturn:air"
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.information.getter.builtin.AirGetter`。本页按当前 26.1.2 源码的 Codec 整理。
