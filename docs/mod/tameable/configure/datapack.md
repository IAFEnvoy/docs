---
title: Data Driven Configuration
description: Configure through datapack/mod
sidebar_position: 1
---

# Data Driven Configuration

## Before Configure

### Datapack

You need to prepare for a datapack template. You can get the totural [here](https://minecraft.wiki/w/Data_pack). After your creation, the folder structure will be like this:

```
<Datapack Name>
|-pack.mcmeta
|-pack.png   <-Optional
|-data       <-This is a folder
```

### Mod

Put files in `src/main/resources/data` folder.

## Configure File Format

Create file `data/<entity mod id>/tameable/<entity id>.json` in your datapack or mod. Then write contents below:

```json5
{
  "tame": [
    //Which item you can use to tame
    "a single item",
    "#or a tag"
  ],
  "breed": [
    //Which item you can use to breed. If you leave blank, it will use tame item.
    //Breed amount: value set -> food component -> 1
    "a single item",
    "#or a tag",
    {
      //or an object
      "item": "item or tag",
      "heal": 1
    }
  ],
  //The taming chance
  "chance": 0.1,
  //should attack what player is attacking
  "attack": true,
  //should attack what is attacking player
  "protect": true,
  "follow": {
    //should follow player
    "enable": true,
    //follow speed
    "speed": 1,
    //The max range to stop follow
    "minDistance": 10,
    //The min range to start follow
    "maxDistance": 2,
    //Can leave
    "leavesAllowed": false
  }
}
```

### Default Values

```json5
 {
  "tame": [
    //This is the only required field
  ],
  "breed": [
    //Optional, will use tame item if this field not exist or blank
    "item or tag",
    {
      //or an object
      "item": "item or tag",
      "heal": 1
    }
  ],
  //The taming chance
  "chance": 1,
  "attack": false,
  "protect": false,
  "follow": {
    //These value except "enable" is the default value of a wolf
    "enable": false,
    "speed": 1,
    "minDistance": 10,
    "maxDistance": 2,
    "leavesAllowed": false
  }
}
```

## Example

Write contents into `data/minecraft/tameable/pillager.json`, you can tame pillagers with apples and breed with
apples&stones

```json5
{
  "tame": [
    "minecraft:apple"
  ],
  "breed": [
    "minecraft:apple",
    {
      "item": "minecraft:stone",
      "heal": 5
    }
  ],
  "chance": 0.1,
  "attack": true,
  "protect": true,
  "follow": {
    "enable": true
  }
}
```