---
title: 反馈前检查清单
---

# 反馈前检查清单

这是一份供你在反馈 bug 或建议之前核对的检查清单。

:::danger 重要
对于不遵循本清单的 issue，我会直接关闭且不作任何解释，因为我不想浪费时间。
:::

## 关于描述

- **使用 GitHub 上的模板**：模板能帮助我收集有用信息，更快解决你的问题。
- **不要长篇大论的 AIGC 内容**：你可以用 AI 归纳你的问题，但**不要**用 AI 生成一大段文字。

## 关于模组支持

**以下模组永远不受支持，反馈前请先移除它们并重新测试**
- `Optifine`：也就是 `Optif**k`，它是过时的光影加载器，总会引发冲突。请改用 `Iris` 或 `Oculus`。
- `Epic Fight` 与 `Better Combat`：这两个模组对战斗系统做了大量改动，代码几乎不可读。我不想与它们做任何兼容。
- `REI`：代码和 API 都一团糟。

**以下模组的问题通常出在它们自身，除非你确信问题是我的模组引起的，否则请先向它们寻求支持：**
- `owo-lib`：依赖此库的模组通常会互相冲突，并输出完全无关模组的报错。
- `Moonlight`：这个模组通常会导致崩溃。

## 关于 Minecraft 版本支持

- ✅=支持
- ❌=不再支持/从不支持
- 🔲=仅轻量模组支持
- 🚧=未来会支持

| Minecraft 版本 | Forge | Fabric | NeoForge |
|-------------------|----------|-------|--------|
| 1.19.4- | ❌ | ❌ |  |
| 1.20(.1) | ✅ | ✅ | ✅ |
| 1.20.2~1.20.6 | ❌ | ❌ | ❌ |
| 1.21(.1) | ❌ | 🔲 | ✅ |
| 1.21.2~1.21.11 | ❌ | ❌ | ❌ |
| 26.x | ❌ | 🚧 | 🚧 |

**补充说明**
- 以上仅为总体情况。详细的模组支持信息请查看 [ModList Dashboard](https://mods.iafenvoy.com)。
- 欢迎申请移植回旧版本的权限，例如移植到 1.7.10 或 1.12.2。
- 由于 Mojang 在 1.21.1 与 26.1 之间几乎重写了渲染系统，我需要时间学习和支持它们。

## 关于加载器支持

我只在 `Forge`、`Fabric` 和 `NeoForge` 上制作模组。反馈前请确认你使用的加载器。

:::warning Quilt Loader
Quilt Loader 不在我的支持范围内，反馈前请改用 Fabric Loader 重新检查。
:::

:::warning 混合端
混合端通常会导致意料之外的问题，反馈前请改用 Forge、Fabric 或 NeoForge 重新检查。

已知的混合端列表：
- `Mohist`
- `Banner/Taiyitist`
- `Silkard`
- `Arclight`
- `CatServer`
- `KCauldron/Thermos`
:::

:::warning PvP 客户端
PvP 客户端通常会对游戏做大量改动并导致意料之外的问题，反馈前请改用 Forge、Fabric 或 NeoForge 重新检查。

已知的 PvP 客户端列表：
- `Lunar Client`
- `Badlion Client`
- `Labymod`
- `Feather Client`
:::
