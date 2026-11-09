---
title: "FTB 任务"
sidebar_position: 10
---

`system:ftb_quests`

提供任务查询、详情、提交、领奖、礼包和说明书检索。

写入模块定义的 server 对象，以 type 选择实现。系统的 modules 引用模块配置 ID，不能直接放实现类型对象。公共结构见[模块定义](../../data/module.md)。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `system:ftb_quests` |

需要安装 FTB Quests 及其依赖。Codec 保持安全注册，依赖缺席时跳过模块装配；发布包不预装该模块配置，须自行提供。

## JSON 示例

```json
{
  "type": "system:ftb_quests"
}
```

该示例是模块定义的 `server` 值；完整文件还可以设置 `client` 和 `order`。

## Java 入口

`com.iafenvoy.system.module.builtin.QuestSystemModule`。本页按当前 26.1.2 源码的 Codec 整理。
