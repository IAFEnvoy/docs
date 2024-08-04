---
title: CommandProcessor
---

import { Annotation } from '@site/src/components/JavaIcons';

# CommandProcessor <Annotation/>

Register a command processor.

If this is a method, it must have the same signature with `Command<ServerCommandSource>`
If you want to register for root, leave value field empty.

```java
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.TYPE, ElementType.METHOD})
public @interface CommandProcessor {
    /**
     * The name of literal or argument name, blank for root command.
     *
     * @return {@link String }
     */
    String value() default "";

    /**
     * The argument type, default for literal.
     *
     * @return {@link CommandArgumentType }
     */
    CommandArgumentType type() default CommandArgumentType.LITERAL;
}
```