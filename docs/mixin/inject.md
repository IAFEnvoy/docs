---
order: 2
group: 
  title: Mixin注解
  order: 1
---
# 注入器 @Inject
此注解允许你在已存在的方法中的特定位置放置自定义的代码。

## 注解源码
```java
@Target({ ElementType.METHOD })
@Retention(RetentionPolicy.RUNTIME)
public @interface Inject {
    public String id() default "";
    public String[] method() default {};
    public Desc[] target() default {};
    public Slice[] slice() default {};
    public At[] at();
    public boolean cancellable() default false;
    public LocalCapture locals() default LocalCapture.NO_CAPTURE;
    public boolean remap() default true;
    public int require() default -1;
    public int expect() default 1;
    public int allow() default -1;
    public String constraints() default "";
}
```

## 使用方式
注入的基础模板如下：
```java
@Inject(method = "要注入的方法", at = @At("注入点参考"))
private void injectMethod(METHOD ARGS, CallbackInfo info) {
 //你的代码
}
```

如需在方法中提前取消或者返回，使用`CallbackInfo.cancel();`或者`CallbackInfoReturnable<T>.setReturnValue(T);`。注意`cancel()`不需要在`selReturnValue()`之后调用。在这两个实例中，`cancellable`需要在注入注解中设为true：
```java
@Inject(method = "...", at = @At("..."), cancellable = true)
```
 如需向构造器中注入，方法目标使用`<init>()V`，其中`()`包含构造器变量描述符。向构造器中注入时，`@At`必须是`TAIL`或者`RETURN`，其他格式的注入均不支持。注意有一些类有名为`init`的方法，与`<init>`不同，不要弄混！
如需向静态构造器中注入，方法名称使用`<clinit>`。 

**注意：方法必须设置为private**

当然，这个也可以用来修改返回值，示例如下：
```java
@Inject(method = "foo()I;", at = @At("RETURN"), cancellable = true)
private void injected(CallbackInfoReturnable<Integer> cir) {
  cir.setReturnValue(cir.getReturnValue() * 3);
}
```
