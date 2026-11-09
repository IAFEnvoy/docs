---
order: 2
group: 
  title: Mixin Annotations
  order: 1
---
# Callback Injection: @Inject
This annotation lets you place custom code at a specific point inside an existing method.

## Annotation Source
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

## Usage
The basic injection template is as follows:
```java
@Inject(method = "methodToInject", at = @At("injectionPointReference"))
private void injectMethod(METHOD ARGS, CallbackInfo info) {
 //your code
}
```

To cancel or return early inside the method, use `CallbackInfo.cancel();` or `CallbackInfoReturnable<T>.setReturnValue(T);`. Note that `cancel()` does not need to be called after `setReturnValue()`. In both cases, `cancellable` must be set to true in the injection annotation:
```java
@Inject(method = "...", at = @At("..."), cancellable = true)
```
 To inject into a constructor, use `<init>()V` as the method target, where `()` contains the constructor parameter descriptors. When injecting into a constructor, `@At` must be `TAIL` or `RETURN`; other injection points are not supported. Note that some classes have a method named `init`, which is different from `<init>` — don't confuse them!
To inject into a static initializer, use `<clinit>` as the method name. 

**Note: the method must be private**

This annotation can also be used to modify return values, as shown below:
```java
@Inject(method = "foo()I;", at = @At("RETURN"), cancellable = true)
private void injected(CallbackInfoReturnable<Integer> cir) {
  cir.setReturnValue(cir.getReturnValue() * 3);
}
```
