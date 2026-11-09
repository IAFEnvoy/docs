---
title: 奇点
---

# 奇点

本页将教你如何创建奇点。

## 声明

创建文件 `data/YOUR_ID/avaritia/singularity/example.json`，并写入以下内容：

```json
{
  "id": "example",
  "cost": 400
}
```

`id` 字段将作为该奇点的唯一 ID，并会保存到物品的 nbt 中。

`cost` 字段用于指定压缩机中消耗的材料数量。

启动游戏后，你会在 Avaritia 的创造模式物品栏中看到该奇点。（`/reload` 不会自动将其加入物品栏。）但它只有默认纹理，也没有提供配方。

## 纹理

创建文件 `assets/YOUR_ID/avaritia/singularity/example.json`，并写入以下内容：

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

`id` 必须与上一个文件中的 `id` 字段一致。

`color` 包含 4 个处于 `0-255` 范围的字段。其中 `a` 表示 `alpha`（透明度），不建议使用。

重新加载游戏（`Ctrl+T`），你就会看到纹理已经改变。

## 配方

创建文件 `data/YOUR_ID/avaritia/singularity_recipes/example.json`，并写入以下内容：

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

`result` 必须与上一个文件中的 `id` 字段一致。

`ingredient` 字段的格式与配方格式中的 `item` 相同。（允许使用 `item` 和 `tag`）

`amount` 字段表示物品放入压缩机后为进度增加的数量。

`dependency` 字段用于兼容：

- 如果留空，该配方会直接加载。

- 如果填写了内容，则会检测已安装的模组。只要其中任意一个已加载，该配方就会被加载。

全部完成！打开游戏，你会看到该奇点拥有配方，并会自动加入 Infinity Catalyst 的配方。
