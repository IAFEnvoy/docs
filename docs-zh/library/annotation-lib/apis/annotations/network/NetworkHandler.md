---
title: NetworkHandler
---

import { Annotation } from '@site/src/components/JavaIcons';

# NetworkHandler <Annotation/>

注册一个网络处理器。

该类必须实现 `ClientPlayNetworking.PlayChannelHandler` 或 `ServerPlayNetworking.PlayChannelHandler`。

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
