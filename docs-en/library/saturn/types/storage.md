---
title: "State storage"
sidebar_position: 16
---

# State storage

DataStorage is the codec for runtime state, not a standalone data pack registry. Ability types declare the state they need; the host creates, ticks and persists it, and calls `markDirty` after changes.

### `saturn:active_state` {#saturnactive_state}

Stores a runtime activation flag.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:active_state` |
| `active` | Boolean | yes | — | Runtime activation flag. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:active_state",
  "active": true
}
```

</details>

### `saturn:cast_deadline` {#saturncast_deadline}

Stores the time at which casting ends.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:cast_deadline` |
| `ends_at` | Number | yes | — | Game tick at which the timer ends. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:cast_deadline",
  "ends_at": 1
}
```

</details>

### `saturn:channel_pulse` {#saturnchannel_pulse}

Stores the time of the next channelled execution.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:channel_pulse` |
| `next_tick` | Number | yes | — | Game tick of the next execution. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:channel_pulse",
  "next_tick": 1
}
```

</details>

### `saturn:charges` {#saturncharges}

Stores the maximum charges, the recharge interval and the charges currently remaining.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:charges` |
| `maximum` | [Number provider](./number.md) | yes | — | Maximum value or upper bound. |
| `recharge_ticks` | [Number provider](./number.md) | yes | — | Ticks required to restore one charge. |
| `last_change` | Integer | no | `0` | Game tick of the last charge change. |
| `remaining` | Number | no | omitted | Remaining amount range or runtime remaining value. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:charges",
  "maximum": 1,
  "recharge_ticks": 1
}
```

</details>

### `saturn:container` {#saturncontainer}

Stores the contents of runtime item slots.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:container` |
| `contents` | Array of item stacks | no | `[]` | List of item stacks in the slots. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:container"
}
```

</details>

### `saturn:cooldown` {#saturncooldown}

Stores the cooldown start time and duration.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:cooldown` |
| `started_at` | Integer | no | `0` | Game tick at which the cooldown started. |
| `duration` | Number | no | omitted | Duration, usually measured in game ticks. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:cooldown"
}
```

</details>

### `saturn:entry_began` {#saturnentry_began}

Stores whether a timeline node has already begun.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:entry_began` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:entry_began"
}
```

</details>

### `saturn:idle_countdown` {#saturnidle_countdown}

Stores the remaining ticks of a wait node.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:idle_countdown` |
| `remaining` | Integer | yes | — | Remaining amount range or runtime remaining value. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:idle_countdown",
  "remaining": 1
}
```

</details>

### `saturn:resource` {#saturnresource}

Stores a resource reference and the corresponding amount; an object without values only declares the storage type.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:resource` |
| `resource` | Resource ID | no | omitted | Registered Saturn resource ID. |
| `amount` | Number | no | omitted | Amount or value; a number provider may be a number, a formula string or an object with a type. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:resource"
}
```

</details>

### `saturn:target_lock` {#saturntarget_lock}

Stores the locked target and the usable distance.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:target_lock` |
| `range` | [Number provider](./number.md) | yes | — | Check range, in blocks. |
| `target` | String | no | omitted | Action target, target ID or target selection; see the type description on this page. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:target_lock",
  "range": 1
}
```

</details>

### `saturn:timer` {#saturntimer}

Stores the duration and the tick at which the timer ends.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:timer` |
| `duration` | [Number provider](./number.md) | yes | — | Duration, usually measured in game ticks. |
| `ends_at` | Number | no | omitted | Game tick at which the timer ends. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:timer",
  "duration": 1
}
```

</details>

### `saturn:toggle` {#saturntoggle}

Stores a mutable on/off state.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:toggle` |
| `default` | Boolean | no | `false` | Initial toggle value. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:toggle"
}
```

</details>

### `saturn:wait_countdown` {#saturnwait_countdown}

Stores the remaining tick count of a conditional wait node.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:wait_countdown` |
| `remaining` | Integer | yes | — | Range of the remaining amount, or a runtime remaining value. |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:wait_countdown",
  "remaining": 1
}
```

</details>

## Meta types

These types do not test a concrete value themselves; they combine or delegate other types of the same kind and are embedded in the same fields.

### `saturn:empty` {#saturnempty}

Provides an implementation that performs no additional behaviour.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | Resource ID | yes | — | `saturn:empty` |

<details>
<summary>Example</summary>

```json
{
  "type": "saturn:empty"
}
```

</details>
