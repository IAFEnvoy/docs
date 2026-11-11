---
title: "Information expression"
sidebar_position: 21
---

# Information expression

An information expression only reads the `PlayerView` passed in. Raw numbers, strings and booleans can be used directly as constants; operand objects must have a `type`. See [Player information](../guides/information.md).

### `saturn:arithmetic` {#saturnarithmetic}

Performs an arithmetic operation on two expressions.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:arithmetic` |
| `operation` | Enum string | yes | — | Operation name; see the enum notes below for available values. Available values: `add`, `subtract`, `multiply`, `divide`, `min`, `max`. |
| `left` | [Expression](./expression.md) | yes | — | Left operand expression. |
| `right` | [Expression](./expression.md) | yes | — | Right operand expression. |

<details>
<summary>Example</summary>

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

Converts an expression result into a boolean display value.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:boolean` |
| `value` | [Expression](./expression.md) | yes | — | Value or expression used by this type. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:boolean",
  "value": true
}
```

</details>

### `saturn:coalesce` {#saturncoalesce}

Takes the first available expression result in order.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:coalesce` |
| `values` | Array of [expressions](./expression.md) | yes | — | List of sub-values or sub-expressions. |

<details>
<summary>Example</summary>

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

Compares two expressions and returns a boolean result.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:compare` |
| `operation` | Enum string | yes | — | Operation name; see the enum notes below for available values. Available values: `eq`, `ne`, `lt`, `le`, `gt`, `ge`. |
| `left` | [Expression](./expression.md) | yes | — | Left operand expression. |
| `right` | [Expression](./expression.md) | yes | — | Right operand expression. |

<details>
<summary>Example</summary>

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

Returns the fixed value in the definition.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:constant` |
| `value` | Any JSON value | yes | — | Value or expression used by this type. |

<details>
<summary>Example</summary>

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

Generates text from a format string and arguments.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:format` |
| `format` | String | yes | — | Format string. |
| `arguments` | Array of [expressions](./expression.md) | yes | — | Translation or formatting argument list. |

<details>
<summary>Example</summary>

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

Reads the result of a parameterized getter from the `PlayerView` passed in.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:getter` |
| `getter` | [Entity getter](./getter.md) | yes | — | Entity getter with a `type` and parameters. |
| `path` | String array | no | `[]` | Member path into composite results; dots are not split. |

<details>
<summary>Example</summary>

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

Selects the then or else expression according to the condition.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:if` |
| `condition` | [Expression](./expression.md) | yes | — | Condition to check. |
| `then` | [Expression](./expression.md) | yes | — | Expression used when the condition holds. |
| `else` | [Expression](./expression.md) | yes | — | Expression used when the condition does not hold. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:if",
  "condition": true,
  "then": "Online",
  "else": "Offline"
}
```

</details>

### `saturn:is_known` {#saturnis_known}

Checks whether an expression has a known value.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:is_known` |
| `value` | [Expression](./expression.md) | yes | — | Value or expression used by this type. |

<details>
<summary>Example</summary>

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

Converts an expression result into an item collection display.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:items` |
| `value` | [Expression](./expression.md) | yes | — | Value or expression used by this type. |

<details>
<summary>Example</summary>

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

Iterates the input collection and generates a display value for each element.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:list` |
| `source` | [Expression](./expression.md) | yes | — | Input collection, resource path or context parameter; see this page's purpose. |
| `as` | String | no | `"item"` | Loop variable name. |
| `element` | [Expression](./expression.md) | yes | — | Expression evaluated for each list element. |

<details>
<summary>Example</summary>

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

Reads the local binding of the current list or table element.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:local` |
| `name` | String | no | `"item"` | Local variable name, scoreboard holder name or config name. |
| `path` | String array | no | `[]` | Member path into composite results; dots are not split. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:local"
}
```

</details>

### `saturn:logic` {#saturnlogic}

Performs logical operations on boolean expressions.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:logic` |
| `operation` | Enum string | yes | — | Operation name; see the enum notes below for available values. Available values: `and`, `or`, `not`. |
| `values` | Array of [expressions](./expression.md) | yes | — | List of sub-values or sub-expressions. |

<details>
<summary>Example</summary>

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

Generates a meter display from the current value, minimum and maximum.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:meter` |
| `value` | [Expression](./expression.md) | yes | — | Value or expression used by this type. |
| `min` | [Expression](./expression.md) | no | `0` | Lower bound. |
| `max` | [Expression](./expression.md) | yes | — | Upper bound. |

<details>
<summary>Example</summary>

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

Converts an expression result into an information row number.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:number` |
| `value` | [Expression](./expression.md) | yes | — | Value or expression used by this type. |

<details>
<summary>Example</summary>

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

Resolves the display name from a registry ID and an entry ID.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:registry_name` |
| `registry` | Resource ID | yes | — | Registry ID to read. |
| `value` | [Expression](./expression.md) | yes | — | Value or expression used by this type. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:registry_name",
  "registry": "minecraft:item",
  "value": "minecraft:diamond"
}
```

</details>

### `saturn:table` {#saturntable}

Iterates the input collection and generates a table from the column definitions.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:table` |
| `source` | [Expression](./expression.md) | yes | — | Input collection, resource path or context parameter; see this page's purpose. |
| `as` | String | no | `"item"` | Loop variable name. |
| `row_id` | [Expression](./expression.md) | no | omitted | Optional expression that generates each row's identifier. |
| `columns` | Array of objects | yes | — | Table column definitions, or the grid column count. |

#### `columns` entries

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `id` | String | yes | — | Column identifier; must be unique within the same table. |
| `label` | Text component | yes | — | Column title. |
| `value` | Information expression | yes | — | Evaluated for the current row; use `local` to read the `as` binding. |

<details>
<summary>Example</summary>

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
        "text": "Name"
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

Displays text, a translation component or existing formatted text.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:text` |
| `value` | [Expression](./expression.md) | yes | — | Value or expression used by this type. |
| `component` | Boolean | no | `false` | Data component ID, or a switch for whether to read the value as a text component. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:text",
  "value": "Host status"
}
```

</details>

### `saturn:translate` {#saturntranslate}

Generates a text component that keeps the translation key and arguments.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:translate` |
| `key` | [Expression](./expression.md) | yes | — | Translation key expression. |
| `arguments` | Array of [expressions](./expression.md) | no | `[]` | Translation or formatting argument list. |
| `fallback` | [Expression](./expression.md) | no | omitted | Fallback value used when there is no matching or known value. |

<details>
<summary>Example</summary>

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
