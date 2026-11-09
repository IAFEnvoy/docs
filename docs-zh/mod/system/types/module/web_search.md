---
title: "联网搜索"
sidebar_position: 10
---

`system:web_search`

提供显式授权后的 DeepSeek Search 与 Fetch 能力。

写入模块定义的 server 对象，以 type 选择实现。系统的 modules 引用模块配置 ID，不能直接放实现类型对象。公共结构见[模块定义](../../data/module.md)。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `system:web_search` |

发布包不默认授予搜索模块。管理员配置并启用后，仍要求本次请求明确允许联网；Search 与 Fetch 各按 5 元 / 1000 次成功请求估价。

## JSON 示例

```json
{
  "type": "system:web_search"
}
```

该示例是模块定义的 `server` 值；完整文件还可以设置 `client` 和 `order`。

## Java 入口

`com.iafenvoy.system.module.builtin.SearchSystemModule`。本页按当前 26.1.2 源码的 Codec 整理。
