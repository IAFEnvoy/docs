---
sidebar_position: 2
---

# Examples

## Managing Origins & Powers

```javascript
// Get the holder for a player or entity
let holder = OriginsJS.getHolder(event.player);

// Grant / revoke powers
holder.grantPower("origins:origin", "origins:fire_immunity");
holder.revokePower("origins:origin", "origins:climbing");

// Check powers
if (holder.hasPower("origins:fire_immunity")) {
    event.player.tell("You are immune to fire!");
}

// Set / check origins
holder.setOrigin("origins:origin", "origins:human");
if (holder.hasOrigin("origins:human")) {
    event.player.tell("You are a human.");
}

// Get origin in a layer
let originId = holder.getOriginId("origins:origin");

// Revoke all powers from a source
holder.revokeAllPowers("origins_js:script");

// Random origin for a layer
holder.randomOrigin("origins:origin");

// List all origins
holder.getAllOrigins().forEach(([layer, origin]) => {
    console.log(`Layer ${layer}: ${origin}`);
});

// Resource / Cooldown / Entity Set
holder.setResource("origins:climbing", 20);
holder.startCooldown("origins:fireball");
holder.addToEntitySet("mypack:friends", event.player.getStringUuid());

// HelperWrapper (recommended API)
let helper = OriginsJS.getHelper(event.player);
helper.anyActive();
helper.hasActive("origins:climbing");
helper.toggle("primary");
```

## Custom Actions

```javascript
// Entity Action — callback: (entity, params)
OriginsJS.registerEntityAction("mypack:greet", (entity, params) => {
    let msg = params.message || "Hello!";
    entity.tell(msg);
});

// Block Action — callback: (level, pos, direction, params)
OriginsJS.registerBlockAction("mypack:break_notify", (level, pos, dir, params) => {
    console.log(`Block at ${pos}, check: ${params.check}`);
});

// Item Action — callback: (level, entity, slotAccess, params)
OriginsJS.registerItemAction("mypack:modify", (level, entity, slot, params) => {
    let count = params.count || 1;
    let stack = slot.get();
    if (!stack.isEmpty()) stack.setCount(stack.getCount() + count);
});

// BiEntity Action — callback: (actor, target, params)
OriginsJS.registerBiEntityAction("mypack:splash", (actor, target, params) => {
    let duration = params.duration || 100;
    target.addEffect("minecraft:slowness", duration, 1);
});
```

### JSON usage for custom actions:

```json
{
    "type": "origins_js:js_entity_action",
    "id": "mypack:greet",
    "params": { "message": "Hi!" }
}
```

## Custom Conditions

```javascript
// Entity Condition — callback: (entity, params) => bool
OriginsJS.registerEntityCondition("mypack:low_health", (entity, params) => {
    let threshold = params.threshold || 10;
    return entity.health < threshold;
});

// Block Condition — callback: (level, pos, params) => bool
OriginsJS.registerBlockCondition("mypack:is_block", (level, pos, params) => {
    let blockId = params.block || "minecraft:air";
    return level.getBlockState(pos).is(blockId);
});
```

### JSON usage for custom conditions:

```json
{
    "type": "origins_js:js_entity_condition",
    "id": "mypack:low_health",
    "params": { "threshold": 5 }
}
```

## HelperWrapper (Recommended API)

The HelperWrapper provides a cleaner API backed by the new PowerHelper system.

```javascript
let helper = OriginsJS.getHelper(event.player);

// === Active State ===
helper.anyActive();                        // any power active?
helper.noneActive();                       // no powers active?
helper.hasActive("origins:climbing");      // specific power?

// === Toggle ===
helper.toggle("primary");                  // toggle primary power

// === Stream / List active powers ===
let powers = helper.listActive("origins:climbing");
powers.forEach(p => console.log(p));
helper.streamActive("origins:climbing").forEach(p => { /* ... */ });

// With filter
helper.listActive("origins:climbing", p => p.isActive(helper.getRaw()));

// Get first active instance
let first = helper.getFirst("origins:climbing");

// === Execute callback on active powers ===
helper.execute("origins:climbing", (holder, power) => {
    holder.getEntity().tell("You are climbing!");
});

// === Modify (for modifier powers like modify_attribute) ===
// Applies all active modifier effects to a base value
let modified = helper.modifyDouble("origins:modify_attribute", 10.0);

// === Reduce (fold over active powers) ===
let total = helper.reduceDouble("origins:modify_attribute", 0.0,
    (holder, acc, power) => acc + power.getModifierValue()
);

// === Resource / Cooldown / Entity Set (also on HelperWrapper) ===
helper.setResource("origins:climbing", 20);
helper.startCooldown("origins:fireball");
helper.addToEntitySet("mypack:friends", event.player.getStringUuid());
helper.getEntitySetMembers("mypack:friends").forEach(uuid => console.log(uuid));
```

## Custom Powers

```javascript
// All callbacks receive (holder, params) where params comes from JSON
OriginsJS.powerBuilder("mypack:custom_power")
    .grant((holder, params) => holder.getEntity().tell(params.msg || "Granted!"))
    .revoke((holder, params) => holder.getEntity().tell("Revoked!"))
    .tick((holder, params) => holder.getEntity().heal(params.amount || 0.5))
    .register();
```

### JSON usage for custom powers:

```json
{
    "type": "origins_js:js_power",
    "id": "mypack:custom_power",
    "name": "My Custom Power",
    "description": "A power defined in KubeJS scripts",
    "params": {
        "msg": "Hello custom power!",
        "amount": 1.0
    }
}
```
