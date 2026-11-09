# 文档站协作指南

本文件适用于整个仓库。修改前先阅读相关页面、配置和脚本，沿用所属项目的术语与组织方式。

## 项目与目录

这是 IAFEnvoy 的 Minecraft 模组、开发库及工具文档站，使用 Docusaurus 3、React 19 和原生 i18n。运行环境为 Node.js 24+，包管理器使用 pnpm。

| 路径 | 用途 |
| --- | --- |
| `docs-en/` | 默认语言的文档源文件，英文网址为 `/en/docs/…` |
| `docs-zh/` | 中文文档与覆盖文件，中文网址为 `/zh/docs/…` |
| `locales/zh/code.json` | 首页、组件等代码中的中文界面文案 |
| `locales/zh/docusaurus-theme-classic/` | 导航、页脚等主题文案 |
| `src/data/sidebar-labels.json` | 中英文侧边栏、分类及页面标签映射 |
| `src/pages/` | 首页等独立页面 |
| `src/components/` | 卡片、依赖示例、下载等共享组件 |
| `src/theme/` | Docusaurus 主题包装组件与定制组件 |
| `src/css/custom.css` | 全站基础主题样式 |
| `static/` | 固定网址的图片与下载资源 |
| `scripts/`、`plugins/` | 文档同步、开发服务、侧边栏和打包逻辑 |

正文按 `tutorial/`、`library/`、`mod/`、`tool/` 四类组织。所有文档均由本仓库直接维护，包括冰火社区版；新增或修改文档时直接操作对应语言目录。

`i18n/`、`.docusaurus/`、`build/`、`node_modules/` 是生成产物或依赖目录，不作为可维护的源码提交。不要重新创建旧的 `docs/` 目录或为已有文档恢复 Git 子模块。

## 文档编写风格

- 先说明读者要完成什么、适用对象和版本条件，再给出步骤、示例与必要的原理说明。使用简洁、直接的句子，避免宣传性描述和重复铺垫。
- 安装与玩家指南面向实际操作；开发文档给出准确的路径、API、数据格式和生效条件。不要把内部实现细节混入玩家流程，除非读者需要这些信息作出决定。
- 根据实际源码、配置、随附数据或可靠的上游文档描述行为。版本支持、默认值、可选依赖和计划中的功能要明确区分；不确定时先核实，避免凭名称推测。
- Minecraft 版本、加载器、模组版本分别写清。尤其注意 `mod/origins/js/` 的 1.21.1 文档与 `mod/origins-js/` 的 1.20.1 文档，不要混用 API。
- 中文使用自然、统一的技术用语。保留类名、方法名、JSON 键、资源 ID、注册名、命令和文件路径的原样拼写；项目名优先沿用现有译法。
- 用反引号标记标识符、命令、路径和配置项。仅对关键限制或结论使用加粗。步骤用有序列表，并列选项用无序列表，字段与版本对照优先使用表格。
- 使用 `:::tip`、`:::info`、`:::warning`、`:::danger` 表达确有必要的提示或限制；说明具体触发条件和处理方式。

## Markdown、MDX 与导航

通常使用 `.md`；现有 `.md` 页面也支持 MDX 组件。需要共享片段时复用已有组件或 `.mdx` 文件，不要复制一套相同的交互实现。

新页面可从以下结构开始，按实际内容保留需要的字段：

```markdown
---
title: 安装
description: 适用版本、安装方法和依赖说明。
sidebar_position: 1
---

## 适用版本

## 安装步骤
```

- 页面用 front matter 的 `title` 或正文一级标题提供主标题，避免显示重复主标题；正文分节通常从二级标题开始。
- 使用 Docusaurus 支持的 `sidebar_position`、`sidebar_label`、`id`、`slug` 等字段。旧页面的 `order`、`group`、`nav` 等历史字段不能作为新页面的排序依据。
- 已发布的文档 ID、文件路径、slug 和被引用的锚点应保持稳定。确需移动或改名时，检查两种语言及所有引用；翻译标题时注意显式保留需要稳定的锚点。
- 旧 `/docs/…` 网址通过 `plugins/legacy-links.cjs` 显示语言选择页，用户选择后只添加 `/en` 或 `/zh` 前缀，保留后续路径、查询参数和锚点。不要添加逐页猜测映射。静态构建按文档路由生成旧网址入口；任意旧路径的兜底依赖静态托管使用根目录 `404.html`。
- `sidebars.js` 自动生成四类侧边栏。通过 `_category_.json` 设置分类标签、顺序和入口；通过 `src/data/sidebar-labels.json` 本地化目录标签。
- 新分类沿用侧边栏生成器的唯一键规则。不同项目中相同的“API 参考”“安装”等标签不能产生重复翻译键。
- 文档之间优先使用相对 Markdown 链接，如 `./install.md`、`../../json/origin.md`。避免写死本站域名或依赖旧源码目录的绝对文件路径。
- React 内部导航使用 `@docusaurus/Link`，静态资源按需使用 `useBaseUrl`；避免原生 `<a href="/">` 将中文页面带回英文首页。
- 代码块标明语言；多文件示例通过 `title="data/example/…/file.json"` 给出文件位置。示例尽量完整可用，JSON 代码块使用合法 JSON；确需注释时明确采用 JSONC 等对应格式。
- MDX 中的字面量 `<namespace>`、花括号等放入行内代码或代码块，避免被当作标签或表达式。JSX 使用 `className` 等 React 属性。
- 图片优先使用体积较小的 WebP，正文图片尽量放在对应文档附近并使用相对引用、合适的替代文本。固定网址的下载文件放入 `static/resources/`，可复用 `Download` 组件。
- 表格说明字段类型、必填性、默认值与单位；示例资源命名空间通常使用 `example`，并解释资源 ID 与文件路径的对应关系。

## 双语言维护

保留原生 Docusaurus i18n，不改为两套独立 docs 插件。默认语言是 `en`，通过 `localeConfigs.en.baseUrl` 显式使用 `/en/`；中文标识是 `zh`，首页为 `/zh/`。根目录 `/` 为语言选择页。

1. 英文文档维护在 `docs-en/`。中文对应文件维护在 `docs-zh/` 的相同相对路径，例如两边均使用 `library/jupiter/install.md`；文档 ID 保持对应。
2. `scripts/sync-i18n.mjs` 先复制英文文档及资源，再用中文文件覆盖，生成 `i18n/zh/docusaurus-plugin-content-docs/current/`，同时复制 `locales/zh/` 中的界面翻译。
3. 未翻译页面沿用原文。当前按任务范围分批翻译，不为补齐目录而自动翻译全部文档，也不必在 `docs-zh/` 手动复制所有英文文件。
4. 删除中文覆盖文件会使页面恢复为英文回退；需要彻底删除页面时，检查两边的源文件、导航和引用。
5. 首页、按钮等共享界面使用 `Translate` 或 `translate`，保留稳定的翻译 ID，并同步修改 `locales/zh/code.json`。导航、页脚和侧边栏分别修改对应的文案文件。
6. 不直接编辑 `i18n/`；同步脚本会覆盖该目录。通过 `pnpm write-translations --locale zh` 提取文案后，把要维护的翻译 JSON 保存回 `locales/zh/`。`current/` 下的正文属于生成副本。

### 快速排查翻译缺失或未匹配

Docusaurus 原生提供 `write-translations` 与 `--messagePrefix`，可快速定位没有被现有翻译文件覆盖的界面条目：

```powershell
pnpm write-translations --locale zh --messagePrefix '[待核对] '
rg -n --glob '*.json' --glob '!**/current/**' '\[待核对\]' i18n/zh
```

该命令保留已有译文，仅对新提取的键加前缀。`[待核对]` 表示本次提取新增、尚未由现有 JSON 覆盖的条目，不等于确定缺少中文：Docusaurus 主题可能已经提供默认中文，项目名和 API 名也可能无需翻译。结合翻译 ID 和实际页面判断，避免为了消除标记重复维护所有主题消息。

- 阅读命令输出中的 `unknown` 翻译键警告，检查是否改了 ID、导航标签或分类键，导致旧译文未匹配。提取不会自动删除旧键，确认无引用后再清理源文件。
- 检查 `i18n/zh/code.json`、`docusaurus-theme-classic/navbar.json`、`footer.json` 和 `docusaurus-plugin-content-docs/current.json`。最后一个是分类与版本标签的翻译文件，区别于保存正文副本的 `current/` 目录；项目侧边栏主要维护在 `src/data/sidebar-labels.json`。
- 文案 ID 必须与 `Translate` / `translate` 中的 ID 完全一致；导航、页脚的键也必须与提取结果一致。保留 `{message}` 等占位符的名称和数量，不能翻译占位符本身。原生提取不能代替这些语义检查。
- 不使用 `--override` 排查缺失，它会覆盖现有消息。不要把带前缀的提取结果直接回存源码或提交。
- 排查后仅将确认需要维护的译文与键合并回 `locales/zh/`，然后运行 `pnpm sync-i18n` 清除临时标记和提取文件。下次 `start` / `build` 前会自动同步，因此若需保留提取结果用于比较，先复制到临时目录。

正文不经过消息提取，使用以下 PowerShell 命令列出没有中文同路径覆盖文件的页面，排除以下划线开头的共享片段：

```powershell
rg --files docs-en -g '*.md' -g '*.mdx' -g '!_*.md' -g '!_*.mdx' |
  ForEach-Object {
    $relative = $_ -replace '^docs-en[\\/]', ''
    if (-not (Test-Path -LiteralPath (Join-Path 'docs-zh' $relative))) {
      $relative
    }
  }
```

该列表表示回退到原文的页面，不是要求立即补齐的错误。覆盖文件存在也不能证明内容已经完整翻译或与英文同步，仍需检查正文差异。页面明明有译文却显示原文时，核对同路径文件名、`id` / `slug`、当前网址与 `html lang`，再同步并验证对应页面；不要只看 `i18n/` 中是否存在文件，因为英文回退也会被复制到那里。

## CSS 与主题修改

- 全站默认变量与共享基础样式放在 `src/css/custom.css`；首页、404 等独立页面的样式使用 CSS Module。
- 语言选择界面维护在 `src/pages/language.jsx`，复用原生 `Layout`、卡片、按钮和深浅色设置；`language.module.css` 只负责布局。旧网址入口仅将完整目标传入该页面，不另外维护独立配色或主题存储。
- 文档目录样式通过 `src/theme/DocItem/index.jsx` 包装原始 `DocItem`，按文档 ID 前两段识别项目，例如 `mod/ice-and-fire-ce`，动态导入 `styles/` 内对应 CSS。
- 新增项目样式时增加独立 CSS 文件，并在 `DocItem` 的加载映射中登记。中英文页面复用同一套目录样式。
- 所有项目样式必须限定作用域，例如 `html.dir-mod-ice-and-fire-ce`。包装组件同时维护 HTML 和 body 上的 `dir-…`、`lang-en`、`lang-zh` 类，离开页面时清理。
- 动态导入的 CSS 会留在浏览器中；隔离依靠作用域与类名清理。避免无前缀的 `h2`、`a`、`:root` 等规则影响其他项目。
- `src/theme/DocItem/styles/` 目前只保留 `README.md`，加载映射为空，测试配色、标题边框和中文行距覆盖已移除。添加正式样式前参考该说明；共享基础规则放在 `src/css/custom.css`，项目主题色直接维护所需的 `--ifm-*` 变量，不再依赖 `--doc-accent` 转换规则。
- 保留 `plugins/directory-styles.cjs` 的 CSS 提取配置。Docusaurus 默认会合并动态导入的 CSS，单写 `import()` 不能保证最终文件按目录分开。
- 保留原始主题组件提供的文档上下文、元数据和布局；优先包装原组件，避免用空壳替换整个 `DocItem`。

## 常用命令与本地开发

| 命令 | 用途 |
| --- | --- |
| `pnpm install` | 根据项目配置安装依赖 |
| `pnpm start` | 同时启动中英文开发站，公开端口默认 3000 |
| `pnpm start --no-open` | 启动开发站但不自动打开浏览器 |
| `pnpm start --port 4000` | 更改对外开发端口，两种语言仍共用该端口 |
| `pnpm start --locale zh` | 仅启动中文开发站；英文可使用 `--locale en` |
| `pnpm sync-i18n` | 手动更新生成的中文站源文件 |
| `pnpm test` | 运行 `scripts/*.test.mjs` 中的 Node 测试 |
| `pnpm build` | 完整构建中英文生产站 |
| `pnpm serve --port 4173 --no-open` | 预览现有 `build/`，不会重新构建 |
| `pnpm write-translations --locale zh` | 提取原生 i18n 翻译消息 |

使用 `package.json` 中的启动与构建入口。`scripts/docusaurus.mjs` 负责同步与开发时的源文件监听；直接运行原生 Docusaurus 命令可能绕过这些步骤。

默认开发地址是 `http://localhost:3000/en/` 和 `http://localhost:3000/zh/`。`scripts/start-locales.mjs` 启动两套独立编译服务，`scripts/locale-proxy.mjs` 按路径转发 HTTP 和 WebSocket；`plugins/dev-locales.cjs` 区分两种语言的热更新连接。各实例使用 `.docusaurus/dev-<公开端口>-<语言>/`，避免生成文件冲突。

原生 Docusaurus `start` 一次只提供一种语言。排查中文页面被英文 404 接管时，先确认是否通过项目入口启动，以及 `/zh/` 是否进入中文服务。修改启动脚本后重启该开发服务，仅刷新页面不会加载新的启动逻辑。端口占用时识别对应进程，保留无关服务。

遵循 `.editorconfig`：UTF-8、LF、两空格缩进、文件末尾换行。局部修改沿用现有代码风格，避免连带重排整篇文档或批量修改换行符。仅在依赖发生变化时更新 `pnpm-lock.yaml`；不引入 npm 或 Yarn 的额外锁文件。

## 验证与提交

- 修改根目录说明文件时，核对路径、命令与当前实现，并检查差异格式即可，不必为纯说明改动重建站点。
- 修改正文、MDX、链接、文档结构或翻译时运行 `pnpm build`，检查新增的断链、锚点和编译警告。当前断链配置是 `warn`，退出成功也需要查看相关输出。
- 修改脚本、侧边栏生成器或转发逻辑时运行 `pnpm test`；影响主题、构建或 CSS 的修改还需验证生产构建。
- 修改开发启动或本地化流程时，使用 `pnpm start` 实测中英文首页、文档直达与刷新、同一文档的语言切换，以及修改源文件后的热更新。单独验证 `build` 与 `serve` 不能覆盖开发入口。
- 修改 CSS 时检查浅色、深色、窄屏布局，以及“目录 A → 目录 B → 首页”的样式清理；涉及打包时核实产物中的目录 CSS 确实分开。
- 为有行为变化的脚本补充有意义的测试，例如覆盖优先级、原文回退、资源保留、删除同步和 WebSocket 路由。纯文案或低影响样式调整不添加只复述实现的测试。
- 开始及结束时检查 `git status`，保留已有改动；检查本次修改的差异与 `git diff --check`。浏览器验证用的临时文案要恢复，临时服务与文件按需清理。
- 提交、推送和部署遵循用户任务范围。提交前核对暂存文件，避免夹带其他任务的修改、生成目录或测试资源；提交说明简短描述实际变化。需要新分支时默认使用 `codex/` 前缀，用户指定名称优先。
- 完成时说明改了什么、验证了什么，以及实际完成的提交或部署状态；不要把构建通过表述为已经发布。
