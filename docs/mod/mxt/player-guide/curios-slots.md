---
title: "Curios Slots"
description: "The back_weapon, belt_item and technique Curios slots: sizes, validators, server configuration, rendering and resource-pack offsets."
sidebar_position: 4
---

# Curios Slots

MiXianTu provides player Curios slots in the order **back → belt → technique**: two `back_weapon` slots, two `belt_item` slots and four `technique` slots. All of them are physical slots — the mod does not create Curios cosmetic slots — and back and belt items are rendered directly from the physical slots.

| Slot ID | Size | Order | Validators | Accepted items |
|---|---|:---:|---|---|
| `back_weapon` | 2 | 0 | `curios:tag`, `mxt:back_weapon_auto` | Items in the tag, plus what the automatic validator allows. |
| `belt_item` | 2 | 1 | `curios:tag`, `mxt:belt_item_auto` | Items in the tag, plus what the automatic validator allows. |
| `technique` | 4 | 2 | `curios:tag` | `mxt:cultivation_jade_slip` and the items in `#mxt:technique_equipable`. |

The slots are registered for `minecraft:player`. The bundled `curios:tag` tags already list the vanilla swords (and the bow for the belt slot) together with the mod's own `#mxt:back_equipable` and `#mxt:belt_equipable` extension tags.

## Automatic Validators

`back_weapon` and `belt_item` keep the `curios:tag` validator and additionally use an automatic validator registered by the mod:

- `mxt:back_weapon_auto`
- `mxt:belt_item_auto`

Both validators are additional-allow logic: they never override or modify `curios:tag`. Other mods can register their own validators through the Curios API, but datapacks cannot create new validation algorithms.

## Server Configuration

The `curios` section of the Jupiter server configuration file `config/mxt-server.json` controls the automatic validation range. The configuration is synced to clients as the `MxtServerConfig` container.

| Setting | Values | Default | Effect |
|---|---|---|---|
| `curios.back_mode` | `MANUAL`, `WEAPONS`, `ALL` | `MANUAL` | The automatic validation range of the back slots. |
| `curios.belt_mode` | `MANUAL`, `WEAPONS_ARTIFACTS`, `ALL` | `MANUAL` | The automatic validation range of the belt slots. |
| `curios.force_render_slots` | boolean | `false` | Forced rendering of this mod's back and belt slots. |

`curios.back_mode`:

- `MANUAL`: the automatic validator allows no extra items, so only items allowed by `curios:tag` can be placed.
- `WEAPONS`: besides the tag items, items matching `weapon_binding` are allowed.
- `ALL`: besides the tag items, every item is allowed.

`curios.belt_mode`:

- `MANUAL`: only `curios:tag` items are allowed.
- `WEAPONS_ARTIFACTS`: additionally allows weapons matched by `weapon_binding` and artifacts already bound to an `item_archetype`.
- `ALL`: besides the tag items, every item is allowed.

## The Technique Slot

The `technique` slot uses `curios:tag` only. By default the tag accepts `mxt:cultivation_jade_slip` and the contents of `#mxt:technique_equipable`, which is empty in the mod itself; content packs extend it to add books, jade slips or other cultivation technique carriers.

## Visibility and Rendering

The Curios slot screen buttons control each slot's `getRenders()` state and the slot's overall visible state, and the mod's back and belt rendering honours those states. When `curios.force_render_slots` is `true`, only this mod's back and belt slots are forced to render; other mods' slots are unaffected.

## Swap Keybind

"Swap Main Hand with Back Weapon Slot" (`key.mxt.swap_back`) swaps the main hand stack with the first `back_weapon` slot. If the main hand stack is not valid for that slot, the swap does nothing. The keybind is unbound by default; see [Keys and HUD](./keys-and-hud.md).

## Resource-Pack Render Offsets

The back and belt render offsets are controlled entirely by the client resource pack:

- `assets/<namespace>/mxt/back_render/*.json` for the back slots.
- `assets/<namespace>/mxt/belt_render/*.json` for the belt slots.

Each file is one rule. The rule whose `item` matcher matches the stack and whose `priority` is highest wins; when no rule matches, items carrying the vanilla `minecraft:weapon` component fall back to the `weapon` preset and all other items fall back to `default`.

| Field | Type | Default | Description |
|---|---|---|---|
| `item` | `ItemMatcher` | **required** | The items or item tags the rule applies to, using the same matching as the binding tables. |
| `priority` | integer | `0` | The rule priority; the highest matching priority wins. |
| `preset` | `default`, `weapon`, `big_weapon` | `default` | The base placement of the item on the body. |
| `back` | transform | identity | An extra transform applied while the item is in a back slot. |
| `belt` | transform | identity | An extra transform applied while the item is in a belt slot. |

| Preset | Base back placement |
|---|---|
| `default` | No extra translation, rotation or scale. |
| `weapon` | Translation `[0, 10, 0]`, rotation `[180, 0, 0]` — a weapon carried leaning on the back. |
| `big_weapon` | Translation `[0, 4.8, 0]`, no extra rotation. |

A preset only changes the back placement; belt slots use the default placement for every preset.

A transform has three optional fields:

| Field | Type | Default | Description |
|---|---|---|---|
| `translation` | 3 floats | `[0, 0, 0]` | The offset in 1/16 block units. |
| `rotation` | 3 floats | `[0, 0, 0]` | The rotation in degrees, applied around X, then Y, then Z. |
| `scale` | 3 floats | `[1, 1, 1]` | The scale on each axis. |

The renderer positions the item on the body first and then applies the matched preset and transform, so a resource pack only has to describe the difference from the default placement. The definitions are loaded and reloaded with the client resource pack.
