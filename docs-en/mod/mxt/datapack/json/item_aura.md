---
title: Item Aura (item_aura)
description: Turn an existing item into cultivation fuel; read the same definition the other way round and it is what describes holding right-click to pour aura into that item.
hide_table_of_contents: true
---

# Item Aura (item_aura)

<span id="item_aura" />

`item_aura` turns an **existing item** into cultivation fuel: while cultivating, the whole stack is consumed tick by tick and the aura is released into the resource bar bound to the current realm stage. Read the same definition the other way round and it is what describes the holder holding right-click to pour aura into that item.

## File Location {#file-location}

`item_aura` is a **datapack registry**, and one file is one definition:

```text
data/<namespace>/mxt/item_aura/<entry>.json
```

The entry id is `<namespace>:<path>` — `data/example/mxt/item_aura/qingxiao_spirit_crystal.json` is `example:qingxiao_spirit_crystal`. The mod's own entries live under `data/mxt/mxt/item_aura/`; a content pack uses its own namespace instead of `mxt`.

The fields of the table below go at the top level. There is **no `values` wrapper** — one file describes exactly one definition — and to override the same item from another pack you sort it out with `priority`, not with a `replace` switch. A **file-level** `neoforge:conditions` works: when it does not hold, the definition never enters the registry at all.

Like every other datapack registry it is read **while the world loads**, and `/reload` does not read it again. `/mxt registries list` and `/mxt registries validate` both cover it, and `/picker mxt:item_aura` lists the items these definitions claim.

**Purpose**: Cultivation fuel provided by a held item.

## Fields {#fields}

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | Item entries | **required** | Which items this definition claims: a single item id, a `#`-prefixed item tag, or an array of either; the array may also hold `type`-carrying matcher entries, written as on the [`ItemMatcher`](../types/shared_data_types.md#itemmatcher) page. |
| `type` | Aura ID | **required** | The **aura** this item consumes and releases (an `mxt:aura` registry entry, such as `mxt:common`). |
| `aura` | `NumberProvider` | **required** | When a stack of items is processed for the first time, the aura total per item multiplied by the stack count is written into its `mxt:item_aura.remain`; for an item that can be poured into, it is the per-item charging maximum. |
| `consume_speed` | `NumberProvider` | **required** | Fuel value consumed per tick, multiplied by the stack count; the total consumption time therefore stays the same. |
| `release_speed` | `NumberProvider` | **required** | Fuel amount released per tick into the resource bar of the current realm stage, multiplied by the stack count. |
| `result_stack` | `ItemStackTemplate` | none | An extra item returned when the current item is fully exhausted; leave it out and the original item is removed. |
| `exhausted_action` | `EntityAction` | `mxt:no_op` | The behaviour that runs when the current fuel is exhausted. |
| `priority` | Int | `0` | Order between several definitions hitting one item: the larger number wins, and **a tie falls back to registry order**. It decides which aura is poured and burned. |

When several definitions hit one item, the one with the highest `priority` wins (the field defaults to `0`); only two definitions with the same `priority` fall back to registry order. **Whether `items` names an item or a tag is irrelevant**: any definition that hits is ranked by the number it declares, and naming the item by id does not move it up.

`type` names the **aura**, not the value it is counted in (the value is what the aura definition's `resource` points back at), and not an `mxt:element` either: the element is that aura definition's `aura_type`, and it only takes part in the type checks of spirit roots, creature preferences and environment rendering. One read or write handles a single aura; recipes or behaviours that need several auras have to handle them separately.

`aura`, `consume_speed` and `release_speed` must all evaluate to a **positive number** at actual runtime; spirit stone capacity and transfers preserve fractions without flooring.

## Example {#example}

`data/example/mxt/item_aura/qingxiao_spirit_crystal.json`:

```json
{
  "items": "example:qingxiao_spirit_crystal",
  "type": "example:spirit_power",
  "aura": 180,
  "consume_speed": 1,
  "release_speed": 3,
  "result_stack": {"id": "mxt:impurity", "count": 1},
  "exhausted_action": {
    "type": "mxt:apply_effect",
    "effect": "minecraft:regeneration",
    "duration_ticks": 100
  }
}
```

The speeds can also be written as formulas, and `items` may be an item tag that covers a whole family with one definition:

```json
{
  "items": "#example:spirit_fuel",
  "type": "mxt:common",
  "aura": 100,
  "consume_speed": "0.5 + level * 0.05",
  "release_speed": "1 + level * 0.1",
  "exhausted_action": {
    "type": "mxt:apply_effect",
    "effect": "minecraft:fire_resistance",
    "duration_ticks": 40
  }
}
```

## Burning: How the Stack Is Spent While Cultivating {#burning-how-the-stack-is-spent-while-cultivating}

Ordinary fuel records its remaining aura per item in `mxt:item_aura`. Spirit stones record their per-item balance in `mxt:spirit_storage`. The total is the per-item amount multiplied by the stack count, so splitting stacks and merging matching stacks preserve the total. Older saved stacks are converted using their original count when loaded. Burning, pouring and extracting from a spirit stone use the same balance.

Cultivation first checks held [Spirit Stone Bags](../../player-guide/items.md#spirit-stone-bag), main hand before off hand. If neither contains usable fuel, it resumes ordinary fuel stacks already carrying a fuel component in the hands or inventory. It then looks for usable loose fuel in the main hand, off hand and inventory. Each tick normally consumes `consume_speed × stack count` and releases `release_speed × stack count`. The final tick releases only the fraction covered by the remaining fuel.

Interrupting cultivation, logging out or dying returns the reserved stack with its remaining fuel. When ordinary fuel is exhausted, the original count determines how many `result_stack` outputs are given. Drained spirit stones are returned to the inventory. `exhausted_action` runs after settlement.

## The Reverse Direction: Pouring (Hold Right-Click to Charge) {#the-reverse-direction-pouring-hold-right-click-to-charge}

An item that can be poured into takes the holder's own aura when **right-click is held**, reading this definition's two speed fields the other way round:

| Direction | Item side | Holder side |
| --- | --- | --- |
| Burn (while cultivating) | `−consume_speed × stack` per tick | `+release_speed × stack` per tick |
| Pour (while holding right-click) | `+consume_speed × stack` per tick | `−release_speed × stack` per tick |

Both sides use the same pair of numbers, so pouring aura in and burning it out cancel exactly: a pour creates no aura, it only stores the holder's aura in the item for a while (a spirit stone is a battery). The gesture, the pose (`BLOCK`) and the sound (an amethyst chime) come from the hold module, the same mechanism reading a technique manual uses.

- **Which aura is poured**: decided by the `type` of the definition this item hits — the same one it burns; when several definitions hit, the one with the **highest** `priority` wins (the field defaults to `0`), and only a tie falls back to registry order. An item that has already stored something goes by **the record it made itself**: `mxt:spirit_storage` files amounts under the **aura** key (the same component a talisman uses), so re-typing the definition's `type` later cannot silently reinterpret the spirit stones already in the world — they stop matching the new `type` and can be neither filled nor burned.
- **Fractional pouring**: each tick injects up to `consume_speed × stack size`, including rates below 1, bounded by remaining room, simulated acceptance and affordable payment. A final `0.25` gap accepts and charges only that fraction. A zero or invalid speed does not start a pour.
- **Gesture length**: `ceil(capacity / intake per tick)`, capped at 200 ticks. An item whose capacity is far larger than its intake is not filled in one gesture; repeat the gesture. A full item is never armed again (the right-click reports that it is full). The length is derived from the **capacity** rather than the deficit, so it does not change as the item fills within one gesture.
- **An item without the component counts as full**, so a freshly crafted spirit stone is already full, and pouring really only affects stones that have been drained and empty ones taken from the creative menu. The storage component's shape is one table of aura → stored amount (`{"amounts":{"mxt:common":100},"per_item":true}`, the keys being `mxt:aura` registry entries and the values fractional numbers); an item may hold a single aura (a spirit stone, which reads its **only** record) or several (a talisman carrier, read entry by entry against its capacity); an empty table means drained. Capacity is always answered by the item itself (a spirit stone takes the definition's `aura`, a talisman works it out from the `capacity` multiplier).
- **Price and failure**: payment, storing aura in a spirit vessel and the burn direction all take the same route (they do not pass the resource use gate), and how much aura can be afforded is decided before paying, so a tick can never take payment and put nothing in. When no positive amount can be paid for, that tick injects nothing and pays nothing, and the action bar reports insufficient aura.
- **Feedback**: the action bar shows the item's own `stored / capacity (percentage)`, in the same colours as the tooltip; the tooltip, the display stand and the `mxt:spirit_storage_not_full` condition read that same value.
- Environment aura takes no part in pouring: a pour only moves the holder's own pool. An item that can be burned but **cannot be poured into** (a spirit crystal that is only fuel, for instance) does not gain right-click charging from that; conversely, whether an item "can be charged" is decided by the item and the definition together.
- **An item may also declare its own pouring**. `item_aura` is the shared language of "one item", with capacity scaled by the stack count; an item whose capacity depends on **what is written on this particular stack** answers for itself (one entry per aura — how much is stored and how much fits, in pouring order), with the numbers given for the whole stack and no longer multiplied by the count. A talisman carrier is such an item: its capacity is the inscribed definition's `capacity` multiplier times one invocation's aura amount (the multiplier that applies is further capped by the carrier's remaining uses), measured per aura. Such an item does **not** need an `item_aura` definition, and so does not incidentally become cultivation fuel. The **rate and price of a pour are still the gesture's** (a self-described store is poured at 1 unit per tick, 1:1; with a definition, the definition's two speeds are used in reverse), and the item only has to say clearly what it is.
- **What happens once it is full is up to the item, but the writer reports it**: whoever writes aura into a store (the hold-to-pour gesture, writers such as the display stand) reports only **after a real write**, and the item decides whether it is full and whether to act. The report carries both the **actor** and **where this write happened**: the actor pays and answers for the ability, while the position is **where this thing is** — a talisman on a display stand is filled by someone standing elsewhere or by a spirit burst, so the position cannot be read off the holder; it also has to say whether this counts as a **hand's spending** or a **placed store's spending**, which is exactly what tells the talisman's two rule sets apart (cooldown only counts the hand path, spending is split by position). That is where a talisman invokes, writing the position into the ability's formula (`block_x`/`block_y`/`block_z`) **and handing it to positional behaviours as this invocation's origin** (projectiles, particles, explosions, sounds, movement, block behaviours; see [Pouring and Invocation](./talisman.md) for the details).

## Disabling a Definition {#disabling-a-definition}

The condition goes at the **top level of the file** (one file is one definition). When it does not hold the definition never enters the registry:

```json
{
  "neoforge:conditions": [
    {"type": "neoforge:never"}
  ],
  "items": "example:legacy_fuel",
  "type": "mxt:common",
  "aura": 100,
  "consume_speed": 1,
  "release_speed": 1
}
```

A definition whose condition does not hold is as good as absent: that item has no such definition. The available conditions are on the [Datapack Development Overview](../conventions.md#disabling-a-definition).
