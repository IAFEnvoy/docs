---
title: Tutorials
description: "Step-by-step walkthroughs that build a small MiXianTu content pack: aura and realms, element reactions, the aura environment, items and bindings, abilities and sword auras, costs and quality, formations, secret realms, talismans, tribulations, contracts and currency."
---

# Tutorials

<span id="tutorials" />

The reference pages on this site describe one file, one field or one API at a time. The content tutorials start from an empty data pack and end with something you can watch in game, so you can see how the tables fit together before you look up every field.

Start with [Development Mode](./dev-mode.md) to prepare an environment for reproducing problems and learn the module profiler GUI. The content tutorials then begin building the example pack.

## The Example Pack {#the-example-pack}

Every tutorial extends the same small content pack in the `example` namespace. The first few form one chain, each assuming the pages it depends on are done (the dual cultivation page hangs off the second one and only uses definitions the pack already has); the rest stand on their own and only use definitions the pack already has. The tables that claim items or blocks sit in this pack like every other definition, and their entry ids are `example:<path>`. By the end of the series it looks like this:

```text
data/example/
├── saturn/
│   ├── resource/qi.json                     The stored value
│   ├── resource/azure_mastery.json          Mastery of a technique, a plain value
│   ├── ability/qi_bolt.json                 An active ability
│   ├── ability/qi_recovery.json             A triggered ability
│   ├── ability/spark.json                   An ability a talisman inscribes
│   ├── ability/sword_aura.json              The ability that launches a sword aura
│   ├── ability/blade_storage.json           A storage ability: slots and cooldown
│   ├── ability/azure_sword_mount.json       The vehicle: speed, seats, fuel, looks
│   ├── ability/azure_sword_flight.json      The flying skill: which hand, and its own price
│   ├── trigger/azure_mastery_from_kill.json  A kill raises mastery
│   └── trigger/azure_mastery_signal.json    A signal of your own raises it too
├── mxt/
│   ├── element/common.json                  Element named by the qi aura
│   ├── element/fire.json                    Element for the fire spirit root
│   ├── element/water.json                   The second element a reaction needs
│   ├── element_reaction/steam_burst.json     What happens once both attachments add up
│   ├── aura/qi.json                         The aura the value carries, and its realm chain entry
│   ├── realm_stage/qi_condensation.json     Realm chain
│   ├── realm_stage/foundation.json
│   ├── realm_stage/core_formation.json
│   ├── cultivation/meditation.json     What the player does to absorb aura
│   ├── cultivation/dual_meditation.json  Only yields beside a friend holding a manual
│   ├── aura_zone/common_land.json           Where the aura is
│   ├── aura_zone/misty_valley.json          A denser zone (aura environment tutorial)
│   ├── spirit_root/fire_root.json           Granted by a pill
│   ├── spirit_root/fire_common_root.json    Two elements with shares (spirit root tutorial)
│   ├── physique/sword_bone.json             Attributes, exclusion tags, damage multipliers
│   ├── progression/azure_breath_1.json      The technique's mastery chain
│   ├── progression/azure_breath_2.json
│   ├── progression/azure_breath_3.json
│   ├── technique/azure_breath.json
│   ├── artifact/blade_sheath.json           Claims an item and hangs the storage ability on it
│   ├── artifact/azure_sword.json            Claims the sword and declares the vehicle on it
│   ├── curse/qi_backlash.json               A timed curse: on_apply, per-tick, stacking
│   ├── talisman/flame_sigil.json            The talisman: abilities + capacity + costs
│   ├── formation/spirit_gathering_array.json Structure, upkeep, buff module
│   ├── formation/ward_array.json            Protection + attack modules
│   ├── secret_realm/trial_realm.json      A pocket world template
│   ├── tribulation/heavenly_gate.json       The trial a breakthrough starts
│   ├── quality/common.json             Quality tiers: chain identity, next tier, step cost
│   ├── quality/refined.json
│   ├── quality/flawless.json
│   ├── medicinal_property/nourish.json      The properties the pills are built from
│   ├── medicinal_property/calm.json
│   ├── spirit_herb/herb_a.json              Main herb, auxiliary herb and catalyst
│   ├── spirit_herb/herb_c.json
│   ├── spirit_herb/herb_d.json
│   ├── heat_source/magma_block.json         What a heating block supplies
│   ├── pill/qi_pill.json                   What the pill does: dose action, toxicity, overdose
│   ├── pill_binding/qi_pill.json            Which items are that pill, and their cap and cooldown
│   ├── pill/warming_pill.json               A second pill
│   ├── pill_binding/warming_pill.json
│   ├── technique_binding/azure_manual.json
│   ├── contract_type/spirit_familiar.json   Conditions, costs and caps for one beast
│   ├── creature_profile/spirit_beast.json   The beast's own mastery chain
│   ├── currency/spirit_coin.json            An item that is money, and what it exchanges for
│   ├── item_aura/spirit_stone.json          Items that act as cultivation fuel
│   ├── item_binding/qi_pill.json            Rules attached to real items
│   ├── item_binding/root_pellet.json
│   ├── weapon_binding/spirit_sword.json     Weapon attributes and the three combat hooks
│   └── block_aura/spirit_stone_ore.json     Blocks that emit aura
├── tags/entity_type/contract/spirit_familiar.json  Narrows which entities it accepts
└── (kubejs/startup_scripts/mxt_items.js)    The items themselves, registered by KubeJS
    (kubejs/server_scripts/mxt_costs.js)     A cost only a script can answer
    (kubejs/server_scripts/mxt_signals.js)   Publishing a trigger signal of your own
```

## The Tutorials {#the-tutorials}

| Tutorial | Topics |
| --- | --- |
| [Development Mode](./dev-mode.md) | Debugging, recording and module timings over the last 240 ticks. |
| [Define Aura and Realms](./define-aura-and-realms.md) | Elements, aura resources, realm chains, cultivation and aura zones. |
| [Write a Dual Cultivation Method](./dual-cultivation.md) | Nearby-entity conditions, participant requirements and interruption rules. |
| [Define an Element Reaction](./define-an-element-reaction.md) | Damage-type associations, element attachment and reaction triggers. |
| [Define the Aura Environment](./aura-environment.md) | Aura zones, block contributions, fuel, noise, fluctuation, fog and HUD. |
| [Define Spirit Roots and Physiques](./define-spirit-roots-and-physiques.md) | Spirit-root element shares, physique requirements and held versus active states. |
| [Create Items and Bind Actions with KubeJS](./create-items-with-kubejs.md) | Item registration, four binding categories and recipes. |
| [Bind Actions with KubeJS](./bind-actions.md) | Execution timing, conditions, restrictions and ordering of binding hooks. |
| [Publish a Trigger Signal](./publish-a-trigger-signal.md) | Custom signal publication and subscriptions from data packs or scripts. |
| [Define a Quality Chain](./define-a-quality-chain.md) | A three-tier quality chain, chain names, item quality and upgrade costs. |
| [Write a Cost](./write-a-cost.md) | Cost types, shorthand syntax, payment order and failure handling. |
| [Define an Ability](./add-an-ability.md) | Active abilities, triggered abilities and grant sources. |
| [Launch a Sword Aura](./launch-a-sword-aura.md) | Sword-aura spawning, colour, size, lifetime and collision actions. |
| [Define a Technique and Its Levels](./define-a-technique.md) | Technique progression, mastery sources and advancement requirements. |
| [Define a Formation](./define-a-formation.md) | Structure activation, upkeep costs, modules and formation plates. |
| [Define a Secret Realm](./open-a-realm.md) | Realm instances, generation, borders, landing points, claiming and lifetime. |
| [Define a Talisman](./inscribe-a-talisman.md) | Talisman inscription, charging, activation and display-stand use. |
| [Define a Tribulation](./bring-down-a-tribulation.md) | Tribulation timelines, beats, lightning and outcome actions. |
| [Define a Curse](./define-a-curse.md) | Timer and signal triggers, stacking and removal. |
| [Contract a Beast](./contract-a-beast.md) | Contract requirements, costs, capacity, commands, recall and beast bags. |
| [Define a Currency](./define-a-currency.md) | Currency values, validity conditions, exchange entries and stations. |
| [Storage and Spirit Vessels](./storage-and-spirit-vessels.md) | Spirit vessels and links to storage and flying-mount tutorials. |
| [Storage](./storage.md) | Storage abilities, slot counts, persistence and initial contents. |
| [Flying Mounts](./flying-mount.md) | Mount definitions, flight control, take-off, landing and aura payment. |
| [Rifts](./rifts.md) | Rift creation, destination dimensions, colour, links and landing points. |

:::warning Workstation tutorials require addons

Workstation tutorials live under [Alchemy Workstations](../addons/alchemy/tutorial/refine-a-pill.md), [Forging Workstations](../addons/forging/tutorial/forge-a-treasure.md) and [Talisman Workstations](../addons/talisman/tutorial/author-a-talisman-drawing.md), and require their respective addons.

:::

## Conventions {#conventions}

- **Namespace.** All examples use `example`. Rename it to your own modpack or content pack id, and keep the ids of the files and the references between them in sync.
- **File locations.** Data pack files go under `data/<namespace>/mxt/<registry>/<path>.json`; tags go under `data/<namespace>/tags/...`. One file is one definition, the entry id is `<namespace>:<path>`, and there is no `values` wrapper at the top level. The nine tables that claim items or blocks work the same way: `item_aura`, `currency`, `default_quality`, `item_binding`, `weapon_binding`, `tool_binding` and `blueprint_binding` claim items (`currency` through `item`, the rest through `items`), while `block_aura` and `heat_source` claim blocks through `blocks`, so a content pack in the `example` namespace puts their files at `data/example/mxt/<table>/<name>.json`. Once there is a lot of content, sort the files into subdirectories by category (the directories are part of the ID) — the [Datapack Overview](../datapack/overview.md) spells it out. The full list is in [JSON Data Formats](../datapack/json/index.md).
- **Applying changes.** MiXianTu's 43 data pack registries are read by Minecraft **while the world loads**, so `/reload` does not re-read them. After editing a data pack file, leave to the title screen and open the world again (or restart the server). `/reload` only refreshes recipes, loot tables, advancements, functions and the KubeJS server scripts. Registering new items or blocks with KubeJS also needs a game restart.
- **Broken files block the world.** There is no previous snapshot to fall back on: if a definition fails to decode, the world will not load until the file is fixed. The log names the file and the codec error, so keep the last working copy of a file you are editing.
- **Verifying.** `/mxt registries validate` reports the registry count, the total entry count and whether validation passed, and `/mxt registries list` prints each registry id with its entry count — the nine tables that claim items or blocks are in there too. The other commands are listed in [Commands](../player-guide/commands.md).
- **Version.** These pages follow the current development version; refer to the installed Jar for its version. The data pack format is not yet frozen, and field changes are reflected in the reference documentation.

## Where to Go Next {#where-to-go-next}

- [Datapack Overview](../datapack/overview.md) — file locations, IDs, holder references, load-time conditions and error reporting, if you have not read it yet.
- [Datapack Examples](../datapack/examples.md) — the same shapes as short, isolated snippets.
- [KubeJS API Reference](../kubejs/api-reference.md) — the script objects used in the two item tutorials.
