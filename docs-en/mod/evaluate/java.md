---
title: Java API
description: Query immutable server value snapshots and register data-driven evaluator types that contribute to the common graph.
sidebar_position: 6
---

Use the classes in `com.iafenvoy.evaluate.api` from the server thread **after server startup has completed**. Calculations depend on bound tags, item components, recipes, and optional external data.

## Query values

```java
import com.iafenvoy.evaluate.api.ItemValues;
import com.iafenvoy.evaluate.api.ValueKey;

OptionalDouble diamond = ItemValues.get(server, Items.DIAMOND);
OptionalDouble variant = ItemValues.get(server, stack);
Map<ValueKey.Item, Double> snapshot = ItemValues.all(server);
```

Every result is a value per item, independent of stack count. Unknown and free items return `OptionalDouble.empty()`.

`get(server, stack)` checks final overrides, then fixed base rules against the actual stack, then the inferred result for its exact item/component key. Use this method for component-sensitive queries. `all()` only includes collected variants and returns an immutable map.

The snapshot is cached on the server. Reacquire it after reload or external recalculation; a previously returned map stays unchanged.

```java
Registry<Evaluator> evaluators = ItemValues.evaluators(server);
Registry<ValueOverride> overrides = ItemValues.overrides(server);
```

The native keys are `EvaluateResourceKeys.EVALUATOR` and `EvaluateResourceKeys.VALUE_OVERRIDE`. Use these API accessors for the current reload's registries; Minecraft's initial registry layer does not become the new runtime snapshot. Reacquire the registries after reload too.

## Register an evaluator type

`Evaluator` defines two methods:

```java
void evaluate(EvaluationContext context);
MapCodec<? extends Evaluator> codec();
```

Register a type's codec in code, then let data files choose instance IDs, counts, and parameters:

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

`DefinitionCodecs` is in `com.iafenvoy.evaluate.data`. Register the type in your mod constructor:

```java
DeferredRegister<MapCodec<? extends Evaluator>> types =
    DeferredRegister.create(EvaluateResourceKeys.EVALUATOR_TYPE, "example");
types.register("bottle", () -> BottleEvaluator.CODEC);
types.register(modEventBus);
```

`EvaluateResourceKeys` and `EvaluateRegistries` are in `com.iafenvoy.evaluate.registry`. `EvaluateRegistries.EVALUATOR_TYPE` is the type registry; `Evaluator.CODEC` dispatches by `type` and validates fields against the chosen codec.

```json title="data/example/evaluate/evaluator/bottle.json"
{
  "type": "example:bottle",
  "value": 12.5
}
```

This instance contributes an unlocked candidate of `12.5` per experience bottle. Another evaluator can offer a cheaper candidate, and a fixed base rule takes precedence. Registering the type without an instance does not execute it.

## Evaluation context

| Method | Purpose |
| --- | --- |
| `resources()` | Current `ReloadableServerResources`. |
| `item(stack)` | Registers a representative stack variant and returns its `ValueKey.Item`. |
| `group(name)` | Creates an internal alternative-group key scoped to this evaluator's resource ID. |
| `setValue(matcher, value)` | Submits a fixed base value using Saturn's `ItemMatcher`. |
| `addValue(stack, value)` | Submits an unlocked candidate value per item. |
| `addConversion(conversion)` | Submits a directed relationship for later solving. |

For matcher construction and matching behavior, use the existing [Saturn reference](../../library/saturn/types/item-matcher.md). Do not retain `EvaluationContext` after evaluation or query an unfinished result graph from within the evaluator.

## Depend on other items

`Conversion` is in `com.iafenvoy.evaluate.value`:

```java
context.addConversion(new Conversion<>(
    1,
    context.item(new ItemStack(Items.EXPERIENCE_BOTTLE)),
    Map.of(context.item(new ItemStack(Items.EMERALD)), 2),
    0.5
));
```

The arguments are output count, output key, ingredient quantities, and optional extra cost. Here, one experience bottle costs two emeralds plus `0.5`. Omitting the fourth argument uses zero extra cost. Negative ingredient quantities represent returned containers or byproducts.

Use `context.item(stack)` to obtain item keys so that fixed matchers can see the variants used by your relationship. Quantities are `int`; output counts must be positive, and extra costs must be finite and nonnegative.

All evaluators submit their relationships before the shared graph is solved, so dependency direction is independent of evaluator registration order. [Cycle protections](./calculation.md#cycles) apply to Java contributions too. Final overrides belong to the separate `value_override` registry, and these APIs do not enable custom datapack `conversions`.
