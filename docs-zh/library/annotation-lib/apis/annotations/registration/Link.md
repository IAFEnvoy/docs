---
title: Link
---

import { Annotation, Constant } from '@site/src/components/JavaIcons';

# Link <Annotation/>

告知注册系统将此对象链接到一个已注册的对象。

带有此注解的字段必须是 **non-final**，否则注册系统会抛出错误。
带有此注解的字段应为 **null**，否则其值将被覆盖。

例如，如果你已经注册了一个方块，就可以创建一个带此注解的物品字段。
注册系统会创建一个 `BlockItem` 并将其赋给该字段。

```java
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.FIELD})
public @interface Link {
    /**
     * The target object ID. Must in identifier format (namespace:path).
     *
     * @return {@link String }
     * @see Identifier
     */
    TargetId target() default @TargetId(value = "");

    /**
     * The target objects ID.
     *
     * @return {@link TargetId[] }
     */
    TargetId[] targets() default {};

    /**
     * The object type you want to link.
     *
     * @return {@link TargetType }
     * @see TargetType
     */
    TargetType type();
}
```

## TargetType <Constant/>

`@Link` 注解的链接目标类型。
```java
public enum TargetType {
    /**
     * Link to a `Block` and need 1 target
     */
    BLOCK,
    /**
     * Link to a `SkullBlock` and need 2 targets
     */
    SKULL
}
```
