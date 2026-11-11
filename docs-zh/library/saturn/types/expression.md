---
title: "信息表达式"
sidebar_label: "信息表达式 (InformationExpression)"
sidebar_position: 21
---

# 信息表达式

信息表达式只读传入的 PlayerView。原始数字、字符串、布尔值可直接作为常量；操作对象必须有 type。见[玩家信息](../guides/information.md)。

### `saturn:arithmetic` {#saturnarithmetic}

对两个表达式执行数值运算。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:arithmetic` |
| `operation` | 枚举字符串 | 是 | — | 运算名称，详见本页枚举说明。 可用值：`add`、`subtract`、`multiply`、`divide`、`min`、`max`。 |
| `left` | [表达式](./expression.md) | 是 | — | 左操作数表达式。 |
| `right` | [表达式](./expression.md) | 是 | — | 右操作数表达式。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:arithmetic",
  "operation": "add",
  "left": 2,
  "right": 3
}
```

</details>

### `saturn:boolean` {#saturnboolean}

把表达式结果转换成布尔展示值。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:boolean` |
| `value` | [表达式](./expression.md) | 是 | — | 本类型使用的值或表达式。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:boolean",
  "value": true
}
```

</details>

### `saturn:coalesce` {#saturncoalesce}

依次取第一个可用的表达式结果。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:coalesce` |
| `values` | [表达式](./expression.md)数组 | 是 | — | 子值或子表达式列表。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:coalesce",
  "values": [
    {
      "type": "saturn:getter",
      "getter": {
        "type": "saturn:health"
      }
    },
    0
  ]
}
```

</details>

### `saturn:compare` {#saturncompare}

比较两个表达式，返回布尔结果。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:compare` |
| `operation` | 枚举字符串 | 是 | — | 运算名称，详见本页枚举说明。 可用值：`eq`、`ne`、`lt`、`le`、`gt`、`ge`。 |
| `left` | [表达式](./expression.md) | 是 | — | 左操作数表达式。 |
| `right` | [表达式](./expression.md) | 是 | — | 右操作数表达式。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:compare",
  "operation": "ge",
  "left": 10,
  "right": 5
}
```

</details>

### `saturn:constant` {#saturnconstant}

返回定义中的固定值。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:constant` |
| `value` | 任意 JSON 值 | 是 | — | 本类型使用的值或表达式。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:constant",
  "value": [
    1,
    2,
    3
  ]
}
```

</details>

### `saturn:format` {#saturnformat}

使用格式字符串与参数生成文字。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:format` |
| `format` | 字符串 | 是 | — | 格式字符串。 |
| `arguments` | [表达式](./expression.md)数组 | 是 | — | 翻译或格式化参数列表。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:format",
  "format": "%.1f / %.1f",
  "arguments": [
    10,
    20
  ]
}
```

</details>

### `saturn:getter` {#saturngetter}

从传入 PlayerView 读取参数化 getter 的结果。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:getter` |
| `getter` | [实体取值器](./getter.md) | 是 | — | 带 type 及参数的实体取值器。 |
| `path` | 字符串数组 | 否 | `[]` | 复合结果的成员路径，点号不拆分。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:getter",
  "getter": {
    "type": "saturn:health"
  }
}
```

</details>

### `saturn:if` {#saturnif}

根据条件选择 then 或 else 表达式。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:if` |
| `condition` | [表达式](./expression.md) | 是 | — | 要检查的条件。 |
| `then` | [表达式](./expression.md) | 是 | — | 条件成立时使用的表达式。 |
| `else` | [表达式](./expression.md) | 是 | — | 条件不成立时使用的表达式。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:if",
  "condition": true,
  "then": "在线",
  "else": "离线"
}
```

</details>

### `saturn:is_known` {#saturnis_known}

检查表达式是否取得已知值。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:is_known` |
| `value` | [表达式](./expression.md) | 是 | — | 本类型使用的值或表达式。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:is_known",
  "value": {
    "type": "saturn:getter",
    "getter": {
      "type": "saturn:health"
    }
  }
}
```

</details>

### `saturn:items` {#saturnitems}

把表达式结果转换为物品集合展示。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:items` |
| `value` | [表达式](./expression.md) | 是 | — | 本类型使用的值或表达式。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:items",
  "value": {
    "type": "saturn:getter",
    "getter": {
      "type": "saturn:equipment"
    }
  }
}
```

</details>

### `saturn:list` {#saturnlist}

遍历输入集合，为每个元素生成展示值。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:list` |
| `source` | [表达式](./expression.md) | 是 | — | 输入集合、资源路径或上下文参数，详见本页用途。 |
| `as` | 字符串 | 否 | `"item"` | 循环变量名。 |
| `element` | [表达式](./expression.md) | 是 | — | 用于每个列表元素的表达式。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:list",
  "source": {
    "type": "saturn:constant",
    "value": [
      1,
      2
    ]
  },
  "element": {
    "type": "saturn:number",
    "value": {
      "type": "saturn:local"
    }
  }
}
```

</details>

### `saturn:local` {#saturnlocal}

读取列表或表格当前元素的局部绑定。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:local` |
| `name` | 字符串 | 否 | `"item"` | 局部变量名、计分板持有者名或配置名称。 |
| `path` | 字符串数组 | 否 | `[]` | 复合结果的成员路径，点号不拆分。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:local"
}
```

</details>

### `saturn:logic` {#saturnlogic}

对布尔表达式执行逻辑运算。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:logic` |
| `operation` | 枚举字符串 | 是 | — | 运算名称，详见本页枚举说明。 可用值：`and`、`or`、`not`。 |
| `values` | [表达式](./expression.md)数组 | 是 | — | 子值或子表达式列表。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:logic",
  "operation": "and",
  "values": [
    true,
    false
  ]
}
```

</details>

### `saturn:meter` {#saturnmeter}

根据当前值、最小值和最大值生成进度展示。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:meter` |
| `value` | [表达式](./expression.md) | 是 | — | 本类型使用的值或表达式。 |
| `min` | [表达式](./expression.md) | 否 | `0` | 下限。 |
| `max` | [表达式](./expression.md) | 是 | — | 上限。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:meter",
  "value": 10,
  "max": 20,
  "min": 0
}
```

</details>

### `saturn:number` {#saturnnumber}

把表达式结果转换成信息行数字。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:number` |
| `value` | [表达式](./expression.md) | 是 | — | 本类型使用的值或表达式。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:number",
  "value": {
    "type": "saturn:getter",
    "getter": {
      "type": "saturn:health"
    }
  }
}
```

</details>

### `saturn:registry_name` {#saturnregistry_name}

根据注册表 ID 与条目 ID 取得显示名称。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:registry_name` |
| `registry` | 资源 ID | 是 | — | 要读取的注册表 ID。 |
| `value` | [表达式](./expression.md) | 是 | — | 本类型使用的值或表达式。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:registry_name",
  "registry": "minecraft:item",
  "value": "minecraft:diamond"
}
```

</details>

### `saturn:table` {#saturntable}

遍历输入集合，按列定义生成表格。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:table` |
| `source` | [表达式](./expression.md) | 是 | — | 输入集合、资源路径或上下文参数，详见本页用途。 |
| `as` | 字符串 | 否 | `"item"` | 循环变量名。 |
| `row_id` | [表达式](./expression.md) | 否 | 省略 | 生成每行标识的可选表达式。 |
| `columns` | 对象数组 | 是 | — | 表格列定义或网格列数。 |

#### columns 条目

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `id` | 字符串 | 是 | — | 列标识，同一表格内不能重复。 |
| `label` | 文本组件 | 是 | — | 列标题。 |
| `value` | 信息表达式 | 是 | — | 对当前行求值；使用 local 读取 as 绑定。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:table",
  "source": {
    "type": "saturn:constant",
    "value": [
      {
        "name": "A",
        "count": 1
      }
    ]
  },
  "columns": [
    {
      "id": "name",
      "label": {
        "text": "名称"
      },
      "value": {
        "type": "saturn:text",
        "value": {
          "type": "saturn:local",
          "path": [
            "name"
          ]
        }
      }
    }
  ]
}
```

</details>

### `saturn:text` {#saturntext}

显示文字、翻译组件或已有格式文本。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:text` |
| `value` | [表达式](./expression.md) | 是 | — | 本类型使用的值或表达式。 |
| `component` | 布尔值 | 否 | `false` | 数据组件 ID，或是否按文本组件读取的开关。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:text",
  "value": "宿主状态"
}
```

</details>

### `saturn:translate` {#saturntranslate}

生成保留翻译键和参数的文本组件。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:translate` |
| `key` | [表达式](./expression.md) | 是 | — | 翻译键表达式。 |
| `arguments` | [表达式](./expression.md)数组 | 否 | `[]` | 翻译或格式化参数列表。 |
| `fallback` | [表达式](./expression.md) | 否 | 省略 | 没有匹配或已知值时使用的回退值。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:translate",
  "key": "info.example.level",
  "arguments": [
    3
  ]
}
```

</details>
