---
title: "Ability types"
sidebar_position: 1
---

# Ability types

The ability type is written at the top level of the ability definition, alongside common fields such as costs and condition; do not nest another type object. For the common fields of an ability file, see [Ability definitions](../data/ability.md).

### `saturn:active` {#saturnactive}

Used by the player on purpose; runs its actions after the cast, cost and cooldown flow.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:active` |
| `entity_action` | [Entity action](./action/entity-action.md) | no | `{"type":"saturn:no_op"}` | Entity action run on the ability holder or the context entity. |
| `target_selector` | [Target selector](./target.md) | no | `{"type":"saturn:self"}` | Selector that obtains the ability's target. |
| `target_condition` | [Bi-entity condition](./condition/bientity-condition.md) | no | `{"type":"saturn:always"}` | Bi-entity condition that filters the actor and candidate targets. |
| `bi_entity_action` | [Bi-entity action](./action/bientity-action.md) | no | `{"type":"saturn:no_op"}` | Bi-entity action run on the actor and target. |
| `cooldown` | [Number provider](./number.md) | no | `0.0` | Cooldown length, in game ticks. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:active"
}
```

</details>

### `saturn:aura` {#saturnaura}

Looks up targets within range at an interval and runs its actions.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:aura` |
| `interval` | [Number provider](./number.md) | no | `20.0` | Execution interval, in game ticks. |
| `radius` | [Number provider](./number.md) | no | `4.0` | Radius in blocks; in a resource bar it is in pixels. |
| `entity_action` | [Entity action](./action/entity-action.md) | no | `{"type":"saturn:no_op"}` | Entity action run on the ability holder or the context entity. |
| `target_selector` | [Target selector](./target.md) | no | `{"type":"saturn:self"}` | Selector that obtains the ability's target. |
| `target_condition` | [Bi-entity condition](./condition/bientity-condition.md) | no | `{"type":"saturn:always"}` | Bi-entity condition that filters the actor and candidate targets. |
| `bi_entity_action` | [Bi-entity action](./action/bientity-action.md) | no | `{"type":"saturn:no_op"}` | Bi-entity action run on the actor and target. |
| `cooldown` | [Number provider](./number.md) | no | `0.0` | Cooldown length, in game ticks. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:aura"
}
```

</details>

### `saturn:channelled` {#saturnchannelled}

Keeps the ability in use, paying the upkeep cost every beat and running its actions.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:channelled` |
| `tick_interval` | [Number provider](./number.md) | no | `1.0` | Beat interval of the channel, in game ticks. |
| `upkeep_costs` | [Cost](./cost.md) array | no | `[]` | Costs that must be paid on every channelling beat. |
| `entity_action` | [Entity action](./action/entity-action.md) | no | `{"type":"saturn:no_op"}` | Entity action run on the ability holder or the context entity. |
| `target_selector` | [Target selector](./target.md) | no | `{"type":"saturn:self"}` | Selector that obtains the ability's target. |
| `target_condition` | [Bi-entity condition](./condition/bientity-condition.md) | no | `{"type":"saturn:always"}` | Bi-entity condition that filters the actor and candidate targets. |
| `bi_entity_action` | [Bi-entity action](./action/bientity-action.md) | no | `{"type":"saturn:no_op"}` | Bi-entity action run on the actor and target. |
| `cooldown` | [Number provider](./number.md) | no | `0.0` | Cooldown length, in game ticks. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:channelled"
}
```

</details>

### `saturn:interval` {#saturninterval}

Runs its action at the given tick interval while the ability is active.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:interval` |
| `interval` | [Number provider](./number.md) | no | `20` | Execution interval, in game ticks. |
| `entity_action` | [Entity action](./action/entity-action.md) | no | `{"type":"saturn:no_op"}` | Entity action run on the ability holder or the context entity. |
| `target_selector` | [Target selector](./target.md) | no | `{"type":"saturn:self"}` | Selector that obtains the ability's target. |
| `target_condition` | [Bi-entity condition](./condition/bientity-condition.md) | no | `{"type":"saturn:always"}` | Bi-entity condition that filters the actor and candidate targets. |
| `bi_entity_action` | [Bi-entity action](./action/bientity-action.md) | no | `{"type":"saturn:no_op"}` | Bi-entity action run on the actor and target. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:interval"
}
```

</details>

### `saturn:modifier` {#saturnmodifier}

Provides attribute modifiers to the entity while the ability is active.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:modifier` |
| `modifiers` | [Attribute modifiers](../data/common.md#attribute-modifiers) array | no | `[]` | List of attribute modifier entries. |

Each entry of modifiers is an [attribute modifier](../data/common.md#attribute-modifiers), not a simple mapping from attribute IDs to numbers.

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:modifier"
}
```

</details>

### `saturn:targeted` {#saturntargeted}

Selects a target and then casts the referenced ability on it.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:targeted` |
| `target_selector` | [Target selector](./target.md) | yes | — | Selector that obtains the ability's target. |
| `ability` | Resource ID | yes | — | Ability ID or tool ability, distinguished by the field type. |
| `cooldown` | [Number provider](./number.md) | no | `0.0` | Cooldown length, in game ticks. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:targeted",
  "target_selector": {
    "type": "saturn:self"
  },
  "ability": "example:heal"
}
```

</details>

### `saturn:triggered` {#saturntriggered}

Subscribes to the given game signal and runs the ability's actions when the condition holds.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:triggered` |
| `triggers` | [Trigger](./trigger.md) array | no | `[]` | Triggers this ability subscribes to. |
| `chance` | [Number provider](./number.md) | no | `1.0` | Hit chance; 0 never hits, 1 always hits. |
| `damage_condition` | [Damage condition](./condition/damage-condition.md) | no | `{"type":"saturn:always"}` | Condition that filters the damage context. |
| `entity_action` | [Entity action](./action/entity-action.md) | no | `{"type":"saturn:no_op"}` | Entity action run on the ability holder or the context entity. |
| `target_selector` | [Target selector](./target.md) | no | `{"type":"saturn:self"}` | Selector that obtains the ability's target. |
| `target_condition` | [Bi-entity condition](./condition/bientity-condition.md) | no | `{"type":"saturn:always"}` | Bi-entity condition that filters the actor and candidate targets. |
| `bi_entity_action` | [Bi-entity action](./action/bientity-action.md) | no | `{"type":"saturn:no_op"}` | Bi-entity action run on the actor and target. |
| `cooldown` | [Number provider](./number.md) | no | `0.0` | Cooldown length, in game ticks. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:triggered"
}
```

</details>

### `saturn:upkeep` {#saturnupkeep}

Checks the host item's upkeep cost at an interval and runs an item action when payment fails.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:upkeep` |
| `interval` | [Number provider](./number.md) | no | `20` | Execution interval, in game ticks. |
| `on_fail` | [Item action](./action/item-action.md) | no | `{"type":"saturn:no_op"}` | Action run on the host item after upkeep fails. |
| `owner_only` | Boolean | no | `true` | Whether only the item owner may bear the upkeep. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:upkeep"
}
```

</details>

## Meta types

These types do not test a concrete value themselves; they combine or delegate other types of the same kind and are embedded in the same fields.

### `saturn:empty` {#saturnempty}

Provides an implementation that performs no extra behaviour.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:empty` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:empty"
}
```

</details>
