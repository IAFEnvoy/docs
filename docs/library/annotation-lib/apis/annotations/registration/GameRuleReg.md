---
title: GameRuleReg
---

import { Annotation } from '@site/src/components/JavaIcons';

# ~~GameRuleReg~~ <Annotation/>

**DO NOT USE THIS**

Register this game rule with given ID.

```java
@UnusedYet
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.FIELD})
public @interface GameRuleReg {
    /**
     * The name of game rule
     *
     * @return {@link String }
     */
    String name() default "";

    /**
     * The type of game rule
     *
     * @return {@link GameRules.Category }
     */
    GameRules.Category category();

    /**
     * Whether to use the mod id as prefix
     * @return boolean
     */
    boolean modIdPrefix() default true;
}
```