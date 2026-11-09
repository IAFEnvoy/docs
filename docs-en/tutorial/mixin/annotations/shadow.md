---
order: 3
group: 
  title: Mixin Annotations
  order: 1
---
# Member Access: @Shadow, @Accessor, @Final, @Mutable
Mixin accessors let you access invisible (private) or constant fields and methods.

## Modifiers
### @Final
Marks a variable as final. Used together with `@Shadow`.

### @Mutable
Used together with `@Final` or `@Accessor` to remove the original variable's final modifier, allowing the final variable to be modified.


## Accessing fields
### First approach:
```java
@Shadow
private ServerNetworkIo networkIo;
```
Notes: 1. The name must match the original exactly. 2. Do not add `final` (remove it if present and add `@Final` instead, as in the example below:)
```java
@Shadow
@Final
private MinecraftClient client;
```
### Second approach:
```java
//interface registration
@Mixin(MinecraftClient.class)
public interface MinecraftClientAccessor {
    //getter
    @Accessor
    int getItemUseCooldown();
    //setter
    @Accessor("itemUseCooldown")
    void setItemUseCooldown(int itemUseCooldown);
}

//usage
//getter
int itemUseCooldown = ((MinecraftClientAccessor) MinecraftClient.getInstance()).getItemUseCooldown();
//setter
((MinecraftClientAccessor) MinecraftClient.getInstance()).setItemUseCooldown(100);
```
Notes: the name must match the original exactly.

## Accessing methods:
### First approach:
```java
//registration
@Mixin(EndermanEntity.class)
public interface EndermanEntityInvoker {
  @Invoker("teleportTo")
  boolean invokeTeleportTo(double x, double y, double z);
}

//usage
EndermanEntity enderman = ...;
((EndermanEntityInvoker) enderman).invokeTeleportTo(0.0D, 70.0D, 0.0D);
```
Notes: the name must match the original exactly.

### Second approach:
```java
@Shadow
protected abstract int getRenderedAmount(ItemStack stack);
```
Notes: 1. The name must match the original exactly. 2. It must be an abstract method, otherwise Java compilation fails.
