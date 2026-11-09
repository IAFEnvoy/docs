---
sidebar_position: 1
---

# 安装

## 版本支持

| Minecraft | Fabric | Forge | NeoForge | 状态     |
|-----------|--------|-------|----------|----------|
| 1.20.1    | ✅      | ✅     |          | 完全支持 |
| 1.21.1    | ✅      | ❌     | ✅        | 完全支持 |
| 26.1.2    | 🔨     | ❌     | 🔨       | 开发中   |

## 安装模组

1. 下载对应 Minecraft 版本的 Pendulum `.jar` 文件
2. 放入 `.minecraft/mods/`（依赖 `Rhino` 和 `Jupiter` 已内置）
3. 启动游戏 — 模组会自动检测你的 Minecraft 语言。

:::tip
Pendulum 支持 **11 种语言**：English、简体中文、繁體中文、日本語、한국어、Français、Español、Русский、Italiano、Deutsch、Português (Brasil)。
:::
## 可选：Baritone

`Baritone` 提供自动寻路、挖掘、耕作和蓝图建造功能。

:::tip
`Baritone` 为导航和自动化提供了强大的工具。智能体会优先使用 `Baritone`（如果可用）。
:::

- 安装 [Baritone](https://github.com/cabaletta/baritone/releases)
- 将其与 Pendulum 一起放入 `mods/`
- 如果存在 Baritone，`baritone` / `br` 全局对象会自动可用
- 如果不存在，所有 `br.*` 调用都会产生错误消息

## 验证

在聊天中输入：

```
/pendulum status
```

预期输出：`Idle — no script running.`

```
/pendulum help
```

应当显示完整的 API 概览。
