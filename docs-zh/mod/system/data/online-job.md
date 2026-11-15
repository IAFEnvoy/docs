---
title: "在线作业定义"
sidebar_position: 8
---

注册表：`system:online_job`。定义只在服务端加载，客户端接收查询所需的卡片快照。注意注册表使用单数，模块类型仍为 `system:online_jobs`。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `label` | 翻译键字符串或文本组件 | 是 | — | 作业名称。 |
| `description` | 翻译键字符串或文本组件 | 否 | 空文本 | 作业介绍。 |
| `duration` | 正整数 long | 是 | — | 在线秒数，乘以 20 后必须能用 long 表示 tick。 |
| `items` | ItemStackTemplate 数组 | 是 | — | 完成后获得的物品包，1～36 项。 |
| `enabled` | 布尔值 | 否 | `true` | 是否允许开始新作业。 |
| `order` | 整数 | 否 | `0` | 越大越靠前，同值按 ID 排序。 |

## 示例

```json title="data/example/system/online_job/gather_wood.json"
{
  "label": "example.job.wood",
  "description": "example.job.wood.description",
  "duration": 60,
  "items": [{ "id": "minecraft:oak_log", "count": 4 }],
  "enabled": true,
  "order": 30
}
```

名称和介绍使用[内联翻译键](./index.md#translated-text)，语言文件由客户端资源包提供。

```json title="data/example/tags/system/online_job/gathering.json"
{
  "replace": false,
  "values": ["example:gather_wood"]
}
```

在[在线作业模块](../types/module/online_jobs.md)设置 `"jobs": "#example:gathering"`。默认模块只选择 `#system:default`，仅新增定义不会自动进入默认候选集。

作业按在线 tick 推进，不要求玩家实际采集，也不消耗输入材料。已开始的作业保存定义快照，不受之后修改产物或删除定义影响。定义修改需重开世界或重启服务器，tag 按原版重载规则更新。

## Java 入口

`com.iafenvoy.system.data.catalog.OnlineJobEntry`，注册键为 `SystemResourceKeys.ONLINE_JOB`。
