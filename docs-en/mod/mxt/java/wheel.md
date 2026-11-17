---
title: Wheel Entries
---

<span id="wheel-entries" />

MiXianTu uses Saturn's wheel, key bindings, layout synchronization, and native screens. See [Saturn's extensible wheel](../../../library/saturn/development/wheel.md) for the shared integration API. MiXianTu registers aura and contract entries and adds element, grant-source, and artifact-quality descriptions to ability tooltips.

## The main wheel, the pages behind it, and cell numbers {#the-main-wheel-the-pages-behind-it-and-cell-numbers}

The main wheel has twelve player-configured cells. Main-hand, off-hand, extension-equipment, and contract entries create derived pages, splitting after every twelve cells. Each page occupies twelve numbers, starting at the top and proceeding clockwise. Empty derived sources add no pages; the configured page always remains.

Saturn provides `saturn:configured`, `saturn:main_hand`, `saturn:off_hand`, and `saturn:equipped`. MiXianTu adds `mxt:contract`, whose entries depend on the contract selected by the held Beast Taming Bell.

## Skills that need a key (`Togglable`) {#skills-that-need-a-key-toggable}

The built-in `saturn:ability` kind lists granted abilities implementing `Togglable`. Active and targeted abilities, artifact switches, and storage use the shared activation pipeline; screens do not duplicate settlement.

MiXianTu registers `mxt:aura` for aura bursts and `mxt:behavior` for contract orders. New content implements a kind and source, then registers client presentation separately.

## Where the twelve cells come from {#where-the-twelve-cells-come-from}

Use `/wheel` to configure the main wheel. All kinds share one scrollable candidate grid, deduplicated by kind id and entry id. Abilities granted only by the current hands remain on hand pages. Armor, extension equipment, and learned abilities may be configured; aura entries must also meet their burst requirements.

`WheelEntryProvider` distinguishes configurable options from entries that can resolve saved cells. `WheelMenuProvider` supplies derived pages. See the Saturn documentation for registration examples and replacement rules.

## What a sector draws {#what-a-sector-draws}

`com.iafenvoy.saturn.api.wheel.WheelMenuEntry` describes the name, icon, color strip, tooltip, cooldown, and usable state. It only supplies display data. Input sends requests centrally; entries have no individual sending callback.

MiXianTu appends business descriptions through `AbilityWheelTooltip`, preserving the shared cost, cooldown, and state display. A stale configured entry keeps its position with a red border and explanatory tooltip until cleared.

## Choosing and using are two keys {#choosing-and-using-are-two-keys}

`R` selects; `V` or a left click inside the wheel uses the entry. Releasing selection only closes the screen. Arrow keys and scrolling turn pages; the twelve slot keys address the current page. Bindings appear under Saturn, with configuration and slot keys unbound by default.

`wheel.hold`, `wheel.scroll_switch`, and `wheel.wrap_pages` belong to Saturn's client configuration and default to enabled. Both wheel screens use native Minecraft screens without AUI pages.

## Keeping the selection {#keeping-the-selection}

The server persists and synchronizes twelve configured cells and the selected number. Derived pages are rebuilt from current equipment and contracts. A number beyond the available pages falls back to the last occupied cell; an empty cell falls back to the first occupied cell. This does not rewrite the configured layout.

## Triggering {#triggering}

Both ordinary and directed requests validate definition existence and the source's `offers` before dispatch. Directed switching cannot bypass revoked equipment or grants. Ability entries still validate grants, business conditions, costs, and cooldowns; configuring an ability does not grant it.

See [WheelSource](./interfaces/wheel/wheel-source.md), [WheelEntryKind](./interfaces/wheel/wheel-entry-kind.md), and [WheelMenuEntry](./interfaces/wheel/wheel-menu-entry.md) for the public contracts.
