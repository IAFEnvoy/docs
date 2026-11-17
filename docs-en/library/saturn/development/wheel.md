---
title: Extensible wheel
sidebar_position: 4
---

Saturn provides native Minecraft wheel and configuration screens, a twelve-slot main layout, automatic pages, key bindings, and a HUD grid. The wheel has no AUI dependency. Client entries describe presentation; registered server kinds execute requests.

## Register kinds and sources

Public contracts live in `com.iafenvoy.saturn.api.wheel`. Register on both sides during mod initialization with `WheelEntryKinds.register(kind)` and `WheelSourceTypes.register(source)`.

| Contract | Main members | Responsibility |
| --- | --- | --- |
| `WheelEntryKind` | `id`, `displayName`, `holdsEntry`, `exists`, `trigger`, `directed` | Resolve identities and execute on the server; directed requests are refused by default |
| `WheelSource` | `id`, `displayName`, `configured`, `grantSources`, `equipment`, `offers` | Describe a source and check whether it still offers an entry |
| `WheelMenuEntry` | `kind`, `id`, `title`, `icon`, `accentColor`, `tooltip`, `cooldownTicks`, `cooldownLength`, `usable` | Client presentation; unusable styling does not replace server validation |

Built-in kinds are `saturn:empty` and `saturn:ability`. Ability entries must be granted to the player and implement `Togglable`. Built-in sources are `saturn:configured`, `saturn:main_hand`, `saturn:off_hand`, and `saturn:equipped`. The last source reads extension equipment through `AbilityHooks.equippedItems`; item abilities are resolved through `AbilityHooks.itemAbilities`.

The first registration for a kind or source id wins. Sources appear in registration order; requests address them by id. Each page holds at most twelve cells. The configured page always holds twelve; derived sources split automatically and empty sources add no pages.

## Register client content

Register from client setup using `enqueueWork`. Do not load presentation implementations on a dedicated server:

```java
WheelContent.register(myKind, player -> myConfigurableEntries(player));
WheelMenuContent.register(mySource, (player, source) -> myDerivedEntries(player));
AbilityWheelTooltips.register(myOwner,
        (player, ability, carrier, lines) -> lines.add(myExtraDescription(ability)));
```

This integration fragment uses consumer-supplied `my*` values. Client registration classes live in `screen.wheel.content` and `screen.wheel`; kind and source registries live in `runtime.wheel`.

`WheelEntryProvider.options(player)` supplies the combined configuration pool, deduplicated by kind id and entry id. `available(player)` defaults to the same entries; override it to resolve saved entries that remain usable but cannot be newly configured. `WheelMenuProvider.entries` supplies a source's entries, may exceed twelve, and may use `null` for empty cells.

Candidate registration keeps the first provider per kind. Page registration replaces the provider for that source. Tooltip providers replace only their owner and append in owner-id order. Providers should read current state and avoid expensive work on each client tick.

## Server execution

Both ordinary and directed requests check definition existence and the source's `offers` before calling `trigger` or `directed`. Never trust the client's displayed state. Custom kinds must validate their permissions and business requirements when executing.

Ability entries reuse the activation pipeline for grants, preconditions, costs, and cooldowns. Putting an ability in a layout does not grant it. A directed request already at the requested state does not toggle again, but still checks its source and grant.

`WheelLayout` stores twelve `WheelSlot(kind, id)` values. Short lists are padded, long lists truncated, and malformed or unknown kinds become empty. Saving on the server removes missing definitions. A server-owned player attachment persists and synchronizes the layout and selected number. Slot keys address the current page.

## Player controls

`R` opens selection, `V` uses it, and the arrow keys or mouse wheel turn pages. `/wheel` or `/wheel configure` opens configuration. The configuration key and twelve slot keys are unbound by default. Slots 1–12 have their own Saturn: Wheel Slots category; all other bindings use the main Saturn category.

Configuration has one scrollable candidate pool above twelve slots with color strips. Scroll or drag its scrollbar, select a candidate, then left-click a slot to place it. Right-click clears a slot. Closing saves the layout; narrow windows wrap the slots. While all twelve configured slots are empty, the HUD omits only the main page. Automatically discovered entries remain visible from the top. Configuring an entry restores the twelve main slots; clearing them hides that page again. The HUD editor still offers a placement frame.

The Saturn client options `wheel.hold`, `wheel.scroll_switch`, and `wheel.wrap_pages` all default to `true`, controlling hold-to-open, wheel paging, and page wrapping.
