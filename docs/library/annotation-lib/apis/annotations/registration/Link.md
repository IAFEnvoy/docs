---
title: Link
---

import { Annotation, Constant } from '@site/src/components/JavaIcons';

# Link <Annotation/>

Tell the registry system to link this object to a registered object.

Field with this annotation must be **non-final**, or registration system will throw an error.
Field with this annotation should be **null**, or value will be overwritten.

For example, if you have registered a block, you can create an item field with this annotation.
Registration system will create a `BlockItem` and give it to the field.

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

Link target type for `@Link` annotation.
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