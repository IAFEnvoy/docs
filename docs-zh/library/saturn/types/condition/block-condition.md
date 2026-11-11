---
title: "方块条件"
sidebar_label: "方块条件 (BlockCondition)"
sidebar_position: 3
---

# 方块条件

检查上下文位置的方块或环境。嵌入 BlockCondition 字段。

### `saturn:adjacent` {#saturnadjacent}

统计相邻位置中满足方块条件的数量。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:adjacent` |
| `adjacent_condition` | [方块条件](./block-condition.md) | 是 | — | 用于相邻方块的筛选条件。 |
| `comparison` | 枚举字符串 | 是 | — | 可用 `==`、`!=`、`<`、`<=`、`>`、`>=`。 |
| `compare_to` | 数值 | 是 | — | 用来比较的目标数值。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:adjacent",
  "adjacent_condition": {
    "type": "saturn:always"
  },
  "comparison": ">=",
  "compare_to": 1
}
```

</details>

### `saturn:biome_tag` {#saturnbiome_tag}

检查当前位置的群系是否属于指定标签。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:biome_tag` |
| `tag` | 标签 ID（带 #） | 是 | — | 注册表标签，或本页声明的 NBT 数据。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:biome_tag",
  "tag": "#example:tag"
}
```

</details>

### `saturn:blast_resistance` {#saturnblast_resistance}

比较方块的爆炸抗性。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:blast_resistance` |
| `comparison` | 枚举字符串 | 是 | — | 可用 `==`、`!=`、`<`、`<=`、`>`、`>=`。 |
| `compare_to` | 数值 | 是 | — | 用来比较的目标数值。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:blast_resistance",
  "comparison": ">=",
  "compare_to": 1
}
```

</details>

### `saturn:block_id` {#saturnblock_id}

检查当前位置的方块是否为指定类型。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:block_id` |
| `block` | 资源 ID | 是 | — | 方块 ID 或方块参数。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:block_id",
  "block": "minecraft:stone"
}
```

</details>

### `saturn:block_tag` {#saturnblock_tag}

检查方块是否属于指定标签。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:block_tag` |
| `tag` | 标签 ID（带 #） | 是 | — | 注册表标签，或本页声明的 NBT 数据。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:block_tag",
  "tag": "#minecraft:logs"
}
```

</details>

### `saturn:hardness` {#saturnhardness}

比较上下文方块的硬度。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:hardness` |
| `comparison` | 枚举字符串 | 是 | — | 可用 `==`、`!=`、`<`、`<=`、`>`、`>=`。 |
| `compare_to` | 数值 | 是 | — | 用来比较的目标数值。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:hardness",
  "comparison": ">=",
  "compare_to": 1
}
```

</details>

### `saturn:height` {#saturnheight}

比较方块位置的 Y 坐标。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:height` |
| `comparison` | 枚举字符串 | 是 | — | 可用 `==`、`!=`、`<`、`<=`、`>`、`>=`。 |
| `compare_to` | 数值 | 是 | — | 用来比较的目标数值。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:height",
  "comparison": ">=",
  "compare_to": 1
}
```

</details>

### `saturn:light_level` {#saturnlight_level}

比较指定光照层的光照等级。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:light_level` |
| `light_type` | 对象 | 否 | 省略 | 光照层，sky 或 block。 可用值：`sky`、`block`。 |
| `comparison` | 枚举字符串 | 是 | — | 可用 `==`、`!=`、`<`、`<=`、`>`、`>=`。 |
| `compare_to` | 数值 | 是 | — | 用来比较的目标数值。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:light_level",
  "comparison": ">=",
  "compare_to": 8,
  "light_type": "sky"
}
```

</details>

### `saturn:movement_blocking` {#saturnmovement_blocking}

检查方块是否阻挡移动。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:movement_blocking` |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:movement_blocking"
}
```

</details>

### `saturn:slipperiness` {#saturnslipperiness}

比较方块的滑度。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:slipperiness` |
| `comparison` | 枚举字符串 | 是 | — | 可用 `==`、`!=`、`<`、`<=`、`>`、`>=`。 |
| `compare_to` | 数值 | 是 | — | 用来比较的目标数值。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:slipperiness",
  "comparison": ">=",
  "compare_to": 1
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
| `condition` | [方块条件](./block-condition.md) | 是 | — | 要检查的条件。 |

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

### `saturn:offset` {#saturnoffset}

将方块上下文移动指定偏移后检查或执行子项。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:offset` |
| `condition` | [方块条件](./block-condition.md) | 是 | — | 要检查的条件。 |
| `x` | 整数 | 否 | `0` | X 坐标、偏移或向量分量，取决于本页行为。 |
| `y` | 整数 | 否 | `0` | Y 坐标、偏移或向量分量，取决于本页行为。 |
| `z` | 整数 | 否 | `0` | Z 坐标、偏移或向量分量，取决于本页行为。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:offset",
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
