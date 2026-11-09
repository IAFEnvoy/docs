---
title: "每日签到"
sidebar_position: 10
---

`system:signin`

提供签到、奖励选择及奖励入账。

写入模块定义的 server 对象，以 type 选择实现。系统的 modules 引用模块配置 ID，不能直接放实现类型对象。公共结构见[模块定义](../../data/module.md)。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `system:signin` |
| `rewards` | ID、#tag 或混合数组 | 否 | 省略 | 可选签到奖励 ID、#tag 或混合数组。 |

选项省略时不添加此处的目录限制；显式空数组表示没有可选项。内置模块配置使用各自目录的 `#system:default`。所有启用同类配置的选项取并集，扣款与领取前再次检查权限。

## JSON 示例

```json
{
  "type": "system:signin",
  "rewards": "#system:default"
}
```

该示例是模块定义的 `server` 值；完整文件还可以设置 `client` 和 `order`。

## Java 入口

`com.iafenvoy.system.module.builtin.SignInSystemModule`。本页按当前 26.1.2 源码的 Codec 整理。
