# 元动作类型 {#meta-action-types}

元动作是执行其他动作的动作，可实现更复杂的行为与逻辑。它们可用于组合多个动作、添加条件、引入随机性等。

## 通用类型 {#universal-types}

:::info
这些元动作类型可用于所有类型的动作。
:::

### `origins:for_range`

对从 `0` 到解析所得范围的每个整数各执行一次动作。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `range` | [资源引用](../shared_data_types#resource-reference) | **必填** | 执行次数；负值表示执行零次 |
| `action` | Action | **必填** | 要执行的动作 |

执行次数受服务器 `general.maxActionIterations` 设置限制，该设置默认为 `10000`，最大为 `1000000`。

### `origins:while`

在其条件保持为真时重复执行动作。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `condition` | Condition | **必填** | 每次执行前检测的条件 |
| `action` | Action | **必填** | 要执行的动作 |

服务器 `general.maxActionIterations` 设置会限制执行次数。达到该上限的循环会抛出错误，而不是无限继续。

### `origins:and`

依次执行多个动作。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `actions` | List of Actions | **必填** | 要执行的动作 |

<details>
<summary>示例 1</summary>

```json
"entity_action": {
    "type": "origins:and",
    "actions": [
        {
            "type": "origins:exhaust",
            "amount": 0.5
        },
        {    
            "type": "origins:apply_effect",
            "effect": {
            "effect": "minecraft:regeneration",
            "amplifier": 1,
            "duration": 100
            }
        }
    ]
}
```

此示例会对玩家施加数值为 0.5 的消耗，并施加持续 5 秒的生命恢复 II 状态效果。

</details>

<details>
<summary>示例 2</summary>

```json
"entity_action": {
  "type": "origins:and",
  "actions": [
    {
      "type": "origins:execute_command",
      "command": "say first"
    },
    {
      "type": "origins:execute_command",
      "command": "say second"
    }
  ]
}
```

此示例会依次执行两条命令：先执行 "say first"，再执行 "say second"。

</details>

### `origins:chance`

按概率随机执行。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `action` | Action | **必填** | 动作 |
| `chance` | [浮点数](../basic_concepts#float) | **必填** | 概率（0-1） |
| `fail_action` | Action | 可选 | 概率未命中时执行的动作 |

<details>
<summary>示例 1</summary>

```json
"entity_action": {
    "type": "origins:chance",
    "action": {
        "type": "origins:set_on_fire",
        "tick": 100
    },
    "chance": 0.4
}
```

此示例有 40% 的概率使该实体着火 5 秒。

</details>

<details>
<summary>示例 2</summary>

```json
"entity_action": {
  "type": "origins:chance",
  "chance": 0.5,
  "action": {
    "type": "origins:execute_command",
    "command": "say lucky!"
  },
  "fail_action": {
    "type": "origins:execute_command",
    "command": "say unlucky..."
  }
}
```

此示例有 50% 的概率输出 "lucky!"，50% 的概率输出 "unlucky..."。

</details>

### `origins:choice`

从带权重的列表中选取。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `actions` | List of WeightedAction | **必填** | 带权重的动作列表 |

对于 `actions` 列表中的每个条目：

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `element` | Action | **必填** | 要执行的动作 |
| `weight` | [整数](../basic_concepts#integer) | `1` | 被选中的权重 |

<details>
<summary>示例 1</summary>

```json
"entity_action": {
    "type": "origins:choice",
    "actions": [
        {
            "element": {
                "type": "origins:exhaust",
                "amount": 0.5
            },
            "weight": 10
        },
        {
            "element": {    
            "type": "origins:apply_effect",
                "effect": {
                    "effect": "minecraft:regeneration",
                    "amplifier": 1,
                    "duration": 100
                }
            },
            "weight": 10
        },
        {
            "element": {
                "type": "origins:set_on_fire",
                "tick": 100
            },
            "weight": 20
        }
    ]
}
```

此示例包含多个权重不同的实体动作类型：一个有 25% 的概率对玩家施加数值为 `0.5` 的消耗，另一个有 25% 的概率施加持续 5 秒的生命恢复 II 状态效果，还有一个有 50% 的概率使该实体着火 8 秒。

</details>

<details>
<summary>示例 2</summary>

```json
"entity_action": {
  "type": "origins:choice",
  "actions": [
    {
      "action": {
        "type": "origins:execute_command",
        "command": "say option A"
      },
      "weight": 3
    },
    {
      "action": {
        "type": "origins:execute_command",
        "command": "say option B"
      },
      "weight": 1
    }
  ]
}
```

此示例有 75% 的概率选中选项 A，25% 的概率选中选项 B。

</details>

### `origins:delay`

延迟执行。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `action` | Action | **必填** | 动作 |
| `ticks` | [整数](../basic_concepts#integer) | **必填** | 以 tick 计的延迟 |

<details>
<summary>示例 1</summary>

```json
"entity_action": {
    "type": "origins:delay",
    "ticks": 20,
    "action": {
        "type": "origins:apply_effect",
        "effect": {
            "effect": "minecraft:speed",
            "amplifier": 1,
            "duration": 80
        }
    }
}
```

此示例会在 1 秒后施加速度 II 状态效果。

</details>

<details>
<summary>示例 2</summary>

```json
"entity_action": {
  "type": "origins:delay",
  "ticks": 40,
  "action": {
    "type": "origins:execute_command",
    "command": "say 2 seconds have passed"
  }
}
```

此示例会在 2 秒（40 tick）延迟后执行该命令。

</details>

### `origins:empty`

什么也不做。

### `origins:if_else`

条件执行。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `condition` | Action | **必填** | 条件 |
| `if_action` | Action | 可选 | 条件为真时执行的动作 |
| `else_action` | Action | 可选 | 条件为假时执行的动作 |

<details>
<summary>示例</summary>

```json
"entity_action": {
    "type": "origins:if_else",
    "condition": {
        "type": "origins:fall_flying"
    },
    "if_action": {
        "type": "origins:set_on_fire",
        "tick": 100
    },
    "else_action": {
        "type": "origins:heal",
        "amount": 6
    }
}
```

此示例会在该实体处于"滑翔飞行"状态时使其着火 5 秒。否则改为为其恢复 3 颗心的生命值。

</details>

### `origins:if_else_list`

条件-动作对。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `actions` | List of IfElseEntry | **必填** | 条件-动作对 |

对于 `actions` 列表中的每个条目：

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `condition` | Action | **必填** | 条件 |
| `action` | Action | **必填** | 条件为真时执行的动作 |

<details>
<summary>示例</summary>

```json
"entity_action": {
  "type": "origins:if_else_list",
  "actions": [
    {
      "condition": {
        "type": "origins:health",
        "comparison": "<=",
        "compare_to": 6
      },
      "action": {
        "type": "origins:apply_effect",
        "effect": {
          "effect": "minecraft:speed",
          "amplifier": 2,
          "duration": 80
        }
      }
    },
    {
      "condition": {
        "type": "origins:health",
        "comparison": "<=",
        "compare_to": 12
      },
      "action": {
        "type": "origins:apply_effect",
        "effect": {
          "effect": "minecraft:speed",
          "amplifier": 1,
          "duration": 80
        }
      }
    },
    {
      "condition": {
        "type": "origins:health",
        "comparison": "<=",
        "compare_to": 18
      },
      "action": {
        "type": "origins:apply_effect",
        "effect": {
          "effect": "minecraft:speed",
          "amplifier": 0,
          "duration": 80
        }
      }
    }
  ]
}
```

此示例会按实体的生命值分三档施加更强的速度状态效果（&lt;= 3 颗心、&lt;= 6 颗心或 &lt;= 9 颗心），生命值越低效果越强。

</details>

### `origins:side`

仅在指定端执行。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `action` | Action | **必填** | 动作 |
| `side` | [字符串](../basic_concepts#string) | **必填** | `client` 或 `server` |

<details>
<summary>示例 1</summary>

```json
"entity_action": {
    "type": "origins:side",
    "side": "client",
    "action": {
        "type": "origins:change_resource",
        "resource": "example:resource",
        "change": 1
    }
}
```

此示例会在客户端侧为 `example:resource` 能力加 1。

</details>

<details>
<summary>示例 2</summary>

```json
"entity_action": {
  "type": "origins:side",
  "side": "server",
  "action": {
    "type": "origins:execute_command",
    "command": "say server only"
  }
}
```

此动作只会在服务端执行。

</details>

## 双实体专用 {#bi-entity-specific}

### `origins:invert`

交换执行者与目标。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `action` | [双实体动作](../action/bientity_action_types) | **必填** | 交换实体后执行的动作 |

<details>
<summary>示例</summary>

```json
"bientity_action": {
    "type": "origins:invert",
    "action": {
        "type": "origins:mount"
    }
}
```

此示例会把目标实体骑乘到执行者实体上，因为二者的角色已被交换。

</details>

### `origins:source_action`

仅对执行者执行实体动作。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `action` | [实体动作](../action/entity_action_types) | **必填** | 对执行者执行的动作 |

<details>
<summary>示例</summary>

```json
"bientity_action": {
    "type": "origins:source_action",
    "action": {
        "type": "origins:set_on_fire",
        "tick": 100
    }
}
```

此示例会使执行者实体着火 5 秒。

</details>

### `origins:target_action`

仅对目标执行实体动作。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `action` | [实体动作](../action/entity_action_types) | **必填** | 对目标执行的动作 |

<details>
<summary>示例</summary>

```json
"bientity_action": {
    "type": "origins:target_action",
    "action": {
        "type": "origins:set_on_fire",
        "tick": 100
    }
}
```

此示例会使目标实体着火 5 秒。

</details>

## 方块专用 {#block-specific}

### `origins:absolute_offset`

在绝对偏移处执行动作。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `action` | [方块动作](../action/block_action_types) | **必填** | 动作 |
| `x` | [整数](../basic_concepts#integer) | `0` | X 轴偏移 |
| `y` | [整数](../basic_concepts#integer) | `0` | Y 轴偏移 |
| `z` | [整数](../basic_concepts#integer) | `0` | Z 轴偏移 |

### `origins:region_apply`

对立方体区域内的所有方块施加动作。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `radius` | [双精度浮点数](../basic_concepts#double) | `16.0` | 半径 |
| `shape` | [形状](../shared_data_types#shape) | `cube` | 如何选取方块 |
| `block_action` | [方块动作](../action/block_action_types) | **必填** | 要施加的动作 |
| `block_condition` | [方块条件](../condition/block_condition_types) | 可选 | 用于筛选方块的条件 |

<details>
<summary>示例</summary>

```json
"block_action": {
    "type": "origins:area_of_effect",
    "radius": 16,
    "shape": "cube",
    "block_action": {
        "type": "origins:modify_block_state",
        "property": "waterlogged",
        "value": false
    }
}
```

此示例会在以立方体形状划分的 16 格半径内，让所有可含水的方块不再含水。

</details>

### `origins:relative_offset`

基于实体朝向在相对偏移处执行动作。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `action` | [方块动作](../action/block_action_types) | **必填** | 动作 |
| `distance` | [整数](../basic_concepts#integer) | **必填** | 朝方块动作朝向偏移的格数 |

<details>
<summary>示例</summary>

```json
"block_action": {
    "type": "origins:relative_offset",
    "action": {
        "type": "origins:add_block",
        "block": "minecraft:gravel"
    },
    "distance": 1
}
```

此示例会沿方块动作朝向的方向，在 1 格外放置沙砾。

</details>

## 实体专用 {#entity-specific}

### `origins:region_apply`

对立方体区域内的所有实体施加动作。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `radius` | [双精度浮点数](../basic_concepts#double) | `16.0` | 半径 |
| `shape` | [形状](../shared_data_types#shape) | `cube` | 如何选取实体 |
| `bientity_action` | [BiEntity Action](../action/bientity_action_types) | **必填** | 要施加的动作 |
| `bientity_condition` | [BiEntity Condition](../condition/bientity_condition_types) | 可选 | 用于筛选实体的条件 |
| `includeActor` | [布尔值](../basic_concepts#boolean) | `false` | 是否将执行者实体纳入选取范围 |
