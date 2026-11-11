---
title: "双实体条件"
sidebar_label: "双实体条件 (BiEntityCondition)"
sidebar_position: 2
---

# 双实体条件

检查 actor 和 target 的关系。交换双方会改变部分条件的含义。

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
