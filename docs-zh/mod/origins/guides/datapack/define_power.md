---
sidebar_position: 2
---

# 创建自定义能力

本指南将带你从零构建一个能力。我们要创建一个在你击中亡灵生物时将其点燃的能力——"圣火"（Holy Fire）。

## 前置条件 {#prerequisites}

请先完成[创建自定义起源](define_origin)，以便有一个可以挂载能力的目标起源。

## 第 1 步 — 选择能力类型 {#step-1-pick-a-power-type}

能力的行为由其 `type` 决定。对于"对刚击中的实体做点什么"，正确的选择是 [`origins:target_action_on_hit`](../../types/power/action#originstarget_action_on_hit)。

创建文件，并以骨架开始：

```json title='data/example/origins/power/holy_fire.json'
{
  "type": "origins:target_action_on_hit",
  "name": "Holy Fire",
  "description": "Your strikes set the undead ablaze.",
  "cooldown": 1,
  "entity_action": {}
}
```

| 字段 | 作用 |
|-------|-----|
| `type` | 告诉 Origins 使用哪套能力逻辑 |
| `name` / `description` | 显示在起源界面中（可选——省略时使用翻译键） |
| `cooldown` | *（能力特定）* 两次触发之间的最小刻数（`1` = 每次击中） |
| `entity_action` | *（能力特定）* 施加到目标身上的效果 |

## 第 2 步 — 定义实体动作 {#step-2-define-the-entity-action}

`entity_action` 本身也是一个带类型的对象。我们需要 [`origins:set_on_fire`](../../types/action/entity_action_types#originsset_on_fire)：

```json title='data/example/origins/power/holy_fire.json'
{
  //...
  "entity_action": {
    "type": "origins:set_on_fire",
    "tick": 100
  }
}
```

这样可行，但它会点燃你击中的**一切**，而不只是亡灵。

## 第 3 步 — 添加目标条件 {#step-3-add-a-target-condition}

用 `target_condition`（一个实体条件）过滤目标：

```json title='data/example/origins/power/holy_fire.json'
{
  //...
  "entity_action": {
    "type": "origins:set_on_fire",
    "tick": 100
  },
  "target_condition": {
    "type": "origins:entity_type",
    "entity_type": "minecraft:zombie"
  }
}
```

现在只有僵尸会被点燃。要覆盖所有亡灵，可以改用包含多个 `entity_type` 检查的 `or` 条件，或使用实体类型标签：

```json
"target_condition": {
  "type": "origins:in_tag",
  "tag": "minecraft:skeletons"
}
```

## 第 4 步 — 挂载到你的起源 {#step-4-attach-to-your-origin}

将能力 ID 添加到对应起源的 `powers` 列表或标签中：

```json title='data/example/tags/origins/power/supermorph.json'
{
  "replace": false,
  "values": [
    "example:holy_fire"
  ]
}
```

## 第 5 步 — 收尾 {#step-5-polish}

添加徽章、细化条件，或让能力可切换。下面是带徽章的最终版本：

```json title='data/example/origins/power/holy_fire.json'
{
  "type": "origins:target_action_on_hit",
  "name": "Holy Fire",
  "description": "Your strikes set the undead ablaze.",
  "badges": ["origins:active"],
  "cooldown": 20,
  "entity_action": {
    "type": "origins:set_on_fire",
    "tick": 100
  },
  "target_condition": {
    "type": "origins:in_tag",
    "tag": "minecraft:undead"
  }
}
```

---

## 工作流程 {#how-the-pipeline-works}

每个 Origins JSON 类型都遵循相同的模式：

```json
{
  "type": "origins:<category>/<name>",
  // ...fields specific to that type
}
```

1. **能力类型**位于能力文件的顶层。
2. **实体动作**嵌套在能力内部（在 `entity_action`、`rising_action` 等字段中）。
3. **实体条件**用于过滤能力或动作的生效时机。
4. **方块 / 物品 / 伤害 / 生物群系条件**出现在接受它们的相关字段中。

类型参考文档就是你的索引：

| 参考 | 位置 |
|-----------|----------|
| 所有能力类型 | [能力类型](../../types/power/) |
| 所有实体动作 | [实体动作类型](../../types/action/entity_action_types) |
| 所有实体条件 | [实体条件类型](../../types/condition/entity_condition_types) |

浏览它们以了解可以实现哪些效果。
