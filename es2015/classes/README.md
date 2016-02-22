# Classes

*More than just syntactic sugar*

## Concepts

- They are backwards compatible
- Can not be called without using new
- Code within a class (class body) is in strict mode
- They are not hoisted (TDZ) because they can be extended with an expression
- class body only contains methods (properties are comming soon: [class fields and static properties proposal](https://github.com/jeffmo/es-class-fields-and-static-properties))
- Can not overwrite the class identifier within a class method
- Its prototype is:
    - configurable: false
    - enumerable: false
    - writable: false
- Its constructor method is (?):
    - configurable: false
    - enumerable: false 
    - writable: false
- Its methods are:
    - configurable: true
    - enumerable: false
    - writable: true

## Examples

### ES2015 Classes

```javascript
class Person {
    constructor(name) {
        this.name = name;
    }

    sayName() {
        console.log(this.name);
    }
}

let person = new Person("Luke");
person.sayName(); // "Luke"

console.log(person instanceof Person); // true
console.log(person instanceof Object); // true

console.log(typeof Person);                    // "function"
console.log(typeof Person.prototype.sayName);  // "function"
```

### Partial replication of ES2015 classes using constructors 

```javascript
let Person = (function() {

    "use strict";

    // Class identifier is readonly within the class body
    const Person = function(name) {
        // make sure the function was called with new
        if (typeof new.target === "undefined") {
            throw new Error("Constructor must be called with new.");
        }

        this.name = name;
    }

    Object.defineProperty(Person, "prototype", {
        configurable: false,
        enumerable  : false,
        writable    : false
    });

    // (?)
    Object.defineProperty(Person.prototype, "constructor", {
        configurable: false,
        enumerable  : false,
        writable    : false
    });

    Object.defineProperty(Person.prototype, "sayName", {
        configurable: true,
        enumerable  : false,
        writable    : true,
        value       : function() {
            // make sure the method wasn't called with new
            if (typeof new.target !== "undefined") {
                throw new Error("Method cannot be called with new.");
            }

            console.log(this.name);
        },
    });

    return Person;
}());
```

## Definition

### Declaration

#### Concepts

- It is not hoisted (similar as if it would have been declared using **let**)
- Can not be anonymous

#### Example

```javascript
class MyClass {
    // class body
}
```

### Expression

#### Concepts

- Can be both: named or anonymous

#### Examples

##### Anonymous

```javascript
let MyClass = class {
    // class body
};
```

##### Named (non anonymous)

```javascript
let MyClass = class MyClassInternalIdentifier {
    // class body
};
```

## Method types

### Example

```javascript
class MyClass {
    static staticMethod() {
        console.log("static method", this); 
    }

    static ["computed" + "staticMethod"]() {
        console.log("computed static method", this);
    }

    // static accessor: getter
    static get myName() {
        console.log("static accessor: getter", this);
        return this.name;
    }

    // static computed accessor: getter
    static get ["my" + "Length"]() {
        console.log("computed static accessor: getter", this);
        return this.length;
    }

    // special method: it is executed on initialization
    constructor(prop1, prop2) {
        this._prop1 = prop1;
        this._prop2 = prop2;
    }

    instanceMethod() {
        console.log("instance method", this);
    }

    ["computed" + "instanceMethod"]() {
        console.log("computed instance method", this);
    }

    // accessor: getter
    get prop1() {
        console.log("accessor: getter", this);
        return this._prop1;
    }

    // accessor: setter
    set prop(value) {
        console.log("accessor: setter", this);
        this._prop2 = value;
    }

    // computed accessor: getter
    get ["prop" + 2]() {
        console.log("computed accessor: getter", this);
        return this._prop2;
    }

    // computed accessor: setter
    set ["prop" + 2](value) {
        console.log("computed accessor: setter", this);
        this._prop2 = value;
    }
}
```

## Subclassing

### Concepts

```javascript
class Person {
    constructor(name) {
        this.name = name;
    }
    toString() {
        return `Person named ${this.name}`;
    }
    static logNames(persons) {
        for (const person of persons) {
            console.log(person.name);
        }
    }
}

class Employee extends Person {
    constructor(name, title) {
        super(name);
        this.title = title;
    }
    toString() {
        return `${super.toString()} (${this.title})`;
    }
}

const jane = new Employee('Jane', 'CTO');
console.log(jane.toString()); // Person named Jane (CTO)
```

(diagram: http://exploringjs.com/es6/images/classes----subclassing_es6.jpg)

- There are 2 prototype chains: constructor and instance. This allow to inherit not only instance methods but also class (static) ones 
- The prototype of a *subclass* is the *superclass*
- They can be extended using an expression ()
- Instances are created in the base class
- Now it is possible to extend built-in classes (ex: Array)
- *this*  uninitialized in derived constructors => an error is thrown if it is used without having previously called the superconstructor (**super(..args)**)
- Calling **super(...args)** more than once => **ReferenceError**
- No implicit return and no call to **super(...args)** => **ReferenceError**

### Examples

#### Babel implementation of inherits

```javascript
function _inherits(subClass, superClass) {

    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError(
            "Super expression must either be null or a function, not " +
            typeof superClass
        );
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });

    if (superClass)
        Object.setPrototypeOf ?
            Object.setPrototypeOf(subClass, superClass) :
            subClass.__proto__ = superClass;
}
```

#### Base class

*It does not extend any other class (it has no extends clause)*

```javascript
class Base {
    // class body
}
```

#### Derived class

*It extends other class (it has an extends clause)*

```javascript
// Derived is a subclass of Base
// Base is the superclass of Derived
class Derived extends Base {
    // class body
}
```

#### Classes can be extended using expressions (constructors and null)

```javascript
let SerializableMixin = {
    serialize() {
        return JSON.stringify(this);
    }
};

let AreaMixin = {
    getArea() {
        return this.length * this.width;
    }
};

function mixin(...mixins) {
    function Base() {}
    Object.assign(Base.prototype, ...mixins);
    return Base;
}

class Square extends mixin(AreaMixin, SerializableMixin) {
    constructor(length) {
        super();
        this.length = length;
        this.width = length;
    }
}

var x = new Square(3);
console.log(x.getArea());   // 9
console.log(x.serialize()); // "{"length":3,"width":3}"
```

### The use of super keyword

#### In constructors

##### Concepts

- **super** is used like a function
- It initializes *this* (in earlier versions *this* was initialized by the **new** operator)
- If *this* has to be used, then **super(...args)** must be invoked
- Since *this* is created in the base class, this allows built-in classes to be extended

##### Examples

###### Implicit constructor

```javascript
class Base {}
class Derived extends Base {
    // Implicit constructor (if none has been provided)
    // constructor(...args) {
    //     super(...args);
    // }
}
```

###### Explicit constructor that uses this

```javascript
class Base {}
class Derived extends Base {
    constructor(...args) {
        super(...args);
        // this can be used from here on
    }
}
```

#### In methods

##### Concepts

- **super** is used like a normal object
- **super** contains all the members of the **superclass**
- To invoke a method of the superclass use: `super.<super-member>(...args)`
- Methods of the superclass are invoked with *this* containing a reference to the current instance
- Methods that use **super** are binded to the class where they have been created (*[[HomeObject]]*) => they can not be moved to another class

##### Example

```javascript
class Person {
    constructor(name) {
        this.name = name;
    }
    toString() {
        return `Person named ${this.name}`;
    }
}

class Employee extends Person {
    constructor(name, title) {
        super(name);
        this.title = title;
    }
    toString() {
        return `${super.toString()} (${this.title})`;
    }
}

const jane = new Employee('Jane', 'CTO');
console.log(jane.toString()); // Person named Jane (CTO)
```

## Bibliography

- [Exploring ES6](http://exploringjs.com/es6/ch_classes.html)
- [Understanding ES6](https://leanpub.com/understandinges6/read#leanpub-auto-classes)