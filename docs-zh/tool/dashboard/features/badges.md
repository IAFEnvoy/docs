---
sidebar_position: 4
title: 徽章 API
description: 面向模组 README 的公开 SVG 徽章——CurseForge / GitHub 统计、加载器、许可证、文档与 Discord
---

# 徽章 API

ModList Dashboard 在 `/api/badge/` 下提供一组**公开 SVG 徽章**，模组作者可以把它们嵌入 GitHub README 或自己的网站。无需登录，并且每个徽章都由面板自身渲染，因此风格与面板保持一致，不会看起来像第三方贴纸。

公共实例已经运行在 **https://mods.iafenvoy.com**，因此徽章可以直接使用——下面的所有示例都指向它。

## 端点参考

`:slug` 始终是面板目录（`data/mods.db`）中的**模组 ID**。

| 端点 | 渲染内容 |
|----------|---------|
| `/api/badge/curseforge/downloads/:slug` | CurseForge 下载量 |
| `/api/badge/github/downloads/:slug` | GitHub Release 资源的下载总量 |
| `/api/badge/github/issues/:slug` | 按状态划分的 Issue——Open / Done / Closed（两行） |
| `/api/badge/github/prs/:slug` | 按状态划分的 Pull Request——Open / Merged / Draft / Closed（两行） |
| `/api/badge/license/:slug` | 模组的许可证 |
| `/api/badge/powered-by/:slug` | 模组自己的图标 + 名称，供依赖方引用 |
| `/api/badge/loader/fabric` · `/forge` · `/neoforge` | 加载器支持——"Available for" / 加载器名（两行） |
| `/api/badge/docs/:slug` | 文档链接——"Read the" / "Documentation"（两行） |
| `/api/badge/discord` | Discord 邀请徽章 |

### 可点击的跳转页

图片本身无法携带链接，因此可点击的徽章会配套一个极简跳转页。把徽章包在 `<a>` 中，并指向 `link/` 变体：

| 端点 | 跳转到 |
|----------|--------------|
| `/api/badge/link/powered-by/:slug` | 模组的主项目页——**CurseForge → GitHub → wiki**，取第一个可用的 |
| `/api/badge/link/docs/:slug` | 模组的 wiki URL（仅在模组有 wiki 时） |
| `/api/badge/link/discord` | 来自 `config/config.yml` → `badges.discord` 的 Discord 邀请 |

## 嵌入方式

下面使用的 API 根地址是公共实例 **`https://mods.iafenvoy.com`**。如果你运行自己的部署，请替换为你自己的主机。

### Markdown

```markdown
![CurseForge Downloads](https://mods.iafenvoy.com/api/badge/curseforge/downloads/my-mod)
![GitHub Downloads](https://mods.iafenvoy.com/api/badge/github/downloads/my-mod)
![License](https://mods.iafenvoy.com/api/badge/license/my-mod)
```

### 带链接（在 Markdown 中使用 HTML）

```html
<a href="https://mods.iafenvoy.com/api/badge/link/powered-by/my-mod">
  <img src="https://mods.iafenvoy.com/api/badge/powered-by/my-mod" alt="Powered by">
</a>
```

为了让 GitHub README 的版式整洁，通常给 `<img>` 加一个内联的 `height` 就够了：

```html
<img height="56" src="https://mods.iafenvoy.com/api/badge/loader/neoforge" alt="Available for NeoForge">
```

### 实际示例

这些都由公共实例渲染，你可以直接打开查看当前输出。把 `iceandfire` 换成你自己的模组 ID。

| 徽章 | 预览 | Markdown |
|-------|---------|----------|
| CurseForge 下载量 | ![CurseForge Downloads](https://mods.iafenvoy.com/api/badge/curseforge/downloads/iceandfire) | `![](https://mods.iafenvoy.com/api/badge/curseforge/downloads/iceandfire)` |
| GitHub 下载量 | ![GitHub Downloads](https://mods.iafenvoy.com/api/badge/github/downloads/iceandfire) | `![](https://mods.iafenvoy.com/api/badge/github/downloads/iceandfire)` |
| 按状态划分的 Issue | ![Issues](https://mods.iafenvoy.com/api/badge/github/issues/iceandfire) | `![](https://mods.iafenvoy.com/api/badge/github/issues/iceandfire)` |
| 按状态划分的 Pull Request | ![Pull Requests](https://mods.iafenvoy.com/api/badge/github/prs/iceandfire) | `![](https://mods.iafenvoy.com/api/badge/github/prs/iceandfire)` |
| 许可证 | ![许可证](https://mods.iafenvoy.com/api/badge/license/iceandfire) | `![](https://mods.iafenvoy.com/api/badge/license/iceandfire)` |
| Powered by | ![Powered by](https://mods.iafenvoy.com/api/badge/powered-by/iceandfire) | `![](https://mods.iafenvoy.com/api/badge/powered-by/iceandfire)` |
| 文档 | ![Documentation](https://mods.iafenvoy.com/api/badge/docs/iceandfire) | `![](https://mods.iafenvoy.com/api/badge/docs/iceandfire)` |

如果上面的预览显示 `N/A`，说明该缓存条目尚未在服务器上生成——打开徽章一两次后就会填充。

### 加载器徽章

固定文本，无需 slug——可用于任何模组的 README：

```html
<img height="56" src="https://mods.iafenvoy.com/api/badge/loader/fabric" alt="Available for Fabric">
<img height="56" src="https://mods.iafenvoy.com/api/badge/loader/forge" alt="Available for Forge">
<img height="56" src="https://mods.iafenvoy.com/api/badge/loader/neoforge" alt="Available for NeoForge">
```

### Discord

```markdown
[![Discord](https://mods.iafenvoy.com/api/badge/discord)](https://mods.iafenvoy.com/api/badge/link/discord)
```

### 供依赖方使用："Powered by"

`/api/badge/powered-by/:slug` 面向**依赖该模组的其他模组**：它展示*被依赖模组*的图标和名称，以便依赖方的 README 正确署名。该徽章会把图标以 `data:` URI 的形式内嵌，因此即使原始图床不可用也仍能显示。

## 数据来源

每个数据徽章都**由面板缓存提供**——徽章请求永远不会阻塞在 CurseForge 或 GitHub API 上：

| 徽章 | 缓存 |
|-------|-------|
| CurseForge 下载量 | `cache/curseforge/<cf-id>.json` |
| GitHub 下载量 | `cache/github/<owner>/<repo>/downloads.json` |
| GitHub Issue / PR | `cache/github/<owner>/<repo>/meta2.json`（即面板 GitHub 面板所用的同一条目） |

一些值得了解的行为：

- **未匹配的 slug → `404`。** 如果 slug 与目录中的任何模组 ID 都不匹配，徽章返回 `404`，且*不读取也不创建任何缓存条目*。
- **逐条目过期重验证（stale-while-revalidate）。** 过期条目仍会立即返回（只是数字不再是最新的），并且**只刷新该单个条目**。请求一个徽章不会预热或使其他条目失效。
- **占位值。** 在缓存条目存在之前，徽章会渲染标题，值为 `N/A`。`N/A` 表示"尚无缓存条目"，而 `0` 表示"缓存值确实为零"。
- **计数方式。** 下载量使用带千位分隔符的完整数字——`8,757,284`，而不是 `8.7M`。
- **有效 slug 仍需数据源。** 没有 CurseForge ID 或 GitHub 仓库的模组无法生成相应徽章；访问这类条目同样返回 `404`。

`issues` / `prs` 徽章会按状态拆分计数，使用与面板 GitHub 面板相同的图标和颜色：

| 徽章 | 显示的状态（从左到右） |
|-------|------------------------------|
| Issue | Open · Done · Closed——`not planned` 的 Issue 会并入 `Closed` |
| Pull Request | Open · Merged · Draft · Closed |

`not planned` 和 `Closed` 共用同一个灰色叉号图标，因此会合并为一个数字，而不是绘制两次。原始明细仍保留在缓存负载中（`not_planned_issues`、`closed_issues`）。

## 要求与配置

| 徽章 | 需要 |
|-------|-------|
| CurseForge / GitHub 徽章 | `config/auth.yml` 中对应的 API 密钥或令牌，且模组配置了该平台 ID |
| `/api/badge/docs/:slug` | 模组上配置了 Wiki URL |
| `/api/badge/discord` | `config/config.yml` 中的 `badges.discord`——**留空即返回 `404`** |

```yaml
# config/config.yml
badges:
  discord: "https://discord.gg/xxxxxxxx"
```

Discord 邀请和 wiki 链接只接受 `http` / `https` 值；其他任何值（包括 `javascript:`）都会被拒绝，因此徽章永远不会被变成脚本链接。

## HTTP 细节

- 仅支持 `GET` / `HEAD`——其他方法返回 `405`。
- `Content-Type: image/svg+xml; charset=utf-8`。
- 响应带有 `Cache-Control: no-cache` 以及 `ETag`，因此浏览器在每次页面加载时都会重新验证（未变化的徽章返回 `304`，已更新的徽章立即生效）。当徽章渲染本身升级时，这一点很重要。
- CORS 完全开放，因此任何页面都可以获取这些徽章。

## 自托管说明

示例使用公共实例（`https://mods.iafenvoy.com`）。如果你运行自己的部署，徽章 URL 只需跟随你对外暴露的基础 URL（通过 Nginx、隧道等）——它由 `server.port` 加上你的反向代理决定。部署流程见[安装](../getting-started/installation)，配置文件见[配置概览](../getting-started/configuration)。

加载器和文档徽章复用了 [@intergrav/devins-badges](https://github.com/intergrav/devins-badges) 的图标形状与品牌颜色（CC0-1.0）；布局和文本由本项目渲染，因此标签可以换行成两行并支持本地化。
