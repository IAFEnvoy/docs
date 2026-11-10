---
title: Group 与 Option
description: 配置单选、多选、重复购买、动态数量与前置和互斥规则。
sidebar_position: 2
---

Group 定义选择方式和组计数，Option 定义单项数量、价格、条件与奖励。两者都不写 `key`；公式别名从完整注册 ID 自动生成。

## Group

文件为 `data/<namespace>/spb/group/<path>.json`。

| 字段 | 类型 | 必填 | 默认值 | 作用 |
| --- | --- | --- | --- | --- |
| `title` | 文本组件 | 是 | — | 组标题 |
| `description` | 文本组件 | 否 | 无 | 组说明 |
| `mode` | `single` / `multiple` | 是 | — | 单选或多选 |
| `count_mode` | `distinct` / `total` | 否 | `distinct` | 已选种类数或总份数 |
| `min_count` | NumberProvider | 否 | `0` | 最少组计数，向上取整 |
| `max_count` | NumberProvider | 否 | 单选 `1`，多选为组容量 | 最多组计数，向下取整 |
| `visible_condition` | Saturn EntityCondition | 否 | 始终显示 | 整组的显示条件 |
| `options` | Option ID 或 `#tag` 数组 | 是 | — | 选项及显示顺序 |

```json title="data/example/spb/group/profession.json"
{
  "title": {"text": "职业"},
  "mode": "single",
  "min_count": 1,
  "max_count": 1,
  "options": ["example:warrior", "example:scholar"]
}
```

`single` 总是最多选一项，组内每个 Option 的 `hard_max` 必须是 `1`。选择新项会在一次编辑中清除旧项。`min_count: 1` 表示必选；省略时允许不选。

多选组中，若训练选了 4 份、弓术选了 1 份，则 `distinct` 计数为 `2`，`total` 为 `5`。多选组的默认容量分别为选项种类数或各项 `hard_max` 之和。显式最大值仍受组容量限制。

动态上限例如 `"max_count": "1 + selected_example_scholar"`：选择学者后，多选组名额从 1 变为 2。上下限必须产生合法非负范围；无效范围阻止完成。

## Option

文件为 `data/<namespace>/spb/option/<path>.json`。

| 字段 | 类型 | 必填 | 默认值 | 作用 |
| --- | --- | --- | --- | --- |
| `name` | 文本组件 | 是 | — | 选项名称 |
| `description` | 文本组件 | 否 | 无 | 悬停说明 |
| `icon` | Saturn IconReference | 否 | 无 | 物品或纹理图标 |
| `hard_max` | 正整数 | 否 | `1` | 固定硬上限，也是网络编辑的数量边界 |
| `min_count` | NumberProvider | 否 | `1` | 选中时最少份数，向上取整 |
| `max_count` | NumberProvider | 否 | `hard_max` | 动态最大份数，向下取整并受硬上限限制 |
| `visible_condition` | Saturn EntityCondition | 否 | 始终显示 | 是否显示 |
| `enabled_condition` | Saturn EntityCondition | 否 | 始终可用 | 是否允许增加；允许取消已选项 |
| `validation_rules` | 校验规则数组 | 否 | `[]` | 已选时检查的前置、互斥或组合规则 |
| `resource_changes` | 已定义 resource ID → NumberProvider | 否 | `{}` | 每份选择贡献的有符号数值 |
| `outcomes` | [Outcome](./rewards.md) 数组 | 否 | `[]` | 选中且条件通过时的提交奖励 |

```json title="data/example/spb/option/strength.json"
{
  "name": {"text": "力量训练"},
  "icon": {"id": "minecraft:iron_pickaxe"},
  "hard_max": 4,
  "min_count": 1,
  "max_count": "2 + 2 * selected_example_warrior",
  "resource_changes": {"example:points": -1, "example:strength": 1}
}
```

选中战士时最多 4 份，否则 2 份。每份减少 1 点预算、增加 1 点力量。引用的选项和资源需在 Plan 中可用；本例是[完整示例](./example.md)的一个选项。

`q=0` 始终表示未选，不要求满足 Option 的 `min_count`。要强制玩家选择，使用 Group 的 `min_count` 或完成规则。购买多份只将 `resource_changes` 乘以份数，奖励不会自动复制。

物品图标写成对象 `{"id":"minecraft:iron_sword"}`；裸字符串会被 Saturn 当作纹理 ID。更多格式见[通用数据类型](../../../library/saturn/data/common.md#物品与图标)。

## 显示、可用和校验规则

`visible_condition` 控制显示，`enabled_condition` 控制能否增加，`validation_rules` 允许保留暂时不合法的选择但阻止确认。规则格式如下，放在 Option 中：

```json
{
  "validation_rules": [
    {
      "key": "requires_warrior",
      "condition": {
        "type": "spb:compare",
        "left": "selected_example_warrior",
        "operator": ">=",
        "right": 1
      },
      "message": {"text": "需要先选择战士。"}
    }
  ]
}
```

规则中的 `key` 与 `condition` 必填，`message` 可选，省略时显示包含 key 的失败提示。互斥可比较 `selected_example_a + selected_example_b <= 1`，并将规则放在相关选项上；定义这两个 ID 后再引用。

隐藏不会免除数量或规则检查。已选项变为隐藏、不可用或超过动态上限时仍保留数量，在界面中提供移除入口。修改前置后完整重算，不自动取消其他选择，也不按旧价格反向退款。
