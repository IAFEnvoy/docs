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
| Saturn | 1.3.1 |

本文档统一介绍当前版本的 API 与数据格式，按功能组织，不按发布版本拆分页面。System 使用已发布的依赖 `curse.maven:saturn-lib-1767455:9606807`。

## 从这里开始

- [安装与基础约定](./install.md)：安装位置、依赖、资源 ID、数据包目录与生效时机。
- [数据定义](./data/index.md)：每种独立 JSON 定义一页。
- [类型参考](./types/index.md)：按类型族查询动作、条件、技能、费用、触发器、信息表达式等；字段表、默认值、示例与行为说明直接列在对应类型族页面。
- [触发器](./guides/triggers.md)：发布、订阅、重建与成就完成事件。
- [费用与支付](./guides/costs.md)：费用准备、试算与提交。
- [玩家信息](./guides/information.md)：信息行、分组、取值器与缺失处理。
- [Origins 数据适配](./development/origins-ports.md)：类型对应、字段差异与不兼容范围。
- [开发 API](./development/api.md)：注册表、DataStorage、HUD、文件读写与扩展接口。

[源代码](https://github.com/IAFEnvoy/Saturn)
