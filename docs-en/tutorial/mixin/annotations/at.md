---
order: 1
group: 
  title: Mixin Annotations
  order: 1
---
# Injection Points: @At
This annotation is one of the **most important** annotations in the Mixin system. It marks where and how code is injected.

## Annotation Source
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
