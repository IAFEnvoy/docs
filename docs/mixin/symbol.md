---
order: 1
group: 
  title: 介绍
  order: 0
---
# Mixin通用标识符
这里将介绍Mixin最基础的标识符（部分为JVM自带功能）

## 域描述符
Oracle定义了如下[域描述符](https://docs.oracle.com/javase/specs/jvms/se14/html/jvms-4.html#jvms-4.3.2)：

|描述符|原名|描述|
|:----|:----|:----|
|B|`byte`|带符号的字节|
|C|`char`|Basic Multilingual Plane中的Unicode字符代码点，使用UTF-16编码|
|D|`double`|双精度浮点值|
|F|`float`|单精度浮点值|
|I|`int`|正数|
|J|`long`|长整数|
|L*类名称*;|reference|*类名称*的实例（注意有分号哦）|
|S|`short`|带符号的短整型|
|Z|`boolean`|true或 false|
|[|reference|单数组维度|

方法描述符包括方法名称，接着一系列包含输入类型的括号，以及输出类型。Java中定义的像`Object m(int i, double[] d, Thread t)`这样的方法描述符会有`m(I[DLjava/lang/Thread;)Ljava/lang/Object;`这样的方法描述符。 

## 方法定位
在所有注解中，都需要使用method参数，通常填写方法描述符。

如果同名方法只有一个，直接使用方法名即可，不需要完整描述符。

## 注入点参考
[注入点参考](https://github.com/SpongePowered/Mixin/wiki/Injection-Point-Reference)定义了注入目标方法的方法主体的哪个代码。下表描述了几个选项：

|名称|描述|
|:----|:----|
|`HEAD`|方法顶部|
|`RETURN`|返回语句之前|
|`TAIL`|最终的返回语句前|
|`INVOKE`|在实例方法调用|
|`INVOKE_ASSIGN`|在静态方法调用|
|`INVOKE_STRING`|在只有一个参数的方法调用|
|`FIELD`|字段|

注入点引用语句或成员的情况下，目标值设置在`@At`中。目标值使用JVM字节码描述符（即域描述符）指定。
