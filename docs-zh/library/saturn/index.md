---
title: "Saturn"
sidebar_position: 0
---

Saturn 是面向数据驱动模组的 NeoForge 开发库。整合包作者可以用 JSON 定义资源、技能、触发规则和玩家信息行；模组作者可扩展动作、条件、费用、取值器与 HUD。

## 适用版本

| 项目 | 本文档对应版本 |
| --- | --- |
| Minecraft | 26.1.2 |
| NeoForge | 26.1.2.99 |
| Java | 25 |
| Saturn | 1.2.6 所在开发分支的当前源码 |

文档包含当前源码已实现的新增接口，例如 `FileAccess.write` 与 `saturn:advancement_completed`；使用发布 JAR 前请确认该版本包含相应接口。系统当前依赖的 Saturn 发布文件尚未使用这两个新增入口。

## 从这里开始

- [安装与基础约定](./install.md)：安装位置、依赖、资源 ID、数据包目录与生效时机。
- [数据定义](./data/index.md)：每种独立 JSON 定义一页。
- [类型参考](./types/index.md)：动作、条件、技能、费用、触发器、信息表达式等，每个类型独立成页，包含字段表与 JSON 示例。
- [触发器](./guides/triggers.md)：发布、订阅、重建与成就完成事件。
- [费用与支付](./guides/costs.md)：费用准备、试算与提交。
- [玩家信息](./guides/information.md)：信息行、分组、取值器与缺失处理。
- [开发 API](./development/api.md)：注册表、DataStorage、HUD、文件读写与扩展接口。

[源代码](https://github.com/IAFEnvoy/Saturn)
