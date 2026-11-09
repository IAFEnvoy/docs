---
title: "生成效果云"
sidebar_position: 10
---

`saturn:spawn_effect_cloud`

在实体附近生成带状态效果的区域效果云。

以一个实体为对象执行操作。用于 entity_action、触发规则的 action 等实体动作字段；动作数组会按顺序执行。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:spawn_effect_cloud` |
| `radius` | 数值 | 否 | `3.0` | 半径，以方块计；资源条中以像素计。 |
| `radius_on_use` | 数值 | 否 | `-0.5` | 效果云每次作用后的半径变化。 |
| `wait_time` | 整数 | 否 | `10` | 效果云开始作用前等待的 tick 数。 |
| `effects` | 枚举字符串数组 | 否 | `[]` | 状态效果列表或原版效果谓词。 |

## JSON 示例

```json
{
  "type": "saturn:spawn_effect_cloud"
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.action.builtin.entity.SpawnEffectCloudAction`。本页按当前 26.1.2 源码的 Codec 整理。
