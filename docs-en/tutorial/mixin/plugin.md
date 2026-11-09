---
order: 0
group: 
  title: Other Mixin Topics
  order: 2
---
# IMixinConfigPlugin
Mixin's configuration interface, used to control Mixin injection.

To register it, write the **fully qualified** class path into the corresponding JSON configuration file.

The interface provides the following methods:
```java
//called during injection
public void onLoad(String mixinPackage);
//returns the refmap path; usually null is fine
public String getRefMapperConfig();
//whether to apply the mixin
public boolean shouldApplyMixin(String targetClassName, String mixinClassName);

public void acceptTargets(Set<String> myTargets, Set<String> otherTargets);
//returns the mixins to apply; usually null is fine
public List<String> getMixins();
//called before applying
public void preApply(String targetClassName, ClassNode targetClass, String mixinClassName, IMixinInfo mixinInfo);
//called after applying
public void postApply(String targetClassName, ClassNode targetClass, String mixinClassName, IMixinInfo mixinInfo);
```
Use these methods as needed. For example, you can control Mixin injection here, applying only certain classes or only certain methods of certain classes.
