---
title: Evaluate
description: Define relative item values with datapacks and infer acquisition costs from recipes, FTB Quests, and custom evaluators.
sidebar_position: 0
---

![Evaluate logo](./assets/logo.webp)

Evaluate (mod ID: `evaluate`) calculates **relative values per item** for modpacks and other mods. Define fixed base values in a datapack, then let recipes and optional FTB Quests exchanges supply values for other items. KubeJS and Java extensions can contribute to the same calculation graph.

These numbers describe configured acquisition costs. Evaluate does not add a currency, shop, or item exchange screen. Built-in default values are adapted from ProjectE; ProjectE is not required, and Evaluate uses its own data format.

## Versions and installation

| Component | Version covered here |
| --- | --- |
| Evaluate | `1.0-beta.1` |
| Minecraft | `26.1.2` |
| NeoForge | Developed and verified with `26.1.2.126` |
| Java | `25` |
| Required dependency | [Saturn](../../library/saturn/index.md) `1.3.1+` |
| Optional integration | KubeJS `26.1.2-8.0.8+`, with Rhino and Better Advanced Tooltips |
| Optional integration | FTB Quests `26.1.2.8+`, with its dependencies |

Install Evaluate and Saturn in the server's `mods/` directory. To display item values in tooltips, also install them on the client. Value calculations run on the server, including in singleplayer.

Saturn supplies item matching. Its general matcher types are documented in [Item matcher](../../library/saturn/types/item-matcher.md); these pages cover Evaluate's value definitions and behavior.

## First value definition

In a datapack for this Minecraft version, add this file:

```json title="data/example/evaluate/evaluator/diamond.json"
{
  "type": "evaluate:constant",
  "item": "minecraft:diamond",
  "value": 10000.5,
  "priority": 10
}
```

The file creates evaluator `example:diamond`. Run `/reload` after installing or editing the pack. Press **F3+H** to enable vanilla advanced tooltips, then hover over a diamond to query its server-calculated value. The first hover may need a moment for the response.

This is a fixed base value: recipes that consume diamonds use `10000.5`. To change only the final displayed or queried number, use a [final override](./datapack.md#final-overrides) instead.

## Read next

| Goal | Page |
| --- | --- |
| Set base values and final overrides | [Datapacks](./datapack.md) |
| Configure recipe costs and understand cycles | [Value inference](./calculation.md) |
| Read values in tooltips and manage reloads | [Runtime and reloads](./runtime.md) |
| Set values or write evaluators in scripts | [KubeJS](./kubejs.md) |
| Infer fixed rewards from item-consuming quests | [FTB Quests](./ftb-quests.md) |
| Query values or add an evaluator type in Java | [Java API](./java.md) |
