1 - Generate from the following object a constructor function

```javascript
var person = {
    _name: "Juan",

    getName: function() {
        return this._name;
    },

    getSteps: function() {

        return this.walk.steps;
    },

    walk: (function () {

        function walk() {

            walk.steps++;
        }

        walk.steps = 0;

        return walk;
    })();
};
```

2 - Implement a function `construct` with the following signature:

`construct(Constructor: Function, args: Array): Object`

It must reproduce exactly the behaviour of the operator `new`. 

**Example**

```javascript
function Person(name) {

    this._name = name;
}

Person.prototype.sayHello = function() {

    console.log("Hi, I'm " + this._name);
}

var person1 = new Person("juan");
var person2 = construct(Person, [ "pepe" ]);

console.log(person1 instanceof Person); // true
console.log(person1._name); // "juan"
console.log(person2 instanceof Person); // true
console.log(person2._name); // "pepe"
```
