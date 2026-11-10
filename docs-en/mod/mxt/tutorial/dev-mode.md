---
title: Development Mode
description: "Enable development mode, reproduce problems, and inspect module timings over the last 240 ticks in the profiler GUI."
---

# Development Mode

<span id="development-mode" />

Development mode is a **debug switch** in MiXianTu: it changes no gameplay and is not a cheat switch. It only affects:

- **Full formula failures**: a release jar logs one warning per distinct message, at most 512; development mode puts the whole stack trace in the log, so you can see which formula and which line triggered it.
- **Information panel overflow report**: silent in a release jar; in development mode an entry whose name or value has to wrap over several lines is logged as an error.
- **Internal trace log**: not printed in a release jar; in development mode trigger dispatch, subscription rebuilds, forging actions and page art are printed one line each.
- **Trading with yourself**: a release jar refuses a trade with yourself; development mode opens the trade screen and runs the same pipeline a trade between two people does.
- **Module profiling**: off by default in a release jar and can be enabled with a command; in development mode recording starts when the server starts.

Because those reports would print often, the log of a development session is much larger than a release one. Trading with yourself and profiling both add server tick time, which is why they are off by default in production.

## Enable Development Mode {#enable-development-mode}

| What you run | What to do |
| --- | --- |
| A production launch | Enable the server setting **Debug → Debug Mode**, off by default. In singleplayer, use the in-game server config screen. |
| A development launch | Development mode is always enabled; no configuration change is needed. |

Self-trading and logging read the current setting, so changes take effect immediately. Automatic profiling is decided only when the server starts: if you enable Debug Mode during a session, run `/mxt debug on` to start recording.

Disabling the configuration switch only affects production launches. Profiling can also be stopped separately with `/mxt debug off`, including during development launches, until you enable it again or next start the server.

:::warning Profiling
Profiling can also be started with `/mxt debug on`, but recording only begins after the current server tick and **never reaches back**. Development mode starts recording when the server starts, which is how the startup timings are visible.
:::

### Playing on Somebody Else's Server {#playing-on-somebody-else-s-server}

When you are connected to a server somebody else runs:

- Server-controlled features (self-trading, formula failure logs, internal trace logs and the startup default for profiling) follow that server's switch.
- What your own client draws (the information panel's overflow report) follows the config file on your own machine.

## Profiling {#profiling}

Profiling commands and GUI data reception both require **operator level 3** (`admin`); opening the GUI also requires a player. Start recording, then open the screen:

```mcfunction
/mxt debug on
/mxt debug gui
```

If development mode already started recording at server startup, run only the second command. Opening the screen does not enable recording, and profiling can be used without enabling development mode as a whole.

Item bindings, quality changes and pill use count under MiXianTu items; custom entities count under MiXianTu entities. Saturn ability, resource, trigger and payment rows measure the library runtime itself.

### List and Charts {#list-and-charts}

| Position | Display and Controls |
| --- | --- |
| Top status | The 240-tick window and dropped batch count, or states such as recording disabled and waiting for data. |
| Top buttons | Sort by source, minimum, average or maximum duration; toggle ascending or descending order. |
| Left of each row | Module name and `min / avg / max`, in milliseconds. |
| Right of each row | A fixed 240-column bar chart, one column per tick; its upper Y-axis value appears at the top left. |
| Right of the list | Click the scrollbar track, drag its thumb or use the mouse wheel over the list. The top buttons stay fixed. |

The window holds the last 240 ticks, about 12 seconds at 20 TPS. `min`, `avg` and `max` are the minimum, average and maximum per-tick durations in that window. Complete idle ticks count as zero; incomplete ticks are excluded. Narrow windows place module names and statistics above their charts. Resting the pointer on a row's module name shows its full name and what that row counts.

Each row scales its Y-axis to its own maximum, so compare modules using their millisecond values. Green means below 10 ms, yellow means 10–50 ms and red means at least 50 ms. Parent timings include nested calls; adding rows together does not give the whole server's tick duration.

In singleplayer without LAN sharing, the GUI reads local data directly, updated every server tick without a packet interval. Multiplayer and worlds opened to LAN synchronize every 5 server ticks, only while the GUI is open. Closing it, disconnecting or losing permission stops synchronization. Recording continues after the screen closes; run `/mxt debug off` when you finish investigating.

### Query Percentiles on Demand {#query-percentiles-on-demand}

To compare typical timings with occasional spikes, you can query after closing the charts:

```mcfunction
/mxt debug status server/cost server/economy/change
```

Specify multiple modules separated by spaces, with completion support; omit them to query every module. Output includes `min`, `avg`, `max`, 50%, 95%, 99%, call count and valid tick count over the last 240 ticks. Percentiles are calculated only when queried; the GUI displays `min / avg / max`.

The charts help locate time spent in this mod's server modules. Use spark for more accurate analysis, client rendering or issues involving other mods.

## Common Mistakes {#common-mistakes}

| Symptom | Cause |
| --- | --- |
| There is no way to turn development mode off during a development launch | Development mode stays enabled; profiling can still be stopped separately with `/mxt debug off`. |
| Turning the switch on floods the log with Trigger signal lines | That is what it does: the internal trace is printed line by line. Turning it off stops it. |
| The switch is on and there is still no debug-level logging | The switch does not turn on the debug level; it only governs its own set of messages. |
| The charts say profiling is disabled | Opening the screen does not start recording. Run `/mxt debug on`. |
| Enabling Debug Mode during a session does not start recording | Automatic recording is decided at server startup. Run `/mxt debug on` for the current session. |
| `/mxt debug` is unavailable or chart data cannot be received | Operator level 3 is required; the GUI must be opened by a player. |
| Two bars have similar heights but very different millisecond values | Each row has its own Y-axis ceiling. Compare the numbers. |

## Next {#next}

- [Tutorials](./index.md): choose a module to build.
- [/mxt Command Reference](../player-guide/commands/mxt.md): look up profiling and other subcommands.
