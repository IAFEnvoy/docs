---
title: "Card nodes"
sidebar_position: 0
---

Nodes are written into the body or children of a resource pack card template. Besides their own fields, all nodes share id, style, when, unless and repeat; see [Common node fields](../../cards/node-common.md).

| Type | Purpose |
| --- | --- |
| [`system:text`](./text.md) | Shows text, a translation component or existing formatted text. |
| [`system:markdown`](./markdown.md) | Parses the controlled Markdown in AI replies. |
| [`system:title`](./title.md) | Shows heading text and lets the host extract it as the card title. |
| [`system:image`](./image.md) | Shows an image from the resource pack. |
| [`system:item`](./item.md) | Renders the item snapshot in the context and shows the item tooltip on hover. |
| [`system:player`](./player.md) | Renders the player model given by the context, with controllable facing, scale and mouse following. |
| [`system:ftb_icon`](./ftb_icon.md) | Shows the FTB quest or reward icon from the server snapshot. |
| [`system:flex`](./flex.md) | Organizes child nodes horizontally or vertically, and can iterate over a collection and paginate it. |
| [`system:grid`](./grid.md) | Builds only the cells of the current page and computes the page capacity from the column count and the maximum rows. |
| [`system:container`](./container.md) | Holds item slot contents or lays out child elements. |
| [`system:groups`](./groups.md) | Builds groups from the current query results; after a selection only the content inside the group is shown. |
| [`system:details`](./details.md) | Expands or collapses child nodes with a clickable summary. |
| [`system:button`](./button.md) | Runs a client callback, opens a URL or sends a string to the server. |
| [`system:link`](./link.md) | Opens a link through the vanilla URL confirmation flow. |
| [`system:divider`](./divider.md) | Shows a layout divider line. |
| [`system:progress`](./progress.md) | Shows the progress value provided by the context. |
| [`system:player_information`](./player_information.md) | Renders the Saturn information document directly and filters it by minimum importance. |
| [`system:recipe`](./recipe.md) | Shows a single ordered recipe and its ingredients from the context. |
