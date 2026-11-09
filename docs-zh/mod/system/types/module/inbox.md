---
title: "收件箱"
sidebar_position: 10
---

`system:inbox`

展示待领取权益并执行物品交付。

写入模块定义的 server 对象，以 type 选择实现。系统的 modules 引用模块配置 ID，不能直接放实现类型对象。公共结构见[模块定义](../../data/module.md)。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `system:inbox` |

## JSON 示例

```json
{
  "type": "system:inbox"
}
```

该示例是模块定义的 `server` 值；完整文件还可以设置 `client` 和 `order`。

## Java 入口

`com.iafenvoy.system.module.builtin.InboxSystemModule`。本页按当前 26.1.2 源码的 Codec 整理。
