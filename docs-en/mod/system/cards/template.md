---
title: "Card template"
sidebar_position: 1
---

File: `assets/<namespace>/cards/<path>.json`, loaded from the client resource pack. For example, `assets/system/cards/shop_catalog.json` overrides the shop catalog layout. The server sends the business snapshot, and the client creates cards from the CardBuilder template and parameters; changing a template does not change prices, quest completion state or reward results.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `style` | String or string array | no | `"result_card"` | CSS class names; an array is joined with spaces. |
| `show_title` | Boolean | no | `true` | Whether to show the main title provided by CardBuilder. |
| `hide_summary` | Boolean | no | `false` | Whether to hide the host summary. |
| `body` | [Node](../types/node/index.md) array | yes | — | Body layout. |
| `actions` | Action display settings | no | Default settings | See the table below; does not create server-side business buttons. |
| `actions.numbered` | Boolean | no | `true` | Whether to show numbers for existing actions. |
| `actions.label` | Node array | no | `[]` | Action label format; an empty array uses the original labels. |

## Example

```json title="assets/example/cards/result.json"
{
  "show_title": true,
  "hide_summary": true,
  "body": [
    {
      "type": "system:markdown",
      "text": "{{summary}}"
    },
    {
      "type": "system:flex",
      "source": "{{actions}}",
      "direction": "row",
      "children": [
        {
          "type": "system:button",
          "text": "{{actions.*.label}}",
          "click": "{{actions.*.click_type}}",
          "value": "{{actions.*.value}}",
          "disabled": "{{actions.*.disabled}}",
          "behavior": "{{actions.*.behavior}}"
        }
      ]
    }
  ]
}
```

Buttons come from the server snapshot or the client context. To use this template, CardBuilder must select `example:result`; adding only a new template file does not make existing messages switch automatically.

## Plain-text convention

When there is only one body element implementing `PlainMessageNode` (built in as `system:text`), `repeat` is not used, and there are no action buttons or extra title/summary content, the card can be displayed as an ordinary message. `system:markdown` keeps its own card layout. With buttons or other content it remains a card, and bottom controls such as notification confirmation are provided by the host code.

## Templates, context and build events

The card data implementation is responsible for creating the CardBuilder and setting the template, title, parameters and buttons; the interface, icons and callbacks are only accessed during client rendering. Extensions can add parameters in the card build event, which resource packs then use as placeholders. For the complete conventions, see [Card overview](./overview.md), [Common node fields](./node-common.md) and [Editor](./editor.md).
