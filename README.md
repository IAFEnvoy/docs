# IAFEnvoy's Docs

Documentation for IAFEnvoy's Minecraft mods, development libraries, tutorials and tools, built with [Docusaurus 3](https://docusaurus.io/), React 19 and native English/Chinese i18n.

Read the documentation at [docs.iafenvoy.com](https://docs.iafenvoy.com/).

## Local development

Use Node.js 24 or later and pnpm. The `.nvmrc` file specifies a development version of Node.js.

```powershell
pnpm install
pnpm start
```

`pnpm start` launches both languages with hot reload behind one public address and opens a browser:

| Address | Page |
| --- | --- |
| [localhost:3000](http://localhost:3000/) | Language selection |
| [localhost:3000/en/](http://localhost:3000/en/) | English homepage |
| [localhost:3000/zh/](http://localhost:3000/zh/) | Chinese homepage |

| Command | Purpose |
| --- | --- |
| `pnpm start --no-open` | Start both languages without opening a browser |
| `pnpm start --port 4000` | Change the shared public port |
| `pnpm start --locale en` | Start only the English site |
| `pnpm start --locale zh` | Start only the Chinese site |
| `pnpm sync-i18n` | Regenerate Chinese documents and UI translation files |
| `pnpm test` | Check synchronization, sidebars, locale routing and old-link handling |
| `pnpm build` | Build both language sites |
| `pnpm serve --port 4173 --no-open` | Preview the existing production build |

Use the package scripts: `scripts/docusaurus.mjs` synchronizes translations before invoking Docusaurus and watches source files during development. The default development command starts two locale servers behind `scripts/locale-proxy.mjs`, including separate hot-reload connections. Running the unwrapped Docusaurus `start` command serves only one language.

## Repository layout

| Path | Purpose |
| --- | --- |
| `docs-en/` | English source documents, published at `/en/docs/…` |
| `docs-zh/` | Chinese documents and overrides, published at `/zh/docs/…` |
| `locales/zh/` | Chinese translations for the homepage, navigation, footer and shared UI |
| `src/data/sidebar-labels.json` | English and Chinese sidebar labels |
| `src/pages/` | Homepages, language selection and other standalone pages |
| `src/components/` | Shared cards, downloads and other components |
| `src/theme/` | Theme wrappers and customized theme components |
| `src/css/custom.css` | Global theme variables and shared styles |
| `static/` | Fixed-URL images and downloadable resources |
| `scripts/`, `plugins/` | Synchronization, development, routing and build helpers |

Documents are organized under `tutorial/`, `library/`, `mod/` and `tool/`. All documentation, including Ice And Fire Community Edition, is maintained directly in this repository.

`i18n/`, `.docusaurus/`, `build/` and `node_modules/` are generated or installed directories and are not committed.

## Translation workflow

Maintain the same relative paths, document IDs and slugs in `docs-en/` and `docs-zh/`. `scripts/sync-i18n.mjs` copies the English sources first, then applies Chinese overrides and UI translations to the native `i18n/zh/` layout. Documents without a Chinese override fall back to English. Edit the source directories rather than generated files in `i18n/`.

Homepage and component translations belong in `locales/zh/code.json`; navigation and footer translations belong in `locales/zh/docusaurus-theme-classic/`. Maintain sidebar labels in `src/data/sidebar-labels.json`. Prefer relative Markdown links between documents so Docusaurus resolves them for the current language.

To find UI translation keys not covered by the maintained translation files:

```powershell
pnpm write-translations --locale zh --messagePrefix '[待核对] '
rg -n --glob '*.json' --glob '!**/current/**' '\[待核对\]' i18n/zh
```

The command preserves existing messages and marks newly extracted entries. Review the markers and `unknown` key warnings: Docusaurus may already provide a default Chinese theme message, and API names may not need translating. Message extraction does not check document prose.

Save intentional translation changes back to `locales/zh/`, then run `pnpm sync-i18n` to clear temporary extraction files. Do not use `--override` for this check. See [AGENTS.md](AGENTS.md) for document writing conventions and further translation checks.

## Old links and language selection

The root `/` and old `/docs/…` links lead to `/en/language`. The original document destination is carried in the `from` parameter. Choosing English opens `/en/docs/…`; choosing Chinese opens `/zh/docs/…`. The original path, query string and fragment are preserved.

The selection page in `src/pages/language.jsx` uses the site's Layout, CSS, cards, buttons and saved light/dark preference. `plugins/legacy-links.cjs` provides its entry pages during development and static builds. There is no automatic language detection or per-page destination mapping.

## Styles

Global styles belong in `src/css/custom.css`. Standalone pages use CSS Modules for their layout and reuse the site theme for colors and controls.

The document wrapper and CSS extraction plugin support scoped project styles, with an empty loader map and no sample CSS installed. See the [directory-style guide](src/theme/DocItem/styles/README.md) to add project styles and verify that they load separately and do not affect other pages.

## Build and deployment

```powershell
pnpm build
pnpm serve --port 4173 --no-open
```

Publish the entire `build/` directory as the static site's root. It contains `en/`, `zh/` and the entry pages for `/` and existing `/docs/…` URLs. Configure the static host to use the root `404.html` as its error page if arbitrary old `/docs/*` paths also need a language-selection fallback.

`pnpm serve` previews the existing build without rebuilding it. Check both language sites and old links before publishing. GitHub Pages deployments can also use `pnpm deploy` with the appropriate repository credentials.

## Contributing

Submit documentation and website changes to [IAFEnvoy/docs](https://github.com/IAFEnvoy/docs). Follow [AGENTS.md](AGENTS.md) for writing style, language maintenance, scoped CSS and validation requirements.

Run `pnpm build` after changing documents, links, translations or theme behavior, and review its warnings as well as the exit status. Run `pnpm test` after changing scripts or routing logic.

## License

Unless otherwise stated, documentation, website code and assets have separate licensing terms:

| Material | Terms | License file |
| --- | --- | --- |
| Documentation articles | Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0) | [LICENSE-ARTICLE](LICENSE-ARTICLE) |
| Website code, scripts and styles | GNU Affero General Public License v3.0 (AGPL v3) | [LICENSE-CODE](LICENSE-CODE) |
| Images, icons, logos and other media assets | All rights reserved, unless explicitly stated otherwise | [LICENSE-ASSETS](LICENSE-ASSETS) |

Third-party dependencies and materials retain their respective licenses and copyright notices. Refer to the linked license files for the full terms.
