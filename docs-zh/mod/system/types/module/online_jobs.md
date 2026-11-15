---
title: "在线作业"
sidebar_position: 10
---

`system:online_jobs` 提供在线计时作业。模块类型使用复数，作业数据注册表使用单数 `system:online_job`。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `system:online_jobs`。 |
| `jobs` | ID、#tag 或混合数组 | 否 | 全表 | 可开始的作业，`[]` 表示没有可选项。 |

## 完整模块示例

```json title="data/example/system/system_module/jobs.json"
{
  "order": 40,
  "server": { "type": "system:online_jobs", "jobs": "#system:default" },
  "client": "system:online_jobs"
}
```

公共字段见[模块定义](../../data/module.md)，作业与 tag 见[在线作业定义](../../data/online-job.md)。内置配置已加入默认模块 tag。同类变体按工作流规则选择玩家启用的首个配置，其 `jobs` 决定本次候选，建议变体条件互斥。

## 玩家操作

在系统输入框执行 `/jobs` 或 `/作业`，也可点击“在线作业”；`/work <ID>` 或 `/开工 <ID>` 开始作业。同时最多运行一项，完成后手动入账至收件箱，再通过收件箱领取到背包。完成入账后可开始下一项，不必先清空收件箱。

计时使用成功分发的在线模块 tick，20 tick 为一秒；登出或所有同类模块停用时暂停。完成后不自动重复，未完成可取消并放弃进度。卡片显示查询时的快照，点击刷新更新。同类变体共用一份账本，不会叠加计时速度；领取、取消按钮绑定运行 ID，旧按钮不会操作新作业。

## Java 入口

`com.iafenvoy.system.module.builtin.OnlineJobsSystemModule`；数据通过 `module.builtin.storage.OnlineJobsDataStorage` 保存。
