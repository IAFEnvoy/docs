---
order: 0
group: 
  title: Mixin注解
  order: 1
---
# 标注器 @Mixin
这个注解是Mixin系统中**最最最最重要**的注解之一，用于告诉Mixin需要用这个类注入，并告知需要注入的类。

## 注解源码
```java
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.CLASS)
public @interface Mixin {
    public Class<?>[] value() default { };
    public String[] targets() default { };
    public int priority() default 1000;
    public boolean remap() default true;
}
```

## 使用方式
在类最前面加上此注解并传入`Class`参数即可。
```java
@Mixin(Screen.class)
public class ScreenMixin {
    //Your Mixin code here
}
```
如果目标类被设置为`protected`或者`private`导致无法获取`Class`对象，可以使用`targets`来选择。

比如说：（**注意：如果有套娃类，必须使用`$`来代替`.`**）
```java
@Mixin(targets = {"net.minecraft.client.renderer.texture.SimpleTexture$TextureImage"})
```