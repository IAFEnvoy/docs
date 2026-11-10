---
title: 开局加点界面
description: 通过数据包定义开局点数、选项联动、预设、完成条件与奖励。
sidebar_position: 0
---

![开局加点界面标志](./assets/logo.webp)

开局加点界面（Starting Point Buy，模组 ID：`spb`）通过数据包定义开局分配流程。整合包作者通过 JSON 定义职业、天赋、属性和缺陷；玩家在左侧选择预设，在右侧调整选项，满足规则后确认开局。

模组本身不内置职业、点数种类或数值平衡。资源、公式、条件、能力和动作复用 [Saturn](../../library/saturn/index.md)，支持多种点数、单选、多选、重复加点及选项间的价格和数量联动。

## 适用版本

| 项目 | 本文对应版本 |
| --- | --- |
| 开局加点界面 | 1.0.0 当前实现，使用自动生成的公式别名 |
| Minecraft | 26.1.2 |
| NeoForge | 开发与验证版本 26.1.2.126 |
| Java | 25 |
| 必需依赖 | Saturn 1.3 或更新的兼容版本 |

客户端和服务端均需安装模组及依赖。正式模组不包含示例方案，需要整合包提供数据包；可以使用本站的[完整示例](./datapack/example.md)体验。

## 从这里开始

- [安装](./install.md)：安装位置、版本与数据包生效方式。
- [玩家操作与管理命令](./usage.md)：预设、数量调整、完成、刷新与恢复。
- [制作第一个数据包](./datapack/index.md)：最小可用方案及文件目录。
- [Plan 与界面设置](./datapack/plan.md)：资源绑定、输入、预设、完成规则和关闭配置。
- [Group 与 Option](./datapack/selection.md)：单选、多选、动态数量、前置和互斥。
- [公式与比较条件](./datapack/formulas.md)：自动变量名、多资源联动和 `spb:compare`。
- [能力与延后动作](./datapack/rewards.md)：根据最终选择或属性发放奖励。
- [战士与学者示例](./datapack/example.md)：可下载的数据包、资源包及计算结果。
