---
title: "模块定义"
sidebar_position: 2
---

注册表：`system:system_module`。一个条目把服务端类型、客户端入口和显示顺序组合成可配置模块实例。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `server` | 服务端模块对象 | 否 | 省略 | 通过 type 分派，额外字段由具体模块 Codec 读取。 |
| `client` | 客户端实现 ID | 否 | 省略 | 选择已注册客户端实现；服务端不加载对应客户端类。 |
| `order` | 整数 | 否 | `0` | 越大越靠前，仅影响界面入口顺序。 |

## 示例

```json title="data/example/system/system_module/daily.json"
{
  "order": 80,
  "server": {
    "type": "system:signin",
    "rewards": [
      "#example:starter",
      "example:daily_iron"
    ]
  },
  "client": "system:signin"
}
```

引用的奖励或标签需要另行定义。系统填写 `"modules": ["example:daily"]`。同一实现可有多个参数不同的配置；服务端工作流按玩家启用的配置选择，多个候选同时启用时按配置 ID 排序取首项，建议条件互斥。

签到的 rewards、商城的 offers、抽奖的 pools 均支持单 ID、#tag 或混合数组。省略不增加该字段限制，空数组表示无可选项；内置配置明确选择各自目录的 #system:default。多个启用配置的可用目录取并集。

纯服务端模块可只填 server；纯客户端贡献可只填 client。`order` 相同保留原有装配顺序；同一客户端实现合并展示时取最大 order。内置玩家信息 100、任务 90、签到 80、收件箱 70、商城 60、抽奖 50、物品查询 40。

具体 server 字段见[模块类型目录](../types/module/index.md)。玩家覆盖可由 `/system module add/remove <玩家> <模块ID>` 管理；`/system module list [玩家]` 查看模块并补全 ID。
