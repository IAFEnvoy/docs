---
order: 6
group: 
  title: Mixin Annotations
  order: 1
---
# Argument Modification: @ModifyArg, @ModifyArgs
Argument modifiers let you modify the arguments of a method call, as shown below:
```java
@ModifyArg(method = "methodToInject", at = @At(value = "INVOKE", target = "calledClass;calledMethod"), index = index)
private int injected(int x) {
  //your code
}
@ModifyArgs(method = "methodToInject", at = @At(value = "INVOKE", target = "calledClass;calledMethod"))
private void injected(Args args) {
  //your code
}
```
`@ModifyArg` must return a value, while `@ModifyArgs` modifies arguments directly through `Args.get()` and `Args.set()`.
