---
title: AutoNetwork
---

import { Annotation } from '@site/src/components/JavaIcons';

# AutoNetwork <Annotation/>

将此热键注册到网络。

使用 `AnnotationApi.registerHotkeyHandler` 注册你的处理器。

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
