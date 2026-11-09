# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

### Installation

```
$ pnpm install
```

### Local Development

```
$ pnpm start
```

This command starts both language sites behind one development address and opens a browser window. English is at `http://localhost:3000/en/`, and Chinese is at `http://localhost:3000/zh/`. The root address lets visitors choose a language. Language switching and hot reload work on the same port. Pass `--port 4000` to change the public port, or `--no-open` to keep the browser closed.

To run a single language, use `pnpm start --locale en` or `pnpm start --locale zh`. Docusaurus's unwrapped `start` command only serves one language at a time.

### Build

```
$ pnpm build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Languages and source directories

- `docs-en/`: default English documentation, published at `/en/docs/`.
- `docs-zh/`: Chinese documents and overrides, published at `/zh/docs/`. Use the same relative file names as English. Documents not yet translated use the English source.
- `locales/zh/`: translations for the homepage, navigation, footer, and other UI.
- `src/data/sidebar-labels.json`: English and Chinese sidebar/category labels. API names and project names can remain unchanged.
- `i18n/`: generated output, ignored by Git. Do not edit this directory directly.

`pnpm start`, `pnpm build`, and `pnpm deploy` automatically copy English fallback files, Chinese overrides, and UI translations into the native Docusaurus i18n layout. The development command also watches these source directories, including when running `pnpm start --locale zh`. Run `pnpm sync-i18n` to regenerate translations manually. `pnpm build` builds both languages; `pnpm serve` serves the result with working language switching.

`pnpm write-translations --locale zh` extracts native translation messages. Copy any extracted JSON you want to maintain from `i18n/zh/` back into `locales/zh/`; the generated `docusaurus-plugin-content-docs/current/` directory contains documents, not UI messages.

Only a few documents have been translated initially: Ice And Fire CE introduction and modder tricks, Jupiter introduction and installation, Pendulum introduction, and the English Mixin introduction. Existing Chinese Mixin tutorials and FAQ are preserved in `docs-zh/`.

### Compatibility with old links

Opening an old `/docs/…` URL shows a language choice. English opens `/en/docs/…` and Chinese opens `/zh/docs/…`; the rest of the path, query string and fragment stay unchanged. The root `/` also offers both languages. `plugins/legacy-links.cjs` serves the choice during development and generates static choice pages for the existing document URLs during builds. The root `404.html` also supports arbitrary old `/docs/*` URLs when the static host uses it as its error page. There are no per-page redirects or automatic language detection.

### Directory styles

The directory-style loader and CSS extraction plugin remain available, with an empty loader map and no sample CSS. See [the directory-style guide](src/theme/DocItem/styles/README.md) for adding scoped project styles and checking their behavior. Global theme defaults stay in `src/css/custom.css`; the homepage and 404 page use CSS modules.

Run `pnpm test` to verify translation synchronization and fallback handling.

### Deployment

Using SSH:

```
$ USE_SSH=true pnpm deploy
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> pnpm deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
