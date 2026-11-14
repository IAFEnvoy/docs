---
title: Java API
description: 查询不可变的服务端价值快照，注册数据驱动计算器类型并向统一计算图提交关系。
sidebar_position: 6
---

API 位于 `com.iafenvoy.evaluate.api`，应在**服务端启动完成后**从服务端线程调用。计算依赖已经绑定的标签、物品组件、配方及可选外部数据。

## 查询价值

```java
import com.iafenvoy.evaluate.api.ItemValues;
import com.iafenvoy.evaluate.api.ValueKey;

OptionalDouble diamond = ItemValues.get(server, Items.DIAMOND);
OptionalDouble variant = ItemValues.get(server, stack);
Map<ValueKey.Item, Double> snapshot = ItemValues.all(server);
```

结果均为单件价值，不乘栈数量。未知和免费物品返回 `OptionalDouble.empty()`。

`get(server, stack)` 依次查询最终覆盖、匹配实际栈的固定基础规则，以及精确物品／组件键对应的推导结果。组件敏感查询应使用该方法。`all()` 只包含已经收集的变体，返回不可变 Map。

服务端会缓存计算快照。重载或外部重算后需要重新获取，之前返回的 Map 保持原样。

```java
Registry<Evaluator> evaluators = ItemValues.evaluators(server);
Registry<ValueOverride> overrides = ItemValues.overrides(server);
```

原生键为 `EvaluateResourceKeys.EVALUATOR` 和 `EvaluateResourceKeys.VALUE_OVERRIDE`。运行时应通过上述 API 取得当前重载版本，Minecraft 初始注册表层不会自动变成新的运行时快照。重载后也需要重新获取注册表。

## 注册计算器类型

`Evaluator` 定义两个方法：

```java
void evaluate(EvaluationContext context);
MapCodec<? extends Evaluator> codec();
```

在代码中注册类型的 Codec，再由数据文件决定实例 ID、数量及参数：

```java
public record BottleEvaluator(double value) implements Evaluator {
  public static final MapCodec<BottleEvaluator> CODEC = DefinitionCodecs.NON_NEGATIVE_DOUBLE
      .fieldOf("value").xmap(BottleEvaluator::new, BottleEvaluator::value);

  @Override
  public MapCodec<BottleEvaluator> codec() {
    return CODEC;
  }

  @Override
  public void evaluate(EvaluationContext context) {
    context.addValue(new ItemStack(Items.EXPERIENCE_BOTTLE), value);
  }
}
```

`DefinitionCodecs` 位于 `com.iafenvoy.evaluate.data`。在模组构造器中注册：

```java
DeferredRegister<MapCodec<? extends Evaluator>> types =
    DeferredRegister.create(EvaluateResourceKeys.EVALUATOR_TYPE, "example");
types.register("bottle", () -> BottleEvaluator.CODEC);
types.register(modEventBus);
```

`EvaluateResourceKeys` 和 `EvaluateRegistries` 位于 `com.iafenvoy.evaluate.registry`。`EvaluateRegistries.EVALUATOR_TYPE` 提供类型注册表；`Evaluator.CODEC` 按 `type` 分发，并根据选中 Codec 校验字段。

```json title="data/example/evaluate/evaluator/bottle.json"
{
  "type": "example:bottle",
  "value": 12.5
}
```

该实例为经验瓶提交未锁定的单件候选值 `12.5`。其他计算器仍可提供更低值，固定基础规则优先。只注册类型、不创建实例时不会执行。

## 计算上下文

| 方法 | 用途 |
| --- | --- |
| `resources()` | 当前 `ReloadableServerResources`。 |
| `item(stack)` | 注册代表物品变体并返回 `ValueKey.Item`。 |
| `group(name)` | 创建以本计算器资源 ID 为作用域的内部候选组键。 |
| `setValue(matcher, value)` | 使用 Saturn `ItemMatcher` 提交固定基础值。 |
| `addValue(stack, value)` | 提交未锁定的单件候选值。 |
| `addConversion(conversion)` | 提交有向关系，等待统一求解。 |

匹配项构建和行为见已有的 [Saturn 参考](../../library/saturn/types/item-matcher.md)。不要在计算结束后持有 `EvaluationContext`，也不要在计算器内部查询尚未完成的结果图。

## 依赖其他物品

`Conversion` 位于 `com.iafenvoy.evaluate.value`：

```java
context.addConversion(new Conversion<>(
    1,
    context.item(new ItemStack(Items.EXPERIENCE_BOTTLE)),
    Map.of(context.item(new ItemStack(Items.EMERALD)), 2),
    0.5
));
```

参数依次是输出数量、输出键、材料数量和可选附加成本。该例表示一瓶经验瓶需要两颗绿宝石，再增加 `0.5` 成本。省略第四个参数时附加成本为零。材料数量为负表示返还容器或副产物。

应通过 `context.item(stack)` 取得物品键，使固定规则也能匹配关系用到的组件变体。数量使用 `int`，输出数量必须为正，附加成本必须有限且非负。

全部计算器先提交关系，再统一求解，因此依赖方向不受注册顺序影响。[循环保护](./calculation.md#cycles)同样适用于 Java 提交的关系。最终覆盖仍由独立的 `value_override` 注册表处理，这些 API 不会启用自定义数据包 `conversions`。
