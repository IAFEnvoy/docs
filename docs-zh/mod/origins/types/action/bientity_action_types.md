# 双实体动作类型 {#bi-entity-action-types}

双实体动作涉及两个实体（执行者与目标）之间的交互。

### `origins:add_to_set`

将执行者加入某个实体集合，可指定时间上限。时间上限到期后，执行者会从集合中移除。时间上限为 -1 表示永久留在集合中，直到被其他动作移除。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `set` | [通配符标识符](../basic_concepts#wildcard-identifier) | **必填** | 实体集合 ID |
| `time_limit` | [整数](../basic_concepts#integer) | `-1` | 留在集合中的时间上限（以 tick 计），到期后执行者会从集合中移除 |

<details>
<summary>示例</summary>

```json
"bientity_action": {
  "type": "origins:add_to_set",
  "set": "origins:monsters"
}
```

此示例会将目标实体永久加入执行者实体上的 `origins:monsters` 集合。

</details>

### `origins:add_velocity`

为目标增加速度。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `x` | [浮点数](../basic_concepts#float) | `0.0` | X 轴速度 |
| `y` | [浮点数](../basic_concepts#float) | `0.0` | Y 轴速度 |
| `z` | [浮点数](../basic_concepts#float) | `0.0` | Z 轴速度 |
| `set` | [布尔值](../basic_concepts#boolean) | `false` | 若为 true，则直接设置速度而非累加 |
| `space` | [字符串](../basic_concepts#string) | `local` | 坐标空间：`local` 或 `world` |

<details>
<summary>示例</summary>

```json
"bientity_action": {
  "type": "origins:add_velocity",
  "y": 2
}
```

此示例会在 Y 轴上把目标实体“拉向”执行者实体。

</details>

### `origins:copy_origin`

:::caution 不稳定
此动作目前不稳定，可能无法按预期工作。如果遇到任何问题，请报告。
:::

复制某一起源层中执行者和/或目标的起源。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `layer` | Layer | **必填** | 复制其起源的起源层 |
| `modify_actor` | Boolean | `false` | 将目标起源复制给执行者 |
| `modify_target` | Boolean | `true` | 将执行者起源复制给目标 |
### `origins:copy_origin`

:::caution 不稳定
此动作目前不稳定，可能无法按预期工作。如果遇到任何问题，请报告。
:::

复制某一起源层中执行者和/或目标的起源。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `layer` | Layer | **必填** | 复制其起源的起源层 |
| `modify_actor` | Boolean | `false` | 将目标起源复制给执行者 |
| `modify_target` | Boolean | `true` | 将执行者起源复制给目标 |

### `origins:copy_origin`

:::caution 不稳定
此动作目前不稳定，可能无法按预期工作。如果遇到任何问题，请报告。
:::

在某一起源层中，让每个实体复制另一个实体的起源。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `layer` | Layer | **必填** | 读取并修改其起源的起源层 |
| `modify_actor` | [布尔值](../basic_concepts#boolean) | `false` | 用目标起源替换执行者的起源 |
| `modify_target` | [布尔值](../basic_concepts#boolean) | `true` | 用执行者起源替换目标的起源 |

### `origins:copy_resource_value`

将资源值从目标复制到执行者。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `actor_resource` | [标识符](../basic_concepts#identifier) | **必填** | 执行者上要修改的资源能力 |
| `target_resource` | [标识符](../basic_concepts#identifier) | **必填** | 目标上要读取的资源能力 |
| `operation` | [字符串](../basic_concepts#string) | `add` | `add`（累加数值）或 `set`（设置执行者的资源） |

### `origins:damage_target`

对目标实体造成伤害。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `damage_type` | [标识符](../basic_concepts#identifier) | **必填** | 伤害类型 ID |
| `amount` | [浮点数](../basic_concepts#float) | **必填** | 伤害数值 |
| `modifier` | [修饰器](../shared_data_types#modifier) 或 List | `[]` | 应用于该伤害的修饰器 |

<details>
<summary>示例</summary>

```json
"bientity_action": {
  "type": "origins:damage_target",
  "amount": 10,
  "damage_type": "minecraft:cramming"
}
```

此示例会对目标造成 5 颗心的 `cramming` 伤害，如同执行者击中了它；若目标因此死亡，会显示 *"`<targetName>` was squashed by `<actorName>`"，* 其中 `<targetName>` 是目标的名称，`<actorName>` 是执行者的名称。

</details>

### `origins:mount`

使目标实体骑乘在执行者身上。

### `origins:remove_from_set`

从实体集合中移除执行者。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `set` | [通配符标识符](../basic_concepts#wildcard-identifier) | **必填** | 实体集合 ID |

### `origins:set_in_love`

使目标实体对执行者进入求爱状态。

### `origins:tame`

驯服目标实体。

### `origins:teleport`

:::caution 不稳定
此动作目前不稳定，可能无法按预期工作。如果遇到任何问题，请报告。
:::

将执行者和/或目标传送到另一个实体的原始位置。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `teleport_actor` | [布尔值](../basic_concepts#boolean) | `false` | 将执行者传送到目标处 |
| `teleport_target` | [布尔值](../basic_concepts#boolean) | `true` | 将目标传送到执行者处 |
| `rotate` | [布尔值](../basic_concepts#boolean) | `false` | 复制目的实体的朝向 |

### `origins:variable_execute_command`

在插值资源变量之后，以执行者身份执行命令。默认的 `%a` 和 `%t` 标记会分别替换为执行者和目标的 UUID。

| 字段 | 类型 | 默认值 | 说明 |
|-------|------|---------|-------------|
| `command` | [字符串](../basic_concepts#string) | **必填** | 要执行的命令 |
| `actor_selector` | [字符串](../basic_concepts#string) | `%a` | 替换为执行者 UUID 的标记 |
| `target_selector` | [字符串](../basic_concepts#string) | `%t` | 替换为目标 UUID 的标记 |
| `variables` | [变量](../shared_data_types#variables) | 可选 | 可供命令使用的资源值 |
