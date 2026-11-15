---
title: "双实体条件"
sidebar_label: "双实体条件 (BiEntityCondition)"
sidebar_position: 2
---

检查 actor 和 target 的关系。交换双方会改变部分条件的含义。

## 类型

### `saturn:attack_target` {#saturnattack_target}

target 是 actor 的攻击目标

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:attack_target` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:attack_target"
}
```

</details>

`actor` 为发起方，`target` 为目标方；二者的顺序由调用方决定。

### `saturn:attacker` {#saturnattacker}

actor 是最近攻击 target 的生物

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:attacker` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:attacker"
}
```

</details>

`actor` 为发起方，`target` 为目标方；二者的顺序由调用方决定。

### `saturn:can_see` {#saturncan_see}

通过方块和流体射线检查双方之间的视线。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:can_see` |
| `shape_type` | 对象 | 否 | `"visual"` | 视线射线使用的方块形状模式。 可用值：`collider`、`outline`、`visual`、`falldamage_resetting`。 |
| `fluid_handling` | 对象 | 否 | `"none"` | 视线射线对流体的处理模式。 可用值：`none`、`source_only`、`any`、`water`。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:can_see"
}
```

</details>

### `saturn:distance` {#saturndistance}

检查 actor 与 target 的距离是否在上限内。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:distance` |
| `maximum` | [数值提供器](../number.md) | 是 | — | 最大值或上限。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:distance",
  "maximum": 1
}
```

</details>

### `saturn:equal` {#saturnequal}

两个参数指向同一实体

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:equal` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:equal"
}
```

</details>

`actor` 为发起方，`target` 为目标方；二者的顺序由调用方决定。

### `saturn:owner` {#saturnowner}

actor 是 target 的主人

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:owner` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:owner"
}
```

</details>

`actor` 为发起方，`target` 为目标方；二者的顺序由调用方决定。

### `saturn:relation` {#saturnrelation}

检查 actor 与 target 是否互为同盟。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:relation` |
| `allied` | 布尔值 | 否 | `true` | 期望的同盟关系状态。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:relation"
}
```

</details>

### `saturn:relative_rotation` {#saturnrelative_rotation}

比较 actor 与 target 在指定轴上的旋转差。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:relative_rotation` |
| `axis` | 枚举字符串数组 | 否 | `["x","y","z"]` | 参与计算的旋转轴列表。 可用值：`x`、`y`、`z`。 |
| `actor_rotation` | 枚举字符串 | 否 | `"head"` | actor 使用头部或身体旋转。 可用值：`head`、`body`。 |
| `target_rotation` | 枚举字符串 | 否 | `"body"` | target 使用头部或身体旋转。 可用值：`head`、`body`。 |
| `comparison` | 枚举字符串 | 是 | — | 可用 `==`、`!=`、`<`、`<=`、`>`、`>=`。 |
| `compare_to` | 数值 | 是 | — | 用来比较的目标数值。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:relative_rotation",
  "comparison": ">=",
  "compare_to": 1
}
```

</details>

### `saturn:riding` {#saturnriding}

actor 正在直接骑乘 target

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:riding` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:riding"
}
```

</details>

`actor` 为发起方，`target` 为目标方；二者的顺序由调用方决定。

### `saturn:riding_recursive` {#saturnriding_recursive}

检查多层骑乘关系。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:riding_recursive` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:riding_recursive"
}
```

</details>

### `saturn:riding_root` {#saturnriding_root}

target 是 actor 最底层的载具

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:riding_root` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:riding_root"
}
```

</details>

`actor` 为发起方，`target` 为目标方；二者的顺序由调用方决定。

未骑乘时，实体的 root vehicle 是自身；因此同一个实体作为两端时也会匹配。

### `saturn:same_team` {#saturnsame_team}

检查 actor 与 target 是否位于同一队伍。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:same_team` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:same_team"
}
```

</details>

### `saturn:team` {#saturnteam}

读取或检查实体的计分板队伍。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:team` |
| `same_team` | 布尔值 | 否 | `true` | true 要求同队，false 要求不同队。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:team"
}
```

</details>

## 元类型

以下类型不直接判断具体值，只组合或委托其他同类类型；字段同样嵌入对应位置。

### `saturn:actor_condition` {#saturnactor_condition}

让 actor 接受实体条件检查。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:actor_condition` |
| `condition` | [实体条件](./entity-condition.md) | 是 | — | 要检查的条件。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:actor_condition",
  "condition": {
    "type": "saturn:always"
  }
}
```

</details>

### `saturn:always` {#saturnalways}

条件始终为真。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:always` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:always"
}
```

</details>

### `saturn:and` {#saturnand}

所有子条件都成立时才匹配。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:and` |
| `conditions` | 同类条件数组 | 是 | — | 同类子条件列表。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:and",
  "conditions": []
}
```

</details>

### `saturn:both` {#saturnboth}

对 actor 与 target 检查同一实体条件，二者都成立才匹配。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:both` |
| `condition` | [实体条件](./entity-condition.md) | 是 | — | 要检查的条件。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:both",
  "condition": {
    "type": "saturn:always"
  }
}
```

</details>

### `saturn:chance` {#saturnchance}

按指定概率决定是否命中。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:chance` |
| `chance` | 数值 | 是 | — | 命中概率，0 表示不命中，1 表示必定命中。 Codec 范围：`0.0D, 1.0D`。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:chance",
  "chance": 1
}
```

</details>

### `saturn:constant` {#saturnconstant}

返回配置的固定布尔值

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:constant` |
| `value` | 布尔值 | 是 | — | 固定布尔值；用于方块属性时，匹配或设置布尔属性。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:constant",
  "value": true
}
```

</details>

`actor` 为发起方，`target` 为目标方；二者的顺序由调用方决定。

### `saturn:either` {#saturneither}

对 actor 与 target 检查同一实体条件，至少一方成立即匹配。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:either` |
| `condition` | [实体条件](./entity-condition.md) | 是 | — | 要检查的条件。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:either",
  "condition": {
    "type": "saturn:always"
  }
}
```

</details>

### `saturn:invert` {#saturninvert}

交换 actor 与 target 后检查条件

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:invert` |
| `condition` | [双实体条件](./bientity-condition.md) | 是 | — | 筛选条件；类型由字段声明确定。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:invert",
  "condition": {
    "type": "saturn:always"
  }
}
```

</details>

`actor` 为发起方，`target` 为目标方；二者的顺序由调用方决定。

### `saturn:js` {#saturnjs}

调用由 KubeJS 注册的回调，并传入 params 参数。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:js` |
| `id` | 字符串 | 是 | — | 回调、选项或条目的标识符。 |
| `params` | 对象 | 否 | `{}` | 传给脚本或公式的参数对象。 |

仅在安装 KubeJS 时注册。JSON 只选择已有回调，不会直接执行 JSON 内的 JavaScript 字符串。

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:js",
  "id": "example_callback",
  "params": {}
}
```

</details>

### `saturn:mutual` {#saturnmutual}

原顺序和交换 actor、target 后的双实体条件都须成立。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:mutual` |
| `condition` | [双实体条件](./bientity-condition.md) | 是 | — | 要检查的条件。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:mutual",
  "condition": {
    "type": "saturn:always"
  }
}
```

</details>

### `saturn:never` {#saturnnever}

条件始终为假。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:never` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:never"
}
```

</details>

### `saturn:not` {#saturnnot}

反转子条件的匹配结果。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:not` |
| `condition` | [双实体条件](./bientity-condition.md) | 是 | — | 要检查的条件。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:not",
  "condition": {
    "type": "saturn:always"
  }
}
```

</details>

### `saturn:or` {#saturnor}

任一子条件成立即匹配。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:or` |
| `conditions` | 同类条件数组 | 是 | — | 同类子条件列表。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:or",
  "conditions": []
}
```

</details>

### `saturn:target_condition` {#saturntarget_condition}

让 target 接受实体条件检查。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:target_condition` |
| `condition` | [实体条件](./entity-condition.md) | 是 | — | 要检查的条件。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:target_condition",
  "condition": {
    "type": "saturn:always"
  }
}
```

</details>

### `saturn:undirected` {#saturnundirected}

原顺序或交换 actor、target 后有一次匹配即可。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:undirected` |
| `condition` | [双实体条件](./bientity-condition.md) | 是 | — | 要检查的条件。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:undirected",
  "condition": {
    "type": "saturn:always"
  }
}
```

</details>
