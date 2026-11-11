---
title: 公式与比较条件
description: 自动变量名、求值顺序、选项联动、点数通过规则和 spb:compare。
sidebar_position: 3
---

数值字段直接使用 Saturn [NumberProvider](../../../library/saturn/types/number.md)，可写常量、公式字符串或带 `type` 的数值对象。公式使用 exp4j，不是 JavaScript；布尔组合使用 Saturn EntityCondition。

## 自动变量名

将资源、组、选项的**完整注册 ID**中的 `:`、`/`、`-`、`.` 替换为 `_`。命名空间参与生成，其余合法 ID 字符保留。例如 `example:warrior` → `example_warrior`，`my-pack:skills/fire.ball` → `my_pack_skills_fire_ball`。

| 变量 | 含义 | 示例 |
| --- | --- | --- |
| `input_<name>` | 创建会话时捕获的具名输入 | `input_bonus` |
| `base_<资源别名>` | 冻结的资源基准 | `base_example_points` |
| `selected_<选项别名>` | 选项当前份数 | `selected_example_warrior` |
| `group_<组别名>_distinct` | 组内已选种类数 | `group_example_talents_distinct` |
| `group_<组别名>_total` | 组内已选份数之和 | `group_example_attributes_total` |
| `resource_<资源别名>` | 所有贡献计算后的最终值 | `resource_example_points` |

资源、组和选项没有可手写的 `key` 字段。相同类别在同一方案内发生转换冲突时，整个数据包加载失败，例如 `example:a-b` 与 `example:a_b`。不会按加载顺序追加后缀；重排资源、组或选项也不会改名。

`inputs` 的映射名仍由作者配置。预设使用位置编号 `preset_1`、`preset_2`，不产生选择公式变量。Outcome、action 和规则的 `key` 用于稳定标识和诊断，仍需配置。

## 求值顺序

```text
捕获 inputs 和资源基准
  → 当前完整选择数量
  → 所有组的 distinct / total
  → 各选项每份资源贡献 × 份数
  → 最终资源值
  → 显示、可用、数量、完成规则及奖励条件
```

对每个资源，最终值等于基准加上所有已选项的贡献。每次点击都完整重算，不累计点击历史；要使相同选择集得到相同结果，计价应使用可重复求值的公式。

`resource_changes` 只能读取 `input_*`、`base_*`、`selected_*`、`group_*`，**不能读取 `resource_*`**。否则形成余额决定价格的阶段依赖，会在加载校验中报错。数量、条件和奖励计算可以读取最终 `resource_*`。

## 联动示例

以下字段片段使用[完整示例](./example.md)中的 ID：

```json
{
  "resource_changes": {
    "example:points": "-3 + selected_example_warrior",
    "example:fate": -1
  }
}
```

弓术在未选战士时消耗 3 点，选战士后消耗 2 点；无论何种职业，都消耗 1 点命运。数量上限可写 `"2 + 2 * selected_example_warrior"`，学者增加天赋名额可写 `"1 + selected_example_scholar"`。

需要随机开局时，将随机值放入 Plan 的 `inputs`，再读取 `input_<name>`，避免每次重算重新抽取。Saturn 的公式解码和异常回退行为直接沿用；SPB 不增加 provider 白名单或严格表达式求值层。被 Saturn 内部处理并回退的错误不会再被 SPB 判错，应结合日志验证自己的公式。SPB 仍检查方案变量作用域、资源边界、非法数量和向外抛出的求值异常。

## `spb:compare`

这是可嵌入 Saturn EntityCondition 字段的比较条件，不是独立注册表文件。

| 字段 | 类型 | 必填 | 默认值 | 作用 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `spb:compare` |
| `left` | NumberProvider | 是 | — | 左值 |
| `operator` | 比较运算符 | 是 | — | `==`、`!=`、`<`、`<=`、`>`、`>=` |
| `right` | NumberProvider | 是 | — | 右值 |
| `epsilon` | 有限非负数 | 否 | `1e-8` | 绝对误差容限 |

```json
{
  "type": "spb:compare",
  "left": "resource_example_points",
  "operator": "==",
  "right": 0
}
```

`epsilon > 0` 时，`==` 表示差值绝对值不超过容限，`!=` 表示超过容限；`<` 要求 `left < right - epsilon`，`<=` 为 `left <= right + epsilon`，大于比较对称处理。`epsilon: 0` 直接使用 Saturn 的比较谓词，等号保留 `Double.equals` 的行为，例如 `-0.0` 与 `0.0` 不相等。需要比默认值更细的精度时显式设置容限。

## 配置通过的余额

在 Plan 的 `completion_rules` 中使用以下条件；各条规则还需提供自己的 `key`：

| 规则 | 条件 |
| --- | --- |
| 必须花完 | `left: resource_example_points`、`operator: ==`、`right: 0` |
| 可以剩余，禁止透支 | 同一 left，`operator: >=`、`right: 0` |
| 允许剩余 1～3 | 两条规则分别检查 `>= 1` 和 `<= 3` |
| 多种点数同时符合 | 分别检查 `resource_example_points` 和 `resource_example_fate` |

Saturn 的普通资源条件读取真实玩家资源，适合自动开启等外部条件。检查未提交余额时读取这里的 `resource_*` 草稿变量。
