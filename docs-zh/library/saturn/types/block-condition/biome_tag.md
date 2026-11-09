---
title: "群系标签"
sidebar_position: 10
---

`saturn:biome_tag`

检查当前位置的群系是否属于指定标签。

检查上下文位置的方块或环境。嵌入 BlockCondition 字段。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:biome_tag` |
| `tag` | 标签 ID（带 #） | 是 | — | 注册表标签，或本页声明的 NBT 数据。 |

## JSON 示例

```json
{
  "type": "saturn:biome_tag",
  "tag": "#example:tag"
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.condition.builtin.block.BiomeTagBlockCondition`。本页按当前 26.1.2 源码的 Codec 整理。
