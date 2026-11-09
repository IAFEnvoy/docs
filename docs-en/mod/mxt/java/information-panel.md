---
title: Information Panel
description: Read character information from Saturn snapshots and extend the cultivation group with datapacks.
---

# Information Panel

<span id="information-panel" />

The character information panel opens with `Z` by default. Its cultivation section selects `mxt:cultivation`; basic information selects `saturn:basic`. Sections share one read-only snapshot and do not query a live player while rendering.

## Collecting Information {#collecting-information}

```java
import com.iafenvoy.saturn.data.information.PlayerInformation;
import com.iafenvoy.saturn.data.information.PlayerViews;
import net.minecraft.resources.Identifier;

var view = PlayerViews.parse(player);
var all = PlayerInformation.collectAll(view);
var cultivation = PlayerInformation.groups(view).stream()
        .filter(group -> group.unwrapKey().orElseThrow().identifier().equals(Identifier.parse("mxt:cultivation")))
        .findFirst().orElseThrow();
var rows = PlayerInformation.collect(view, cultivation);
var compact = rows.withMinimumImportance(60);
```

Capture server entities on the server thread. Lists, tooltips and text components come from captured state or saved data supplied by the host. Saved views do not borrow the current player's breakthrough conditions, minor stage or curse display conditions.

`InformationRow` is a datapack definition; `InformationEntry` is its evaluated result. Groups use registry `Holder<InformationGroup>` references. Results expose their group set through `groups()`, display data through `value()/label()/tooltip()`, and the row definition's importance through `importance()`. `InformationText.lines(...)` provides a common text projection. Screens can also render `InformationValue` lists, tables, numbers and items directly.

## Extending the Cultivation Group {#extending-the-cultivation-group}

An [information row definition](../datapack/json/information_row.md) declares content, visibility, tooltips, order and importance. [Groups and tags](../datapack/json/information_group.md) select rows. Appending a row to `#mxt:cultivation` includes it in the panel's cultivation section and in command output for that group.

The 7 built-in rows cover realm, lifespan, cultivation progress, spirit roots, physiques, techniques and curses. They read the `mxt:information` getter. Snapshots retain getter facts; definitions control their presentation. Register parameter codecs for `EntityValueGetter` to add new queries, and register `InformationExpression` types for custom presentation calculations.

## Checking Output {#checking-output}

```mcfunction
/information query @s mxt:cultivation
/information gui @s mxt:cultivation
```

Both branches require administrator permission (level 3). The query branch sends group text only to its source; gui opens the information screen for a player executor. Reopen the world or restart the server after changing definitions.
