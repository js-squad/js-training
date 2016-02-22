# Modules

## Concepts

- Are stored in files: one module per file
- **IMPORTANT**: They are executed (evaluated) only the first time they are required (imported)
- They run in **strict mode** (not entirely true)
- The value of *this* in the root scope of a module is *undefined*

### Exporting

#### Concepts

- The **export** operator can only be used in the root scope of the module, otherwise a syntax error is thrown
- Not only declarations can be exported, references can be exported too
- **IMPORTANT**: If an exported reference changes, every place that had imported it, will be updated with its new value
- Both exporting types (named and default) can be used in a module, but as a good practice, they should not be mixed

#### Named exports

##### Concepts

- They can be many in the same module
- It does not allow the export of expressions (only references and declarations)
- It is commonly used for utilities modules (group of independent functions)
- A reference or a declaration can be exported with a different name

##### Examples

###### Multiple export statements

```javascript
export class Component {
    // class body
}

export const PropTypes = {
    // class body
};
```

###### Single export statement

> This way of exporting is similar to the revealing module

```javascript
class Component {
    // class body
}

const PropTypes = {
    // class body
};

export {
    Component,
    PropTypes
};
```

###### Exporting with a different name

```javascript
function u1() {}
function u2() {}

export {
    u1 as u, // u1 is exported as u
    u2,
};
```

#### Default exports

##### Concepts

- Only one per module
- It also allows exporting expressions
- It is commonly used for exporting classes, functions, or singletons
- It goes along with the **small surface area principle**

##### Examples

###### Exporting a class

```javascript
export default class MyClass {
    // class body
}
```

###### Exporting a function

> The following example shows a technique that can be used to export singletons that can eventually be tested

```javascript
import getDep1 from "dep1";
import getDep2 from "dep2";

/* export */ class Module {
    constructor(dep1, dep2) {
        this._dep1 = dep1;
        this._dep2 = dep2;
    }
    // rest of the class body
}

export default function getInstance() {

    let singleton;

    if (!singleton) {
        singleton = new Module(getDep1(), getDep2());
    }

    return singleton;
}
```

###### Exporting a singleton object

> you should try to avoid the following pattern and instead try to keep your modules stateless (see the previous example for an alternative to this pattern)

```javascript
let name;

export default {
    setName(value) {
        name = value
    },

    getName() {
        return name
    }
};
```

### Importing

#### Concepts

- In order to import a module, we must know how it exports its functionallity
- Imports statements are hoisted
- Are *living views* of the modules

#### Default import

*node_modules/react/index.js*

```javascript
export default {
    // React methods
};
```

*my-component.js*

```javascript
import React from "react";
```

#### Namespace import

*utilities.js*

```javascript
function u1() {}
function u2() {}

export {
    u1 as u,
    u2
};
```

*my-module.js*

```javascript
import * as utilities from "./utilities";

console.log(utilities); // { function u() {}, function u2() {} }
```

#### Named import

##### Concepts

- **IMPORTANT**: Do not confuse the way this is done with destructuring!

##### Examples

###### Import a single member

*node_modules/react/index.js*

```javascript
export class Component {
    // class body
}
```

*my-component.js*

```javascript
import { Component } from "react";
```

###### Import multiple members

*react.js*

```javascript
export class Component {
    // class body
}

export const PropTypes = {
    // PropTypes members
};
```

*my-component.js*

```javascript
import { Component, PropTypes } from "react";
```

###### Import with a different name 

> This clearly shows that despite the fact that this notation looks very similar to destructuring, it is not the same

*react.js*

```javascript
export class Component {
    // class body
}
```

*my-component.js*

```javascript
import { Component as C } from "react";
```

#### Empty import

> We could have modules that only perform actions and do not export anything (usually this modules are imported during the initialization of the app)

*bootstrap.js*

```javascript
function logUserEntered() {}

logUserEntered();
```

*main.js*

```javascript
import "./bootstrap";
```

#### Combination: default + namespace import

*utilities.js*

```javascript
function u1() {}
function u2() {}

function u() {}

export {
    u1,
    u2,
    u as default
};
```

*main.js*

```javascript
import mainUtility, * as utilities from "./utilities";
```

#### Combination: Default + named import

*node_modules/react/index.js*

```javascript
const React = {
    // react utilities
};

class Component {}

export {
    React as default,
    Component
    // ...
};
```

*component.js*

```javascript
import React, { Component } from "react";
```
