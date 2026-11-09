---
order: 8
group: 
  title: Mixin Annotations
  order: 1
---
# Constant Modification: @ModifyConstant
`@ModifyConstant` lets you replace a constant in a piece of code with another value as needed. The template is as follows:
```java
@ModifyConstant(method = "methodToInject", constant = @Constant(constantToModify))
public T method(T original) {
  //your code
}
```
`@Constant` accepts the following values:
```java
//specific values
public boolean nullValue() default false;
public int intValue() default 0;
public float floatValue() default 0.0F;
public long longValue() default 0L;
public double doubleValue() default 0.0;
public String stringValue() default "";
public Class<?> classValue() default Object.class;
//ranges (self-explanatory)
Condition.LESS_THAN_ZERO
Condition.LESS_THAN_OR_EQUAL_TO_ZERO
Condition.GREATER_THAN_OR_EQUAL_TO_ZERO
Condition.GREATER_THAN_ZERO
```
For example, to raise the chat history limit from 100 (which is defined as a constant) to 16384:
```java
@ModifyConstant(method = "addMessage(Lnet/minecraft/text/Text;IIZ)V", constant = @Constant(intValue = 100))
  public int changeMaxHistory(int original) {//original is 100 here; it is not actually used
    return 16384;
  }
```
