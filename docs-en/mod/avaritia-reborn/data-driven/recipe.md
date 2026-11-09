---
title: Extreme Recipe
---

# Extreme Recipe

This page will teach you how to create a extreme shaped recipe.

## How to do

Create file `data/YOUR_ID/recipes/example.json` and write content below:

*Example: Compressor*

```json
{
  "type": "avaritia:extreme_shaped",
  "result": {
    "item": "avaritia:compressor"
  },
  "pattern": [
    "IIIHHHIII",
    "X N   N X",
    "I N   N I",
    "X N   N X",
    "RNN O NNR",
    "X N   N X",
    "I N   N I",
    "X N   N X",
    "IIIXIXIII"
  ],
  "key": {
    "N": {
      "item": "avaritia:neutronium_ingot"
    },
    "H": {
      "item": "minecraft:hopper"
    },
    "I": {
      "item": "minecraft:iron_block"
    },
    "O": {
      "item": "avaritia:neutronium_block"
    },
    "X": {
      "item": "avaritia:crystal_matrix_ingot"
    },
    "R": {
      "item": "minecraft:redstone_block"
    }
  }
}
```

**This format is similar to the `crafting_shaped` recipe.**