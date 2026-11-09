---
title: "起源JS"
description: "面向 Origins 的 KubeJS 附加模组 —— 在 JavaScript 中注册自定义动作、条件与能力。"
---

# 起源JS（1.20.1）

:::warning

本文档适用于 1.20.1；如需 1.21.1 的内容，请参阅 [1.21 文档](../origins/js)。

:::

起源JS 是面向 Minecraft 1.20.1 的 KubeJS 附加模组，可让你在 JavaScript 中注册自定义的 **动作（Action）**、**条件（Condition）** 和 **能力（Power）**，并在运行时直接操作实体起源。

---

## 快速链接

- **[安装](install)** —— 前置要求、配置步骤、脚本位置
- **[API 参考](api/global-api)** —— 完整的方法参考
- **[示例](examples/entity-action)** —— 可直接复制使用的实用配方

---

## 可以做什么

| 功能 | 实现方式 |
|-----------|-----|
| 自定义实体 / 方块 / 物品动作 | `OriginsJS.registerEntityAction(...)` 等 |
| 自定义条件（实体、生物群系、伤害、流体……） | `OriginsJS.registerEntityCondition(...)` 等 |
| 用 tick / 切换 / 授予实现完全脚本化的能力 | `OriginsJS.powerBuilder(...)` |
| 在运行时更改起源 | `holder.setOrigin(...)` |
| 随时授予 / 撤销能力 | `holder.grantPower(...)` |
