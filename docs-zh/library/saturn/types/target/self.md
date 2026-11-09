---
title: "自身目标"
sidebar_position: 10
---

`saturn:self`

以使用者自身作为目标。

用于技能的 target_selector。选择器取得候选后，技能仍会检查 target_condition。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:self` |

## JSON 示例

```json
{
  "type": "saturn:self"
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.ability.target.SelfTargetSelector`。本页按当前 26.1.2 源码的 Codec 整理。
