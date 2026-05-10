# `/power`

The `/power` command can be used to grant powers, revoke powers, and check if an entity has a certain power. Every power comes from a specific source (an identifier). If a power has no sources, the entity does not have the power. If a power has at least one source, the entity does have the power. For each power, the sources are unique, meaning that a single source cannot grant the same power twice.

### Syntax

#### `power grant <target> <power> [<source>]`

Grant a power to the specified target (from a specific power source, if specified).

- `<target>` — a target selector, username, or UUID; can only select one at a time.
    - (e.g. `@a[limit=1]`, `@p`, `eggohito`)
- `<power>` — the namespace and ID of a power.
    - (e.g. `origins:arcane_skin` — `data/origins/origins/power/arcane_skin.json`)
- `[<source>]` — the source of the power; optional; defaults to the command default source.
    - (e.g. `example:test`)

#### `power revoke <target> <power> [<source>]`

Revoke a power from the specified target (from a specific power source, if specified).

- `<target>` — a target selector, username, or UUID; can only select one at a time.
- `<power>` — the namespace and ID of a power.
- `[<source>]` — the source of the power; optional; defaults to the command default source.

#### `power revokeall <target> <source>`

Revoke all the powers from the specified target that are granted by the specified source.

- `<target>` — a target selector, username, or UUID; can only select one at a time.
- `<source>` — the source to completely revoke all powers from.
    - (e.g. `example:test`)

#### `power clear <target>`

Clear all the powers from the specified target.

- `<target>` — a target selector, username, or UUID; can only select one at a time.

#### `power has <target> <power>`

Check if the specified target has a certain power.

- `<target>` — a target selector, username, or UUID; can only select one at a time.
- `<power>` — the namespace and ID of a power.

#### `power has <target> <power> <source>`

Check if the specified target has a certain power from a specific source.

- `<target>` — a target selector, username, or UUID; can only select one at a time.
- `<power>` — the namespace and ID of a power.
- `<source>` — the source to check for.

#### `power list <target>`

List all the powers available from the specified target.

- `<target>` — a target selector, username, or UUID; can only select one at a time.

#### `power sources <target> <power>`

List all the power sources for a specific power on the specified target.

- `<target>` — a target selector, username, or UUID; can only select one at a time.
- `<power>` — the namespace and ID of a power.
