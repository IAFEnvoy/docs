---
order: 7
group: 
  title: Mixin注解
  order: 1
---
# 接收参数&赋值修改器 @ModifyVariable
接收参数&赋值修改器允许你在方法被调用的时候修改参数，示例如下：
```java
@ModifyVariable(method = "要注入的方法", at = @At("HEAD"), ordinal = 编号)
private T injected(T original) {
  //你的代码
}
```
其中ordinal表示你要修改哪个参数
**注意：ordinal选择的时候是按照你的方法的返回值类型来选择的**
比如有函数`public void foo(boolean b, int x, int y, int z)`，而你的方法的返回值是`int`，且`ordinal=1`，那么修改的目标就是`y`而不是`x`，因为`b`不是`int`类型，且`y`的下标为`1`。
