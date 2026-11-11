---
title: resource_value_provider_type（资源数值来源）
description: 资源数值来源族 resource_value_provider_type 的八种来源、字段、默认值与边界。
---

# resource_value_provider_type（资源数值来源）

<span id="resource-value-provider-type-资源数值来源" />

:::info 与 Saturn 共享的类型
本页只列 MXT 自有类型；与 Saturn 共享的类型（含 `mxt:` 别名写法）见 [Saturn 类型参考](../../../../../library/saturn/types/resource-value.md)。
:::

资源数值来源为一条数值解析出一个数字：当前值、定义上限、恢复速度、距离上限还差多少，以及两种灵气浓度。它不写在资源条里，而是由脚本求值——把对象交给 `MxtValues.evaluateResource(entity, resource, definition)`，`mxt:js` 的回调用 `MxtValues.resourceValue(id, callback)` 注册，见 [KubeJS API 参考](../../../kubejs/api/values.md)。

这一族由模组注册，`type` id 固定，数据包只能选用、无法新增；只有 Java 代码或 KubeJS 桥接能引入自定义来源。

### `mxt:regen` {#mxt-regen}

该数值的灵气定义里的 `regen`，也就是每 tick 的自然恢复量。

| 字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| — | — | — | 没有字段。 |

```json
{"type": "mxt:regen"}
```

### `mxt:environment_concentration` {#mxt-environment-concentration}

该位置的环境模板浓度，不含区块库存以及方块、阵法的贡献。

| 字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| — | — | — | 没有字段。 |

```json
{"type": "mxt:environment_concentration"}
```

### `mxt:actual_concentration` {#mxt-actual-concentration}

该位置最终解析出来的浓度，包含所有已生效来源。

| 字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| — | — | — | 没有字段。 |

```json
{"type": "mxt:actual_concentration"}
```
