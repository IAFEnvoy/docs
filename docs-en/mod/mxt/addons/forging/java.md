---
title: Java and Networking
---

## Screen

Forge table pages live under `assets/apricityui/apricity/mxt_forging/forging/`. They use ApricityUI and share the core stylesheet at `assets/apricityui/apricity/mxt/common/theme.css`. Slots bind to the menu; client pages display session state and send intentions.

## Action Requests

`ForgingActionC2SPayload` requests start, strike, completion or cancellation. The server resolves the current workstation and session before performing the action; client-displayed values do not decide settlement. See [KubeJS events](./kubejs.md) for listeners.
