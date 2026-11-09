---
title: "修改速度"
sidebar_position: 10
---

`saturn:add_velocity`

增加速度，或以给定向量替换速度。

以一个实体为对象执行操作。用于 entity_action、触发规则的 action 等实体动作字段；动作数组会按顺序执行。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:add_velocity` |
| `x` | 数值 | 否 | `0.0` | X 坐标、偏移或向量分量，取决于本页行为。 |
| `y` | 数值 | 否 | `0.0` | Y 坐标、偏移或向量分量，取决于本页行为。 |
| `z` | 数值 | 否 | `0.0` | Z 坐标、偏移或向量分量，取决于本页行为。 |
| `space` | 枚举字符串 | 否 | `"world"` | 向量坐标空间。 可用值：`world`、`local`、`local_horizontal`、`local_horizontal_normalized`、`velocity`、`velocity_normalized`、`velocity_horizontal`、`velocity_horizontal_normalized`。 |
| `set` | 布尔值 | 否 | `false` | true 用给定向量替换速度，false 累加。 |

## JSON 示例

```json
{
  "type": "saturn:add_velocity"
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.action.builtin.entity.AddVelocityAction`。本页按当前 26.1.2 源码的 Codec 整理。
