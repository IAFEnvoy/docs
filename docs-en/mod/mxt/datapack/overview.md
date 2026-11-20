---
title: Datapack Development Overview
description: MiXianTu data pack file layout, registry index, loading and overriding, loading and debugging.
---

# Datapack Development Overview

<span id="datapack-development-overview" />

## File Location {#file-location}

```text
data/<namespace>/<registry_namespace>/<registry>/<path>.json
```

For example, `data/example/saturn/ability/fireball.json` defines `example:fireball`. `namespace` belongs to the entry, while `registry_namespace` belongs to the registry: `mxt` for the core, `saturn` for shared library registries, and `mxt_alchemy` or `mxt_forging` for addons. Changing registry ownership does not change the entry ID.

**Once there is a lot of content, sort the JSON into subdirectories by category.** With dozens or hundreds of files sitting flat in one registry directory, "which of these are the passives of the same school" can only be guessed from the filenames; once they are sorted, the path is the index:

```text
data/example/saturn/ability/sword/slash.json            → example:sword/slash
data/example/saturn/ability/sword/parry.json
data/example/saturn/ability/passive/body_tempering.json
data/example/mxt/artifact/sword/azure_flight_sword.json
data/example/mxt/artifact/charm/ward_jade_talisman.json
```

There is no hard rule for how to categorise: by purpose (`passive/`, `active/`), by school (`sword/`, `alchemy/`) or by the batch an update added are all fine. A few things to keep in mind:

- **The directories are part of the ID**: `data/example/saturn/ability/sword/slash.json` has the ID `example:sword/slash`, so **moving a file to another directory changes its ID**. Other definitions, tags and saved data (the ability grant ledger, cooldowns, the ids in wheel cells) all store that ID, so settle the categories before writing content.
- Name keys use `<registry_namespace>.<registry>.<namespace>.<path>`; description keys append `.description`. Slashes in the entry path remain unchanged.
- Tags have their own tree (`tags/<registry_namespace>/<registry>/...`) and need not mirror definition subdirectories; tag values still use the full entry ID, including subdirectories.
- Categories affect entry IDs and readability, not the loading mechanism. The first directory below `data/<namespace>/<registry_namespace>/` is always the registry name; categories go below that.
- Saturn's `resource`, `ability`, `trigger` and `incomplete` live under `data/<namespace>/saturn/<registry>/`. See the index below for other registries.

Data packs load through the native NeoForge writable registry, and the server syncs it to the client after loading. A definition decodes read-only: do not modify the collections you get out of one at runtime.

The rules shared by every definition are on [Datapack Conventions](./conventions.md): how to write a reference, how tags work, where names and descriptions come from, what happens to a field you got wrong, and how to write a number.

## Registry Index {#registry-index}

| Category | Registries |
| --- | --- |
| Resources and cultivation | `resource`, `aura`, `element`, `element_reaction`, `realm_stage`, `spirit_root`, `physique`, `technique`, `progression`, `cultivation` |
| Abilities and rules | `ability`, `curse`, `formation`, `tribulation`, `trigger`, `talisman` |
| Aura and world | `aura_zone`, `secret_realm`, `block_aura` |
| Items and quality | `pill`, `pill_binding`, `technique_binding`, `artifact`, `quality`, `item_aura`, `currency`, `default_quality`, `item_binding`, `weapon_binding` |
| Medicinal properties and heat | `medicinal_property`, `spirit_herb`, `heat_source` |
| Economy and content | `creature_profile`, `contract_type` |

**Five item-keyed registries** (`item_aura`, `currency`, `default_quality`, `item_binding`, `weapon_binding`) use `items`, except `currency`, which uses `item`. `block_aura` and `heat_source` claim blocks through `blocks`. See [JSON Data Formats](./json/index.md) for fields and loading rules.

Workstation process definitions, recipes and bindings are documented under [Alchemy Workstations](../addons/alchemy/index.md), [Forging Workstations](../addons/forging/index.md) and [Talisman Workstations](../addons/talisman/index.md).

## Module Pages {#module-pages}

- [resource: Resources and Resource Bars](../../../library/saturn/data/resource.md)
- [Cultivation, Realms and Spirit Roots](./json/cultivation.md)
- [Aura Environment and Aura Items](./json/aura.md)
- [Ability, Cost and Condition](../../../library/saturn/data/ability.md)
- [Item Bindings, Quality and Economy](./json/item_binding.md)
- [Formations](./json/formation.md)
- [Other Registries](./json/index.md)
- [Datapack Examples](./examples.md)

## Loading and Overriding {#loading-and-overriding}

The core's 34 datapack registries load through the native NeoForge data pack registry system; they are read and validated **while the world loads**, and a read-only snapshot is provided to the client on join through the vanilla synchronisation mechanism. From a file on disk to what the player sees is the path below.

`mxt:heat_source` is provided by the core and works without a workstation addon. Alchemy Workstations adds 2 process registries, and Forging Workstations adds 4; they exist only when the corresponding addon is installed. Drawing and alchemy recipes use the vanilla recipe system. Saturn provides its own shared registries.

```mermaid
flowchart TD
    A["Datapack definition files<br/>one JSON file per entry"] --> B["Datapack registries<br/>native NeoForge data pack registries"]
    B --> C["Read and validated at world load<br/>JSON / references / field validation"]
    C --> D["Decoding fails: the world cannot load<br/>fix that file before entering again"]
    C --> E["neoforge:conditions<br/>an entry whose condition fails never enters the registry"]
    E --> F["Vanilla synchronisation<br/>a read-only snapshot on join"]
    E --> G["Server-side settlement<br/>the results of deduction, breakthrough, forging, exchange"]
    F --> H["Client HUD, fog and textures<br/>display only, never the result"]
    G --> I["What the player sees<br/>state and interface changes"]
    H --> I
    C -.-> J["/reload does not re-read the registries<br/>load the world again after an edit"]
```

- File conflicts follow Minecraft data pack priority: a higher priority data pack overrides the same path from a lower priority data pack.
- When a vanilla tag uses `replace: false`, values are appended in data pack merge order; apart from quality ordering tags, gameplay does not depend on tag value order.

Where a name and description come from, how `neoforge:conditions` works and what a mistyped field does are on [Datapack Conventions](./conventions.md).

One operational way to put the rule: **an old and a new definition of the same id never coexist**. The copy in the higher priority pack replaces the copy in the lower priority pack outright, without merging fields.

## Loading, Syncing and Debugging {#loading-syncing-and-debugging}

- These registries are vanilla data pack registries and are **read while the world loads**: JSON parsing, entry resolution and field validation all happen during world load, and `neoforge:conditions` is decided at that point too, so an entry whose condition fails is not even decoded. `/reload` does not re-read them — it only refreshes vanilla reload listeners such as recipes, loot tables, advancements and functions, plus the KubeJS server scripts. An edit needs the world loaded again (in single player, leave to the title screen and enter again, or restart the server).
- The dynamic registries are sent by the vanilla synchronisation mechanism when the client joins; the client HUD, fog and textures only display, and never decide the result of deduction, breakthrough, forging or exchange.
- `/mxt aura query` queries the final aura at the current position; `/mxt aura vein` queries spirit stone vein information.
- `/mxt registries list` lists these dynamic registries and their entry counts; `/mxt registries validate` reports every problem the last build found, naming the file each one comes from (the reference chains of cultivation, abilities and techniques, and any trigger rule that forgot its action) — with no problems it reports the number of registries, the total entry count and that validation passed. Run it once after the world has loaded to confirm that the registry state the data pack produced is usable.
- `/mxt technique repair` cleans up **stale technique references** in player data (for when a referenced definition was deleted by the data pack or blocked by `neoforge:conditions`); `dry-run` only reports and changes nothing; `/mxt technique drop <id>` removes one technique precisely. See the next section.
- `/picker [<category id>]` opens the item picker to look straight at the items or blocks these definitions claim: a category is a registry id (`/picker mxt:aura`, `/picker mxt:artifact`, `/picker mxt:currency`, `/picker mxt:item_binding`, `/picker mxt:block_aura`), and with none written it lists every registered category. An item-keyed registry lists the items it claims, while `mxt:block_aura` and `mxt:heat_source` list the blocks they claim. The command comes from the bundled Picker mod; it needs gamemaster permission and only works in creative mode.
- The test mod data lives in `src/test-mod/resources/data/mxt_test/mxt`; start the test server to verify the whole data pack loop.

### Repairing Stale Technique References {#repairing-stale-technique-references}

A technique a player has learned lives in player data as a **reference**. After a data pack **deletes** a `technique`, or blocks it from the registry with `neoforge:conditions`, that saved reference points at a definition that no longer exists.

**This does not destroy data.** The technique list in player data decodes element by element, **skipping the entries that fail to decode and keeping the rest**, and logs one WARN line:

```
[WARN]: Ignoring invalid list element: Failed to get element <namespace>:<path>
```

In other words, **a stale reference only loses itself**: other techniques and other fields load normally. Seeing that WARN proves stale references do exist; **not seeing it means there are none**, so the problem is elsewhere and the repair command is not the way to "cure" it.

| Command | Effect |
| --- | --- |
| `/mxt technique repair dry-run` | Reports how many stale references there are and **changes no data at all** |
| `/mxt technique repair` | Cleans up stale references and duplicates, then rebuilds the attributes, abilities and levels they came with |
| `/mxt technique drop <id>` | Removes one technique by id, precisely (including one that is still valid) |

The cleanup also takes back the attributes, abilities and resource maxima that a stale technique used to grant — otherwise a player would keep the bonuses of a technique they no longer carry.

:::warning
The repair commands only handle **stale references** (pointing at a definition that no longer exists) and **duplicate entries**. A blank technique screen or a technique manual that does nothing is **not** this section's problem unless it comes with an `Ignoring invalid list element` warning, and needs to be tracked down elsewhere.
:::

:::warning
Definition decoding is the only loading contract. The defaults, field ranges and examples in this page follow the current source; a field a data pack writes that is not listed here does not come into effect by itself, and an unknown `type` fails the load.
:::
