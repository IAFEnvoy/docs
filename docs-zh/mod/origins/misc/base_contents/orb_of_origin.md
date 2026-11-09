---
sidebar_position: 2
---

# 起源之球

一个在“使用”（右键点击）时可以改变玩家起源的物品。

默认情况下，起源之球物品没有合成配方，并且允许你为每个可用的起源层选择一个起源。你可以分别为该物品创建配方（JSON 文件），以及为该物品设置自定义 NBT，来改变这两项行为。

**物品 ID：** `origins:orb_of_origin`

### 创建自定义配方

你可以使用[这个网站](https://misode.github.io/recipe/)轻松创建配方。

### 针对特定起源（及起源层）的起源之球

:::warning
目前仅支持起源层设置。
:::

你可以为物品添加 `origins:orb_layers` 组件，这样使用起源之球时只能更换指定的起源层。

示例：
```mcfunction
give @s origins:orb_of_origin[origins:orb_layers=["origins:origin"]]
```
