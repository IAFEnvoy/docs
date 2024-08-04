---
title: Singularity
---

# Singularity

This page will teach you how to create a singularity.

## Declaration

Create file `data/YOUR_ID/avaritia/singularity/example.json` and write content below:

```json
{
  "id": "example",
  "cost": 400
}
```

The `id` field will be used as the unique id for this singularity and be saved into item nbt.

The `cost` field will be used for the material count used in the compressor.

Launch game, you will see the singularity shown in the Avaritia creative item tab. (`/reload` will not add to tab automatically.) But it only has the default texture and no recipe provided.

## Texture

Create file `assets/YOUR_ID/avaritia/singularity/example.json` and write content below:

```json
{
  "id": "example",
  "color": {
    "r": 127,
    "g": 127,
    "b": 127,
    "a": 255
  }
}
```

The `id` must match the `id` field in the previous file.

The `color` contains 4 field in `0-255`. Also `a`, which means `alpha`, is not recommended to use.

Reload your game (`Ctrl+T`) and you will see the texture changed.

## Recipe

Create file `data/YOUR_ID/avaritia/singularity_recipes/example.json` and write content below:

```json
{
  "result": "example",
  "ingredients": [
    {
      "ingredient": {
        "item":"minecraft:amethyst_shard"
      },
      "amount": 1
    },
    {
      "ingredient": {
        "item":"minecraft:amethyst_block"
      },
      "amount": 9
    }
  ],
  "dependency": [
  ]
}
```

The `result` must match the `id` field in the previous file.

The `ingredient` field has the same format with `item` in recipe format. (Allow `item` and `tag`)

The `amount` field is the number added to progress when the item put into compressor.

The `dependency` field is used for compat:

- If leave blank, this will be loaded directly.

- If have contents, this will detect installed mods. If one of them loaded, this recipe will be loaded.

Everything done! Open your game and you can see the singularity will have recipe and automatically add into Infinity Catalyst recipe.