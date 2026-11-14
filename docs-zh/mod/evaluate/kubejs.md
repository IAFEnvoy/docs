---
title: KubeJS
description: 设置固定值、生成最终覆盖，并注册可复用的 JavaScript 计算器参与统一价值推导。
sidebar_position: 4
---

兼容需要 **KubeJS `26.1.2-8.0.8+`**，以及 Rhino、Better Advanced Tooltips 运行依赖。脚本放在 `kubejs/server_scripts/`，修改后执行 `/reload`。

旧版 KubeJS `8.0.4` 的 `WorldLoaderMixin` 目标与本项目的 NeoForge 版本不兼容，应使用上述版本。

## 设置固定值和最终覆盖

```javascript title="kubejs/server_scripts/evaluate.js"
EvaluateEvents.values(event => {
  event.set('minecraft:diamond', 10000.5)
  event.set(['minecraft:iron_ingot', '#c:ingots/gold'], 256.5, 2000)

  // 只改变最终查询结果，不改变图中的钻石成本。
  event.override('minecraft:diamond', 12000.5)

  // 使用相同资源 ID 替换内置熔炼计算器。
  event.addEvaluator('evaluate:recipes/smelting', {
    type: 'evaluate:recipe',
    recipe_type: 'minecraft:smelting',
    extra_value: 2.5
  })
})
```

| 方法 | 行为 |
| --- | --- |
| `event.set(item, value, priority = 1000)` | 生成固定基础值 `evaluate:constant` 定义。 |
| `event.override(item, value, priority = 1000)` | 生成最终覆盖 `value_override` 定义。 |
| `event.addEvaluator(id, definition)` | 创建现有计算器类型的实例；相同资源 ID 时替换原定义。 |
| `event.evaluator(id, callback)` | 注册 JS 回调，并生成同 ID、空参数的实例。 |
| `event.js(entryId, callbackId, params)` | 使用已注册回调生成 `evaluate:js` 实例。 |

`item` 使用与[数据包定义](./datapack.md#item-selection)相同的选择语法，由 [Saturn 匹配器](../../library/saturn/types/item-matcher.md)处理。价值必须是有限非负数。

对同一序列化 JSON 选择器重复 `set` 会替换之前的定义。不同选择器按优先级和资源 ID 竞争，生成文件遵循同路径的普通数据包覆盖规则。

## 提交计算关系

```javascript title="kubejs/server_scripts/custom_evaluator.js"
EvaluateEvents.values(event => {
  event.evaluator('example:custom', (context, params) => {
    context.set('minecraft:amethyst_shard', 16.5)
    context.addValue('minecraft:trial_spawner', 8.5)
    context.conversion(
      '2x minecraft:debug_stick',
      ['minecraft:trial_spawner', 'minecraft:amethyst_shard'],
      1
    )
  })
})
```

| 上下文方法 | 含义 |
| --- | --- |
| `context.set(item, value, priority = 1000)` | 固定基础值，选择器与 `event.set` 相同。 |
| `context.addValue(stack, value)` | 不锁定的单件候选价值，其他来源仍可提供更低值。 |
| `context.conversion(output, ingredients, extraValue = 0)` | 有向计算关系，使用输入和输出物品栈的数量。 |
| `context.context()` | 原始 Java `EvaluationContext`。 |

上述例子中，每个调试棒的候选价值为 `(8.5 + 16.5 + 1) / 2 = 13`。相关物品若命中固定基础规则，仍优先使用固定值。

回调只向统一计算图提交输入，不能在本次计算中查询已经完成的价值表。应声明依赖关系，而不是依靠脚本顺序手动查询并计算。

## 复用回调 {#reusable-callbacks}

在服务端脚本顶层注册回调：

```javascript title="kubejs/server_scripts/evaluator_types.js"
EvaluateJS.registerEvaluator('example:priced_item', (context, params) => {
  context.set(params.item, params.value)
})

EvaluateEvents.values(event => {
  event.js('example:pearl', 'example:priced_item', {
    item: 'minecraft:ender_pearl',
    value: 1024.5
  })
})
```

注册本身不会执行回调。可通过 `event.js` 实例化，也可以由数据包引用：

```json title="data/example/evaluate/evaluator/custom.json"
{
  "type": "evaluate:js",
  "id": "example:priced_item",
  "params": {
    "item": ["minecraft:diamond"],
    "value": 10000.5
  }
}
```

| 字段 | 类型 | 必填 | 默认值 | 含义 |
| --- | --- | --- | --- | --- |
| `type` | 资源 ID | 是 | — | `evaluate:js`。 |
| `id` | 资源 ID | 是 | — | 已注册回调 ID，与数据文件的资源 ID 分开。 |
| `params` | JSON 对象 | 否 | `{}` | 每次执行复制参数，通过 JS 属性访问。 |
| `comment` | 字符串 | 否 | — | 可选说明。 |

多个实例可以引用同一回调并传入不同参数。同一回调 ID 后注册者会替换前者。

回调属于加载它的资源重载。执行 `/reload` 会重新生成定义并捕获新回调，删除的贡献和注册不会残留。回调异常会记录日志，并停止本次回调的后续代码。缺失回调时，包括未安装 KubeJS 的情况，会记录警告并跳过该计算器实例。
