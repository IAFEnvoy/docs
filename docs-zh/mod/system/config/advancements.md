---
title: "成就触发工作流"
sidebar_position: 7
---

文件：`config/system/system-advancements.json`。作用侧：**服务端**。缺失文件由 JAR 内的同名 defaults 文件复制后读取。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `rules` | 数组 | 否 | `[]` | 成就 ID 与已有 Agent 动作的绑定列表；当前仍使用系统自身监听。 |

## rules 条目

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `id` | 资源 ID | 是 | — | 规则稳定标识。 |
| `advancementId` | 资源 ID | 是 | — | 要监听完成的原版 / 模组进度 ID。 |
| `action` | AgentAction 对象 | 是 | — | 以 type 分派到已有工作流参数，格式由该工作流定义。 |

默认规则为空。这不是 Saturn EntityAction 的通用替代品，也不会自动接受 Saturn trigger 的 JSON。Saturn 已新增成就完成触发器，系统此处尚未接入。

## 随附默认文件

```json title="config/system/system-advancements.json"
{
  "rules": []
}
```
