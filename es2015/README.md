<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [ES2015 (aka ES6)](#es2015-aka-es6)
  - [Object literal enhancements](#object-literal-enhancements)
  - [Destructuring](#destructuring)
  - [Default](#default)
  - [Spread](#spread)
  - [Rest](#rest)
  - [Arrow functions](#arrow-functions)
  - [Iterators](#iterators)
  - [Maps](#maps)
  - [WeakMaps](#weakmaps)
  - [Sets](#sets)
  - [WeakSets](#weaksets)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## ES2015 (aka ES6)

### Object literal enhancements
Object literals are extended to support setting the prototype at construction, shorthand for foo: foo assignments, defining methods, making super calls, and computing property names with expressions.[\[Source\]](https://github.com/lukehoban/es6features#enhanced-object-literals)

Example: 
```js
var obj = {
    // Shorthand for ‘handler: handler’
    handler,
    // Methods
    toString() {
    },
    // Computed (dynamic) property names
    [ 'prop_' + (() => 42)() ]: 42
};
```

### Destructuring
Destructuring allows binding using pattern matching, with support for matching arrays and objects. [\[Source\]](https://github.com/lukehoban/es6features#destructuring)
```js
var [a, b, c] = [1,2,3];

//swap variables
var [a, b] = [b, a];

// object matching
var { someKey: variable1 } = {
    someKey: 17
};

// can be used in parameters (along with enhanced object literals)
function printPrettyMessage(str, { decorator }) {
    console.log(decorator + str + decorator);
}

// Fail-soft destructuring
var [a] = [];
a === undefined;

// Fail-soft destructuring with defaults
var [a = 1] = [];
a === 1;
```

### Default
It allows to declare default values when declaring variables.

```js
// can be used in parameters position
function f(x, y=12) {
  // y is 12 if not passed (or passed as undefined)
  return x + y;
}
f(3) === 15; // true

// or in assignments
var { someKey: variableName = 'this is the default value'} = {
    someKey: undefined
};
console.log(variableName); // 'this is the default value'
```

### Spread
Turns an array into consecutive arguments in a function call.
```js
function f(a,b,c){
    console.log(a,b,c);
}
f(...[1,2,3]);
```

### Rest
It transforms arguments into an array. Replaces the need for the `arguments` object.
```js
function f(...x) {
    console.log(x);
}
f(1,2,3);
```

### Arrow functions
Arrow functions are a shorthand for function expressions and they support both statement block bodies as well as expression bodies which return the value of the expression. Unlike regular functions, arrows share the same lexical this as their surrounding code. They cannot be named.

```js
// Expression body
var odds = evens.map(v => v + 1);

// Statement bodies
nums.forEach(v => {
  if (v % 5 === 0)
    fives.push(v);
});

// Lexical this
var bob = {
  _name: "Bob",
  _friends: [],
  printFriends() {
    this._friends.forEach(f =>
      console.log(this._name + " knows " + f));
  }
}
```

### Iterators

### Maps 

### WeakMaps

### Sets

### WeakSets