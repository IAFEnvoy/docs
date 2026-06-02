# Chat & Control

## Chat

```js
mc.say('Hello world!')                 // send to public chat
mc.log('Task completed.')              // log to action bar ([Pendulum] prefix)
console.log('Debug info')              // log to game console (F3 log)
```

## Commands

```js
mc.executeCommand('/gamemode creative')  // run client command
mc.executeCommand('/give @s diamond 64')
```

## Script Control

```js
mc.waitTick()                          // pause 1 tick (~50ms)
mc.waitTick(20)                        // pause 20 ticks (~1 second)

mc.execFile('path/to/script.js')       // run another script file
mc.getScriptDir()                      // → full path to .minecraft/pendulum/
```

## Help

```js
mc.help()                              // display full API reference in chat
br.help()                              // display Baritone API reference
```
