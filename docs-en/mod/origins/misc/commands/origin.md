# `/origin`

The `/origin` command can be used to check for origins, and set the player's origin from a specified origin layer.

### Syntax

#### `origin get <target> <originLayer>`

Fetch the origin of the specified target from a specified origin layer.

- `<target>` — a target selector, username, or UUID; can only select one at a time.
    - (e.g. `@a[limit=1]`, `@p`, `eggohito`, `70ecd8a7-5abb-492a-a3b3-9aae099400db`)
- `<originLayer>` — the namespace and ID of an origin layer.
    - (e.g. `origins:origin` — `data/origins/origins/layer/origin.json`)

#### `origin has origin <targets> <originLayer> <origin>`

Check if the specified target(s) has a specified origin from a specified origin layer.

- `<targets>` — a target selector, username, or UUID.
    - (e.g. `@a`, `eggohito`, `70ecd8a7-5abb-492a-a3b3-9aae099400db`)
- `<originLayer>` — the namespace and ID of an origin layer.
    - (e.g. `origins:origin` — `data/origins/origins/layer/origin.json`)
- `<origin>` — the namespace and ID of an origin.
    - (e.g. `origins:human` — `data/origins/origins/origin/human.json`)

#### `origin set <targets> <originLayer> <origin>`

Set the specified target(s) origin in a specified origin layer.

- `<targets>` — a target selector, username, or UUID.
    - (e.g. `@a`, `eggohito`, `70ecd8a7-5abb-492a-a3b3-9aae099400db`)
- `<originLayer>` — the namespace and ID of an origin layer.
    - (e.g. `origins:origin` — `data/origins/origins/layer/origin.json`)
- `<origin>` — the namespace and ID of an origin.
    - (e.g. `origins:human` — `data/origins/origins/origin/human.json`)

#### `origin gui [targets] [originLayer]`

Bring up the Origin GUI screen to the specified target(s).

- `[targets]` — a target selector, username, or UUID; optional; defaults to `@s`.
    - (e.g. `@a`, `eggohito`, `70ecd8a7-5abb-492a-a3b3-9aae099400db`)
- `[originLayer]` — the namespace and ID of an origin layer; optional; will open every layer it can if left blank.
    - (e.g. `origins:origin` — `data/origins/origins/layer/origin.json`)

#### `origin random [targets] [originLayer]`

Randomizes the specified target(s) origin in a specified origin layer.

- `[targets]` — a target selector, username, or UUID; optional; defaults to `@s`.
    - (e.g. `@a`, `eggohito`, `70ecd8a7-5abb-492a-a3b3-9aae099400db`)
- `[originLayer]` — the namespace and ID of an origin layer; optional; will randomize all layers if left blank.
    - (e.g. `origins:origin` — `data/origins/origins/layer/origin.json`)
