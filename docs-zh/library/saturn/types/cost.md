---
title: "费用"
sidebar_label: "费用 (Cost)"
sidebar_position: 11
---

# 费用

费用定义可用于技能、系统商城和抽奖。准备及试算不扣款，实际支付由调用方统一提交；见[费用与支付](../guides/costs.md)。

### `saturn:item` {#saturnitem}

按物品匹配条目选择可支付的背包物品并消耗数量。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:item` |
| `items` | [物品匹配条目](./item-matcher.md)数组 | 是 | — | 物品匹配条目、物品谓词或物品列表。 |
| `amount` | [数值提供器](./number.md) | 是 | — | 数量或数值；数值提供器可使用数字、公式字符串或带 type 的对象。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:item",
  "items": [
    "minecraft:emerald"
  ],
  "amount": 2
}
```

</details>

### `saturn:resource` {#saturnresource}

按数量扣除指定 Saturn 资源。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:resource` |
| `resource` | 资源 ID | 是 | — | 已注册的 Saturn 资源 ID。 |
| `amount` | [数值提供器](./number.md) | 是 | — | 数量或数值；数值提供器可使用数字、公式字符串或带 type 的对象。 |

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:resource",
  "resource": "example:mana",
  "amount": 10
}
```

</details>

## 元类型

以下类型不直接判断具体值，只组合或委托其他同类类型；字段同样嵌入对应位置。

### `saturn:js` {#saturnjs}

调用由 KubeJS 注册的回调，并传入 params 参数。

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `saturn:js` |
| `id` | 字符串 | 是 | — | 回调、选项或条目的标识符。 |
| `params` | 对象 | 否 | `{}` | 传给脚本或公式的参数对象。 |

仅在安装 KubeJS 时注册。JSON 只选择已有回调，不会直接执行 JSON 内的 JavaScript 字符串。

<details>
<summary>示例</summary>

```json
{
  "type": "saturn:js",
  "id": "example_callback",
  "params": {}
}
```

</details>
