## let

`let` operator allows to declare block-scoped variables.
Example:
```js
if(someExpression) {
    let foo = 1;
}
```

Trying to reference a variable outside it's block scope will throw a `Reference error`:
```js
if(someExpression) {
    let foo = 1;
    console.log('"foo" here is accesible', foo);
}
console.log(foo); // throws
```

### Temporal Dead Zone (aka TDZ)
Trying to reference a variable within its block scope but before its declaration will throw:
```js
if(someExpression) {
    console.log(foo); // throws ReferenceError
    let foo = 1;
    console.log('"foo" here is accesible', foo);
}
console.log(foo); // throws
```

## const
The `const` operator have the same semantics that the `let` operator with a single difference: its reference cannot be modified.
```js
const foo = 1;
foo = 5; // throws TypeError
```

Furthermore, it doesn't allows to separate variable declaration from definition.
```js
const foo; // throws SyntaxError
```


Related reading:
- [Variables and Scoping in ECMAScript 6](http://www.2ality.com/2015/02/es6-scoping.html)
- [Temporal Dead Zone Demystified](http://jsrocks.org/2015/01/temporal-dead-zone-tdz-demystified/)
- [ES6 const is not about immutability](https://mathiasbynens.be/notes/es6-const)