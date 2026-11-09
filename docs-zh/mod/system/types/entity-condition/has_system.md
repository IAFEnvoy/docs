---
title: "绑定系统"
sidebar_position: 10
---

`system:has_system`

检查玩家是否绑定并初始化了系统，可筛选系统 ID。

注册到 Saturn 的实体条件注册表，可与 Saturn 的同类组合节点搭配。实体须为服务端玩家，且系统运行时已就绪。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `system:has_system` |
| `system` | 资源 ID | 否 | 省略 | 要匹配的系统定义 ID；省略匹配任意已绑定系统。 |

## JSON 示例

```json
{
  "type": "system:has_system"
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.system.data.condition.HasSystemCondition`。本页按当前 26.1.2 源码的 Codec 整理。
