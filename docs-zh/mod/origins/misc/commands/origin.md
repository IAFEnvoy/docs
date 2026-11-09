# origin 命令 {#origin}

`/origin` 命令可用于查询起源，以及从指定的起源层设置玩家的起源。

### 语法 {#syntax}

#### `origin get <target> <originLayer>` {#origin-get-target-originlayer}

从指定的起源层获取指定目标的起源。

- `<target>` — 目标选择器、用户名或 UUID；一次只能选择一个。
    - （例如 `@a[limit=1]`、`@p`、`eggohito`、`70ecd8a7-5abb-492a-a3b3-9aae099400db`）
- `<originLayer>` — 起源层的命名空间和 ID。
    - （例如 `origins:origin` — `data/origins/origins/layer/origin.json`）

#### `origin has origin <targets> <originLayer> <origin>` {#origin-has-origin-targets-originlayer-origin}

检查指定目标是否在指定的起源层中拥有指定的起源。

- `<targets>` — 目标选择器、用户名或 UUID。
    - （例如 `@a`、`eggohito`、`70ecd8a7-5abb-492a-a3b3-9aae099400db`）
- `<originLayer>` — 起源层的命名空间和 ID。
    - （例如 `origins:origin` — `data/origins/origins/layer/origin.json`）
- `<origin>` — 起源的命名空间和 ID。
    - （例如 `origins:human` — `data/origins/origins/origin/human.json`）

#### `origin set <targets> <originLayer> <origin>` {#origin-set-targets-originlayer-origin}

在指定的起源层中设置指定目标的起源。

- `<targets>` — 目标选择器、用户名或 UUID。
    - （例如 `@a`、`eggohito`、`70ecd8a7-5abb-492a-a3b3-9aae099400db`）
- `<originLayer>` — 起源层的命名空间和 ID。
    - （例如 `origins:origin` — `data/origins/origins/layer/origin.json`）
- `<origin>` — 起源的命名空间和 ID。
    - （例如 `origins:human` — `data/origins/origins/origin/human.json`）

#### `origin gui [targets] [originLayer]` {#origin-gui-targets-originlayer}

为指定目标打开起源 GUI 界面。

- `[targets]` — 目标选择器、用户名或 UUID；可选；默认为 `@s`。
    - （例如 `@a`、`eggohito`、`70ecd8a7-5abb-492a-a3b3-9aae099400db`）
- `[originLayer]` — 起源层的命名空间和 ID；可选；留空时会打开所有能打开的起源层。
    - （例如 `origins:origin` — `data/origins/origins/layer/origin.json`）

#### `origin random [targets] [originLayer]` {#origin-random-targets-originlayer}

在指定的起源层中为指定目标随机选择起源。

- `[targets]` — 目标选择器、用户名或 UUID；可选；默认为 `@s`。
    - （例如 `@a`、`eggohito`、`70ecd8a7-5abb-492a-a3b3-9aae099400db`）
- `[originLayer]` — 起源层的命名空间和 ID；可选；留空时会随机化所有起源层。
    - （例如 `origins:origin` — `data/origins/origins/layer/origin.json`）
