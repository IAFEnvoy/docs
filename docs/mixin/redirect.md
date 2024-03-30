---
order: 4
group: 
  title: Mixin注解
  order: 1
---
# 重定向器 @Redirect
重定向器允许你在方法调用的时候重定向到你的方法，示例如下：
```java
@Redirect(method = "要注入的方法", at = @At(value = "INVOKE", target = "调用的对象类名;调用的方法"))
  private T redirect(调用的对象, 方法参数) {
    //你的代码
  }
```
## 重定向一个静态方法
静态方法重定向器的参数应该与 目标 方法参数相同.

重定向在`SimpleInventory::readTags`中调用的`ItemStack::fromTag(ListTag)`使其返回`null`：
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
## 重定向一个实例方法
实例方法重定向器与静态方法重定向器类似，但他们的第一个参数总是表示调用其 目标 的对象。

重定向在`Entity::dropItem(ItemConvertible)`中调用的`Entity::dropItem(ItemConvertible, int)`在本应掉落钻石时，不掉落任何物品（空气）：
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
`INVOKE_STRING` 注入点用于匹配只具有在`方法`调用中只具有单个字符串参数的`目标`。待捕获的`字符串`内容应该在`At`中的`args`属性指定。

重定向`MinecraftClient::render`中调用的通过`Profiler::push`传递`tick`来修改上述调用中传递的`位置`
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