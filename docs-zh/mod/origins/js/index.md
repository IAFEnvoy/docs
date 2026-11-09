---
sidebar_position: 0
title: "起源JS"
---

# 起源JS（1.21.1）

:::warning

本文档面向 1.21.1；如需 1.20.1，请参阅 [1.20 文档](./../../origins-js)。

:::

**起源JS** 是一个 KubeJS 扩展，允许你使用 JavaScript 注册自定义动作、条件和能力。所有自定义类型都使用 `origins_js:` 命名空间前缀。

### 章节

- **[API 参考](api-reference)** — HolderWrapper、HelperWrapper（推荐的 PowerHelper API）、静态快捷方法以及 JS 类型注册的完整方法参考
- **[示例](examples)** — 管理起源/能力、HelperWrapper、自定义动作、条件和 JS 能力的使用示例

---

## 类型映射

起源JS 包装了标准的起源类型。各类型详情请参阅主文档：

| JS 注册方法 | JSON 类型 | 文档 |
|-----------------|-----------|------|
| `registerEntityAction` | `origins_js:js_entity_action` | [实体动作类型](../types/action/entity_action_types) |
| `registerBlockAction` | `origins_js:js_block_action` | [方块动作类型](../types/action/block_action_types) |
| `registerItemAction` | `origins_js:js_item_action` | [物品动作类型](../types/action/item_action_types) |
| `registerBiEntityAction` | `origins_js:js_bientity_action` | [双实体动作类型](../types/action/bientity_action_types) |
| `registerEntityCondition` | `origins_js:js_entity_condition` | [实体条件类型](../types/condition/entity_condition_types) |
| `registerBlockCondition` | `origins_js:js_block_condition` | [方块条件类型](../types/condition/block_condition_types) |
| `registerItemCondition` | `origins_js:js_item_condition` | [物品条件类型](../types/condition/item_condition_types) |
| `registerBiEntityCondition` | `origins_js:js_bientity_condition` | [双实体条件类型](../types/condition/bientity_condition_types) |
| `registerBiomeCondition` | `origins_js:js_biome_condition` | [生物群系条件类型](../types/condition/biome_condition_types) |
| `registerDamageCondition` | `origins_js:js_damage_condition` | [伤害条件类型](../types/condition/damage_condition_types) |
| `registerFluidCondition` | `origins_js:js_fluid_condition` | [流体条件类型](../types/condition/fluid_condition_types) |
| `powerBuilder(id)` | `origins_js:js_power` | [能力类型](../types/power) |
