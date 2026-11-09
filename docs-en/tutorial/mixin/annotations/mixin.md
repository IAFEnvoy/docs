---
order: 0
group: 
  title: Mixin Annotations
  order: 1
---
# Target Classes: @Mixin
This annotation is one of the **most important** annotations in the Mixin system. It tells Mixin that the annotated class performs injection, and which class to inject into.

## Annotation Source
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

## Usage
Add this annotation to the top of a class and pass the target `Class`.
```java
@Mixin(Screen.class)
public class ScreenMixin {
    //Your Mixin code here
}
```
If the target class is `protected` or `private` and its `Class` object is not accessible, use `targets` instead.

For example: (**Note: for nested classes, use `$` instead of `.`**)
```java
@Mixin(targets = {"net.minecraft.client.renderer.texture.SimpleTexture$TextureImage"})
```
