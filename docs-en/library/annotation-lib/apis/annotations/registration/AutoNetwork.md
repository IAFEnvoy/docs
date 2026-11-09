---
title: AutoNetwork
---

import { Annotation } from '@site/src/components/JavaIcons';

# AutoNetwork <Annotation/>

Register this hotkey into network.

Use `AnnotationApi.registerHotkeyHandler` to register your handler.

```java
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.FIELD})
public @interface AutoNetwork {
    /**
     * The register ID.
     *
     * @return {@link String }
     */
    String value() default "";
}
```