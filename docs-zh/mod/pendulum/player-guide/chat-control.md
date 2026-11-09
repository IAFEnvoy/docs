# 聊天与控制

## 聊天

```js
mc.say('Hello world!')                 // send to public chat (void)
mc.log('Task completed.')              // log to action bar ([Pendulum] prefix) (void)
console.log('Debug info')              // log to game log & MCP return
```

### 通过 GUI 打开聊天

```js
mc.gui.openChat()                      // open chat input
mc.gui.pressKey('T')                   // also opens chat (default keybind)
mc.gui.typeText('/spawn', true)        // type command + Enter
```

## 命令

```js
mc.executeCommand('/gamemode creative')  // run client command
mc.executeCommand('/give @s diamond 64')
```

## 脚本控制

```js
mc.waitTick()                          // pause 1 tick (~50ms)
mc.waitTick(20)                        // pause 20 ticks (~1 second)

mc.execFile('path/to/script.js')       // run another script file
mc.getScriptDir()                      // → full path to .minecraft/pendulum/
```

## 帮助

```js
mc.help()                              // display full API reference in chat
br.help()                              // display Baritone API reference
```
