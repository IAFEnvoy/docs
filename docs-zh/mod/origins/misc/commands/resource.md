# resource 命令 {#resource}

:::warning 实验性功能

`/resource` 命令是一个实验性命令，可能会在不事先通知的情况下发生变化。

:::

`/resource` 命令可用于更改（增加/减少）、获取、设置资源，以及对资源执行运算。资源运算只能执行**记分板目标 → 资源**，不能执行资源 → 资源。

:::tip
冷却能力同样被视为资源，因此此命令也可以用来操控冷却。
:::

### 语法 {#syntax}

#### `resource has <target> <power>` {#resource-has-target-power}

检查指定目标是否拥有资源能力。

- `<target>` — 目标选择器、用户名或 UUID；一次只能选择一个。
    - （例如 `@a[limit=1]`、`@p`、`eggohito`）
- `<power>` — 能力的命名空间和 ID。
    - （例如 `origins:arcane_skin` — `data/origins/origins/power/arcane_skin.json`）

#### `resource get <target> <power>` {#resource-get-target-power}

获取指定目标某个（冷却或资源）能力的当前数值。

- `<target>` — 目标选择器；一次只能选择一个实体。
- `<power>` — 能力的命名空间和 ID。

#### `resource change <target> <power> <value>` {#resource-change-target-power-value}

更改指定目标某个（冷却或资源）能力的数值。

- `<target>` — 目标选择器；一次只能选择一个实体。
- `<power>` — 能力的命名空间和 ID。
- `<value>` — 一个整数（不带小数的数字）。

#### `resource operation <target> <power> <operator> <sourceEntity> <sourceObjective>` {#resource-operation-target-power-operator-sourceentity-sourceobjective}

将指定目标的资源与某个记分板目标中指定来源的分数进行运算。

- `<target>` — 目标选择器；一次只能选择一个实体。
- `<power>` — 能力的命名空间和 ID。
- `<operator>` — 运算方式：
    - `%=` — 取模：将目标的资源除以来源的分数，并使用余数。
    - `*=` — 乘法：将目标的资源设为乘积。
    - `+=` — 加法：将来源的分数加到目标的资源上。
    - `-=` — 减法：从目标的资源中减去来源的分数。
    - `/=` — 除法：将目标的资源除以来源的分数（向下取整）。
    - `<` — 最小值：将目标的资源设为较小的值。
    - `=` — 赋值：将目标的资源设为来源的分数。
    - `>` — 最大值：将目标的资源设为较大的值。
    - `><` — 交换：交换目标的资源与来源的分数。
- `<sourceEntity>` — 目标选择器、用户名或 UUID；一次只能选择一个。
- `<sourceObjective>` — 用于运算的记分板目标。
    - （例如 `testObj` — 通过 `/scoreboard objectives add testObj dummy` 创建）
