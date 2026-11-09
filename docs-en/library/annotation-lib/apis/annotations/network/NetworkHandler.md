---
title: NetworkHandler
---

import { Annotation } from '@site/src/components/JavaIcons';

# NetworkHandler <Annotation/>

Register a network handler.

This class must implement `ClientPlayNetworking.PlayChannelHandler` or `ServerPlayNetworking.PlayChannelHandler`.

```java
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.TYPE})
public @interface NetworkHandler {
    /**
     * The message ID
     *
     * @return {@link TargetId }
     */
    TargetId value();
}
```