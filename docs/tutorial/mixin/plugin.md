---
order: 0
group: 
  title: 其他Mixin相关
  order: 2
---
# IMixinConfigPlugin
Mixin的配置接口，用于控制Mixin的注入。

注册方法为在相对应的json配置文件里写入**完整的**类路径。

其中这个接口里有如下几个方法：
```java
//在注入时调用
public void onLoad(String mixinPackage);
//返回refmap路径，通常直接返回null即可
public String getRefMapperConfig();
//是否执行注入
public boolean shouldApplyMixin(String targetClassName, String mixinClassName);

public void acceptTargets(Set<String> myTargets, Set<String> otherTargets);
//返回需要注入的类，通常返回null即可
public List<String> getMixins();
//在注入前调用
public void preApply(String targetClassName, ClassNode targetClass, String mixinClassName, IMixinInfo mixinInfo);
//在注入后调用
public void postApply(String targetClassName, ClassNode targetClass, String mixinClassName, IMixinInfo mixinInfo);
```
可根据需求使用这些方法，比如我们可以在这里控制Mixin的注入，比如只注入某些类，或者只注入某些类的某些方法。