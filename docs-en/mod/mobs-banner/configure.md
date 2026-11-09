---
title: Banner Configuration
description: Banner Configuration
sidebar_position: 3
---

# Banner Configuration

Sometimes the mobs may have a wrong rotation, unfit scale or just always changing variants. You need to make some
configurations. These configurations are powered by client resource pack system.

Firstly, create file `assets/<entity mod id>/default_banner/<entity id>.json`. Then write the contents below:

```json5
{
  //All keys are optional
  "data": [
    //IMPORTANT: These are only for creative tab! If you change things here they will only refresh after relaunch game!
    //Leave empty for default one.
    {},
    {
      //Leave blank for default spawn egg color
      "primary": -1,
      //Leave blank for default spawn egg color
      "secondary": -1,
      "nbt": {
        //Default NBT, will directly send to entity
      },
      "transform": {
        "scale": 1,
        //Y rotation
        "yaw": 0
      }
    }
    //You can add more for variants
  ],
  //Global transform
  "transform": {
    "scale": 1,
    "yaw": 0
  }
}
```