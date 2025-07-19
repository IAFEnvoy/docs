---
title: Config File Configuration
description: Configure through config json
sidebar_position: 2
---

# Config File Configuration

**NOTE: This will overwrite settings in datapack(s)!**

Open file `.minecraft/config/tameable.json`. If this file not exists, create it.

You can use `/reload` in game to reload your edited config.

Config explanation:

```json5
{
  "entity type here": {
    //An object in datapack format, see it above
  }
  //... more
}
```

Example:

With config following, you can tame pillagers with apples and breed with apples&stones

```json5
{
  "minecraft:pillager": {
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
}
```