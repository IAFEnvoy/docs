---
sidebar_position: 1
---

# Creating a Custom Origin

This guide walks through creating a brand-new origin for your data pack.

## Prerequisites

You should have a working data pack. If you're new to data packs, read the [Minecraft Wiki tutorial](https://minecraft.wiki/w/Tutorials/Creating_a_data_pack) first.

## Step 1: Define the Origin File

Create a JSON file at `data/<namespace>/origins/origin/<id>.json`. For this tutorial we'll use `example:supermorph`, so the file goes at:

```
data/example/origins/origin/supermorph.json
```

Here is a minimal origin that reuses vanilla powers:

```json title='data/example/origins/origin/supermorph.json'
{
  "powers": [
    "#example:supermorph"
  ],
  "icon": {
    "id": "minecraft:slime_ball"
  },
  "order": 4,
  "impact": 1
}
```

```json title='data/example/tags/origins/power/supermorph.json'
{
  "replace": false,
  "values": [
    "origins:fire_immunity",
    "origins:elytra",
    "origins:throw_ender_pearl",
    "origins:fresh_air"
  ]
}
```

The `powers` List can contain both power IDs and tags. In this case, we define a tag `example:supermorph` that includes several existing powers to create a flying, fire-immune origin.

:::tip
Using tags are recommeneded for better capability and extensibility. 

If you directly list powers in the origin file, other data packs won't be able to add or remove powers from your origin without replacing the whole file. With tags, they can simply add or remove powers from the tag without needing to replace your origin file.
:::

<details>
<summary>Field reference</summary>

| Field | Type | Default | Purpose |
|-------|------|---------|---------|
| `powers` | Identifier / tag List | `[]` | Powers granted to this origin |
| `icon` | Item Stack | optional | Icon shown in the origin selection screen |
| `unchoosable` | Boolean | `false` | Hide from the GUI (still assignable via command) |
| `order` | Integer | large | Position in the selection screen |
| `impact` | Integer | `0` | Difficulty indicator: `0` = none, `1` = low, `2` = medium, `3` = high |
| `upgrades` | List of Upgrade | `[]` | Advancement-triggered origin transformations |

</details>

## Step 2: Add Translations

Names and descriptions are defined in **language files**. Create a resource pack (or place these in your data pack's `assets/` if supported):

```json
// assets/origins/lang/en_us.json
{
  "origin.origins.supermorph.name": "Supermorph",
  "origin.origins.supermorph.description": "A flying, fire-immune creature that needs fresh air."
}
```

The pattern is `origin.<namespace>.<path>.name` / `.description`.

If you prefer to set the name in the origin file itself, you can use the optional `name` and `description` fields (as Text Components), but translation keys are the recommended approach.

## Step 3: Add the Origin to a Layer

Origins don't appear in-game until they're listed in a **Layer**. The default layer is `origins:origin`. To add your origin to it, create:

```json title='data/origins/tags/origins/origin/origin.json'
{
  "replace": false,
  "values": [
    "example:supermorph"
  ]
}
```

To create a **separate** layer that lets players pick a second origin:

```json title='data/example/origins/layer/second_origin.json'
{
  "order": 1,
  "origins": [
    "example:supermorph",
    "origins:human"
  ],
  "gui_title": {
    "choose_origin": "Choose your Second Origin"
  }
}
```

:::note
The old `replace` field from the Fabric version no longer exists. To override an existing layer, create a file with the **same ID** in your data pack: it will replace the original automatically.

If you don't want to replace the whole file, just use tags. That's the reason why we use tags instead of listing all origins directly in the layer file: it allows other data packs to add their own origins without needing to replace the whole file.
:::

## Step 4: Test

Load the data pack into a world and check the origin selection screen. If the origin doesn't appear:

1. Run `/datapack list` to confirm the pack is loaded.
2. Check the game log for JSON parsing errors.
3. Make sure your origin file is in `origins/origin/`, not `origins/`.

:::warning
You cannot use `/reload` to reload your datapack after making changes since Origins (NeoForge) use vanilla data loading mechanisms, which do not support hot-reloading of data files. You must leave and rejoin the world to see changes.

If you are testing some functions which need frequently reload and know some JavaScript, you can use [Origins JS](../../js) to define your origins in JavaScript instead of JSON. This allows you to reload your datapack with `/reload` and see changes immediately.
:::
