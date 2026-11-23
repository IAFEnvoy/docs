---
title: Data packs
description: Configure lifespan actions, conditions, formula variables, and rebirth tags.
sidebar_position: 3
---

## Entity actions {#actions}

Use these types in any [Saturn](../../library/saturn/index.md) entity action field.

| Type | Fields | Effect |
| --- | --- | --- |
| `reincarnation:add_lifespan` | Required `amount` (NumberProvider) | Add ticks to remaining and total lifespan. |
| `reincarnation:remove_lifespan` | Required `amount` (NumberProvider) | Spend remaining ticks down to zero. The total stays the same. |
| `reincarnation:unlimited_lifespan` | None | Close the ledger. |
| `reincarnation:reincarnate` | Optional `mode` and `reason` | Queue rebirth. `mode` defaults to `configured` and also accepts `new_life` and `reset`. `reason` is a chat component. Non-player entities reset in place. |

The first two actions accept a finite, non-negative result in ticks and round it with `Math.round`. Zero leaves the ledger as it was. These actions affect living entities and can write while natural ageing is disabled.

```json
{ "type": "reincarnation:add_lifespan", "amount": 2400 }
```

```json
{ "type": "reincarnation:reincarnate", "mode": "new_life", "reason": { "text": "A new beginning" } }
```

## Entity conditions {#conditions}

| Type | Fields | Behaviour |
| --- | --- | --- |
| `reincarnation:lifespan` | Required `comparison` and `compare_to`, optional `field` | Compare a finite ledger. `field` defaults to `remaining` and also accepts `total`, `spent` (total minus remaining), and `fraction` (remaining divided by total, or zero when total is zero). |
| `reincarnation:lifespan_state` | Required `state` | `finite` includes zero. `unlimited` includes unaccounted and closed ledgers. `unaccounted` selects entities without an initialized ledger. `expired` selects a remainder of zero. |
| `reincarnation:generation` | Required `comparison` and `compare_to` | Compare a server player's displayed life number, starting at `1`. |

Supported comparison operators are `<`, `<=`, `>`, `>=`, `==` and `!=`.

```json
{ "type": "reincarnation:lifespan", "field": "fraction", "comparison": "<", "compare_to": 0.1 }
```

## Formula variables {#variables}

`lifespan_remaining` and `lifespan_total` read the corresponding value in ticks from the caster, falling back to the context player when there is no caster. Negative ledger values and contexts without an entity return `NaN`. A closed ledger therefore gives `NaN` for the remainder and `0` for the total.

## Death filter {#death-filter}

With automatic death rebirth and death filtering both enabled, only damage types in `reincarnation:reincarnate_on_death` start a new life on respawn. The example adds fall damage alongside the built-in lifespan damage type.

```json title="data/reincarnation/tags/damage_type/reincarnate_on_death.json"
{
  "replace": false,
  "values": ["minecraft:fall"]
}
```

## Attachment retention {#attachment-retention}

List the entity attachment types to keep in `reincarnation:keep_on_rebirth`. An attachment must support NeoForge death copying to qualify. Reincarnation records the chosen IDs with each full-rebirth archive and uses those IDs during transaction recovery. Clearing unknown mod data takes precedence over the tag and Saturn resource retention.

```json title="data/reincarnation/tags/neoforge/attachment_types/keep_on_rebirth.json"
{
  "replace": false,
  "values": ["saturn:resource_holder"]
}
```

## Life archive rows {#information-rows}

The archive uses [Saturn information groups and rows](../../library/saturn/guides/information.md). The built-in group and its row tag are both `reincarnation:life`. Extend that row tag to add entries to the life group. The expression `{"type":"reincarnation:lifespan"}` renders the age and total from the selected snapshot and omits unaccounted entities. Use `{"type":"reincarnation:life","value":"generation"}` for the displayed life number and `"value":"reason"` for the recorded reason.
