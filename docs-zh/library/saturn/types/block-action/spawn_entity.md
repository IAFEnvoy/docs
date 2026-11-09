---
title: "生成实体"
sidebar_position: 10
---

`saturn:spawn_entity`

在上下文提供的位置或指定坐标生成实体。

操作上下文给出的世界与方块位置。它不是独立数据包文件，应嵌入要求 BlockAction 的字段。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:spawn_entity` |
| `entity_type` | 资源 ID | 是 | — | 实体类型 ID。 |
| `tag` | 对象 | 否 | 省略 | 注册表标签，或本页声明的 NBT 数据。 |
| `entity_action` | [实体动作](../entity-action/index.md) | 否 | `{"type":"saturn:no_op"}` | 在技能持有者或上下文实体上执行的实体动作。 |

## JSON 示例

```json
{
  "type": "saturn:spawn_entity",
  "entity_type": "minecraft:arrow"
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.action.builtin.block.SpawnEntityAction`。本页按当前 26.1.2 源码的 Codec 整理。
