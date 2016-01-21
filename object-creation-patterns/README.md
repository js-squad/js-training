# Object creation patterns

## Prototype

> Every object can have another object as its prototype

### Concepts

- It is just an object
- It enables behavior delegation
- `__proto__` property (deprecated) and `Object.getPrototypeOf`
- All objects (or most of them) have `Object.prototype` in their prototype chain

## Object.getPrototypeOf

### Concepts

- It is used to retrieve the prototype of the given object

### Example

```javascript
console.log(Object.getPrototypeOf({}) === Object.prototype);
```

## Object.setPrototypeOf

### Concepts

- It is used to set the prototype of the given object
- Use this method instead of assigning `__proto__` (deprecated ES2015)
- Use it only if there is no other alternative (prefer `Object.create`)
- No engine optimization

### Example

```javascript
var jediProto = {
    fight: function() {
        // Some implementation that uses the lightsaber
    }
};

var jedi = {
    name: "Luke"
};

Object.setPrototypeOf(jedi, jediProto);

console.log(jediProto.isPrototypeOf(jedi)); // true
```

## Object.create

### Concepts

- It allows the creation of objects specifying their prototypes
- It is better to set the object prototype when creating it than using `Object.setPrototypeOf` (engine optimization)

### Example

```javascript
var jediProto = {
    fight: function() {
        // Some implementation that uses the lightsaber
    }
};

var jedi = Object.create(jediProto);
jedi.name = "Luke";

console.log(jediProto.isPrototypeOf(jedi)); // true
```

## Own properties

### Concepts

- `Object.getOwnPropertyNames`
- `Object.keys` (only enumerables)
- Are used in write operations (set, delete)

### Example

```javascript
var person = {
    name: "Ana"
};

Object.defineProperty(person, "age", {
    enumerable: false,
    value     : 20
});

var hasOwnProp = Object.prototype.hasOwnProperty;

console.log(hasOwnProp.call(person, "name")); // true
console.log("toString" in person); // true
console.log(hasOwnProp.call(person, "toString")); // false
console.log(Object.getOwnPropertyNames(person)); // [ "name", "age" ]
console.log(Object.keys(person)); // [ "name" ]
```

## Inherited properties

### Concepts

- Are located in the prototype chain
- Are used in read operations (get)
- `in` operator / `for in statement`

### Example

```javascript
var jediProto = {
    fight: function() {
        // Some implementation that uses the lightsaber
    }
};

var jedi = Object.create(jediProto);
jedi.name = "Luke";

console.log(jediProto.isPrototypeOf(jedi)); // true
```

## Constructors

> Example diagram: http://goo.gl/emMZsj

### Concepts

- They are just a functions
- By convention their names start with uppercase
- They allow an "easy" way to create objects with shared functionality
- Its prototype property is used as the prototype of the instances constructed by it (using `new`)
- They require the use of the `new` operator
- `Constructor.prototype === instance.__proto__`
- `use strict` or recursive call with new workaround
- They can return a different object (if not, `this` is implicitly returned)
- `instanceof`: does the object have the given Constructor prototype in its prototype chain?

### Examples

1 - Properties in `this` (own), methods in the Constructor.prototype (inherited)

```javascript
function Person(name) {

    this._name = name;
}

Person.prototype.sayHello = function() {

    console.log("Hi, I'm " + this.name);
}

var person1 = new Person("juan");
```

2 - Do not overwrite constructor property!

```javascript
function Person(name) {

    this._name = name;
}

console.log(Person.prototype.constructor === Person); // true

Person.prototype = {
    sayHello: function() {
        console.log("Hi, I'm " + this._name);
    }
};

console.log(Person.prototype.constructor); // undefined
```

3 - Privileged methods ("private" props)

> Take a time to thing if this is really necessary (each instance has differents privileged methods function instances - more memory)

*Can we just use the underscore convention?*

```javascript
function Person(_name) {

    var _age = 0;

    // privileged method (closure)
    this.getName = function() {

        return _name;
    };

    this.getAge = function() {

        return _age;
    };

    this.setAge = function(age) {

        _age = age;
    };
}

Person.prototype.sayHello = function() {

    console.log("Hi, I'm " + this.getName());
};

var person1 = new Person("juan");
var person2 = new Person("pepe");

var hasOwnProp = Object.prototype.hasOwnProperty;

console.log(hasOwnProp(person1, "_name")); // false
console.log(hasOwnProp(person1, "_age")); // false
console.log(hasOwnProp(person1, "setAge")); // true
console.log(hasOwnProp(person1, "sayHello")); // true
console.log(person1.setAge === person2.setAge); // false
console.log(person1.sayHello === person2.sayHello); // true
```
