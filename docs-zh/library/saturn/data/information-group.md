---
title: "玩家信息分组"
sidebar_position: 8
---

文件：`data/<namespace>/saturn/information_group/<path>.json`。分组选择哪些信息行进入文档，行本身不声明所属分组。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `title` | 可翻译文本组件 | 是 | — | 裸字符串按翻译键解释；也可显式 text / translate。 |
| `order` | 整数 | 否 | `0` | 分组升序排序，随后按 ID。 |
| `rows` | 信息行 ID / #tag 数组 | 是 | — | 引用 information_row 注册表。 |

## 示例

```json title="data/example/saturn/information_group/status.json"
{
  "title": {
    "text": "宿主状态"
  },
  "order": 0,
  "rows": [
    "example:health",
    "#example:extra"
  ]
}
```

```json title="data/example/tags/saturn/information_row/extra.json"
{
  "replace": false,
  "values": [
    "example:health"
  ]
}
```

标签成员展开后去重。分组的 order 与行的 order 分别排序；系统模块的 order 则是越大越靠前，二者不要混用。自定义标签仅被引用后生效，不会自动加入全部分组。
