---
title: "资源条上下文"
sidebar_label: "资源条上下文 (ResourceBarContext)"
sidebar_position: 19
---

# 资源条上下文

ResourceBar.context 使用字符串 ID，而不是带 type 的对象。上下文是否被实际绘制仍取决于宿主界面。

### `saturn:boss_overlay` {#saturnboss_overlay}

为 Boss 资源条提供显示上下文。

该类型直接使用字符串 ID，没有额外 JSON 字段。

<details>
<summary>示例</summary>

```json
"saturn:boss_overlay"
```

</details>

### `saturn:self_hud` {#saturnself_hud}

显示当前玩家自身资源。

该类型直接使用字符串 ID，没有额外 JSON 字段。

<details>
<summary>示例</summary>

```json
"saturn:self_hud"
```

</details>

### `saturn:target_overlay` {#saturntarget_overlay}

为当前目标提供资源显示上下文。

该类型直接使用字符串 ID，没有额外 JSON 字段。

<details>
<summary>示例</summary>

```json
"saturn:target_overlay"
```

</details>
