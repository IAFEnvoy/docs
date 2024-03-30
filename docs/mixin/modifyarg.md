---
order: 6
group: 
  title: Mixin注解
  order: 1
---
# 调用参数修改器 @ModifyArg，@ModifyArgs
调用参数修改器允许你修改调用是的参数，示例如下：
```java
@ModifyArg(method = "要注入的方法", at = @At(value = "INVOKE", target = "调用的对象类名;调用的方法"), index = 编号)
private int injected(int x) {
  //你的代码
}
@ModifyArgs(method = "要注入的方法", at = @At(value = "INVOKE", target = "调用的对象类名;调用的方法"))
private void injected(Args args) {
  //你的代码
}
```
其中ModifyArg需要返回值，而ModifyArgs直接使用Args的get()和set()方法即可。
