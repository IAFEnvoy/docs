---
title: "光照等级"
sidebar_position: 10
---

`saturn:light_level`

比较指定光照层的光照等级。

检查上下文位置的方块或环境。嵌入 BlockCondition 字段。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:light_level` |
| `light_type` | 对象 | 否 | 省略 | 光照层，sky 或 block。 可用值：`sky`、`block`。 |
| `comparison` | 枚举字符串 | 是 | — | 可用 `==`、`!=`、`<`、`<=`、`>`、`>=`。 |
| `compare_to` | 数值 | 是 | — | 用来比较的目标数值。 |

## JSON 示例

```json
{
  "type": "saturn:light_level",
  "comparison": ">=",
  "compare_to": 8,
  "light_type": "sky"
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.condition.builtin.block.LightLevelCondition`。本页按当前 26.1.2 源码的 Codec 整理。
