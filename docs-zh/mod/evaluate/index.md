---
title: Evaluate
description: 通过数据包定义物品相对价值，并从配方、FTB Quests 和自定义计算器推导获取成本。
sidebar_position: 0
---

![Evaluate 标志](./assets/logo.webp)

Evaluate（模组 ID：`evaluate`）为整合包和其他模组计算**物品的单件相对价值**。先用数据包设置固定基础值，再通过配方和可选的 FTB Quests 消耗型兑换推导其他物品。KubeJS 与 Java 扩展也可以向同一张计算图提供关系。

这些数值表示配置的获取成本。Evaluate 本身不添加货币、商店或物品兑换界面。内置默认值改编自 ProjectE，但不依赖 ProjectE，数据格式也由 Evaluate 自行定义。

## 版本与安装

| 组件 | 本文对应版本 |
| --- | --- |
| Evaluate | `1.0-beta.1` |
| Minecraft | `26.1.2` |
| NeoForge | 开发与验证版本为 `26.1.2.126` |
| Java | `25` |
| 必需依赖 | [Saturn](../../library/saturn/index.md) `1.3.1+` |
| 可选兼容 | KubeJS `26.1.2-8.0.8+`，以及 Rhino、Better Advanced Tooltips |
| 可选兼容 | FTB Quests `26.1.2.8+` 及其依赖 |

将 Evaluate 和 Saturn 放入服务端的 `mods/` 目录。如果需要在物品提示中显示价值，客户端也要安装。价值统一由服务端计算，单人游戏同样如此。

物品匹配由 Saturn 提供。通用类型请查阅 [物品匹配器](../../library/saturn/types/item-matcher.md)；本节文档只介绍 Evaluate 的价值定义及其行为。

## 第一个价值定义

在适用于当前 Minecraft 版本的数据包中添加：

```json title="data/example/evaluate/evaluator/diamond.json"
{
  "type": "evaluate:constant",
  "item": "minecraft:diamond",
  "value": 10000.5,
  "priority": 10
}
```

该文件创建计算器 `example:diamond`。安装或修改数据包后执行 `/reload`，按 **F3+H** 开启原版高级物品提示，再悬停钻石查询服务端数值。首次查询可能需要等待一次响应。

这是固定基础值：消耗钻石的配方会使用 `10000.5`。如果只想改变最终显示或查询的数值，请使用[最终覆盖](./datapack.md#final-overrides)。

## 文档入口

| 目标 | 页面 |
| --- | --- |
| 设置基础值和最终覆盖 | [数据包](./datapack.md) |
| 配置配方成本，了解循环处理 | [价值推导](./calculation.md) |
| 查看提示，管理缓存和重载 | [运行与重载](./runtime.md) |
| 用脚本定值或编写计算器 | [KubeJS](./kubejs.md) |
| 从消耗物品的任务推导固定奖励 | [FTB Quests](./ftb-quests.md) |
| 在 Java 中查询或扩展计算来源 | [Java API](./java.md) |
