---
title: 配置文件
description: 通过 config json 进行配置
sidebar_position: 2
---

# 配置文件

**注意：此配置会覆盖数据包中的设置！**

打开文件 `.minecraft/config/tameable.json`。如果该文件不存在，请自行创建。

你可以在游戏内使用 `/reload` 重新加载修改后的配置。

配置说明：

```json5
{
  "entity type here": {
    //An object in datapack format, see it above
  }
  //... more
}
```

示例：

使用以下配置，你可以用苹果驯服掠夺者，并用苹果和石头繁殖它们：

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
