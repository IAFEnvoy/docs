---
title: "FAQ"
description: "Short answers to the most common questions about installing MiXianTu, its dependencies, disabling content and content packs."
sidebar_position: 3
---

# FAQ

## Why Does Nothing Change in Game After Installing the Mod?

The mod only provides the framework, generic items, slots, HUD and commands; it contains no realm values, abilities or recipes. You need a datapack or content pack (including content written with KubeJS) before real gameplay appears. Start with the [Datapack overview](./datapack/overview.md) and look up individual tables in [JSON Data Formats](./datapack/json/index.md).

## What Dependencies Are Required?

Jupiter is a required dependency, and every other required dependency is bundled inside the mod. KubeJS is only needed if you want to register content from scripts. JEI and Jade are optional compatibility mods, and the game works fine without them. See [Installation](./installation.md) for the exact versions.

## How Do I Disable a Piece of Content Temporarily?

Add the entry to the `mxt:disabled` tag; disabled definitions stop taking part in gameplay, and you do not have to delete any datapack files.

Every dynamic registry has its own disabled tag at a fixed path:

```text
data/mxt/tags/mxt/<registry>/disabled.json
```

```json
{
  "replace": false,
  "values": [
    "example:old_definition",
    "othermod:disabled_definition"
  ]
}
```

Replace `<registry>` with the registry name, for example `data/mxt/tags/mxt/item_binding/disabled.json`. Entries in `disabled` are not actively used by the corresponding service, but they stay in the registry, so other definitions can safely keep a Holder to them. The project is still unreleased, so old JSON and old saves are not guaranteed to stay compatible. See the [Datapack overview](./datapack/overview.md) for the rest of the loading and reload rules.

## Can I Make My Own Content Pack and Distribute It?

You can build content packs on this framework, and distributing them is not restricted in any way.

:::warning License

The mod's code and assets are **All Rights Reserved**, and commercial distribution (such as a paid server) requires extra permission — see LICENSE for details.

:::

## Where Can I Edit Datapacks Without Writing JSON by Hand?

The [Datapack Visual Editor](https://datapack.mcdev.tech/) edits this mod's datapacks in the browser as a form, with field descriptions and registry completion.

## Where Can I Ask Questions?

Join our [Discord](https://discord.gg/NDzz2upqAk) to discuss.
