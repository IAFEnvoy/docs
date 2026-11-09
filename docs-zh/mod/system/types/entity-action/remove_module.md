---
title: "移除模块"
sidebar_position: 10
---

`system:remove_module`

为已绑定玩家持久禁用模块。

注册到 Saturn 的实体动作注册表，可与 Saturn 的同类组合节点搭配。实体须为服务端玩家，且系统运行时已就绪。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `system:remove_module` |
| `module` | 资源 ID | 是 | — | 动态 system_module 注册表中的模块配置 ID。 |

## JSON 示例

```json
{
  "type": "system:remove_module",
  "module": "system:lottery"
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.system.data.action.RemoveModuleAction`。本页按当前 26.1.2 源码的 Codec 整理。
