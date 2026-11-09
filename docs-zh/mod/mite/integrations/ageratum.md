---
id: ageratum
title: Ageratum 游戏内手册
sidebar_position: 3
description: 可选的 Ageratum 集成、双语游戏内手册、物品绑定与入口。
---

MITE 为 Ageratum 提供了中文与英文的游戏内手册。该集成完全以资源包 Markdown 实现，不会从 Java 代码中引用 Ageratum 的 API 类。未安装 Ageratum 时，模组加载、被引用的书籍与全部玩法都照常运行。

## 内容与入口

- 中文资源：`assets/mite/ageratum/zh_cn/`
- 英文资源：`assets/mite/ageratum/en_us/`
- 客户端命令：`/ageratum mite`
- 客户端语言缺失时会自动回退到 `en_us`。

手册包含九页，覆盖概览、流程、生存与营养、采集与合成、农业、世界与传送门、怪物与战斗、配置以及数据驱动内容。

## 物品绑定

首页绑定 `mite:referenced_book`。工作台、低等级熔炉、农业物品、符文石、材料箭矢以及部分刷怪蛋也会绑定到相应章节。安装 Ageratum 后，在物品栏中把鼠标悬停在上述物品之一上，并按住 Ageratum 的沉思键（默认 `W`）即可打开对应页面。

:::info 可选依赖边界

NeoForge 元数据把 `ageratum` 声明为可选的客户端依赖。服务器不需要 Ageratum；未安装它的客户端只是忽略这些 Markdown 资源。

:::
