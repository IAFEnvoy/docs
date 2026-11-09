# `/resource`

:::warning Experimental

The `/resource` command is an experimental command, and is subject to change without warning.

:::

The `/resource` command can be used to change (add/subtract), get, set, and do operations on resources. Resource operations can only do **scoreboard objective to resource**, not resource to resource.

:::tip
Cooldown powers are also considered resources, so this command can be used to manipulate cooldowns as well.
:::

### Syntax

#### `resource has <target> <power>`

Check if the specified target has a resource power.

- `<target>` — a target selector, username, or UUID; can only select one at a time.
    - (e.g. `@a[limit=1]`, `@p`, `eggohito`)
- `<power>` — the namespace and ID of a power.
    - (e.g. `origins:arcane_skin` — `data/origins/origins/power/arcane_skin.json`)

#### `resource get <target> <power>`

Fetch the current value of a (cooldown or resource) power from the specified target.

- `<target>` — a target selector; can only select one entity at a time.
- `<power>` — the namespace and ID of a power.

#### `resource change <target> <power> <value>`

Change the value of a specified (cooldown or resource) power of a specified target.

- `<target>` — a target selector; can only select one entity at a time.
- `<power>` — the namespace and ID of a power.
- `<value>` — an integer (a whole number).

#### `resource operation <target> <power> <operator> <sourceEntity> <sourceObjective>`

Operate the specified target's resource to a specified source's score in a scoreboard objective.

- `<target>` — a target selector; can only select one entity at a time.
- `<power>` — the namespace and ID of a power.
- `<operator>` — an operation:
    - `%=` — Modulus: divide target's resource by source's score, and use the remainder.
    - `*=` — Multiplication: set target's resource to the product.
    - `+=` — Addition: add source's score to target's resource.
    - `-=` — Subtraction: subtract source's score from target's resource.
    - `/=` — Division: divide target's resource by source's score (rounded down).
    - `<` — Min: set target's resource to the lesser value.
    - `=` — Assign: set target's resource to source's score.
    - `>` — Max: set target's resource to the greater value.
    - `><` — Swap: swaps target's resource and source's score.
- `<sourceEntity>` — a target selector, username, or UUID; can only select one at a time.
- `<sourceObjective>` — the scoreboard objective to operate from.
    - (e.g. `testObj` — created with `/scoreboard objectives add testObj dummy`)
