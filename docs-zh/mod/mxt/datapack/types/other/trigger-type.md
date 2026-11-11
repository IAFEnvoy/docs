---
title: trigger_type（触发器）
description: 触发器匹配器 saturn:trigger_type 的全部内置条目、字段、默认值与判定规则。
---

# trigger_type（触发器）

<span id="trigger-type-触发器" />

:::info 与 Saturn 共享的类型
本页只列 MXT 自有类型；与 Saturn 共享的类型（含 `mxt:` 别名写法）见 [Saturn 类型参考](../../../../../library/saturn/types/trigger.md)。
:::

触发器匹配器决定技能、突破条件与事件规则响应哪些运行时事件。内置信号匹配器每个条目写死一个信号 id，派发到这一步时回答「到的是不是这个信号」；`mxt:js` 是例外，它的信号由定义自己给出。`type` 写在触发器对象上，取值是下面列出的 id 之一，命名空间固定 `mxt`；整族由固有注册表 `saturn:trigger_type` 分派，数据包只能选用，不能新增。

触发器对象写在[事件规则](../../../../../library/saturn/data/trigger.md)的 `trigger` 字段下，技能与突破条件把一组触发器写在 `triggers` 数组里：

```json
{"type": "mxt:triggered", "triggers": [{"type": "mxt:item_use"}]}
```

除 `mxt:js` 外，这些匹配器都不带字段，整个条目就是 `{"type": ...}` 这一层。

### `mxt:breakthrough` {#mxt-breakthrough}

实体完成了一次突破。

| 字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| — | — | — | 没有字段。 |

```json
{"type": "mxt:breakthrough"}
```

### `mxt:progression_level` {#mxt-progression-level}

某个所有者达到新的进度等级。一次晋升提交之后才发布，所以反应方读到的是新等级。

| 字段 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| — | — | — | 没有字段。 |

```json
{"type": "mxt:progression_level"}
```
