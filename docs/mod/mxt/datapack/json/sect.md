---
title: "Sect (sect)"
description: "Defines a sect rank ladder, its contribution tasks and its contribution exchanges through the mxt:sect datapack registry."
---

# Sect (sect)

A sect definition holds the rank ladder, the contribution tasks and the contribution exchanges of one sect. Membership, contribution and territory are runtime state; the JSON only defines the policy those systems read.

## File Location

Sect JSON files go in `data/<namespace>/mxt/sect/` within your data pack.

The filename corresponds to its ID. For example, `data/example/mxt/sect/qingxiao_sect.json` has the ID `example:qingxiao_sect`.

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `ranks` | `List<Rank>` | **required** | At least one rank with a unique ID |
| `tasks` | `List<Task>` | `[]` | Contribution tasks |
| `exchanges` | `List<Exchange>` | `[]` | Contribution and resource exchanges |
| `territory_permissions` | `Identifier[]` | `[]` | Territory permission identifiers |

### `Rank`

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `id` | String | **required** | The rank ID; must be unique inside one sect definition |
| `priority` | Integer | `0` | Rank order; promotion selects the lowest-priority rank above the current one |
| `min_contribution` | Integer | `0` | The contribution required before a member can be promoted into this rank |
| `permissions` | `Identifier[]` | `[]` | The permission identifiers granted by this rank |
| `promotion_costs` | `List<ResourceCost>` | `[]` | The resources paid when promoting into this rank |

### `Task`

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `id` | Identifier | **required** | The task ID |
| `contribution_reward` | Integer | **required** | The contribution granted on completion; a positive integer |
| `once` | Boolean | `true` | Whether the task can only be completed once |
| `required_permission` | Identifier | none | The permission required to complete the task |

### `Exchange`

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `id` | Identifier | **required** | The exchange ID |
| `contribution_cost` | Integer | `0` | The contribution consumed by the exchange |
| `costs` | `List<ResourceCost>` | `[]` | The resources consumed by the exchange |
| `outputs` | `Identifier[]` | **required** | The output item IDs |
| `required_permission` | Identifier | none | The permission required to use the exchange |

:::note
A sect definition requires at least one rank, and the rank `id` values must be unique inside one definition.
:::

## Example

```json
// data/mxt_test/mxt/sect/qingxiao_sect.json
{
  "ranks": [
    { "id": "outer_disciple", "priority": 0, "min_contribution": 0, "permissions": ["mxt:claim"] },
    {
      "id": "inner_disciple",
      "priority": 1,
      "min_contribution": 20,
      "permissions": ["mxt:claim"],
      "promotion_costs": [{ "id": "mxt_test:spirit_power", "amount": 10 }]
    }
  ],
  "tasks": [{ "id": "mxt_test:meditate", "contribution_reward": 20, "once": false }],
  "exchanges": [{
    "id": "mxt_test:qingxiao_spirit_crystal",
    "contribution_cost": 20,
    "outputs": ["mxt_test:qingxiao_spirit_crystal"]
  }],
  "territory_permissions": ["mxt:claim"]
}
```

`ResourceCost` entries use an `id` and an `amount`; see [Shared Data Types](../types/shared_data_types.md) for the exact shape.
