# 文档目录样式

此目录用于存放按项目加载的正式样式。当前只给以下目录启用主题，其他文档和首页继续使用全站基础主题：

| 文档 ID 前缀 | 样式文件 | 主题 |
| --- | --- | --- |
| `mod/ice-and-fire-ce` | `ice-and-fire-ce.css` | 铁誓 / Iron Oath，中世纪羊皮纸与烛夜深色 |
| `mod/origins` | `origins.css` | Ore，固定深色像素风格 |
| `mod/origins-js` | `origins.css` | 与 Origins 共用 Ore |
| `mod/system` | `system.css` | ApricityUI t08-arwes，不透明深色青色边框 |

主题来自 `E:\Website\Theme\iron-oath` 和 `E:\Website\Theme\t01-ore`，适配 Docusaurus 的 `--ifm-*` 变量及正文、导航、侧栏、卡片、提示、表格和代码块；不直接加载测试台或示例页面的样式。Ore 在站点的两种模式下均保留原有深色配色，不修改用户保存的全站深浅偏好。

System 参考 AUI 的 `common/src/main/resources/assets/apricityui/apricity/apricityui/theme/t08-arwes/t08-arwes.css`，文档页映射为独立的 Docusaurus 变量和组件规则，编辑器则使用原始主题快照。两者均保留不透明深色表面，不改变用户保存的全站深浅偏好。编辑器资源位于 `static/tools/system-card-editor/`，通过独立文档隔离快捷键、预览 CSS 与浏览器草稿。

本地字体和许可放在 `assets/` 中。铁誓标题使用 Cinzel 与 Noto Serif SC 的 Unicode 分片；Ore 的像素字体只用于标题和按钮。两套主题的正文均使用系统字体，代码保留等宽字体，手机输入保持 16px，不依赖外部字体 CDN。构建器会处理相对字体路径，并生成带内容哈希的资源网址。

## 添加样式

1. 在此目录创建项目 CSS，例如 `ice-and-fire-ce.css`。
2. 在 `src/theme/DocItem/index.jsx` 的 `styles` 中注册文档 ID 前两段对应的加载函数：

   ```jsx
   const styles = {
     'mod/ice-and-fire-ce': () => import('./styles/ice-and-fire-ce.css'),
   };
   ```

3. 所有规则都限定在项目作用域内。例如：

   ```css
   html.dir-mod-ice-and-fire-ce .theme-doc-markdown h2 {
     border-inline-start: 3px solid var(--ifm-color-primary);
     padding-inline-start: 0.75rem;
   }
   ```

`mod/ice-and-fire-ce` 会生成 `dir-mod-ice-and-fire-ce`，`library/jupiter` 会生成 `dir-library-jupiter`。映射依据文档 ID，不依赖 `/en/`、`/zh/` 等网址前缀，因此两种语言共用一套项目样式。

## 作用域与生命周期

包装组件保留原始 Docusaurus `DocItem` 的上下文和布局，在 HTML 上添加 `doc-section`、项目类和 `lang-en` / `lang-zh`，并在 body 上添加项目类和语言类。页面切换后会移除旧类。

- 项目样式以 `html.dir-…` 开头；语言差异可使用 `html.dir-….lang-zh`。
- 深色主题可使用 `html.dir-…[data-theme='dark']`，优先复用现有 `--ifm-*` 变量。
- 动态加载的 CSS 会在浏览器中保留，规则必须带作用域。不要写无前缀的 `:root`、`h2`、`a` 等选择器。
- 修改主题主色时直接维护需要的 `--ifm-color-primary` 及其深浅色变量。此前用于演示的 `--doc-accent`、`--doc-accent-dark` 转换规则已移除。
- 全站通用规则放在 `src/css/custom.css`；首页、404 等独立页面继续使用各自的 CSS Module。

`plugins/directory-styles.cjs` 保留按目录提取 CSS 的打包配置。构建会生成 `docs-ice-and-fire-ce.<hash>.css` 和 `docs-origins.<hash>.css` 等独立文件；Origins 与 Origins JS 共用后一份文件。

## 检查

运行 `pnpm build` 检查两种语言的构建。添加正式样式后，检查对应独立 CSS 产物，并在浅色、深色和窄屏下浏览“目录 A → 目录 B → 首页”，确认旧项目样式没有影响后续页面。删除样式时同时删除加载映射，避免遗留失效导入。
