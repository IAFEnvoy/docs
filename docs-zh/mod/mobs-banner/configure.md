---
title: 旗帜配置
description: 旗帜配置
sidebar_position: 3
---

# 旗帜配置

有时生物可能朝向错误、比例不合适，或者变体一直在变化。你需要进行一些配置。这些配置由客户端资源包系统提供支持。

首先，创建文件 `assets/<entity mod id>/default_banner/<entity id>.json`，然后写入以下内容：

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
