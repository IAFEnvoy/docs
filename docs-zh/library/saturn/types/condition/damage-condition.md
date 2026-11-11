---
title: "伤害条件"
sidebar_label: "伤害条件 (DamageCondition)"
sidebar_position: 5
---

# 伤害条件

检查伤害来源、伤害量和相关实体。嵌入 DamageCondition 字段。

### `saturn:amount_range` {#saturnamount_range}

检查伤害量是否在 min 与 max 之间，包含端点。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:amount_range` |
| `min` | [数值提供器](../number.md) | 是 | — | 下限。 |
| `max` | [数值提供器](../number.md) | 是 | — | 上限。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:amount_range",
  "min": 1,
  "max": 1
}
```

</details>

### `saturn:damage_type` {#saturndamage_type}

检查伤害源的类型。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:damage_type` |
| `damage_type` | 资源 ID | 是 | — | 原版伤害类型 ID。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:damage_type",
  "damage_type": "minecraft:generic"
}
```

</details>

### `saturn:damage_type_tag` {#saturndamage_type_tag}

检查伤害类型是否属于指定标签。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:damage_type_tag` |
| `tag` | 标签 ID（不带 #） | 是 | — | 注册表标签，或本页声明的 NBT 数据。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:damage_type_tag",
  "tag": "example:tag"
}
```

</details>

### `saturn:directness` {#saturndirectness}

检查伤害是否为直接伤害。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:directness` |
| `direct` | 布尔值 | 否 | `true` | true 要求直接伤害，false 要求间接伤害。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:directness"
}
```

</details>

### `saturn:fire` {#saturnfire}

检查伤害源是否属于火焰伤害。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:fire` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:fire"
}
```

</details>

### `saturn:magic` {#saturnmagic}

检查伤害源是否属于魔法伤害。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:magic` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:magic"
}
```

</details>

### `saturn:projectile` {#saturnprojectile}

检查伤害是否来自符合类型或条件的投射物。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:projectile` |
| `projectile` | 资源 ID | 否 | 省略 | 投射物实体类型 ID。 |
| `projectile_condition` | [实体条件](./entity-condition.md) | 否 | `{"type":"saturn:always"}` | 用于投射物实体的条件。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:projectile"
}
```

</details>

## 元类型

以下类型不直接判断具体值，只组合或委托其他同类类型；字段同样嵌入对应位置。

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
| `condition` | [伤害条件](./damage-condition.md) | 是 | — | 要检查的条件。 |

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
