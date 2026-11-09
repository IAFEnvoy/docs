---
title: "相对朝向"
sidebar_position: 10
---

`saturn:relative_rotation`

比较 actor 与 target 在指定轴上的旋转差。

检查 actor 和 target 的关系。交换双方会改变部分条件的含义。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:relative_rotation` |
| `axis` | 枚举字符串数组 | 否 | `["x","y","z"]` | 参与计算的旋转轴列表。 可用值：`x`、`y`、`z`。 |
| `actor_rotation` | 枚举字符串 | 否 | `"head"` | actor 使用头部或身体旋转。 可用值：`head`、`body`。 |
| `target_rotation` | 枚举字符串 | 否 | `"body"` | target 使用头部或身体旋转。 可用值：`head`、`body`。 |
| `comparison` | 枚举字符串 | 是 | — | 可用 `==`、`!=`、`<`、`<=`、`>`、`>=`。 |
| `compare_to` | 数值 | 是 | — | 用来比较的目标数值。 |

## JSON 示例

```json
{
  "type": "saturn:relative_rotation",
  "comparison": ">=",
  "compare_to": 1
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.condition.builtin.bientity.RelativeRotationCondition`。本页按当前 26.1.2 源码的 Codec 整理。
