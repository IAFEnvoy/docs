---
title: information_group（信息分组）
description: 通过单行 ID 或信息行标签组织人物信息面板。
---

# information_group（信息分组）

<span id="information-group-信息分组" />

文件路径为 `data/<命名空间>/saturn/information_group/<名称>.json`。内置 `mxt:cultivation` 选取修炼行标签：

```json
{
  "title": "info.mxt.cultivation",
  "order": 100,
  "rows": ["#mxt:cultivation"]
}
```

| 字段 | 默认值 | 含义 |
| --- | --- | --- |
| `title` | 必填 | 翻译键字符串或文本组件形式的组名 |
| `order` | `0` | 分组排序，越小越靠前 |
| `rows` | 必填 | [信息行](./information_row.md) ID 或 `#标签` 的数组，可为空 |

向修炼面板追加 `example:realm`，写入 `data/mxt/tags/saturn/information_row/cultivation.json`：

```json
{
  "replace": false,
  "values": ["example:realm"]
}
```

对应信息行定义放在 `data/example/saturn/information_row/realm.json`。`replace: false` 追加，`replace: true` 替换该标签已有的选取范围。同一行可加入多个组，单行引用、标签和多个组相交时按 ID 去重。

组内展示顺序由行的 `order` 和 ID 决定，不由标签数组顺序决定。全取会包含未分组的行。引用不存在的单行 ID 会阻止定义加载，不存在的标签按空集合处理。

修改定义后重新打开世界或重启服务端。管理员可用 `/saturn information @s mxt:cultivation` 检查分组输出；该命令只回复执行者。
