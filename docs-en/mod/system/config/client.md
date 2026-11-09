---
title: "Interface and pinned cards"
sidebar_position: 9
---

File: `config/system/system-client.json`. Side: **client**. A missing file is read after being copied from the file of the same name under the JAR's defaults.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `simpleMode` | Boolean | no | `false` | Enables simple mode. |
| `theme` | String | no | `"t09-arwes-transparent"` | AUI theme ID, shared by all System screens. |
| `cardAnimations` | Boolean | no | `true` | Toggles enter / exit animations for pinned cards. |
| `cardsOnOtherScreens` | Boolean | no | `false` | Shows pinned cards on other permitted in-game screens; the pause and settings screens follow the screen policy. |

## Bundled default file

```json title="config/system/system-client.json"
{
  "simpleMode": false,
  "theme": "t09-arwes-transparent",
  "cardAnimations": true,
  "cardsOnOtherScreens": false
}
```
