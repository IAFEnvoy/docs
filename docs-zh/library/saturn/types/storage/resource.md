---
title: "资源状态"
sidebar_position: 10
---

`saturn:resource`

保存资源引用和对应数量；未填值的对象只声明存储类型。

DataStorage 是运行时状态的 Codec，不是独立数据包注册表。技能类型声明所需状态；宿主负责创建、tick、持久化以及修改后的 markDirty。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:resource` |
| `resource` | 资源 ID | 否 | 省略 | 已注册的 Saturn 资源 ID。 |
| `amount` | 数值 | 否 | 省略 | 数量或数值；数值提供器可使用数字、公式字符串或带 type 的对象。 |

## JSON 示例

```json
{
  "type": "saturn:resource"
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.storage.builtin.ResourceDataStorage`。本页按当前 26.1.2 源码的 Codec 整理。
