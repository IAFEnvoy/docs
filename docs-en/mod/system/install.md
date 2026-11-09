---
title: "Installation and getting started"
sidebar_position: 1
---

Install System, Saturn and Jupiter builds that match Minecraft 26.1.2, plus ApricityUI on the client. In multiplayer, both the server and the client need System; do not load client-only UI classes on a dedicated server.

The 1.21.1 branch is periodically synced from the main branch and may lag several versions behind. When installing, choose the mods and dependencies that correspond to 1.21.1; the actual features follow the installed version.

FTB quest features require FTB Quests, FTB Library and FTB Teams. Simple Voice Chat is an optional recording backend; without it the system still works with text. Speech synthesis and speech recognition are both optional.

## First binding

An administrator runs the following in the vanilla chat bar:

```mcfunction
/system grant system:default
/system grant system:default Steve
```

The system ID is read from the current world's data pack registry and auto-completed. Each player can currently bind at most one system; revoke the old binding before binding another. A new binding presents the available prompts in the order "binding message → starter gift → currently available quests", and logging in again only restores the existing state.

`/system settings` opens the unified settings screen; inside the system dialog use `/settings`. You can also bind a key to toggle the system UI; it is unbound by default. While it is unbound, management command errors are shown in the vanilla chat bar.

## Text, voice and AI

The input box is single-line; Enter sends. Start with `/help` to see the features and completions enabled for the current system. On the left of the send box you can switch between offline, standard, extended and free modes; when the server requires a key but none is configured, only offline mode is allowed. Local commands and local matching do not need a model key.

The server configures the connection and the name of the key environment variable in `config/system/system-model.json`; the default is DeepSeek, and the key is read from a server environment variable and is not sent to players. Personal TTS / ASR credentials and voice usage are stored on the client and are not uploaded to the server for aggregation.

Further reading: [Usage and configuration](./guides/usage.md), [AI modes and administrator permissions](./guides/ai-modes.md), [Voice settings](./guides/tts.md).
