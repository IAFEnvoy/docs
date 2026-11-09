---
sidebar_position: 1
---

# API 参考 {#api-reference}

## JS 动作 / 条件类型 {#js-action--condition-types}

所有自定义类型都使用 `origins_js:` 命名空间前缀。关于这些类型所包装的标准类型，请参阅对应文档：

| JSON `type` | 注册方法 | 回调参数 | 标准文档 |
|-------------|---------------------|---------------|---------------|
| `origins_js:js_entity_action` | `registerEntityAction` | `(entity, params)` | [实体动作](../types/action/entity_action_types) |
| `origins_js:js_block_action` | `registerBlockAction` | `(level, pos, direction, params)` | [方块动作](../types/action/block_action_types) |
| `origins_js:js_item_action` | `registerItemAction` | `(level, entity, slotAccess, params)` | [物品动作](../types/action/item_action_types) |
| `origins_js:js_bientity_action` | `registerBiEntityAction` | `(actor, target, params)` | [双实体动作](../types/action/bientity_action_types) |
| `origins_js:js_entity_condition` | `registerEntityCondition` | `(entity, params) => bool` | [实体条件](../types/condition/entity_condition_types) |
| `origins_js:js_block_condition` | `registerBlockCondition` | `(level, pos, params) => bool` | [方块条件](../types/condition/block_condition_types) |
| `origins_js:js_item_condition` | `registerItemCondition` | `(level, itemStack, params) => bool` | [物品条件](../types/condition/item_condition_types) |
| `origins_js:js_bientity_condition` | `registerBiEntityCondition` | `(actor, target, params) => bool` | [双实体条件](../types/condition/bientity_condition_types) |
| `origins_js:js_biome_condition` | `registerBiomeCondition` | `(biomeHolder, pos, params) => bool` | [生物群系条件](../types/condition/biome_condition_types) |
| `origins_js:js_damage_condition` | `registerDamageCondition` | `(damageSource, amount, params) => bool` | [伤害条件](../types/condition/damage_condition_types) |
| `origins_js:js_fluid_condition` | `registerFluidCondition` | `(fluidState, params) => bool` | [流体条件](../types/condition/fluid_condition_types) |
| `origins_js:js_power` | `powerBuilder(id).grant/.../...register()` | Builder：`.grant((holder, params) => ...)` | [能力类型](../types/power) |

---

## HolderWrapper API {#holderwrapper-api}

:::warning

查询和操作能力状态时，**推荐**使用 [`HelperWrapper`](#helperwrapper-api-recommended)。它在内部使用新的 PowerHelper API，比旧的 HolderWrapper 方法更安全、更灵活。

:::

`OriginsJS.getHolder(entity)` 返回的包装器上可用的方法：

### 起源管理 {#origin-management}

数据结构细节请参阅 [起源 JSON 格式](../json/origin) 和 [起源层 JSON 格式](../json/layer)。

| 方法 | 说明 |
|--------|-------------|
| `setOrigin(layerId, originId)` | 为某个起源层指定起源 |
| `clearOrigin(layerId)` | 从某个起源层移除起源 |
| `hasOrigin(originId)` | 检查实体是否拥有指定起源（任意起源层） |
| `hasOriginInLayer(layerId, originId)` | 在指定起源层中检查 |
| `hasLayer(layerId)` | 检查该起源层是否有任何起源 |
| `getOriginId(layerId)` | 获取某个起源层的起源 ID 字符串，或 `null` |
| `getAllOrigins()` | 返回 `[[layerId, originId], ...]` |
| `hasAllOrigins()` | 是否所有起源层都已指定 |
| `fillAutoChoosing()` | 填充自动选择的起源层 |
| `randomOrigin(layerId)` | 随机指定一个起源 |

### 能力管理 {#power-management}

数据结构细节请参阅 [能力 JSON 格式](../json/power)。命令等价用法请参阅 [`/power` 命令](../misc/commands/power)。

| 方法 | 说明 |
|--------|-------------|
| `grantPower(source, powerId)` | 从某个来源授予能力 |
| `revokePower(source, powerId)` | 从某个来源撤销能力 |
| `revokeAllPowers(source)` | 移除某个来源的所有能力 |
| `hasPower(powerId)` | 检查实体是否拥有某个能力 |
| `getAllPowerIds()` | 列出所有能力 ID 字符串 |

### 资源（整数资源条） {#resource-integer-resource-bar}

底层能力类型请参阅 [资源（能力类型）](../types/power/regular#originsresource)。

| 方法 | 说明 |
|--------|-------------|
| `getResource(powerId)` | 获取当前资源值 |
| `setResource(powerId, value)` | 把资源设为指定的整数 |
| `addResource(powerId, delta)` | 增加/减少资源 |

### 冷却（使用冷却计时器） {#cooldown-usage-cooldown-timer}

底层能力类型请参阅 [冷却（能力类型）](../types/power/regular#originscooldown)。

| 方法 | 说明 |
|--------|-------------|
| `getCooldown(powerId)` | 获取剩余冷却刻数 |
| `startCooldown(powerId)` | 开始冷却 |
| `canUseCooldown(powerId)` | 检查冷却是否已就绪 |

### 实体集合（按能力追踪的实体集合） {#entity-set-per-power-entity-tracking-set}

与实体集合交互的类型请参阅 [集合上的动作（实体动作）](../types/action/entity_action_types#originsaction_on_set) 和 [集合大小（条件）](../types/condition/entity_condition_types#originsset_size)。

| 方法 | 说明 |
|--------|-------------|
| `addToEntitySet(powerId, uuid)` | 添加一个实体（使用 UUID 字符串） |
| `removeFromEntitySet(powerId, uuid)` | 移除一个实体 |
| `isInEntitySet(powerId, uuid)` | 检查某个实体是否在集合中 |
| `getEntitySetSize(powerId)` | 获取集合中的实体数量 |
| `getEntitySetMembers(powerId)` | 获取集合中的所有 UUID 字符串 |

---

## 推荐使用 HelperWrapper {#helperwrapper-api-recommended}

可通过 `OriginsJS.getHelper(entity)` 或 `holder.getHelper()` 返回的包装器使用。
它在内部使用新的 PowerHelper API。这是查询和操作能力状态的**推荐**方式。

### 激活状态 {#active-state}

| 方法 | 说明 |
|--------|-------------|
| `anyActive()` | 检查是否有**任意**能力当前生效 |
| `noneActive()` | 检查是否没有任何能力当前生效 |
| `hasActive(powerId)` | 检查某个指定能力（按 ID）是否有生效实例 |
| `hasNoneActive(powerId)` | 检查某个指定能力是否没有生效实例 |

### Toggle {#toggle}

| 方法 | 说明 |
|--------|-------------|
| `toggle(key)` | 按 key 切换能力（例如 `"primary"`、`"secondary"`） |

### Stream / List / GetFirst {#stream--list--getfirst}

| 方法 | 说明 |
|--------|-------------|
| `streamActive(powerId)` | 以流的形式获取该能力类型的所有生效实例 |
| `listActive(powerId)` | 列出所有生效实例 |
| `listActive(powerId, filter)` | 列出匹配谓词的生效实例 |
| `getFirst(powerId)` | 获取第一个生效实例，或 `null` |
| `getFirst(powerId, filter)` | 获取第一个匹配谓词的生效实例，或 `null` |

### Execute {#execute}

`execute(powerId, (holder, power) => { ... })` —— 对每个生效实例运行一次回调。

| 方法 | 说明 |
|--------|-------------|
| `execute(powerId, action)` | 对每个生效实例执行回调 |
| `execute(powerId, filter, action)` | 对匹配的生效实例执行回调 |

回调接收 `(OriginDataHolder, Power)`。

### Modify {#modify}

把修饰符能力效果应用到基础值上。仅对实现了 `ModifierPowerHelper` 的能力生效（例如 `origins:modify_attribute`）。

| 方法 | 说明 |
|--------|-------------|
| `modifyInt(powerId, base)` | 修改整数基础值 |
| `modifyInt(powerId, filter, base)` | 带谓词过滤地修改整数 |
| `modifyFloat(powerId, base)` | 修改浮点数基础值 |
| `modifyFloat(powerId, filter, base)` | 带谓词过滤地修改浮点数 |
| `modifyDouble(powerId, base)` | 修改双精度浮点数基础值 |
| `modifyDouble(powerId, filter, base)` | 带谓词过滤地修改双精度浮点数 |

### Reduce {#reduce}

对所有生效实例进行归约，累积出一个结果。

| 方法 | 说明 |
|--------|-------------|
| `reduceDouble(powerId, identity, reducer)` | 归约 double。reducer：`(holder, acc, power) => newAcc` |
| `reduce(powerId, identity, reducer, combiner)` | 使用自定义类型和合并器的通用归约 |

### Apply Modifiers {#apply-modifiers}

把一组 Modifier 应用到基础值上。

| 方法 | 说明 |
|--------|-------------|
| `applyModifiers(modifiers, base)` | 应用修饰符（int/float/double） |

### 组件访问 {#component-access}

| 方法 | 说明 |
|--------|-------------|
| `getComponent(powerId, class)` | 获取附加在某个能力上的组件，或 `null` |
| `getComponentFor(power, class)` | 从某个具体能力实例获取组件 |
| `getComponentHolder(powerId, class)` | 获取组件持有者，或 `null` |

### 资源 / 冷却 / 实体集合 {#resource--cooldown--entity-set}

与 HolderWrapper 相同，可直接使用：

| 方法 | 说明 |
|--------|-------------|
| `getResource(powerId)` / `setResource(powerId, value)` / `addResource(powerId, delta)` | 资源管理 |
| `getCooldown(powerId)` / `startCooldown(powerId)` / `canUseCooldown(powerId)` | 冷却管理 |
| `addToEntitySet(powerId, uuid)` / `removeFromEntitySet(powerId, uuid)` / `isInEntitySet(powerId, uuid)` / `getEntitySetSize(powerId)` / `getEntitySetMembers(powerId)` | 实体集合管理 |

---

## 静态快捷方法 {#static-shortcut-methods}

```javascript
OriginsJS.getPlayerHolder(player)
OriginsJS.getHelper(entity)            // Get HelperWrapper directly
OriginsJS.grantPower(entity, source, powerId)
OriginsJS.revokePower(entity, source, powerId)
OriginsJS.hasPower(entity, powerId)
OriginsJS.setOrigin(entity, layerId, originId)
OriginsJS.hasOrigin(entity, originId)
OriginsJS.powerBuilder("mypack:power").grant(...).tick(...).register()

// Resource
OriginsJS.getResource(entity, powerId)
OriginsJS.setResource(entity, powerId, value)
OriginsJS.addResource(entity, powerId, delta)

// Cooldown
OriginsJS.getCooldown(entity, powerId)
OriginsJS.startCooldown(entity, powerId)
OriginsJS.canUseCooldown(entity, powerId)

// Entity Set
OriginsJS.addToEntitySet(entity, powerId, uuid)
OriginsJS.removeFromEntitySet(entity, powerId, uuid)
OriginsJS.isInEntitySet(entity, powerId, uuid)
OriginsJS.getEntitySetSize(entity, powerId)

// PowerHelper shortcuts
OriginsJS.anyPowerActive(entity)
OriginsJS.noPowerActive(entity)
OriginsJS.togglePower(entity, key)
```
