# 全局能力集

这是描述全局能力集的 JSON 文件格式。全局能力集是一组通过 `origins:global` 能力来源全局授予实体的能力。它还可以进行过滤，使这组能力只授予某些特定类型的实体，或包含在某个实体类型标签中的实体。

全局能力集 JSON 文件需要放在数据包的 `data/<namespace>/origins/global_powers` 文件夹内。

### 字段 {#fields}

| 字段 | 类型 | 默认值 | 描述 |
|-------|------|---------|-------------|
| `entity_types` | Entity Type 或 #Tag | *可选* | 如果指定，这些能力只会授予满足该标签式指定符的实体。 |
| `powers` | [Identifiers](../types/basic_concepts#identifier) 的列表 | | 要全局授予实体的能力的 ID。 |

### 示例 {#examples}

```json
{
    "powers": [
        "origins:damage_from_snowball"
    ]
}
```

这个示例会将 `origins:damage_from_snowball` 能力授予所有实体。

```json
{
    "entity_types": [
        "#minecraft:skeletons",
        "minecraft:creeper"
    ],
    "powers": [
        "origins:arcane_skin",
        "origins:like_water"
    ]
}
```

这个示例会将 `origins:arcane_skin` 和 `origins:like_water` 能力施加到苦力怕以及包含在 `#minecraft:skeletons` 实体类型标签中的实体上。
