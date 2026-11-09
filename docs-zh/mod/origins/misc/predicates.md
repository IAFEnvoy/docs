# 谓词 {#predicates}

谓词是可用于数据包文件中的条件，例如进度、战利品表和 `predicate` 文件。

### `origins:origin` {#originsorigin}

检查玩家是否拥有指定的起源。

### 字段 {#fields}

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `origin` | [标识符](../types/basic_concepts#identifier) | | 要检查的起源的命名空间和 ID。 |
| `layer` | [标识符](../types/basic_concepts#identifier) | *可选* | 若指定，则检查指定的起源是否来自此起源层。 |

<details>
<summary>示例 1</summary>

```json
{
    "condition": "origins:origin",
    "origin": "origins:human"
}
```

此示例会检查玩家是否拥有 `origins:human` 起源。

</details>

<details>
<summary>示例 2</summary>

```json
{
    "condition": "origins:origin",
    "origin": "origins:phantom",
    "layer": "origins:origin"
}
```

此示例会检查玩家是否在 `origins:origin` 起源层中拥有 `origins:phantom` 起源。

</details>

### `origins:power` {#originspower}

检查实体是否拥有指定的能力。

### 字段 {#fields-1}

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `power` | [标识符](../types/basic_concepts#identifier) | | 要检查的能力的命名空间和 ID。 |
| `source` | [标识符](../types/basic_concepts#identifier) | *可选* | 若指定，则检查指定的能力是否来自此能力来源。 |

<details>
<summary>示例 1</summary>

```json
{
    "condition": "origins:power",
    "power": "origins:arcane_skin"
}
```

此示例会检查玩家是否拥有 `origins:arcane_skin` 能力。

</details>

<details>
<summary>示例 2</summary>

```json
{
    "condition": "origins:power",
    "power": "origins:water_breathing",
    "source": "origins:merling"
}
```

此示例会检查玩家是否拥有来自 `origins:merling` 能力来源的 `origins:water_breathing` 能力。

</details>
