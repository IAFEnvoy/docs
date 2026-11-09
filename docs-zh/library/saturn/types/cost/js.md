---
title: "脚本回调"
sidebar_position: 10
---

`saturn:js`

调用由 KubeJS 注册的回调，并传入 params 参数。

费用定义可用于技能、系统商城和抽奖。准备及试算不扣款，实际支付由调用方统一提交；见[费用与支付](../../guides/costs.md)。

## JSON 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:js` |
| `id` | 字符串 | 是 | — | 回调、选项或条目的标识符。 |
| `params` | 对象 | 否 | `{}` | 传给脚本或公式的参数对象。 |

仅在安装 KubeJS 时注册。JSON 只选择已有回调，不会直接执行 JSON 内的 JavaScript 字符串。

## JSON 示例

```json
{
  "type": "saturn:js",
  "id": "example_callback",
  "params": {}
}
```

这是可嵌入相应字段的值，不是单独可加载的数据包文件。示例中的 `example:` 引用需要替换为已定义的条目。

## Java 入口

`com.iafenvoy.saturn.data.cost.builtin.JsCost`。本页按当前 26.1.2 源码的 Codec 整理。
