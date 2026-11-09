---
title: CallbackHandler
---

import { Annotation } from '@site/src/components/JavaIcons';

# CallbackHandler <Annotation/>

告知注册系统在本类中所有字段注册完成后运行此方法。

此方法必须**没有**参数，且**没有**返回值。
你可以用它执行一些操作，例如注册配方。

```java
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.METHOD})
public @interface CallbackHandler {
    /**
     * Call this before or after actions.
     *
     * @return {@link CallTime }
     */
    CallTime value() default CallTime.AFTER;

    /**
     * The running environment. CLIENT->Client only, SERVER->Both
     *
     * @return {@link EnvType }
     */
    EnvType environment() default EnvType.SERVER;

    enum CallTime {
        BEFORE, AFTER
    }
}
```
