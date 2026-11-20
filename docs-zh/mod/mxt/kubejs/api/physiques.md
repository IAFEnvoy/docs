---
title: MxtPhysiques：体质
description: 查询、授予、移除与启停体质；体质定义不依赖元素的修炼身份。
---

# `MxtPhysiques`：体质

<span id="mxtphysiques-体质" />

体质提供不依赖元素的修炼身份，可授予原版属性与技能、修正造成和受到的伤害，并通过互斥标签限制共存。与元素关联的灵根操作见 [MxtSpiritRoots](./spirit_roots.md)。授予时根据当前实体检查 `holder_condition` 与 `exclusive_tags`。

## 方法 {#方法}

| 方法 | 参数 | 返回值 | 说明 |
| --- | --- | --- | --- |
| `list(entity)` | `Entity` | `List<String>` | 该实体**持有**的体质 ID，按 ID 排序（`allow_stacking` 时同一个 ID 可能出现多次）。 |
| `active(entity)` | `Entity` | `List<String>` | 现在**生效**的体质。 |
| `has(entity, physique)` | `Entity`、体质 ID | `boolean` | 是否持有。 |
| `enabled(entity, physique)` | `Entity`、体质 ID | `boolean` | 该体质是否处于开启状态；不持有则为 `false`。 |
| `grant(entity, physique)` | `LivingEntity`、体质 ID | `{changed, failure}` | 走权威服务授予，[`holder_condition`](../../datapack/json/physique.md) 与 `exclusive_tags` 按**当前**实体判定。 |
| `remove(entity, physique)` | `LivingEntity`、体质 ID | `boolean` | 移除该体质及其属性、能力与伤害倍率；本来没持有则为 `false`。 |
| `setEnabled(entity, physique, enabled)` | `LivingEntity`、体质 ID、`boolean` | `{changed, failure}` | 与灵根同义的开关。 |

灵根与体质共用同一套 `failure` 词表：`DISABLED`（注册表里没有这个 id，含被 `neoforge:conditions` 挡掉的定义）、`ALREADY_HELD`、`CONDITIONS`（体质 `holder_condition` 不满足）、`EXCLUSIVE_CONFLICT`、`ELEMENT_CONFLICT`（灵根 `conflicting_elements`）、`NOT_HELD`、`SERVER_ONLY`（在客户端调用）。四个读方法两侧都能用，改变状态的方法是服务端操作。

```js
// kubejs/server_scripts/mxt_physique.js
const result = MxtPhysiques.grant(player, 'mxt_test:blazing_body')
if (!result.changed) console.warn(`refused: ${result.failure}`)

// 关闭不等于失去：body 还拿着它，只是什么都不生效。
MxtPhysiques.setEnabled(player, 'mxt_test:blazing_body', false)
```

## 相关 {#相关}

- 数据包侧：[体质 `physique`](../../datapack/json/physique.md)。
- 另一半身份：[MxtSpiritRoots](./spirit_roots.md)（两者配合的洗练示例在那里）。
- 管理员命令：[/physique](../../player-guide/commands/physique.md)。
- [KubeJS API 参考](../api-reference.md)。
