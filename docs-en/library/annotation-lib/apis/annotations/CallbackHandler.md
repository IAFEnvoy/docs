---
title: CallbackHandler
---

import { Annotation } from '@site/src/components/JavaIcons';

# CallbackHandler <Annotation/>

Tell the registration system to run this method after registered all fields in this class.

This method must have **no** parameter and **no** return value.
You can use it to do something such as register recipes.

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