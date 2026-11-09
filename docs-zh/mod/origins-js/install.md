---
sidebar_position: 2
title: "安装"
description: "如何为 Minecraft 1.20.1 安装起源JS"
---

# 安装

## 前置要求

| 模组 | 版本 | 备注 |
|-----|---------|-------|
| **Origins** | 1.20.1 | Fabric 或 Forge |
| **Apoli** | 2.9.x | 内置于 Origins |
| **Calio** | 1.11.x | 内置于 Apoli |
| **KubeJS** | 2001.6.5+ | Fabric 或 Forge |

## 配置步骤

1. 从 [GitHub Releases](https://github.com/IAFEnvoy/Origins-JS-Legacy/releases) 下载 JAR，或从源码构建。
2. 将它放入 `mods/` 文件夹。
3. 启动游戏 —— 起源JS 会在启动时自动向 KubeJS 注册。

## 脚本位置

| 目录 | 用途 |
|-----------|---------|
| `kubejs/startup_scripts/` | 注册动作、条件、能力（启动时执行一次） |
| `kubejs/server_scripts/` | 运行时的起源 / 能力管理与事件处理 |

## 快速验证

创建 `kubejs/startup_scripts/origins_test.js`：

```js
console.info("[OriginsJS] Plugin loaded!");

OriginsJS.registerEntityAction("test_action", (entity, params) => {
    console.info("Test action executed on: " + entity);
});
```

在服务器日志中查找 `[OriginsJS] Plugin loaded!`。
