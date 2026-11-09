---
title: "修改速度"
sidebar_position: 10
---

`saturn:add_velocity`

增加速度，或以给定向量替换速度。

上下文包含 actor（发起者）与 target（目标）。同一个 ID 在实体动作和双实体动作注册表中可能有不同字段，不能跨种类替换。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:add_velocity` |
| `x` | 数值 | 否 | `0.0` | X 坐标、偏移或向量分量，取决于本页行为。 |
| `y` | 数值 | 否 | `0.0` | Y 坐标、偏移或向量分量，取决于本页行为。 |
| `z` | 数值 | 否 | `0.0` | Z 坐标、偏移或向量分量，取决于本页行为。 |
| `reference` | 枚举字符串 | 否 | `"position"` | 双实体速度使用的参考方向。 可用值：`position`、`rotation`。 |
| `client` | 布尔值 | 否 | `true` | 是否在客户端应用。 |
| `server` | 布尔值 | 否 | `true` | 是否在服务端应用。 |
| `set` | 布尔值 | 否 | `false` | true 用给定向量替换速度，false 累加。 |

## JSON 示例

```json
{
  "type": "saturn:add_velocity"
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.action.builtin.bientity.AddVelocityAction`。本页按当前 26.1.2 源码的 Codec 整理。
