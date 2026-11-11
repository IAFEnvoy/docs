---
title: cost_type（消耗）
description: 消耗 saturn:cost_type 的全部内置条目、字段、默认值与判定规则。
---

# cost_type（消耗）

<span id="cost-type-消耗" />

:::info 与 Saturn 共享的类型
本页只列 MXT 自有类型；与 Saturn 共享的类型（含 `mxt:` 别名写法）见 [Saturn 类型参考](../../../../../library/saturn/types/cost.md)。
:::

需要消耗东西的字段统一是数组，每项写一种 `Cost`。写 `type` 的四种由固有注册表 `saturn:cost_type` 分派：`saturn:resource`、`mxt:aura`、`mxt:item`、`mxt:js`；另一种是不写 `type`、只写 `id` 与 `amount` 的简写，读作 `saturn:resource`。整族由模组注册，数据包只能选用，不能新增。整份数组的全有或全无语义、通道规则与共用的求值口径见[共享数据类型 · `Cost`](../shared_data_types.md#cost)。

这一族被满包引用——技能、法器、功法、符箓、修炼、阵法、丹药等定义里凡是「要扣什么」的字段都写成一组 `Cost`，所以它没有专属的定义页，只是一页独立的类型页；`costs` 出现在哪张定义里由那张定义页自己写。

### `mxt:aura` {#mxt-aura}

按灵气身份消耗。

| 字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `aura` | 灵气 id | **必填** | 要消耗的灵气身份 |
| `amount` | `NumberProvider` | **必填** | 要消耗的数量；必须求值为有限正数 |

```json
{"type": "mxt:aura", "aura": "example:fire_qi", "amount": 2}
```

扣的是什么由付款通道决定：付款者自己支付时扣**这门灵气所度量的那个数值**（付款者身上装的是数值，不是灵气），从共享灵气池或方块存量支付时扣这门灵气本身，后者按整单位向上取整。两条通道的差别见[共享数据类型 · `Cost`](../shared_data_types.md#cost)。
