---
title: "Information expression"
sidebar_position: 0
---

An information expression only reads the `PlayerView` passed in. Raw numbers, strings and booleans can be used directly as constants; operand objects must have a `type`. See [Player information](../../guides/information.md).

| Type | Purpose |
| --- | --- |
| [`saturn:constant`](./constant.md) | Returns the fixed value in the definition. |
| [`saturn:getter`](./getter.md) | Reads the result of a parameterized getter from the `PlayerView` passed in. |
| [`saturn:local`](./local.md) | Reads the local binding of the current list or table element. |
| [`saturn:number`](./number.md) | Converts an expression result into an information row number. |
| [`saturn:text`](./text.md) | Displays text, a translation component or existing formatted text. |
| [`saturn:boolean`](./boolean.md) | Converts an expression result into a boolean display value. |
| [`saturn:items`](./items.md) | Converts an expression result into an item collection display. |
| [`saturn:meter`](./meter.md) | Generates a meter display from the current value, minimum and maximum. |
| [`saturn:translate`](./translate.md) | Generates a text component that keeps the translation key and arguments. |
| [`saturn:registry_name`](./registry_name.md) | Resolves the display name from a registry ID and an entry ID. |
| [`saturn:format`](./format.md) | Generates text from a format string and arguments. |
| [`saturn:arithmetic`](./arithmetic.md) | Performs numeric arithmetic on two expressions. |
| [`saturn:compare`](./compare.md) | Compares two expressions and returns a boolean result. |
| [`saturn:logic`](./logic.md) | Performs logical operations on boolean expressions. |
| [`saturn:is_known`](./is_known.md) | Checks whether an expression has a known value. |
| [`saturn:if`](./if.md) | Selects the then or else expression according to the condition. |
| [`saturn:coalesce`](./coalesce.md) | Takes the first available expression result in order. |
| [`saturn:list`](./list.md) | Iterates the input collection and generates a display value for each element. |
| [`saturn:table`](./table.md) | Iterates the input collection and generates a table from the column definitions. |
