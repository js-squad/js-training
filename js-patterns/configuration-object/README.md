<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Configuration Object](#configuration-object)
  - [Concepts](#concepts)
  - [Examples](#examples)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Configuration Object

## Concepts

- Allow named parameters
- Named parameters are easy to remember that positional ones
- It is easy to implement optional parameters (just do not specify that prop)
- Not all objects parameters are configuration objects
- Allow the addition of new parameters without breaking existing code (they are just new properties)

## Examples

1 - Without configuration object

```javascript
function log(message, level, time) {

    level = level || "info";
    time  = time || new Date();

    console[level]("[" + time.toISOString() + "] " + message);
}

log("some message");
log("some message", "debug");
log("some message", "debug", new Date());
```

2 - With configuration object

```javascript
function log(params) {

    level = params.level || "info";
    time  = params.time || new Date();

    console[level]("[" + time.toISOString() + "] " + params.message);
}

log({ message: "some message" });
log({ message: "some message", level: "debug" });
log({ message: "some message", level: "debug", time: new Date() });
```
