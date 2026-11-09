---
title: "Installation and Basic Conventions"
sidebar_position: 1
---

Install the NeoForge and Saturn JARs that match Minecraft 26.1.2. Gameplay mods that depend on Saturn usually need to be installed on both the client and the server. Saturn bundles the exp4j formula library in its JAR, so you do not need to install it separately; KubeJS is optional.

## Definition files and type objects

Saturn has two kinds of registries:

| Kind | How to extend | Example |
| --- | --- | --- |
| Data pack registry | Place a JSON file; the file path determines the entry ID | `data/example/saturn/resource/mana.json` defines `example:mana` |
| Java type registry | A mod registers a MapCodec; JSON selects it with `type` | `{"type":"saturn:heal","amount":4}` is an action value |

You cannot add a new action implementation by creating `data/example/saturn/entity_action_type/heal.json`. Actions, conditions, costs, getters and similar objects are embedded in their host fields; see [Data definitions](./data/index.md) for the directories that do define standalone entries.

`example:mana` uses the namespace `example` and the path `mana`; a nested path can be written as `example:magic/mana`. Resource IDs use lowercase letters, digits and the path characters that vanilla allows.

## Data packs and resource packs

Put data definitions in the world data pack, and put icons, GUI textures and translations in the client resource pack. An example language file path is `assets/example/lang/zh_cn.json`. Vanilla dynamic registry entries are built when the world loads, so after changing resources, abilities, rules, information rows or groups you need to reopen the world or restart the server; do not treat `/reload` as a hot reload for arbitrary dynamic registries.

The JSON on type pages shows example field values. If you reference IDs such as `example:mana` or `example:heal`, you must create the corresponding definitions first. The JSON format of entity conditions differs from that of vanilla advancement predicates, so fill in the fields according to the field tables.
