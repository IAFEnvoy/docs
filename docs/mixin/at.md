---
order: 1
group: 
  title: Mixin注解
  order: 1
---
# 定位器 @At
这个注解是Mixin系统中**最最最最重要**的注解之一，用于标记注入的地点和方式。

## 注解源码
```java
@Target({ /* No targets allowed */ })
@Retention(RetentionPolicy.RUNTIME)
public @interface At {
    public enum Shift {
        NONE,
        BEFORE,
        AFTER,
        BY
    }
    public String id() default "";
    public String value();
    public String slice() default "";
    public Shift shift() default Shift.NONE;
    public int by() default 0;
    public String[] args() default { };
    public String target() default "";
    public Desc desc() default @Desc("");
    public int ordinal() default -1;
    public int opcode() default -1;
    public boolean remap() default true;
}
```