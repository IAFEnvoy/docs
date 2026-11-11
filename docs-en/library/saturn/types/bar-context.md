---
title: "Resource bar contexts"
sidebar_position: 19
---

# Resource bar contexts

ResourceBar.context uses a string ID rather than an object with a type. Whether the context is actually drawn still depends on the host interface.

### `saturn:boss_overlay` {#saturnboss_overlay}

Provides a display context for the boss resource bar.

This type uses a string ID directly and has no extra JSON fields.

<details>
<summary>Example</summary>

```json
"saturn:boss_overlay"
```

</details>

### `saturn:self_hud` {#saturnself_hud}

Shows the current player's own resources.

This type uses a string ID directly and has no extra JSON fields.

<details>
<summary>Example</summary>

```json
"saturn:self_hud"
```

</details>

### `saturn:target_overlay` {#saturntarget_overlay}

Provides a resource display context for the current target.

This type uses a string ID directly and has no extra JSON fields.

<details>
<summary>Example</summary>

```json
"saturn:target_overlay"
```

</details>
