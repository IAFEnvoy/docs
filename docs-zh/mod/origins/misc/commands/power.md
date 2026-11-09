# power 命令 {#power}

`/power` 命令可用于授予能力、撤销能力，以及检查实体是否拥有某个能力。每个能力都来自特定的来源（一个标识符）。如果某个能力没有任何来源，实体就不拥有该能力；如果某个能力至少有一个来源，实体就拥有该能力。对于每个能力，来源都是唯一的，这意味着同一个来源不能重复授予同一个能力。

### 语法 {#syntax}

#### `power <target> grant <power> [<source>]` {#power-target-grant-power-source}

向指定目标授予能力（若指定了来源，则来自该特定能力来源）。

- `<target>` — 目标选择器、用户名或 UUID；一次只能选择一个。
    - （例如 `@a[limit=1]`、`@p`、`eggohito`）
- `<power>` — 能力的命名空间和 ID。
    - （例如 `origins:arcane_skin` — `data/origins/origins/power/arcane_skin.json`）
- `[<source>]` — 能力的来源；可选；默认为命令的默认来源。
    - （例如 `example:test`）

#### `power <target> revoke <power> [source]` {#power-target-revoke-power-source}

从指定目标撤销能力（若指定了来源，则来自该特定能力来源）。

- `<target>` — 目标选择器、用户名或 UUID；一次只能选择一个。
- `<power>` — 能力的命名空间和 ID。
- `[source]` — 能力的来源；可选；默认为命令的默认来源。

#### `power <target> revokeall <source>` {#power-target-revokeall-source}

撤销由指定来源授予指定目标的所有能力。

- `<target>` — 目标选择器、用户名或 UUID；一次只能选择一个。
- `<source>` — 要彻底撤销其全部能力的来源。
    - （例如 `example:test`）

#### `power <target> clear` {#power-target-clear}

清除指定目标的所有能力。

- `<target>` — 目标选择器、用户名或 UUID；一次只能选择一个。

#### `power <target> has <power> [source]` {#power-target-has-power-source}

检查指定目标是否拥有来自特定来源的某个能力。

- `<target>` — 目标选择器、用户名或 UUID；一次只能选择一个。
- `<power>` — 能力的命名空间和 ID。
- `[source]` — 要检查的来源。

#### `power <target> list` {#power-target-list}

列出指定目标的所有能力。

- `<target>` — 目标选择器、用户名或 UUID；一次只能选择一个。

#### `power <target> sources <power>` {#power-target-sources-power}

列出指定目标上某个特定能力的所有能力来源。

- `<target>` — 目标选择器、用户名或 UUID；一次只能选择一个。
- `<power>` — 能力的命名空间和 ID。
