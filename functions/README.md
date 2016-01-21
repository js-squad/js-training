# Functions

### Concepts

- Are objects, despite the fact that typeof return **"function"** (prototype: Function.prototype)
- Are first class citizens (objects/functions):
    - passed as an argument (to a higher order function)
    - returned from a function
    - assigned to a variable
    - can be used wherever an ordinary value is expected
- Can be named or unnamed
- Can be defined using an expression or a declaration
- Can be of any arity (if less parameters are specified, these ones take the value of **undefined**)
- If there is no implicit return, then the result of the call is **undefined**

### Tips

- Keep them small
- Keep their complexity low
- They should resolve just one thing (SRP - The "S" of S.O.L.I.D.)

## How to create them

> Statements do things, expressions produce values

### Function declaration (statement)

#### Concepts

- It always has name (can not be anonymous)
- Is the same as declaring a var with the name of the function and assigning the function to it, but with the benefit of that declaration to be full hoisted (name/value)

#### Examples

```javascript
function test() {}

console.log(typeof test);
```

### Function expression

#### Concepts

- Allows conditional definition without polluting the scope
- Allows the construction of **IIFE** (Inmediately Invoked Function Expression)
- First class citizen (object/function)

## Named VS Unnamed (Anonymous)

### Named

#### Concepts

- Can be both: function expression or function declaration
- It is useful when tracking errors

#### Examples

1 - Named function declaration

```javascript
function test() {

    console.log(typeof test); // function
}

console.log(test.name); // test
```

2 - Named function expression (same name as the var which contains it)

```javascript
var test = function test() {

    console.log(typeof test); // function 
};

console.log(test.name); // test
```

3 - Named function expression (different name of the var which contains it)

```javascript
var test = function otherName() {

    return [
        typeof test,
        typeof otherName
    ];
};

console.log(test.name); // test
console.log(test()); // [ "function", "function" ]

var f = test;

test = undefined;

console.log(f()); // [ "undefined", "function" ]
```

### Unnamed (anonymous)

#### Concepts

- Only function expressions can be unnamed (anonymous)
- When tracking errors, some engines infer their "name" from the surruonding, but this is not always possible, and if not, then they are shown as anonymous

#### Examples

1. Unnamed functions have their name property set to an empty string

```javascript
var test = function () {}

console.log(test.name); // EMPTY STRING
```

## Parameters VS Arguments

### Concepts

- Parameters are used to **define** a function
- Arguments are used to **invoke** a function

### Example

```javascript
function foo(param1, param2) { // parameters: param1 and param2 
    // ...
}

foo("arg1", "arg2"); // arguments: "arg1" and "arg2"
```

## Arity

### Concepts

The arity of a function is the number of arguments that the function takes.

### Function types by arity

A function can be (depending of the number of args it can receive)...

- 0 args = nullary or niladic
- 1 args = unary or monadic
- 2 args = binary or dyalic
- 3 args = ternary or triadic
- > 2 args = polyadic
- n args = n-ary
- variable nbr of args = variadic

### Language constructions

#### arguments (array like) object

##### Concepts

It is an array-like object that holds all of the actual parameters of the current function call.

##### Examples

1. Returns the number of arguments (actual)

```javascript
function amountOfArgs() {

    console.log("actual params", arguments.length);
}

amountOfArgs("one", "two", "three");
```

2. In Sloppy mode, it is in sync with the corresponding parameteres variable names (DON'T DO THIS AT HOME!)

```javascript
function iShouldNotBeDoingThis(arg1, arg2) {

    console.log("arguments", arguments);

    arg1 = "modif1";
    arg2 = "modif2";

    console.log("arguments", arguments);

    arguments[0] = "come on, seriously?";

    console.log("arguments[0]", arguments[0]);
    console.log("arg1", arg1);

    arg1 = "modified again!";

    console.log("arguments[0]", arguments[0]);
}

iShouldNotBeDoingThis("orig1", "orig2");
```

3. It is an *array like* object, but not an Array

```javascript
function test(arg1, arg2) {

    console.log(Array.isArray(arguments)); // false
    console.log("length" in arguments); // true
    console.log("0" in arguments); // true if arg1 was provided
    console.log("1" in arguments); // true if arg2 was provided
}

test(1, 2);
test();
```

#### function.length

##### Concepts

Holds the number of parameters

##### Example
```javascript
function amountOfArgs() {

    console.log(
        "number of parameters (defined in the function signature)", amountOfArgs.length
    );

    console.log(
        "number of arguments (passed in the invocation)",
        arguments.length
    );
}

amountOfArgs("one", "two", "three");
```

## Callback

> call me back once you have finished

### Concepts

It is just a term to refer to a function passed as an argument to another function which executes one or many async operations (started now, finished in the future), that once it finishes them, the given callback (function) is executed and the result (or error) is passed to the caller (the one that provided the function) as an argument of this call.

Therefore, based on the previous paragraph, we can affirm that:

**NOT ALL THE FUNCTIONS ARE CALLBACKS!**

### Example

```javascript
function getRandomInt(min, max) {

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function asyncFunc(callback) {

    setTimeout(function() {

        var error;
        var hasError = Boolean(getRandomInt(0, 1));

        if (hasError) {
            error = new Error("ops, something bad has occured!")
        }

        callback(error);
    }, getRandomInt(1000, 5000));
}

asyncFunc(function onAsyncFuncDone(error) {

    if (error) {
        console.log(error);
        return;
    }

    console.log("no error");

    // everything went good, let's continue!
});
```

## THIS

### Concepts

When talking about a function call, **this** refers to the receiver of it.

### Examples

#### Function call

- strict mode = **undefined**

```javascript
function test() {
    "use strict";

    return this;
}

console.log(typeof test() === "undefined");
```

- sloppy mode = **global object** (browser: window | node: global)

```javascript
function test() {
    return this;
}

console.log(test() === this);
console.log(test() === window);
```

#### method call

```javascript
var obj = {
        method: function () {
            return this;
        }
};

console.log(obj.method() === this);
```

## Function methods (Function.prototype members)

### bind

#### Concepts

- Partial application (side note: partial application !== curry)
- Attach a receiver

#### Examples

1. Partial application

```javascript
function sum() {

    var i;
    var result = 0;

    for (i = 0; i < arguments.length, i++) {
        result += arguments[i];
    }

    return result;
}

var sum1 = sum.bind(undefined, 1);

console.log(sum1(2)); // 3
```

2. Attach a receiver

```javascript
var obj = {
    method: function () {
        "use strict";
        return this;
    }
};

var f = obj.method;
var objMethod = obj.method.bind(obj);

console.log(typeof obj.method()); // object
console.log(typeof f()); // undefined
console.log(typeof objMethod()); // object
```

### call

#### Concepts

- It allows specifying the receiver of the call
- Object impersonation / Method borrowing: take a method defined in some object, and call it specifying the receiver to be another different from the one which owns it (common use case: use Array.prototype methods on arguments object)

#### Examples

1. Specify a receiver

```javascript
var person = {
    name    : "Luke",
    sayHello: function () {
        "use strict";
        console.log("Hi, I'm " + this.name);
    } 
};

person.sayHello(); // Hi, I'm Luke
person.sayHello.call({ name: "Anakin" }); // Hi, I'm Anakin
```

2. Specify a receiver and a set of arguments

```javascript
var person = {
    name    : "Luke",
    sayHelloTo: function (otherPersonName) {
        "use strict";
        console.log(
            "Hi " + otherPersonName +
            ", I'm " + this.name
        );
    } 
};

person.sayHelloTo("Yoda"); // Hi Yoda, I'm Luke
person.sayHelloTo.call(
    { name: "Anakin" }, // call receiver (this)
    "Yoda" // argument
); // Hi Yoda, I'm Anakin
```

3. Object impersonation / method borrowing

```javascript
console.log(typeof null); // object
console.log(typeof []); // object
console.log(function() { return typeof arguments; }()); // []

var toString = Object.prototype.toString;

console.log(toString.call(null)); // [object Null]
console.log(toString.call([])); // [object Array]

function betterTypeOf(thing) {

    return Object
        .prototype
        .toString
        .call(thing)
        .slice(8, -1);
}

console.log(betterTypeOf([])); // Array 
```

### apply

#### Concepts

- It is very similar to call, but instead of specifying the arguments in the call itself, it lets you pass all of them in a single array
- It allows specifying the receiver of the call
- It allows calling a function specifying the arguments using an array
- It is useful when you want to call a certain function, but with different arguments, so using apply, you can conditionally collect them, and then call the function using apply and the specific set of arguments

#### Examples

1. Specify a receiver

```javascript
var person = {
    name    : "Luke",
    sayHello: function () {
        "use strict";
        console.log("Hi, I'm " + this.name);
    } 
};

person.sayHello(); // Hi, I'm Luke
person.sayHello.apply({ name: "Anakin" }); // Hi, I'm Anakin
```

2. Specify a receiver and a set of arguments

```javascript
var person = {
    name: "Luke",
    sayHelloTo: function (p1Name, p2Name) {
        "use strict";
        console.log(
            "Hi " + p1Name + " and " + p2Name +
            ", I'm " + this.name
        );
    } 
};

person.sayHelloTo("Yoda"); // Hi Yoda, I'm Luke
person.sayHelloTo.call(
    { name: "Anakin" }, // call receiver (this)
    [ "Yoda", "Obi-Wan"] // arguments
); // Hi Yoda, I'm Anakin
```
