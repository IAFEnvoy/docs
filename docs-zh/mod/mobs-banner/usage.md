---
title: 使用方法
description: 如何在游戏内使用
sidebar_position: 2
---

# 游戏内使用

## 生存模式获取

- **生物掉落**：生物被击杀时有概率掉落旗帜（包括玩家）。该概率可通过
  `/gamerule mobs_banner:drop_chance` 设置。此外，这类旗帜会保留生物的 NBT。

## 创造模式获取

- **创造模式物品栏**：有一个物品栏标签页包含所有可用的旗帜。
- **命令**：生物旗帜使用 `/mob_banner <players> <entity type>`。
  玩家旗帜使用 `/mob_banner <players> player <base item> <name> <uuid>`。
