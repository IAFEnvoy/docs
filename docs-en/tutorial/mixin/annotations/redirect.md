---
order: 4
group: 
  title: Mixin Annotations
  order: 1
---
# Redirection: @Redirect
The redirector lets you redirect a method call to your own method, as shown below:
```java
@Redirect(method = "methodToInject", at = @At(value = "INVOKE", target = "calledClass;calledMethod"))
  private T redirect(calledObject, methodArguments) {
    //your code
  }
```
## Redirecting a static method
A static method redirector takes the same arguments as the target method.

This redirects the `ItemStack::fromTag(ListTag)` call inside `SimpleInventory::readTags` so that it returns `null`:
```java
@Mixin(SimpleInventory.class)
abstract class SimpleInventoryMixin {
    @Redirect(method = "readTags",
              at = @At(value = "INVOKE_ASSIGN", target = "Lnet/minecraft/item/ItemStack;fromTag(Lnet/minecraft/nbt/ListTag;)Lnet/minecraft/item/ItemStack;"))
    private static ItemStack returnNull(ListTag tag) {
        return null;
    }
}
```
## Redirecting an instance method
Instance method redirectors work like static ones, but their first argument is always the object on which the target method is called.

This redirects the `Entity::dropItem(ItemConvertible, int)` call inside `Entity::dropItem(ItemConvertible)` so that no item (air) is dropped where a diamond would have been:
```java
@Mixin(Entity.class)
abstract class EntityMixin {
    @Redirect(method = "dropItem",
              at = @At(value = "INVOKE", target = "Lnet/minecraft/item/ItemStack;dropItem(Lnet/minecraft/item/ItemConvertible;I)Lnet/minecraft/entity/ItemEntity;"))
    private ItemEntity replaceDroppedItem(Entity droppingEntity, ItemConvertible item, int yOffset) {
        return droppingEntity.dropItem(item == Items.DIAMOND ? Items.AIR : item, yOffset);
    }
}
```

## INVOKE_STRING
The `INVOKE_STRING` injection point matches a target that takes a single string argument in a method call. The string to match is specified through the `args` property of `At`.

This redirects the `Profiler::push` call inside `MinecraftClient::render` that receives `tick`, changing the `location` passed to that call:
```java
@Mixin(MinecraftClient.class)
abstract class MinecraftClientMixin {
    @Redirect(method = "render",
              at = @At(value = "INVOKE_STRING",
                       target = "Lnet/minecraft/util/profiler/Profiler;push(Ljava/lang/String;)V",
                       args = "ldc=tick"))
    private void redirectPush(Profiler profiler, String location) {
        profiler.push("modified tick");
        System.out.println(location);
    }
}
```
