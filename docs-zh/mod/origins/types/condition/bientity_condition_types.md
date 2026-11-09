# 双实体条件类型 {#bi-entity-condition-types}

双实体条件检查两个实体（动作实体与目标实体）之间的关系。

### `origins:attack_target` {#originsattack_target}

检查动作实体当前是否对目标实体具有攻击性。

### `origins:attacker` {#originsattacker}

检查动作实体是否在最近 5 秒内攻击过目标实体，并且该实体仍然存在。

### `origins:can_see` {#originscan_see}

检查动作实体能否看到目标实体（是否具有视线）。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `shape_type` | [字符串](../basic_concepts#string) | `visual` | 方块裁剪形状：`visual`、`collider` 或 `outline` |
| `fluid_handling` | [字符串](../basic_concepts#string) | `none` | 流体处理方式：`none`、`source_only` 或 `any` |

<details>
<summary>示例</summary>

```json
"bientity_condition": {
    "type": "origins:can_see"
}
```

此示例将检查从动作实体眼睛到目标实体眼睛的直线路径是否畅通。如果动作实体/目标实体位于水源/流动流体之后、浸没在任何类型的流体中，或位于不可透视的方块（例如 Glass）之后，该条件将返回 false。

</details>

### `origins:compare_resources` {#originscompare_resources}

比较动作实体上的资源与目标实体上的资源。`source_resource` 可作为 `actor_resource` 的兼容性别名使用。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `actor_resource` | [标识符](../basic_concepts#identifier) | **必填** | 动作实体上的资源能力 ID |
| `comparison` | [字符串](../basic_concepts#string) | **必填** | 比较运算符 |
| `target_resource` | [标识符](../basic_concepts#identifier) | **必填** | 目标实体上的资源能力 ID |

### `origins:distance` {#originsdistance}

检查动作实体与目标实体之间的距离。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `comparison` | [字符串](../basic_concepts#string) | **必填** | 比较运算符 |
| `compare_to` | [浮点数](../basic_concepts#float) | **必填** | 用于比较的距离 |

<details>
<summary>示例</summary>

```json
"bientity_condition": {
  "type": "origins:distance",
  "comparison": "<=",
  "compare_to": 30
}
```

此示例将检查动作实体是否为可驯服且已被驯服的生物。

</details>

### `origins:equal` {#originsequal}

检查动作实体与目标实体是否为同一个实体。

### `origins:in_set` {#originsin_set}

检查动作实体是否位于特定的实体集合中。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `set` | [通配符标识符](../basic_concepts#wildcard-identifier) | **必填** | 实体集合 ID |

### `origins:owner` {#originsowner}

检查动作实体是否为目标实体的主人。

### `origins:relative_rotation` {#originsrelative_rotation}

检查动作实体与目标实体之间的相对旋转/角度。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `axis` | 字符串列表 | 全部轴 | 保留的轴：`x`、`y`、`z` |
| `actor_rotation` | [字符串](../basic_concepts#string) | `head` | 执行者的朝向来源：`head` 或 `body` |
| `target_rotation` | [字符串](../basic_concepts#string) | `body` | 目标的朝向来源：`head` 或 `body` |
| `comparison` | [字符串](../basic_concepts#string) | **必填** | 比较运算符 |
| `compare_to` | [浮点数](../basic_concepts#float) | **必填** | 用于比较的归一化点积 |

<details>
<summary>示例</summary>

```json
"bientity_condition": {
    "type": "origins:relative_rotation",
    "axis": [
        "x",
        "y",
        "z"
    ],
    "actor_rotation": "head",
    "target_rotation": "body",
    "comparison": ">=",
    "compare_to": -0.8
}
```

此示例将检查动作实体与目标实体是否基本上面对面。

</details>

### `origins:riding` {#originsriding}

检查动作实体当前是否骑乘着目标实体。

### `origins:riding_recursive` {#originsriding_recursive}

检查动作实体是否（递归地）骑乘着目标实体。

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `condition` | [双实体条件](../condition/bientity_condition_types) | 可选 | 嵌套条件 |

### `origins:riding_root` {#originsriding_root}

检查动作实体是否从骑乘链的最末端骑乘着目标实体。

### `origins:same_team` {#originssame_team}

:::caution 不稳定
此条件目前不稳定，可能无法按预期工作。如果遇到任何相关问题，请报告。
:::

检查动作实体与目标实体是否都处于同一个非空计分板队伍中。
### `origins:same_team` {#originssame_team-1}

:::caution 不稳定
此条件目前不稳定，可能无法按预期工作。如果遇到任何相关问题，请报告。
:::

检查动作实体与目标实体是否都处于同一个非空计分板队伍中。
