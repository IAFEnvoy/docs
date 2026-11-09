---
title: AttributeBuilder
---

import { Annotation } from '@site/src/components/JavaIcons';

# AttributeBuilder <Annotation/>

Used to mark the default attribute builder method.

This annotation should be used with [@ObjectReg](./ObjectReg)

This method should be placed in the entity class and be static.
This method must have no parameter and return a `DefaultAttributeContainer.Builder`

```java
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.METHOD})
public @interface AttributeBuilder {
}
```

For example, you are registering an `EntityType<MyEntity>`.
Registration system will find the first method with correct signature and this annotation in `MyEntity` class.
Then it will use it to build a `Attribute` and register it.

If no matched method found, The registration system will **not** register default attribute.
You need to register it by yourself.