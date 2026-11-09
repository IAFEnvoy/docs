---
title: "Card JSON editor"
sidebar_position: 2
---

import SystemCardEditorWidget from '@site/src/components/SystemCardEditorWidget';

Edit and preview a card directly below. Templates, the node tree, properties, context, text and CSS are all handled in the browser; no AI / speech API is called and in-game data is not modified. When the editing area is narrow you can go full screen or open it separately.

<SystemCardEditorWidget />

The online version and the System documentation use the ApricityUI **t08-arwes opaque theme**. Items, players and FTB icons in the preview are placeholders; the actual layout and native tooltips still follow the in-game AUI. Valid drafts are kept in the current browser; exporting a working file is recommended so they survive clearing site data.

## Local source version

The repository's [html/card-editor](https://github.com/IAFEnvoy/System-Mod/tree/master/html/card-editor) runs on Vite. The commands below are only for maintaining the source locally; the online version above needs no Node.js installation.

Node.js `20.19+` (20 series) or `22.12+` is required; the current LTS is recommended. Run in the repository root:

```powershell
cd html/card-editor
npm ci
npm run dev
```

Open `http://127.0.0.1:5173` in a browser. Changes to template JSON, scripts and styles are refreshed by Vite. The port is fixed and reports an error immediately when it is occupied, so an automatic port change never hides the original site's drafts. The first install needs network access; while the editor runs it only accesses the local Vite server.

```powershell
npm run build
npm run preview
```

The build output is `dist/`; the preview address is `http://127.0.0.1:4173`, and `dist/` can also be deployed to a static HTTP server. The dev and build preview ports differ, so browser drafts are separate; export a working file when you need to move them. Do not double-click the HTML directly. Dependencies, build output and the Vite cache are excluded by [html/.gitignore](https://github.com/IAFEnvoy/System-Mod/blob/master/html/.gitignore), and `package-lock.json` is kept to reproduce dependencies.

## Editing workflow

1. Load a built-in template from the drop-down, or use "Open JSON" / drag in a file to read `assets/<namespace>/cards/*.json`.
2. The node tree on the left supports adding, duplicating, deleting, moving up and moving down. The "Properties" tab in the middle edits known fields, while "Full object JSON" keeps child nodes and custom fields; the raw JSON can also be edited directly.
3. Fill in sample parameters under "Context" and provide translation overrides under "Text". On the right, switch between full, simple and notification modes and languages to inspect layout, groups, collapsing and local paging. Hold Alt and click a node in the preview to navigate to its properties tab.
4. "Export card" downloads JSON usable in a resource pack; put it back at the original resource path and reload resources in game. The browser cannot overwrite the original file directly.

The editor offers field editing and basic type checking for the current `CardTemplate` and the 18 built-in `CardNode` types. Unknown nodes show a placeholder message, and unknown fields are preserved when editing, duplicating and exporting; the fields of custom nodes can be changed in the full object or the raw JSON. On a syntax or structure error the last valid preview is kept, and tree operations and export are paused until the JSON is fixed. It does not run Minecraft's Codec, so the game remains the authority on the final parse result.

Shortcuts: `Ctrl / ⌘ + S` exports the card, `Ctrl / ⌘ + Shift + F` formats it. Undo / redo at the top steps back through valid card versions; inside text boxes the browser's native undo applies. Context, translations and CSS do not take part in card version undo.

## Example context

The context shares a single flat parameter table; dots are part of the key name and cannot be changed into nested objects. `parameters` simulates `CardContext.parameters`; `states` simulates numeric states and loop counts. When a state is not explicit, the editor derives it by the rules of `CardContext.Builder.put`: booleans are 0/1, numbers keep their value, non-empty text is 1, arrays use their length.

```json
{
  "parameters": {
    "summary": "Ding! Today's resources are ready.",
    "host": "Dev",
    "entries": 2,
    "entries.0.name": "Wood",
    "entries.1.name": "Iron Ingot",
    "result_items": [
      { "item": { "id": "minecraft:iron_ingot" }, "amount": "16" }
    ]
  },
  "states": {
    "show_card_title": 0,
    "show_extra": 1
  },
  "callbacks": ["example"]
}
```

`{{id}}`, `{{tr:key}}`, `{{field:id}}`, `{{bool:id}}`, `{{state:id}}`, as well as `when`, `unless`, `repeat` and the loop index `*`, are supported. `full`, `simple`, `notification` and `text_items` are set by the current preview mode; of the first three only the current mode is 1, and `text_items` is always 0 in the browser layout preview.

For example, adding the following node shows two entries:

```json
{
  "type": "system:flex",
  "direction": "column",
  "repeat": "entries",
  "children": [
    { "type": "system:text", "text": "{{entries.*.name}}" }
  ]
}
```

`callbacks` simulates locally trusted callbacks, and buttons declare behavior with click/value; link / return-val / local only record the operation. `result_actions` can provide a simulated button list. Clicking a button only records the action below the preview; it sends no packet, opens no link, claims no reward and makes no purchase. The buttons at the bottom of a notification are simulated controls that are still defined by game code and cannot be changed through card JSON.

## Working files and drafts

"Export working file" produces a `.card-project.json` with `format: "system-card-editor"`, storing the card, example context, translation overrides and custom preview CSS. Reopening that file restores the editing environment; it cannot serve directly as a game card resource and needs a card export first.

Valid edits are written to the current site's browser local draft on a best-effort basis and restored the next time the same address is opened. After a change of protocol, host or port the draft is not migrated automatically; a draft from the old single-file page can be exported as a working file first and then opened in the new editor. Export a working file when you need to keep it long term. Clearing the draft does not clear the current workspace, and continued editing saves it again.

## Preview scope and built-in snapshot

`src/resources/` holds a snapshot of the current 28 card templates, the Chinese and English language tables and the shared `assistant.css`. Templates live in `templates/*.json` and can be modified or added individually; Vite collects them through `import.meta.glob`, so there is no embedded list in the HTML to maintain. The snapshot does not automatically pick up later changes to game resources; see [client JSON cards](overview.md) for the full fields and the in-game layout rules.

The browser preview is for checking structure and parameter substitution, and differs from AUI's layout implementation: items, FTB icons and player models are drawn as placeholder blocks with plain tooltips; Saturn player information uses example parameters; Markdown only approximates headings, lists, quotes, code, emphasis and links. Resource pack textures, native tooltips, theme details, button permissions and business behavior have to be confirmed in game. The preview caps loops and node drawing, while the exported JSON stays complete.

## Source layout and resource sync

```text
html/
├── .gitignore
└── card-editor/
    ├── index.html                  page and controls
    ├── package.json / package-lock.json
    ├── vite.config.js
    ├── scripts/sync-resources.mjs  update the snapshot from game resources
    └── src/
        ├── main.js                entry point and page CSS
        ├── editor.js              tree, properties, JSON editing, import/export and drafts
        ├── schema.js              node catalogue, field descriptions and structure checks
        ├── preview.js             browser projection and local interaction inside the iframe
        ├── sample-context.js      flat example parameters
        ├── resources.js           Vite resource collection
        ├── utils.js               shared JSON / path helpers
        ├── styles/
        │   ├── editor.css         editor page styles
        │   └── preview.css        browser preview adaptation styles
        └── resources/
            ├── templates/*.json   each template maintained separately
            ├── lang/*.json        Chinese and English language snapshots
            ├── assistant.css      snapshot of the shared in-game styles
            └── snapshot.json      date of the last sync
```

When adding a game node, update the field catalogue in `schema.js` and the browser projection in `preview.js`. The preview stays in a script-disabled sandbox iframe; imported content is drawn as text and nodes, and neither HTML nor card button business logic is executed directly.

Run the following command in the editor directory to refresh the resource snapshot from the repository:

```powershell
npm run sync:resources
```

The command reads `src/main/resources/assets/system/cards/*.json`, `assets/system/lang/{zh_cn,en_us}.json` and `assets/apricityui/apricity/system/assistant.css`; it parses the inputs first, then overwrites the corresponding editor files, deletes template snapshots that no longer exist in the game resources, and updates the date. The command overwrites manual changes to snapshot files, so save layouts you want to keep into game resources or an export file first. Normal startup or builds do not overwrite the snapshot automatically; to look at the latest cards temporarily you can still use "Open JSON".
