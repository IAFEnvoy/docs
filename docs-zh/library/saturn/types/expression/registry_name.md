---
title: "注册名称"
sidebar_position: 10
---

`saturn:registry_name`

根据注册表 ID 与条目 ID 取得显示名称。

信息表达式只读传入的 PlayerView。原始数字、字符串、布尔值可直接作为常量；操作对象必须有 type。见[玩家信息](../../guides/information.md)。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:registry_name` |
| `registry` | 资源 ID | 是 | — | 要读取的注册表 ID。 |
| `value` | [表达式](index.md) | 是 | — | 本类型使用的值或表达式。 |

## JSON 示例

```json
{
  "type": "saturn:registry_name",
  "registry": "minecraft:item",
  "value": "minecraft:diamond"
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.information.expression.builtin.RegistryNameExpression`。本页按当前 26.1.2 源码的 Codec 整理。
