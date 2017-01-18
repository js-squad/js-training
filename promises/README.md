<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Promises](#promises)
  - [Definition](#definition)
  - [States](#states)
  - [Fates](#fates)
  - [Error handling](#error-handling)
  - [Properties](#properties)
    - [Immutability](#immutability)
    - [Chaining](#chaining)
  - [API](#api)
    - [Promise Constructor](#promise-constructor)
    - [Promise.prototype.then](#promiseprototypethen)
    - [Promise.prototype.catch](#promiseprototypecatch)
    - [Promise.resolve](#promiseresolve)
    - [Promise.reject](#promisereject)
    - [Promise.all](#promiseall)
    - [Promise.race](#promiserace)
  - [Notes](#notes)
  - [Exercises](#exercises)
  - [Resources](#resources)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Promises
## Definition
A promise represents the eventual result of an asynchronous operation. It is a placeholder into which the successful result value or reason for failure will materialize.

## States
Promises can have three different states:
- Fulfilled: It has succeed (will call `promise.then(fn)`)
- Rejected: It has failed (will call `promise.catch(fn)`)
- Pending: is neither fullfilled nor rejected

> A promise is said to be settled (terminology, not a state) if it is not pending, which is the same to say is either fulfilled or rejected

## Fates
- Resolved
  - Fulfilled
  - Rejected
  - Pending (it has been resolved with a promise)
- Unresolved
  - Pending (it has not yet been resolved with any value)

## Error handling

If inside a promise an error is thrown or the promise itself is reject, it could be handled with the `.catch` method.

Any error in a promise chain can be handled with the `.catch` method.

```js
Promise.reject(Error('something is wrong'))
    .catch(function(err){
        console.log(err);
    });

new Promise(function(resolve,reject){
        throw Error('something is much more wrong');
    }).catch(function(err){
        console.log(err);
    });
```

Without the error handler, every error inside a promise will produce an `Uncaught error`.

## Properties

### Immutability

neither can it switch from success to failure or vice versa.
A promise can only succeed or fail once. It cannot succeed or fail twice,
If a promise has suceeded or failed and you later add a success/failure callback, the correct callback will be called (asynchronously - microtask), even though the event took place earlier

### Chaining

You can return a value that's not a promise and it will be automatically converted to one, allowing continue chaining calls using then

```js
Promise.resolve(2)
    .then(function (value) {
      return value + 2; // non thenable value
    })
    .then(function (value) {
      console.log(value); // 4
    });
```

Or a you can return a promise and will force current one to sync with it (resolve or reject to its resolution or rejection value respectively, or in other words, adopt its state)

```js
Promise.resolve(10)
    .then(function (value){
      return new Promise(function executor(resolve) {
        setTimeout(function () {
          resolve(value * 10);
        });
      });
    })
    .then(function(value){
        console.log(value); // 100
    });
```

## API

### Promise Constructor

It allows the creation of a promise providing an executor function that will be called with two functions: fulfill and reject, that calling them will fulfill or reject the promise respectively.

```js
new Promise(function executor(fulfill, reject) {
  setTimeout(function () {
    var shouldResolve = Boolean(Math.round(Math.random()));

    if (shouldResolve) {
      fulfill("fulfilled");
    }
    else {
      reject("rejected");
    }
  });
});
```

### Promise.prototype.then

It must be called with a function that will be called on fulfilled.

If a promise is returned from the on fulfilled callback, the current promise will be synced with this one (adopt its state)

```js
Promise
  .resolve(5)
  .then(function (value) {
    console.log(value); // 5
  });
```
If the promise has been rejected no matter how many onFulfill callbacks have been provided, none of them is gonna be called.

```js
Promise
  .reject(new Error("I'm rejected"))
  .then(function (value) {
    console.log("hm, am I gonna be called?");
  })
  .then(function (value) {
    console.log("hm, maybe this time?");
  });
```

It can receive an additional function as the second parameter (onReject callback), that will be called on reject.

```js
function onFulfill(value) {
  console.log("fulfilled with: " + value);
}

function onReject(reason) {
  console.log("rejected with: " + reason);
}

Promise
  .resolve("fulfillment value")
  .then(onFulfill, onReject);

Promise
  .reject(new Error("rejection reason"))
  .then(onFulfill, onReject);
```

### Promise.prototype.catch

It must be called with a function that will be called on reject.

The provided callback (onReject) will be called if the promise itself is rejected or any of the onFulfill callbacks throws an error or returns a rejected promise.

```js
function onFulfillThrowError() {
  throw new Error('error from throw');
}

function onFulfillReturnRejected() {
  return Promise.reject(new Error('error from rejection'))
}

function onFulfill(value) {
  console.log('fulfilled with: ' + value);
}

function onReject(reason) {
  console.log('rejected with: ' + reason);
}

// rejected promise
Promise
  .reject(new Error('rejection reason'))
  .then(onFulfill) // not called
  .catch(onReject);

// rejected from onFulfill callback (throw)
Promise
  .resolve('value')
  .then(onFulfillThrowError)
  .catch(onReject);

// rejected from onFulfill callback (rejected promise)
Promise
  .resolve('value')
  .then(onFulfillReturnRejected)
  .catch(onReject);
```

### Promise.resolve

It's a shorthand method for creating a new promise and resolving with the specified argument.

```js
Promise.resolve('fulfillment value');

// equals to
new Promise(function (resolve, reject) {
  resolve(1);
});
```

### Promise.reject

Analog to `Promise.resolve` but for rejecting promises.

```js
Promise.reject(new Error('rejection error'));

// equals to
new Promise(funtion (resolve, reject) {
  reject(new Error('rejection error'));
});
```

### Promise.all

It allows the manipulation of a list of promises in parallel with a single resolve handler.

```js
Promise
  .all([
    Promise.resolve(1),
    Promise.resolve(2),
    Promise.resolve(3)
  ])
  .then(function (values) {
      console.log(values); // [1, 2, 3]
  });
```

### Promise.race

It resolves or rejects as soon as any of the promises resolves or rejects.

```js
var p1 = new Promise(function (resolve, reject) {
  setTimeout(function() { resolve(1); }, 500);
});

var p2 = new Promise(function (resolve, reject) {
  setTimeout(function() { resolve(2); }, 100);
});

Promise.race([p1, p2]).then(function (value) {
  console.log(value); // 2
  // Both resolve, but p2 is faster
});
```

## Notes

- If an error is thrown within the constructor (as it would happen within then or catch callbacks), it will create a rejected promise
- Prefer the use of `Promise.resolve` and `Promise.reject` if the settled value is known beforehand
- Prefer providing onReject callbacks using `.catch` instead of providing them as the second parameter of `.then`, as doing this way would also catch a possible rejection done within any onFulfill callback

## Exercises
- [NodeSchool's Promise It Won't Hurt workshop](https://github.com/stevekane/promise-it-wont-hurt)

## Resources
- [HTML5 Rocks: JavaScript Promises](http://www.html5rocks.com/en/tutorials/es6/promises/)
- [States and Fates](https://github.com/domenic/promises-unwrapping/blob/master/docs/states-and-fates.md)
- [We have a problem with promises](http://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html)
