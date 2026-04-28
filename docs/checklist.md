---
title: Checklist Before Report
---

# Checklist Before Report

Please check before you report bugs or ideas. Also don't make your messages in a mess when the GitHub issue provide you a template.

**Note: We only support 1.18+ on (Neo)Forge and Fabric.**

## No AIGC long-winded discourse

You can use AI to summarize your issue, but **DO NOT** use AI to generate a long text. I will close such issues without any explainations since I don't want to waste my time.

## Removed `Optifine`

`Optifine`, or `Optif**k`, is an outdated shader loader and always cause conflicts. Please use `Iris` or `Oculus` instead.

## Not running on `Quilt Loader`

`Quilt Loader` isn't in our support list, please use `Fabric Loader` to recheck before report.

## Remove `YSM` when meet rendering issue.

`YSM` is close source and partly written with C++. I have no idea and reason to make integration.

## Remove following mods if you unsure whether they cause issues.

**These mods is not in our support list.**

- `Epic Fight` & `Better Combat`: These two mods make massive change to combat system and their code are almost unreadable. I don't want to make any compat with them.
- `owo-lib`: Mods depend on this library usually conflict with each other and print issues from a completely unrelated mod.
- `Moonlight`: This mod usually cause issues, report to them first unless you are sure issues are caused by my mods.
- `REI`: Code and APIs are in a mess.
