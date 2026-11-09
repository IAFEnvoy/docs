---
title: "技能列表"
sidebar_position: 10
---

`saturn:abilities`

读取实体持有的技能信息。

EntityValueGetter 的完整参数决定查询身份。只读取传入视图或已采集快照；缺失与已知的 0、false、空集合不同。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:abilities` |

## JSON 示例

```json
{
  "type": "saturn:abilities"
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.information.getter.builtin.AbilitiesGetter`。本页按当前 26.1.2 源码的 Codec 整理。
