---
title: "Commands"
description: "Every command MiXianTu adds, with its effect, its permission requirement and how registry IDs are completed."
sidebar_position: 3
---

# Commands

Every command MiXianTu adds hangs under the `/mxt` root: its own registries, resources, cultivation, world state and operator tooling. The player-facing subtrees are also registered as top-level aliases, so `/aura` and `/mxt aura` are the same tree, `/formation` and `/mxt formation`, and so on. Commands are diagnostic and administrative helpers for the framework; the gameplay itself is driven by datapacks.

Each alias is toggled on its own in the **Command Aliases** tab of the server configuration — the saved key is `commands.<name>`, the entry shows the command itself, and all of them default to on. Disabling `aura` removes only the top-level `/aura` spelling; the `/mxt` entries stay complete, so a configuration mistake can never make a command unreachable. The alias set is `ability`, `aura`, `display`, `formation`, `friend`, `lightning`, `picker`, `talisman`, `technique` and `trade`.

## Command List

| Command | Effect |
|---|---|
| `/mxt registries list` | Lists the dynamic registries and their entry counts. |
| `/mxt registries validate` | Shows the current datapack registry validation state. |
| `/picker [<category>]` (= `/mxt picker`) | Opens the item picker, which lists the items behind the definitions of the selected registries; `category` is a registry ID such as `mxt:aura`, `mxt:currency` or `mxt:item_binding`, and leaving it out walks every registered category. It needs the `gamemaster` permission and only works in creative mode. |
| `/mxt attachment status` | Shows your own attachment counts and cultivation data: resources, abilities, cooldowns, curses, spirit roots and physiques. |
| `/mxt resource <id>` | Queries a resource value. |
| `/mxt resource <id> set <value>` | Sets a resource value. |
| `/mxt resourcebar [resource] [index]` | Shows a resource bar's raw current value, minimum, maximum, untruncated percentage, context, anchor and order; without arguments it lists every resource bar. |
| `/mxt cultivate status` | Shows the cultivation state: the active cultivation behaviour, the progress stored per aura and the next cultivation tick. |
| `/aura` (= `/mxt aura`) | Opens the spirit power hotbar configuration screen. |
| `/aura query [type]` (= `/mxt aura query [type]`) | Queries the aura at your current position; `type` is an aura ID from the `mxt:aura` registry, and when it is omitted every aura at that position is shown. Each line is followed by the element its `aura_type` names. |
| `/aura vein` (= `/mxt aura vein`) | Queries the spirit stone vein grade at your current position. |
| `/aura cache clear [radius]` (= `/mxt aura cache clear [radius]`) | Clears and immediately rebuilds the subsection aura caches of the nearby loaded chunks; the radius is counted in chunks, defaults to 3 and accepts 0–32. |
| `/ability` (= `/mxt ability`) | Opens the ability hotbar configuration screen. |
| `/ability cast <id>` (= `/mxt ability cast <id>`) | Forces an ability to be cast. |
| `/mxt breakthrough <aura>` | Attempts a breakthrough into the realm that the given aura leads to. |
| `/mxt realm set <realm>` | Sets a linear realm. |
| `/mxt sect claim` / `/mxt sect release` | Claims or releases the sect territory at your position. |
| `/mxt soul reclaim` | Reclaims a reclaimable soul. |
| `/mxt formation list` (= `/formation list`) | Lists every active formation in the current dimension: its ID, its controller position, its radius, its owner, the upkeep payments it has already paid, and its stored aura when it has any. |
| `/mxt formation info` (= `/formation info`) | Lists the formations covering your position; overlapping ones are all listed rather than one being picked. |
| `/mxt formation bind <formation>` (= `/formation bind <formation>`) | Writes the named formation into the formation plate in your **main hand** (needs the `gamemaster` permission). The plate is the only item that can carry a formation into the world and its binding lives in an item component, so this command is the way to obtain a usable plate in survival. Tab completion offers only the formations **this plate** allows, and one outside its allow list is refused without touching the plate; rebinding overwrites the previous value, and a mistyped ID leaves the plate exactly as it was. |
| `/technique repair [dry-run]` (= `/mxt technique repair [dry-run]`) | Removes the stale entries that point at technique definitions the current data pack no longer provides; `dry-run` reports what would be removed and changes nothing. |
| `/technique drop <id>` (= `/mxt technique drop <id>`) | Removes one learned technique and rebuilds the attributes and abilities it granted. |
| `/technique diagnose` (= `/mxt technique diagnose`) | Checks the technique item in your hand gate by gate and reports why it cannot be used. |
| `/talisman` (= `/mxt talisman`) | Hands you a blank talisman carrier. Every node of the subtree needs the `gamemaster` permission. |
| `/talisman blank [count <count>]` (= `/mxt talisman blank [count <count>]`) | Hands you `count` blank carriers; the count accepts 1–64 and defaults to 1. |
| `/talisman give <talismans> [count <count>] [stored]` (= `/mxt talisman give …`) | Hands you carriers inscribed with the named talisman definitions; `<talismans>` is a comma-separated list, `count` gives several copies (1–64, one by default), and `stored` inscribes them in storing mode, so they are poured by hand instead of firing on the next click. |
| `/talisman give <talismans> count <count> charged` (= `/mxt talisman give …`) | As above, and pours the whole bill in as well, which is what makes the carrier fire on the next click. `charged` is only offered after `count`. |
| `/display [player/slot] [slot]` (= `/mxt display`) | Displays a slot item in chat; see [Keys and HUD](./keys-and-hud.md) for the argument forms. |
| `/trade <player>` (= `/mxt trade <player>`) | Sends a trade request to that player. |
| `/friend` (= `/mxt friend`) | Prints the friend command help, each row clickable to fill the command into the chat box (without sending it). |
| `/friend list` (= `/mxt friend list`) | Lists the permanent and temporary friend lists; every name in them is clickable and fills in the matching removal command. |
| `/friend add <player>` (= `/mxt friend add <player>`) | Adds a **temporary** friend, which is gone after the next login. |
| `/friend remove <player>` (= `/mxt friend remove <player>`) | Removes a temporary friend; a permanent friend is refused with a pointer to the next command. |
| `/friend permanent add <player>` (= `/mxt friend permanent add <player>`) | Adds a **permanent** friend, which is written to the save; a temporary friend is upgraded rather than duplicated. |
| `/friend permanent remove <player>` (= `/mxt friend permanent remove <player>`) | Removes a permanent friend. |
| `/mxt lightning [pos] [color …]` (= `/lightning`) | Strikes a bolt right now; needs the `gamemaster` permission. Colour, brightness, thickness and damage are optional in a fixed order, described below. |

### `/picker`

`/picker [<category>]` opens a client-side screen modelled on the vanilla creative search tab: a title, a search well, a scrollable five-by-nine grid and the player's real hotbar row underneath. The entries are the items behind this mod's definitions plus the vanilla item and block registries, so the grid is a way to see what a content pack actually registers rather than a copy of the creative inventory.

`<category>` names one datapack registry, and the registered categories are, in order:

`minecraft:item`, `minecraft:block`, `mxt:item_aura`, `mxt:currency`, `mxt:spirit_herb`, `mxt:item_binding`, `mxt:weapon_binding`, `mxt:pill_binding`, `mxt:technique_binding`, `mxt:contract_type`, `mxt:realm_instance`, `mxt:formation`, `mxt:talisman`, `mxt:aura`, `mxt:block_aura`, `mxt:item_quality`.

Without an argument every category is walked. A definition with no item of its own is shown on a stand-in item (a spirit stone, a contract scroll, a realm token, a formation plate, a talisman carrier or the identification mirror) whose row is searched by the definition's name and registry ID as well as by what the stack looks like; item-shaped registries are expanded to the items they name.

The search field matches every whitespace-separated token: a token starting with `@` matches only the item's namespace, and anything else is a substring of the row's names. An item leaves the screen exactly as it does in the creative tab — by being carried into a hotbar slot or by being thrown out of the panel — so it travels over the vanilla creative-mode channel, which the server refuses unless the player really is in creative mode. The command itself needs an executing player, the `gamemaster` permission and creative mode.

### `/mxt lightning`

Strikes a bolt at the given position; without `pos` it lands at the command executor's feet. Apart from the colour it is a vanilla lightning bolt: damage, ignition, lightning-rod charging, copper oxidation, the thunder and the sky flash, and the lightning transformations (villager to witch, pig to zombified piglin, creeper to charged creeper) all happen as usual.

```
/mxt lightning
/mxt lightning ~ ~ ~
/mxt lightning ~ ~ ~ color 66CCFF
/mxt lightning ~ ~ ~ color 66CCFF alpha 0.5 thickness 2 damage 10 visual_only
```

| Argument | Default | Description |
|---|---|---|
| `pos` | the executor's position | The landing position; `~` relative coordinates are accepted. |
| `color <six hex digits>` | `737380` (the vanilla cool white) | Written without `#`, for example `66CCFF`; tab completion offers a few common colours. |
| `alpha <0..1>` | `0.3` | The bolt's **brightness**. Vanilla lightning is additive-blended, so the vertex colour's `RGB × alpha` is its glow strength — it is not an opacity. |
| `thickness <0.1..4>` | `1` | The thickness multiplier of the bolt column. |
| `damage <≥0>` | `5` | The lightning damage. |
| `visual_only` | off | Strikes the bolt without damage or ignition, for pure decoration. |

The options are one chain of optional nodes in a **fixed order**: to write a later one you must write the earlier ones too (tab completion walks you through whatever is left), so reaching `thickness` means writing `color` and `alpha` first. The datapack-side behaviour `mxt:spawn_lightning` accepts any combination of its fields; see the [entity action types](../datapack/types/action/entity_action_types.md).

## Formation Plates

The plate's dismantling entry point is not a command: using a plate on an already active controller dismantles that formation. You have to be the formation's owner or an operator; once the server option **Formation → Teammates Can Dismantle** (`config.mxt.server.formation.teammates_can_dismantle`) is on, the owner's friends — which includes teammates and allies when FTB Teams is installed — may dismantle it too.

Activation uses the plate as well: right-click the controller while holding a bound plate. **An unbound plate identifies the formation under your feet by itself** (it compares every structure its allow list admits and the one nearest the click wins; on by default, and switchable with `config.mxt.server.formation.plate_auto_detect`). **Clicking one block off is not a failure** — the nearest centre satisfying the structure within the 3×3×3 around the click is taken, so the centre block does not have to be hit exactly, and a clicked position that works itself always wins. Dismantling runs through the same lookup, so right-clicking the block next to an active formation takes it down just as well.

## Friends

A friend list's "temporary" means it is **cleared the next time you log in**: relogging and a server restart both clear it, while **respawning does not**. Adding and removing both resolve through the player profile, so they work while the other player is offline — to add an offline player, just write their name.

## Permissions

Commands that need administrator rights validate the `gamemaster` permission in the command tree: `/mxt resource <id> set`, `/mxt breakthrough`, `/mxt realm set`, `/mxt soul reclaim`, `/aura cache clear`, `/ability cast`, `/formation bind`, `/technique repair`, `/technique drop`, and every node of `/lightning` and `/talisman`. `/picker` additionally requires the `gamemaster` permission, an executing player and creative mode.

The remaining commands have no permission requirement, but several of them need an executing player and either report that requirement or return no result when they are run from the console.

## Tab Completion

Registry IDs in commands use the vanilla `IdentifierArgument`, and tab completion is generated from the server's current registries, so it always suggests the IDs that the loaded datapacks actually define. Two subtrees complete from somewhere more specific: `/formation bind` offers the allow list of the plate in your main hand, and `/aura query` completes its `type` from the `mxt:element` registry.
