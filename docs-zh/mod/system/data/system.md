---
title: "系统定义"
sidebar_position: 1
---

注册表：`system:system`。定义系统名称、介绍、启用模块以及自由聊天人格。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `name` | 翻译键 | 是 | — | 系统名称，由客户端按玩家语言翻译。 |
| `description` | 翻译键 | 是 | — | 系统介绍。 |
| `modules` | 模块引用数组 | 否 | `[]` | 模块配置 ID、#tag，或含 id 与 condition 的对象。 |
| `personality_prompt` | 提示词 ID | 否 | 省略 | 追加到自由聊天提示词；不影响专用业务提示词。 |

## 示例

```json title="data/example/system/system/daily.json"
{
  "name": "example.system.daily.name",
  "description": "example.system.daily.description",
  "personality_prompt": "example:personality/daily",
  "modules": [
    "#example:basic",
    {
      "id": "system:shop",
      "condition": {
        "type": "system:has_module",
        "module": "system:signin"
      }
    }
  ]
}
```

`example:personality/daily` 对应 `data/example/system/prompts/personality/daily.txt`。名称和介绍还需客户端资源包提供翻译：

```json title="assets/example/lang/zh_cn.json"
{
  "example.system.daily.name": "签到系统",
  "example.system.daily.description": "每日为宿主提供道具与资源。"
}
```

## 模块引用

`id` 引用的是[模块配置](./module.md)，不是 Agent 工作流或服务端实现类。`condition` 使用 Saturn [实体条件](../../../library/saturn/types/entity-condition/index.md)，省略表示无条件。tag 成员分别求值，重叠引用取并集；手动禁用优先于定义，手动添加可覆盖条件。

创建 `data/example/tags/system/system_module/basic.json`，例如：

```json
{
  "replace": false,
  "values": [
    "system:player",
    "system:items",
    "system:signin",
    "system:inbox"
  ]
}
```

使用 `/system grant example:daily [玩家]` 绑定。当前一位玩家最多一个系统；更换系统前需撤销旧绑定。基础设施 core、binding、usage 不受普通模块条件关闭。
