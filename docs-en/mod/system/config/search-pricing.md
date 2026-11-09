---
title: "Web search billing estimate"
sidebar_position: 5
---

File: `config/system/system-search-pricing.json`. Side: **server**. A missing file is read after being copied from the file of the same name under the JAR's defaults.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `searchPerThousand` | Number or decimal string | no | `"5"` | Estimated CNY price per 1000 successful Search requests, as a non-negative number or decimal string. |
| `fetchPerThousand` | Number or decimal string | no | `"5"` | Estimated CNY price per 1000 successful Fetch requests. |

## Bundled default file

```json title="config/system/system-search-pricing.json"
{
  "searchPerThousand": "5",
  "fetchPerThousand": "5"
}
```
