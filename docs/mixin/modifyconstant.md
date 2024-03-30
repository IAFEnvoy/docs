---
order: 8
group: 
  title: Mixin注解
  order: 1
---
# 常量修改器 @ModifyConstant
ModifyConstant允许你将一段代码中的常量按需求修改为其他的值，模板如下：
```java
@ModifyConstant(method = "要注入的方法", constant = @Constant(要修改的数字))
public T method(T original) {
  //你的代码
}
```
其中@Constant中有以下变量可以选择
```java
//指定数值
public boolean nullValue() default false;
public int intValue() default 0;
public float floatValue() default 0.0F;
public long longValue() default 0L;
public double doubleValue() default 0.0;
public String stringValue() default "";
public Class<?> classValue() default Object.class;
//指定范围（不解释，一看名字就懂）
Condition.LESS_THAN_ZERO
Condition.LESS_THAN_OR_EQUAL_TO_ZERO
Condition.GREATER_THAN_OR_EQUAL_TO_ZERO
Condition.GREATER_THAN_ZERO
```
比如我们要修改聊天板的最大消息数到16384（原先为100，且设置的是常量）：
```java
@ModifyConstant(method = "addMessage(Lnet/minecraft/text/Text;IIZ)V", constant = @Constant(intValue = 100))
  public int changeMaxHistory(int original) {//此处original为100，实际上用不到
    return 16384;
  }
```
