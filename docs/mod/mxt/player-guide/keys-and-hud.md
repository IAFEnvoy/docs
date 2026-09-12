---
title: "Keys and HUD"
description: "Default keybinds, the shared ability and spirit power hotbar, resource bars, the aura HUD and the character information panel."
sidebar_position: 2
---

# Keys and HUD

MiXianTu ships the client-side controls and overlays that its framework gameplay needs: keybinds, a shared ability and spirit power hotbar, resource bars, an aura HUD and a character information panel. They all work with the mod installed on its own, even before any datapack adds content.

## Keybinds

| Keybind ID | Default | Name in the language file | Action |
|---|---|---|---|
| `key.mxt.cultivate` | `C` | Toggle Cultivation Mode | Starts or stops cultivating. |
| `key.mxt.information_panel` | `Z` | Open Character Information | Opens the character information panel when no other screen is open. |
| `key.mxt.ability_menu` | `LAlt` | Show Ability Hotbar | Opens the shared hotbar on its ability entries. |
| `key.mxt.spirit_burst` | `V` | Fire Spirit Power | Opens the shared hotbar on its spirit power entries; the chosen resource fires while its number key is held. |
| `key.mxt.swap_back` | unbound | Swap Main Hand with Back Weapon Slot | Swaps the main hand stack with the first `back_weapon` Curios slot. |

The first three keybinds live in the `MiXianTu` category (`key.category.mxt.general`) and the two hotbar keybinds in the `MiXianTu Hotbar` category (`key.category.mxt.hotbar`). Every one of them can be changed in the vanilla controls settings; "Swap Main Hand with Back Weapon Slot" is unbound by default. See [Curios Slots](./curios-slots.md) for the slot rules the swap keybind follows.

## Ability and Spirit Power Hotbar

Abilities and spirit power share one client hotbar. Opening one automatically closes the other.

- Number keys `1`–`9` select entries, and several number keys can be held at the same time.
- The vanilla `1`–`9` hotbar selection is intercepted while the hotbar is open; the mouse wheel still switches inventory slots. The client setting "Allow number keys to switch hotbar slots while open" (`config.mxt.client.hotbar.allow_vanilla_selection`, off by default) restores vanilla number-key selection.
- The client setting "Hotbar activation mode" (`config.mxt.client.hotbar.mode`) chooses between "Hold to show" (the default) and "Press to toggle".
- While the ability hotbar is open, a casting progress bar is drawn above it.

The hotbar shows up to nine entries. The **Configure Hotbar** screen (`screen.mxt.hotbar_configuration`) chooses which entries appear in which slot: open it with `/mxt aura` for the spirit power entries and `/mxt ability` for the ability entries. A saved entry whose definition no longer exists in the current datapack is filled from the current runtime entries, while a slot deliberately left empty stays empty.

:::note

Entries and casting are server-authoritative: the client sends a request, and the server decides costs, cooldowns, durations and effects. Client code can register its own entries for a hotbar mode — see the [Java API hotbar page](../java/hotbar.md).

:::

## Resource Bars and Aura HUD

Resource bars and the aura concentration bar are driven by server-synced state; the client only draws them. The server periodically syncs the aura at your position (`aura.sync_interval` in `config/mxt-server.json`), and fog and particles never decide aura values in reverse.

| Client setting | Effect |
|---|---|
| "Show resource bar names" (`config.mxt.client.resource_bars.show_names`) | Shows the name next to each resource bar. |
| "Resource bar icon layout" (`config.mxt.client.resource_bars.icon_layout`) | Draws the icons on "Two sides" (default) or in the "Center". |

Bars are labelled by their context, for example Stored aura, Sensed concentration, and environmental or actual concentration of a resource. A bar can also be drawn for a target or a boss. To inspect raw values instead, use `/mxt resourcebar` and `/mxt aura query` — see [Commands](./commands.md).

## Character Information Panel

`Z` opens the **Character Information** panel (`screen.mxt.information_panel`) when no other screen is open.

| Group | Entries |
|---|---|
| Basic Information | Health, food, experience level, position, dimension. |
| Cultivation Information | Realm (or Mortal), cultivation progress, whether you are currently cultivating, the breakthrough state, spirit roots, physiques and techniques. |

The breakthrough line reports whether the required progress is reached and whether its conditions are met. The client setting "Information refresh interval (ticks)" (`config.mxt.client.information.refresh_interval`, 20 by default) controls how often the panel refreshes.

## Spirit Crafting Table

The Spirit Crafting Table (`mxt:spirit_crafting_table`) reuses the vanilla crafting layout but only accepts `spirit_shaped` and `spirit_shapeless` recipes. Items placed in the grid stay in the menu, and aura is only accepted when a matching recipe is present; it is deducted when the result is taken out of the output slot. JEI lists the spirit recipes together with their aura cost, and Jade shows how much aura the table currently holds.

## Display Stand

A Display Stand (`mxt:oak_display_stand` and the five other wood variants) holds a single item:

- Using an item on an empty stand places one of that item on the stand.
- Using the stand again returns the displayed item, which drops above the centre of the block. Breaking the stand also drops it.
- If the displayed item implements the spirit access interface, Jade shows the item and its spirit power percentage, and the stand tries to charge a displayed spirit stone whenever it receives spirit power.

See [Items and Blocks](./items.md) for the full block list.

## /display Command

`/display [player] [slot]` shows an equipped item in chat as a hoverable item link.

| Usage | Result |
|---|---|
| `/display` | Broadcasts your main hand item to the whole server. |
| `/display <slot>` | Broadcasts your item in that slot. Available slots: `mainhand`, `offhand`, `head`, `chest`, `legs`, `feet`. |
| `/display <player>` | Sends your main hand item to that player only. |
| `/display <player> <slot>` | Sends your item in that slot to that player only. |

The command requires a player and no operator permission. It reads vanilla equipment slots, so Curios slots are not accepted. See [Commands](./commands.md) for the rest of the command surface.
