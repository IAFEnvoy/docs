---
title: /quality
---

# `/quality`

<span id="quality" />

查看与改写物品的**品质**。每个节点也可以写成 `/mxt quality …`；写入需要 gamemaster 权限，查询不需要。

<div className="cmd-tree">

- `/quality ...`

  看自己**主手**物品的品质：现在解析出来的对应档位，以及它所属的链条。

  - `... get [<target>]`

    同上，看别人的（需要 gamemaster 权限）。

  - `... set <targets> <quality>`

    把品质**覆盖组件**写到目标主手的物品上（需要 gamemaster 权限）。

  - `... clear <targets>`

    移除主手物品上的覆盖组件（需要 gamemaster 权限）。

  - `... upgrade <targets>`

    把主手物品在它所属的链条上**往上推一档**（需要 gamemaster 权限）。

  - `... chain <quality>`

    打印该档位所在的**整条品质链**。

</div>

## set 与 clear {#set-与-clear}

`set` 写入的品质组件优先于物品携带的定义与默认品质注册表。`/quality clear` 移除该覆盖值。物品是否可用仍由品质的 `condition` 与所属链决定。

`clear` 移除 `/quality set`、锻造结算或画符铭刻写入的同一品质组件，之后按物品携带定义、`mxt:default_quality` 的顺序继续解析。目标没有覆盖组件时，逐项报告失败。

## upgrade {#upgrade}

先过**下一档**自己写的 `upgrade_condition`，代价就是它的 `upgrade_costs`（`plan` → `commit` **整组原子**，无法支付就一点不动、也不写档）。已经在顶端、或解析出的档不在链上时都会逐个目标报出原因。

## chain {#chain}

链上在它之前的是灰色、它自己是绿色、之后的是白色。一档只属于一条链（运行时沿 `next` 走出来的那一条）；不在任何链上或链条没走通时报「没有品质链包含它」，当前包不提供该档位时同样会被拒绝。链名写在入口档上，入口档没有名字时这一行开头的链名显示成 `null`。

## 品质解析 {#品质是哪一档}

一条物品堆的品质按固定顺序取**第一个能获取的**：

1. 物品堆上的 `mxt:quality` **组件**（整份品质对象）——`/quality set`、一次成功的升级、锻造台结算与画符铭刻写的都是它；组件里那个 id 在当前包里没有对应条目时，跳过该层；
2. **该物品堆所携带的定义**声明的档，读的是那件物品上装着定义身份的那份组件。声明 `quality` 的九个定义是 `technique`、`alchemy_furnace`、`alchemy_wall_material`、`spirit_root`、`physique`、`pill`、`formation`、`secret_realm`、`contract_type`；
3. 注册表 [default_quality](../../datapack/json/default_quality.md)：物品在表里写了哪一档。

## 升级只升一档 {#升级只升一档}

`upgrade` 每次提升一档，并支付目标档位的 `upgrade_costs`。连续提升需要分别执行和支付；未配置消耗时可免费升级。省略当前档位的 `next` 可将其设为链顶端。完整规则见[品质](../../datapack/json/quality.md)。

顶层别名 `/quality` 由服务端配置的**「命令别名」标签页**控制（条目名 `quality`，默认开启）；关闭后 `/mxt quality` 照旧可用。
