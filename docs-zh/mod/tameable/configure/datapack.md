---
title: 数据驱动配置
description: 通过数据包/模组进行配置
sidebar_position: 1
---

# 数据驱动配置

## 配置之前

### 数据包

你需要先准备一个数据包模板，教程见[此处](https://minecraft.wiki/w/Data_pack)。创建完成后，文件夹结构如下：

```
<Datapack Name>
|-pack.mcmeta
|-pack.png   <-Optional
|-data       <-This is a folder
```

### 模组

将文件放入 `src/main/resources/data` 文件夹。

## 配置文件格式

在你的数据包或模组中创建文件 `data/<entity mod id>/tameable/<entity id>.json`，然后写入以下内容：

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

### 默认值

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

## 示例

将以下内容写入 `data/minecraft/tameable/pillager.json`，你就可以用苹果驯服掠夺者，并用苹果和石头繁殖它们：

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
