---
title: Dynamic Registries
description: Core and optional addon datapack registries, file locations and purposes, built-in type dispatch, and KubeJS extension types.
hide_table_of_contents: true
---

# Dynamic Registries

<span id="dynamic-registries" />

The table below lists the shared datapack registries provided by MiXianTu and Saturn. Workstation definitions belong to [Alchemy Workstations](../../addons/alchemy/index.md) and [Forging Workstations](../../addons/forging/index.md) and require their respective addons. See [Saturn data definitions](../../../../library/saturn/data/index.md) for Saturn fields. "Default" is used when a field is omitted; "Required" means loading fails without it.

**Recipes are not in this table.** Core [spirit crafting](./spirit_crafting.md) uses the vanilla recipe types `mxt:spirit_shaped` / `mxt:spirit_shapeless`. JSON goes under `data/<namespace>/recipe/` and can be reloaded with `/reload`. See the [alchemy addon](../../addons/alchemy/datapack/alchemy_recipe.md) and [drawing addon](../../addons/talisman/datapack/talisman_drawing.md) for their recipes.

| Registry | Directory | Purpose |
| --- | --- | --- |
| `resource` | `saturn/resource` | Entity resources such as cultivation progress, spirit power and stamina, plus inline resource bars; see the [Saturn resource definition](../../../../library/saturn/data/resource.md). |
| `artifact` | `mxt/artifact` | Artifacts: which existing items they claim, how much of each aura they store, and which abilities they offer. |
| `aura` | `mxt/aura` | An aura definition for one value: element marks, the realm chain entry, regeneration and conversion. |
| `realm_stage` | `mxt/realm_stage` | Linear realm chains and breakthrough. |
| `element` | `mxt/element` | Element relations and counter multipliers: `overcomes`, `adapted_to`, the claimed damage types and the display colour. |
| `element_reaction` | `mxt/element_reaction` | The reaction fired once element accumulation meets its requirement. |
| `spirit_root` | `mxt/spirit_root` | A spirit root bound to one or more elements: cultivation multiplier, affinity multiplier, granted abilities and exclusivity. |
| `physique` | `mxt/physique` | Physique bonuses independent of elements: vanilla attributes, granted abilities and damage multipliers. |
| `ability` | `saturn/ability` | Active, passive and triggered abilities; see the [Saturn ability definition](../../../../library/saturn/data/ability.md). |
| `ability_affinity` | `mxt/ability_affinity` | Element affinity of abilities: which elements, and how several matching roots combine; it does not live in the ability definition. |
| `curse` | `mxt/curse` | Curse definitions and duration types that several modules can reference. |
| `technique` | `mxt/technique` | Cultivation technique definitions: learnable, granting abilities and cultivation modifiers by progression level. |
| `progression` | `mxt/progression` | One level of a progression chain. |
| `cultivation` | `mxt/cultivation` | One cultivation routine: which ambient aura it absorbs, what it does every tick and on a tick that settles, and what it costs and yields. |
| `spirit_herb` | `mxt/spirit_herb` | Spirit herb metadata for existing items. |
| `medicinal_property` | `mxt/medicinal_property` | Medicinal identities: the identity of one medicinal effect. |
| `formation` | `mxt/formation` | Formation lifecycle and aura overrides. |
| `formation_shape` | `mxt/formation_shape` | The figure a formation draws: circles and polylines, and the paint, density and growth window each stroke carries. |
| `tribulation` | `mxt/tribulation` | A tribulation: its start gate, timeline beats, and what happens on success or failure. |
| `creature_profile` | `mxt/creature_profile` | Creature attribute profiles: matching, gates, the inner core, and one action run when the profile is written. |
| `contract_type` | `mxt/contract_type` | Contract lifecycle: conditions on both sides, four actions on the beast side plus three and a grant on the owner side, the signing cost and two caps. |
| `secret_realm` | `mxt/secret_realm` | Secret realm templates: an instance dimension opened on demand for each entry. |
| `pill` | `mxt/pill` | What one pill does: the dose action, its toxicity gain, the overdose threshold and what an overdose leaves behind. |
| `pill_binding` | `mxt/pill_binding` | Claims a family of existing items as one pill, with its use cap and cooldown. |
| `technique_binding` | `mxt/technique_binding` | Bindings from existing items to cultivation technique learning. |
| `aura_zone` | `mxt/aura_zone` | Environment aura templates. |
| `quality` | `mxt/quality` | Shared quality: colour, three modifiers, a use condition, and where the tier sits on its ladder with what one step up costs. |
| `trigger` | `saturn/trigger` | Event rules: a signal, a condition and an action; see the [Saturn trigger rule](../../../../library/saturn/data/trigger.md). |
| `talisman` | `mxt/talisman` | Talisman definitions: the ability one inscribed talisman carries. |
| `item_aura` | `mxt/item_aura` | The cultivation fuel an item provides: which items it claims, how much aura they hold and how fast it flows. |
| `currency` | `mxt/currency` | An item's currency denomination and exchanges. |
| `default_quality` | `mxt/default_quality` | An item's default quality when nothing else supplies a tier (the third and last layer of quality resolution). |
| `item_binding` | `mxt/item_binding` | An existing item's actions, conditions and element. |
| `weapon_binding` | `mxt/weapon_binding` | An existing item's weapon attributes and three actions. |
| `block_aura` | `mxt/block_aura` | Aura provided by a block. |
| `heat_source` | `mxt/heat_source` | How hot and how fast a block heats a furnace. |
| `incomplete` | `saturn/incomplete` | Marks an item as unfinished: the client draws a warning badge on its slot. |

Five registries claim items: `item_aura`, `currency`, `default_quality`, `item_binding` and `weapon_binding` (`currency` uses `item`; the others use `items`). `block_aura` and `heat_source` claim blocks through `blocks`. See the [Datapack Development Overview](../overview.md) for file layout.

## Built-in Type Dispatch {#built-in-type-dispatch}

Plenty of fields pick one entry out of a built-in registry on `type`: the top level of an ability, how a curse persists, the four action families, the five condition families, a resource bar's value source and renderer, a tribulation beat, ability state, and so on. **The full list, the entry page of every family and each family's own default are on the [Type Reference](../types/index.md)** — type tables live on those pages only.

Action and condition arrays are shorthand for running everything in order:

```json
"entity_action": [
  {"type": "mxt:heal", "amount": 2},
  {"type": "mxt:apply_curse", "curse": "example:burning", "stacks": 1}
]
```

A datapack cannot **add a new `type`** to a built-in registry; it can only pick from the registered ones. `mxt:js` is the only one of them that hands behaviour to a script; its `mxt:js` fields and register methods are on the [Type Reference](../types/index.md).
