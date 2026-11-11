---
title: Costs (cost_type)
description: Every built-in entry, field, default and decision rule of the saturn:cost_type costs.
---

# Costs (cost_type)

<span id="costs-cost-type" />

:::info Shared with Saturn
This page lists only MiXianTu's own types; types shared with Saturn (including their `mxt:` alias spellings) are documented in [Saturn's type reference](../../../../../library/saturn/types/cost.md).
:::

Every field that consumes something is an array, and each entry writes one `Cost`. The four shapes that write a `type` are dispatched by the built-in `saturn:cost_type` registry: `saturn:resource`, `mxt:aura`, `mxt:item` and `mxt:js`; the other is the shorthand that writes no `type` and only `id` and `amount`, read as `saturn:resource`. The whole family is registered by the mod, so a data pack picks an entry but cannot add one. The all-or-nothing semantics of the whole array, the channel rules and the shared evaluation rules are on [Shared Data Types · `Cost`](../shared_data_types.md#cost).

This family is referenced all over the pack: in abilities, artifacts, techniques, talismans, cultivation, formations, pills and more, every "what does it take" field is written as one array of `Cost`, so it has no definition page of its own and stands as a type page by itself. Which definitions carry a `costs` field is written on those definition pages.

### `mxt:aura` {#mxt-aura}

Spends by aura identity.

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `aura` | Aura ID | **required** | The aura identity to spend |
| `amount` | `NumberProvider` | **required** | Amount to spend; must evaluate to a finite positive number |

```json
{"type": "mxt:aura", "aura": "example:fire_qi", "amount": 2}
```

What gets charged depends on the payment channel: when the payer pays, the **value that aura is measured in** is charged (what a payer carries is a value, not an aura); when a shared aura pool or a block's store pays, that aura itself is charged, rounded up to whole units. The difference between the two channels is on [Shared Data Types · `Cost`](../shared_data_types.md#cost).
