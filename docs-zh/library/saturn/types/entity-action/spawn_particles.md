---
title: "生成粒子"
sidebar_position: 10
---

`saturn:spawn_particles`

在实体附近按偏移和散布参数生成粒子。

以一个实体为对象执行操作。用于 entity_action、触发规则的 action 等实体动作字段；动作数组会按顺序执行。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:spawn_particles` |
| `particle` | 枚举字符串 | 是 | — | 原版粒子参数。 |
| `bientity_condition` | [双实体条件](../bientity-condition/index.md) | 否 | `{"type":"saturn:always"}` | 筛选上下文双方的条件。 |
| `count` | 整数 | 是 | — | 数量或数量匹配模式。 Codec 范围：`0, 2147483647`。 |
| `speed` | 数值 | 否 | `0.0` | 粒子速度。 |
| `force` | 布尔值 | 否 | `false` | 是否强制发送粒子。 |
| `spread` | 三个数值的数组 | 否 | `[0.5,0.5,0.5]` | 三个轴上的散布范围。 |
| `offset_x` | 数值 | 否 | `0.0` | X 方向偏移。 |
| `offset_y` | 数值 | 否 | `0.5` | Y 方向偏移。 |
| `offset_z` | 数值 | 否 | `0.0` | Z 方向偏移。 |

## JSON 示例

```json
{
  "type": "saturn:spawn_particles",
  "particle": {
    "type": "minecraft:cloud"
  },
  "count": 1
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.action.builtin.entity.SpawnParticlesAction`。本页按当前 26.1.2 源码的 Codec 整理。
