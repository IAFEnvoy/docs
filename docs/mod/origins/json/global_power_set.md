# Global Power Set

:::danger Not yet implemented

Global Power Sets are **not yet implemented** in the Origins (NeoForge). They will be available in a future update. The documentation below is from the Fabric version and may change.

:::

This is the format of a JSON file describing a global power set. Global power sets are sets of powers that are granted to entities globally with the `apoli:global` power source. It can also be filtered so that the set of powers will only be granted to certain entities of certain type or entities included in a certain entity type tag.

Global Power Set JSON files need to be placed inside the `data/<namespace>/global_powers` folder of a data pack.

### Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `entity_types` | Entity Type Tag-like | *optional* | If specified, the specified powers will only be granted to entities that fulfill this tag-like specifier. |
| `powers` | List of [Identifiers](../types/basic_concepts#identifier) | | The ID(s) of the power(s) to grant to entities globally. |
| `order` | [Integer](../types/basic_concepts#integer) | `0` | Determines the order at which the global power set is applied. |

### Examples

```json
{
    "powers": [
        "origins:damage_from_snowball"
    ]
}
```

This example will grant the `origins:damage_from_snowball` power to all entities.

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

This example will apply the `origins:arcane_skin` and `origins:like_water` powers to Creepers and entities that are included in the `#minecraft:skeletons` entity type tag.
