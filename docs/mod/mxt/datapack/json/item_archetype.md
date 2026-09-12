---
title: "Item Archetype"
description: "An item archetype gives a cultivation artifact its spirit power capacity, storage, flight and granted abilities."
sidebar_position: 27
---

# Item Archetype

An item archetype describes the static rules of a cultivation artifact: how much spirit power it stores, how it flies and which abilities it grants.

## File Location

Item archetype JSON files go in `data/<namespace>/mxt/item_archetype/` within your data pack.

The filename corresponds to its ID. For example, `data/example/mxt/item_archetype/bound_sword.json` has the ID `example:bound_sword`.

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `item_type` | String | **required** | The artifact classification identifier. |
| `spirit_capacity` | `NumberProvider` | `0` | The spirit power capacity. |
| `storage_slots` | `NumberProvider` | `0` | The number of storage slots. |
| `flight_speed` | `NumberProvider` | `0` | The flight speed. A value of `0` means the artifact provides no flight. |
| `flight_costs` | `List<ResourceCost>` | `[]` | The flight cost. |
| `granted_abilities` | `Holder<ability>[]` | `[]` | The abilities the artifact grants. |
| `refine_action` | ItemAction | no operation | The action run on the holder and on the item when the artifact is refined. |

## Refine Action

`refine_action` uses the existing `ItemAction` dispatch, so a single action or an array of actions may be inlined directly.

## Example

```json
{
  "item_type": "artifact",
  "spirit_capacity": 100,
  "storage_slots": 0,
  "flight_speed": 0,
  "flight_costs": [],
  "granted_abilities": ["mxt_test:artifact_guard"]
}
```

`granted_abilities` refers to entries of the ability registry described in [Ability](./ability.md).
