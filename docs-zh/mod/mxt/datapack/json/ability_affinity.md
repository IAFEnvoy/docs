---
title: ability_affinity（技能元素亲和）
description: mxt:ability_affinity 的字段与判定：哪条技能属于哪些元素、多条灵根匹配时怎么合并，以及它在施放门槛与伤害倍率上的作用。
---

# ability_affinity（技能元素亲和）

<span id="ability-affinity-技能元素亲和" />

技能的元素亲和**不在技能定义里**，而是这张数据包注册表里的一条独立定义。原因很直接：一种元素属于哪条技能是世界的规则，不是技能本身的形状——同一个 `saturn:ability` 条目可以被任何模组复用，而"它偏向火"只在这个世界成立。

## 文件与 id {#文件与-id}

- 注册表 id 是 `mxt:ability_affinity`，文件放在 `data/<命名空间>/mxt/ability_affinity/<路径>.json`。
- 一份文件就是一条定义，条目 id 是 `<命名空间>:<路径>`；这个 id **不会**被别处引用，所以怎么命名都行。

```json
// data/example/mxt/ability_affinity/qi_bolt.json
{
  "abilities": ["example:qi_bolt"],
  "elements": ["example:fire", "#example:basic"],
  "mode": "average"
}
```

## 字段 {#字段}

| 字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `abilities` | 技能 id 或 `#技能标签` 的列表 | **必填** | 这条亲和覆盖哪些技能，非空。 |
| `elements` | 元素 id 或 `#元素标签` 的列表 | **必填** | 技能偏向哪些元素；空列表等价于"这条技能不绑元素"。 |
| `mode` | `average` / `max` | `average` | 多条灵根都匹配时怎么合并：`average` 取平均，`max` 取最好的那条。 |

**先匹配先答。** 一条技能可以被多条定义命中（另一份包也点名了它，或一条写具体 id、另一条写标签），按注册表顺序取第一条命中的，后面的不再看——所以"具体 id 覆盖标签"要靠把你更想要的那条排在前面，而不是靠优先级字段。

## 它做什么 {#它做什么}

一条技能在这张表里被点名、且 `elements` 非空时，它会得到两件事：

1. **施放门槛**：持有者的灵根一个都不匹配，这次施放被拒绝，失败原因是权限不足。
2. **伤害倍率**：按匹配灵根的 `element_ability_modifier` 算出一个倍率，`mode` 决定多条匹配时取平均还是取最好；这个倍率与进度链的倍率一起并进公式变量 `damage_multiplier`，由[伤害管线](../../technical/damage.md)第一层乘进这次施放打出的伤害。

所以伤害公式里**不要**再手写任何亲和倍率，也不再有 `element_modifier` 这个变量。要按亲和缩放**不是伤害**的东西（消耗、时长），目前没有现成的变量可读。

轮盘 tooltip 会把这几个元素列在技能下面；定义不存在或 `elements` 为空时，那两行都不画。
