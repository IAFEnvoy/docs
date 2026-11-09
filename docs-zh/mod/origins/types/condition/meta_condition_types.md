# 元条件类型 {#meta-condition-types}

元条件类型是执行其他条件的条件。它们可以通过把多个条件组合在一起，来构建复杂的条件。

## 通用类型 {#universal-types}

:::info
这些元条件类型可用于所有类型的条件。
:::

### `origins:and` {#originsand}

所有条件都必须为真。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `conditions` | List of [双实体条件](../condition/bientity_condition_types) | **必填** | 条件 |

### `origins:chance` {#originschance}

随机概率。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `chance` | [浮点数](../basic_concepts#float) | **必填** | 概率（0-1） |

### `origins:constant` {#originsconstant}

始终为真或始终为假。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `value` | [布尔值](../basic_concepts#boolean) | `true` | 常量值 |

<details>
<summary>示例</summary>

```json
"condition": {
    "type": "origins:constant",
    "value": true
}
```

此示例始终为真。

</details>

### `origins:not` {#originsnot}

反转一个条件。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `condition` | [双实体条件](../condition/bientity_condition_types) | **必填** | 要反转的条件 |

<details>
<summary>示例</summary>

```json
"condition": {
  "type": "origins:not",
  "condition": {
    "type": "origins:exposed_to_sun"
  }
}
```

此示例将检查实体是否**未**暴露在阳光下。

</details>

### `origins:or` {#originsor}

至少有一个条件为真。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `conditions` | List of [双实体条件](../condition/bientity_condition_types) | **必填** | 条件 |

<details>
<summary>示例</summary>

```json
"condition": {
    "type": "origins:or",
    "conditions": [
        {
            "type": "origins:mob_effect",
            "effect": "minecraft:poison"
        },
        {    
            "type": "origins:mob_effect",
            "effect": "minecraft:wither"
        }
    ]
}
```

此示例将检查实体是否拥有中毒或凋零状态效果中的任意一种。

</details>

## 双实体专用 {#bi-entity-specific}

### `origins:actor_condition` {#originsactor_condition}

对动作实体评估一个实体条件。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `condition` | [实体条件](../condition/entity_condition_types) | **必填** | 对动作实体的条件 |

<details>
<summary>示例</summary>

```json
"bientity_condition": {
    "type": "origins:actor_condition",
    "condition": {
       "type": "origins:tamed"
    }
}
```

此示例将检查动作实体是否为可驯服且已被驯服的生物。

</details>

### `origins:both` {#originsboth}

同时对动作实体和目标实体评估一个实体条件。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `condition` | [实体条件](../condition/entity_condition_types) | **必填** | 对两个实体的条件 |

<details>
<summary>示例</summary>

```json
"bientity_condition": {
    "type": "origins:both",
    "condition": {
        "type": "origins:entity_type",
        "entity_type": "minecraft:player"
    }
}
```

此示例将检查动作实体和目标实体是否都是玩家。

</details>

### `origins:either` {#originseither}

对任意一个实体评估实体条件。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `condition` | [实体条件](../condition/entity_condition_types) | **必填** | 对任一实体的条件 |

<details>
<summary>示例</summary>

```json
"bientity_condition": {
    "type": "origins:either",
    "condition": {
        "type": "origins:in_rain"
    }
}
```

此示例将检查动作实体或目标实体是否有任意一个处于雨中。

</details>

### `origins:invert` {#originsinvert}

交换动作实体与目标实体。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `condition` | [双实体条件](../condition/bientity_condition_types) | **必填** | 交换实体后的条件 |

### `origins:target_condition` {#originstarget_condition}

对目标实体评估一个实体条件。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `condition` | [实体条件](../condition/entity_condition_types) | **必填** | 对目标实体的条件 |

<details>
<summary>示例</summary>

```json
"bientity_condition": {
    "type": "origins:target_condition",
    "condition": {
       "type": "origins:tamed"
    }
}
```

此示例将检查目标实体是否为可驯服且已被驯服的生物。

</details>

### `origins:undirected` {#originsundirected}

双向评估一个双实体条件。只要条件在原始执行者与目标上成立，或在二者角色互换后成立，该条件就成功。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `condition` | [双实体条件](../condition/bientity_condition_types) | **必填** | 需要双向测试的条件 |

<details>
<summary>示例</summary>

```json
"bientity_condition": {
    "type": "origins:undirected",
    "condition": {
        "type": "origins:riding"
    }
}
```

此示例将检查两个实体中是否有一方骑乘着另一方。

</details>

## 方块专用 {#block-specific}

### `origins:offset` {#originsoffset}

在偏移位置评估条件。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `condition` | [方块条件](../condition/block_condition_types) | **必填** | 要评估的条件 |
| `x` | [整数](../basic_concepts#integer) | `0` | X 偏移 |
| `y` | [整数](../basic_concepts#integer) | `0` | Y 偏移 |
| `z` | [整数](../basic_concepts#integer) | `0` | Z 偏移 |
