---
title: "Registries and Data Tables"
description: "How MiXianTu registers built-in MapCodec types, which codec each definition exposes, and how to read the datapack data tables."
sidebar_position: 2
---

# Registries and Data Tables

MiXianTu has two kinds of registries. Built-in registries hold the `MapCodec` implementations that a datapack selects with the `type` field, and are populated in Java code. Dynamic data tables are native datapack registries whose entries live in JSON files, are reloaded with the datapack and are synchronised to the client by the registry system.

## Built-In Type Registries

Built-in registries use NeoForge's `DeferredRegister<MapCodec<?>>`, and a datapack is dispatched to the matching implementation through `type`:

```java
public static final DeferredRegister<MapCodec<? extends Cost>> REGISTRY =
        DeferredRegister.create(MxtRegistries.COST_TYPE, MiXianTu.MOD_ID);
```

The registry instances are declared in `MxtRegistries`, and their keys are declared once in `MxtResourceKeys`:

| Registry | Key | Contents |
|----------|-----|----------|
| `MxtRegistries.ABILITY_TYPE` | `mxt:ability_type` | Ability type codecs. |
| `MxtRegistries.ABILITY_TARGET_SELECTOR_TYPE` | `mxt:ability_target_selector_type` | Ability target selector codecs. |
| `MxtRegistries.COST_TYPE` | `mxt:cost_type` | Cost type codecs. |
| `MxtRegistries.CURSE_TYPE` | `mxt:curse_type` | Curse type codecs. |
| `MxtRegistries.ABILITY_COMPONENT_TYPE` | `mxt:ability_component_type` | Ability component codecs. |
| `MxtRegistries.TRIGGER_TYPE` | `mxt:trigger_type` | Ability trigger codecs. |
| `MxtRegistries.NUMBER_PROVIDER_TYPE` | `mxt:number_provider_type` | Number provider codecs. |
| `MxtRegistries.AURA_MAXIMUM_TYPE` | `mxt:aura_maximum_type` | Aura maximum codecs. |
| `MxtRegistries.FORMULA_FUNCTION` | `mxt:formula_function` | Formula functions available to expressions. |
| `MxtRegistries.FORMULA_VARIABLE` | `mxt:formula_variable` | Formula variables injected by the runtime. |
| `MxtRegistries.RESOURCE_VALUE_PROVIDER_TYPE` | `mxt:resource_value_provider_type` | Resource value provider codecs. |
| `MxtRegistries.ENTITY_ACTION_TYPE` | `mxt:entity_action_type` | Entity action codecs. |
| `MxtRegistries.BI_ENTITY_ACTION_TYPE` | `mxt:bi_entity_action_type` | Bi-entity action codecs. |
| `MxtRegistries.BLOCK_ACTION_TYPE` | `mxt:block_action_type` | Block action codecs. |
| `MxtRegistries.ITEM_ACTION_TYPE` | `mxt:item_action_type` | Item action codecs. |
| `MxtRegistries.ENTITY_CONDITION_TYPE` | `mxt:entity_condition_type` | Entity condition codecs. |
| `MxtRegistries.BI_ENTITY_CONDITION_TYPE` | `mxt:bi_entity_condition_type` | Bi-entity condition codecs. |
| `MxtRegistries.BLOCK_CONDITION_TYPE` | `mxt:block_condition_type` | Block condition codecs. |
| `MxtRegistries.ITEM_CONDITION_TYPE` | `mxt:item_condition_type` | Item condition codecs. |
| `MxtRegistries.DAMAGE_CONDITION_TYPE` | `mxt:damage_condition_type` | Damage condition codecs. |
| `MxtRegistries.RESOURCE_BAR_RENDER_DATA_TYPE` | `mxt:resource_bar_render_data_type` | Resource bar render data codecs. |
| `MxtRegistries.RESOURCE_BAR_CONTEXT` | `mxt:resource_bar_context` | Resource bar contexts. |
| `MxtRegistries.RESOURCE_BAR_VISIBILITY_TYPE` | `mxt:resource_bar_visibility_type` | Resource bar visibility codecs. |
| `MxtRegistries.BADGE_TYPE` | `mxt:badge_type` | Badge codecs. |
| `MxtRegistries.ITEM_MATCHER_ENTRY_TYPE` | `mxt:item_matcher_entry_type` | Item matcher entry codecs. |

The built-in types are grouped and registered by classes such as `MxtEntityActions`, `MxtBiEntityActions`, `MxtBlockActions`, `MxtItemActions` and `MxtEntityConditions`. Registering a new built-in type means providing a `MapCodec` and adding it to the matching `DeferredRegister`; a datapack reload never adds entries to these registries.

These registries are open to other mods: a third-party module may add its own codecs to any of them — the built-in trigger table documents this explicitly — and the new `type` ids then become available to datapacks.

## Dynamic Data Tables

Every table the mod declares is listed — with its file directory, its purpose and every field — in [JSON Data Formats](../datapack/json/index.md). An addon normally adds entries to those tables rather than new tables.

## Reading Data Tables

`MxtDatapackRegistries` is the supported entry point for both the server and the synchronised client copy. Every read skips entries that carry the mod's `mxt:disabled` tag.

| Member | Description |
|--------|-------------|
| `registries()` | Every registry key owned by the mod, in registration order. |
| `get(key, id)` / `get(key, holder)` | Reads an enabled value by ID or by holder. |
| `holder(key, id)` | Resolves an enabled entry while keeping its stable holder reference. |
| `holders(key)` | Streams all enabled entries of a registry. |
| `holders(access, key)` / `holders(provider, key)` | Streams enabled entries from a `RegistryAccess` or a `HolderLookup.Provider`, which is how the client reads the synchronised copy. |
| `isDisabled(key, id)` / `isDisabled(key, holder)` | Checks whether an entry carries the `mxt:disabled` tag. |
| `isTagged(key, id, tagId)` / `isTagged(key, holder, tagId)` | Checks a native datapack tag on one entry. |
| `size(key)` / `registry(key)` | The underlying `Registry`; only available while a server is running. |

:::note

`registry(key)` and `size(key)` throw an `IllegalStateException` when no server is running. On the client, use the `holders(access, key)` and `get(access, key, id)` overloads that take the synchronised lookup instead.

:::

## Codecs

A definition class exposes two codecs. `CODEC` reads and writes a `Holder<Definition>` reference and is what a field or another JSON file uses to point at a definition; `DIRECT_CODEC` reads and writes the whole object and is what a datapack registry uses for the entry itself. Read `DIRECT_CODEC` when you need the values of a definition, for example `Resource.DIRECT_CODEC` or `Badge.DIRECT_CODEC`.
