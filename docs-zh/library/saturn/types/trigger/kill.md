---
title: "击杀"
sidebar_position: 10
---

`saturn:kill`

实体击杀其他实体时发布信号。

触发器匹配已发布的服务端信号。它可以用于触发规则或触发型技能；注册本身不执行动作。见[触发器生命周期](../../guides/triggers.md)。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:kill` |

## JSON 示例

```json
{
  "type": "saturn:kill"
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.registry.content.SaturnTriggers`。本页按当前 26.1.2 源码的 Codec 整理。
