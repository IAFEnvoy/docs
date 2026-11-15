---
title: "装备工坊"
sidebar_position: 10
---

`system:workshop` 提供主手装备维修。系统输入框执行 `/repair` 或 `/维修`，先展示耐久与费用，点击确认后才付款并恢复全部耐久。报价和确认均不需要 AI。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `system:workshop`。 |
| `costs` | [Saturn 费用](../../../../library/saturn/types/cost.md)数组 | 是 | — | 每件物品的维修费；显式 `[]` 表示免费。 |

费用字段必填，解析失败不会容错成免费维修。可使用物品、Saturn 资源或[系统货币费用](../cost/currency.md)。

## 完整模块示例

```json title="data/example/system/system_module/repair.json"
{
  "order": 45,
  "server": {
    "type": "system:workshop",
    "costs": [
      { "type": "saturn:item", "items": ["minecraft:emerald"], "amount": 1 }
    ]
  },
  "client": "system:workshop"
}
```

公共字段见[模块定义](../../data/module.md)。内置配置已加入默认模块 tag，费用为每件 1 颗绿宝石，不随损耗变化。

报价两分钟后过期，只保留最新一份。切换栏位、替换物品、改变耐久或组件、重连后，旧报价不能确认。物品费用排除维修目标所在格位；付款或修复结果不确定时不自动重试。当前不包含批量维修、重铸或强化。

## Java 入口

`com.iafenvoy.system.module.builtin.WorkshopSystemModule`，业务服务为 `assistant.workshop.Workshop`。
