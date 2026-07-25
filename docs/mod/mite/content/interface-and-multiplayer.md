---
title: Interface and Multiplayer Rules
sidebar_position: 7
---

# Interface and Multiplayer Rules

## `FND-01` - Registration and Data Generation {#fnd-01}
**Configuration:** `None`

MITE content uses NeoForge registries, while generated block and item tags keep shared behavior such as soil interaction, portal foundations, livestock grazing, and material repair aligned with registered content.

## `FND-02` - Persistent Gameplay State {#fnd-02}
**Configuration:** `Enforce server authority`

Nutrition, crafting, professions, equipment state, livestock state, world progress, and ownership survive death or restart according to their rules. Required values are serialized and synchronized instead of being stored only in a client screen.

## `FND-03` - Server-Authoritative Rules {#fnd-03}
**Configuration:** `Enable multiplayer rules`; `Enforce server authority`

Harvesting, combat, crafting completion, nutrition, ownership, and teleportation are decided by the server. Client interfaces display synchronized state but cannot grant eligibility or complete protected actions.

## `FND-04` - Configuration, Reloading, and Verification {#fnd-04}
**Configuration:** `None`

Single-player and dedicated servers use the same configuration and rule loaders. Invalid external definitions are reported with their source, reloadable data is refreshed through the supported reload path, and automated tests cover critical server behavior.

## `FND-05` - Non-Survival Mode Restriction {#fnd-05}
**Configuration:** `Restrict non-survival game modes`; `Non-survival game mode permission level`

MITE reserves creative and other non-survival modes for development use. Servers can require an operator permission level before a player may leave survival mode, preventing ordinary progression from being bypassed.

## `FND-06` - Versioned Network State {#fnd-06}
**Configuration:** `Enforce server authority`

Custom gameplay state uses typed, version-compatible NeoForge payloads with server-side validation. Nutrition, crafting, rune gates, statistics, ownership, and other synchronized systems do not accept arbitrary client completion or mutation requests.

## `UX-01` - HUD, Tooltips, and Visual Effects {#ux-01}
**Configuration:** `Show survival HUD`; `Show detailed tooltips`; `Show nutrition button in inventory`; `Show Rune Gate transition effects`; `Show witch curse HUD`; `Render special moon colors and halos`

Client settings control the survival HUD, food details, nutrition entry point, rune-gate transition, curse display, and special moon colors. They change presentation only and do not alter server gameplay.

## `UX-02` - Guided Advancements {#ux-02}
**Configuration:** `None`

Advancements guide players through first-day survival, metal progression, the Underworld, and the Nether without replacing experimentation or exposing internal implementation details.

## `UX-03` - Restricted Debug Information {#ux-03}
**Configuration:** `Show full debug information in development`

Production play limits F3 output to permitted information. A client running in the development environment may opt into the complete modern debug display without changing server rules.

## `UX-04` - Strongbox Ownership {#ux-04}
**Configuration:** `Enable strongboxes`; `Enforce server authority`

Strongboxes store their owner's UUID and reject unauthorized access. Creative overrides and village-owned containers are handled explicitly, and Jade can display ownership and access state.

## `UX-05` - Obstruction Feedback {#ux-05}
**Configuration:** `Require clear access to production blocks`; `Require clear space above workbenches`

Workbenches, anvils, furnaces, strongboxes, and enchanting tables reject use when their required space is blocked. A specific message explains whether the top or furnace front must be cleared.

## `UX-06` - Collectibles and Creative Content {#ux-06}
**Configuration:** `Enable MITE enchantment effects`; `Enable MITE mobs`

The dedicated creative tab includes MITE blocks and items, spawn eggs, enchanted books, music discs, reference books, and all rune-stone patterns. Registered content remains searchable through supported recipe and information viewers.
