---
order: 3
group: 
  title: Mixin注解
  order: 1
---
# 访问器 @Shadow，@Accessor @Final @Mutable
Mixin访问器允许你访问不可见的（私有的）或者常量的字段和方法。

## 修饰符
### @Final
注明这个是final的变量，与`@Shadow`配合使用。

### @Mutable
和`@Final`或`@Accessor`配合使用，用于删除原变量的final修饰符，从而可以修改final变量。


## 访问字段
### 第一种方式：
```java
@Shadow
private ServerNetworkIo networkIo;
```
注意点：1.名称必须与原来的一致，2.不能加final（有的话删掉，并且加上`@Final`，比如下面这个例子：）
```java
@Shadow
@Final
private MinecraftClient client;
```
### 第二种方式：
```java
//接口注册
@Mixin(MinecraftClient.class)
public interface MinecraftClientAccessor {
    //获取
    @Accessor
    int getItemUseCooldown();
    //设置
    @Accessor("itemUseCooldown")
    void setItemUseCooldown(int itemUseCooldown);
}

//使用
//获取
int itemUseCooldown = ((MinecraftClientAccessor) MinecraftClient.getInstance()).getItemUseCooldown();
//设置
((MinecraftClientAccessor) MinecraftClient.getInstance()).setItemUseCooldown(100);
```
注意点：名称必须与原来的一致

## 访问方法：
### 第一种方式：
```java
//注册
@Mixin(EndermanEntity.class)
public interface EndermanEntityInvoker {
  @Invoker("teleportTo")
  boolean invokeTeleportTo(double x, double y, double z);
}

//使用
EndermanEntity enderman = ...;
((EndermanEntityInvoker) enderman).invokeTeleportTo(0.0D, 70.0D, 0.0D);
```
注意点：名称必须与原来的一致

### 第二种方式：
```java
@Shadow
protected abstract int getRenderedAmount(ItemStack stack);
```
注意点：1.名称必须与原来的一致，2.一定要是abstract方法，否则java编译会报错