---
title: "增加经验"
sidebar_position: 10
---

`saturn:add_experience`

为玩家增加经验点数、等级，或同时增加二者。

以一个实体为对象执行操作。用于 entity_action、触发规则的 action 等实体动作字段；动作数组会按顺序执行。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:add_experience` |
| `points` | 整数 | 否 | 省略 | 原版经验点数；省略时不修改点数。 |
| `levels` | 整数 | 否 | 省略 | 原版经验等级；省略时不修改等级。 |

## JSON 示例

```json
{
  "type": "saturn:add_experience",
  "points": 100
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.action.builtin.entity.AddExperienceAction`。本页按当前 26.1.2 源码的 Codec 整理。
