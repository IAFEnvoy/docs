---
title: "联网计费估算"
sidebar_position: 5
---

文件：`config/system/system-search-pricing.json`。作用侧：**服务端**。缺失文件由 JAR 内的同名 defaults 文件复制后读取。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `searchPerThousand` | 数值或十进制字符串 | 否 | `"5"` | 每 1000 次成功 Search 请求的人民币估算价，非负数或十进制字符串。 |
| `fetchPerThousand` | 数值或十进制字符串 | 否 | `"5"` | 每 1000 次成功 Fetch 请求的人民币估算价。 |

## 随附默认文件

```json title="config/system/system-search-pricing.json"
{
  "searchPerThousand": "5",
  "fetchPerThousand": "5"
}
```
