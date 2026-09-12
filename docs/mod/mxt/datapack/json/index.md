---
title: "JSON Data Formats"
description: "Reference for every JSON datapack registry provided by MiXianTu, including its file path and purpose."
sidebar_position: 1
---

# JSON Data Formats

This section documents the JSON format of every datapack registry the mod provides. Definitions are plain JSON files loaded by the vanilla datapack registry system and become immutable after loading. Basic value shapes shared by all definitions are listed in [Shared Data Types](../types/shared_data_types.md).

## File Paths

Definition files go in `data/<namespace>/mxt/<registry>/` within your datapack:

```text
data/<namespace>/mxt/<registry>/<path>.json
```

The filename corresponds to the entry ID. For example, `data/example/mxt/ability/fireball.json` has the ID `example:fireball`.

Tags use the vanilla tag directory:

```text
data/<namespace>/tags/mxt/<registry>/<name>.json
```

Every registry also supports the `mxt:disabled` tag. Because the tag id itself is `mxt:disabled`, the file always lives in the `mxt` namespace:

```text
data/mxt/tags/mxt/<registry>/disabled.json
```

:::info Disabling entries
Entries listed in `disabled` are not used by the corresponding service, but they stay in the registry, so other definitions can safely hold their `Holder`. Tag value order is never gameplay order; quality order is handled by the quality reading interface through the vanilla tag order.
:::

## Registries

The table below lists the 32 datapack registries the mod registers. Each one has its own page in this section. `mxt:alchemy` is listed as well even though it is a vanilla recipe type rather than a datapack registry, because its JSON is documented here too.

| Registry | Directory | Purpose |
|----------|-----------|---------|
| [`resource`](./resource.md) | `mxt/resource` | Entity resources such as cultivation progress, spirit power and stamina, plus inline resource bars. |
| [`badge`](./badge.md) | `mxt/badge` | Reserved badge metadata. |
| [`realm_stage`](./realm_stage.md) | `mxt/realm_stage` | Linear realm chains and breakthrough. |
| [`element`](./element.md) | `mxt/element` | Element relations and aura kinds. |
| [`spirit_root`](./spirit_root.md) | `mxt/spirit_root` | A spirit root bound to a single element. |
| [`physique`](./physique.md) | `mxt/physique` | Physique bonuses that are independent of elements. |
| [`ability`](./ability.md) | `mxt/ability` | Active, passive and triggered abilities. |
| [`curse`](./curse.md) | `mxt/curse` | Curse definitions that can be referenced. |
| [`forging_method`](./forging_method.md) | `mxt/forging_method` | A single forging strike method. |
| [`forging_blueprint`](./forging_blueprint.md) | `mxt/forging_blueprint` | Forging targets and quality settlement. |
| [`tool_binding`](./tool_binding.md) | `mxt/tool_binding` | Forging methods provided by tool items. |
| [`blueprint_binding`](./blueprint_binding.md) | `mxt/blueprint_binding` | Forging blueprints provided by blueprint items. |
| [`cultivation_technique`](./cultivation_technique.md) | `mxt/cultivation_technique` | Cultivation technique definitions. |
| [`cultivate_action`](./cultivate_action.md) | `mxt/cultivate_action` | The cultivation process and its environment requirements. |
| [`item_archetype`](./item_archetype.md) | `mxt/item_archetype` | Artifact archetypes and abilities. |
| [`spirit_herb`](./spirit_herb.md) | `mxt/spirit_herb` | Spirit herb metadata for existing items. |
| [`alchemy_recipe`](./alchemy_recipe.md) | `recipe` | Vanilla recipe type (`mxt:alchemy`), not a datapack registry. |
| [`formation`](./formation.md) | `mxt/formation` | Formation lifecycle and aura overrides. |
| [`tribulation`](./tribulation.md) | `mxt/tribulation` | Tribulation stages. |
| [`creature_profile`](./creature_profile.md) | `mxt/creature_profile` | Creature profiles and entity binding conditions. |
| [`contract_type`](./contract_type.md) | `mxt/contract_type` | Contract lifecycle. |
| [`title`](./title.md) | `mxt/title` | Titles and passive attributes. |
| [`sect`](./sect.md) | `mxt/sect` | Sect ranks, tasks and exchanges. |
| [`realm_instance`](./realm_instance.md) | `mxt/realm_instance` | Realm instance strategies. |
| [`currency`](./currency.md) | `mxt/currency` | Item currency denominations and exchange. |
| [`item_binding`](./item_binding.md) | `mxt/item_binding` | Bindings from existing items to action arrays. |
| [`weapon_binding`](./weapon_binding.md) | `mxt/weapon_binding` | Weapon attributes and actions for existing items. |
| [`pill_binding`](./pill_binding.md) | `mxt/pill_binding` | Pill and pill toxicity rules for existing items. |
| [`technique_binding`](./technique_binding.md) | `mxt/technique_binding` | Bindings from existing items to cultivation technique learning. |
| [`aura_zone`](./aura_zone.md) | `mxt/aura_zone` | Environment aura templates. |
| [`block_aura`](./block_aura.md) | `mxt/block_aura` | Aura provided by blocks. |
| [`item_aura`](./item_aura.md) | `mxt/item_aura` | Cultivation fuel provided by held items. |
| [`item_quality`](./item_quality.md) | `mxt/item_quality` | Shared quality and quality conditions. |

## Built-in Type Dispatch

The following fields use `MapCodec`s from Java built-in registries. A datapack may only supply the `type` and the parameters of that type; datapacks cannot add new `type` values.

| Data Type | Dispatch Field | Purpose |
|-----------|----------------|---------|
| `Ability` | `ability.type` | The top-level field is named `ability`; the `type` inside that nested object selects the ability lifecycle and trigger style. |
| `CurseType` | `type` | How a curse persists and expires. |
| `EntityAction` | `type` | Entity actions. |
| `BiEntityAction` | `type` | Bi-entity actions. |
| `BlockAction` | `type` | Block actions. |
| `ItemAction` | `type` | Item actions. |
| `EntityCondition` | `type` | Entity conditions. |
| `BiEntityCondition` | `type` | Bi-entity conditions. |
| `BlockCondition` | `type` | Block conditions. |
| `ItemCondition` | `type` | Item conditions. |
| `DamageCondition` | `type` | Damage conditions. |
| `ResourceValueProvider` | `type` | Resource value sources read by resource bars and extensions, including environment and actual aura concentration. |
| `ResourceBarRenderer` | `type` | Resource bar renderers. |
| `ResourceBarVisibility` | `type` | Resource bar visibility conditions. |
| `Badge` | `type` | Badge structures. |

Action and condition arrays are shorthand: every element is executed in order, and an array of conditions means that all of them must be satisfied.

```json
"entity_action": [
  {"type": "mxt:heal", "amount": 2},
  {"type": "mxt:apply_curse", "curse": "example:burning", "stacks": 1}
]
```

The concrete fields of every action follow the built-in type codecs. Built-in types are registered in groups by classes such as `MxtEntityActions`, `MxtBiEntityActions`, `MxtBlockActions`, `MxtItemActions` and `MxtEntityConditions`; reloading a datapack never adds entries to these built-in registries.

See the [type reference](../types/index.md) for the available action and condition types, and [Datapack Overview](../overview.md) for loading, overriding, reference and disabled-tag rules. Advancements and loot tables are plain vanilla JSON rather than datapack registries; the types the mod adds for them are in [Loot and Advancement Criteria](../loot-and-criteria.md).
