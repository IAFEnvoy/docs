---
title: "Target selector"
sidebar_position: 0
---

Used in an ability's target_selector. After the selector has gathered candidates, the ability still checks target_condition.

| Type | Purpose |
| --- | --- |
| [`saturn:self`](./self.md) | Targets the user themselves. |
| [`saturn:area`](./area.md) | Selects targets within a radius, with optional control over the count and the ordering. |
| [`saturn:ray`](./ray.md) | Selects entities near a ray along the user's facing direction. |
| [`saturn:cone`](./cone.md) | Selects targets within a view cone of the given length and angle. |
| [`saturn:js`](./js.md) | Calls a callback registered by KubeJS and passes the params argument. |
