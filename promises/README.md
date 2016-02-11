# Promises
##Definition:
A promise represents the eventual result of an asynchronous operation. It is a placeholder into which the successful result value or reason for failure will materialize.

- A promise can only succeed or fail one. It cannot succeed or fail twice,
neither can it switch from success to failure or vice versa
- If a promise has suceeded or failed and you later add a success/failure callback, the correct callback will be called, even though the event took place earlier

```js
var promise = new Promise(function(resolve, reject) {
  if(/* something wrong */) {
    return reject(Error('Warning, inminent meltdown.'));
  }

  resolve(7);
});
```

## States
Promises can have three different states:
- Fulfilled: will call `promise.then(f)`
- Rejected: will call `promise.catch(r)`
- Pending: is neither fullfilled nor rejected

## Chaining
A useful pattern when dealing with Promises is chaining consecutive invocations:

```js
getJSONConfig()
    .then(JSON.parse)
    .then(function(configObject){
        console.log(configObject);
    });
```

But when using asynchronous actions, you will need to chain consecutive `.then` invocations with a function that returns a promise-like value: 
```js
getUser()
    .then(function(user){
        return getUserRelations(user);
    }).then(function(extendedUser){
        console.log(extendedUser);
    });
```

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

## Promise.resolve
It's a shorthand method for creating a new promise and resolving with the specified argument.
```js
Promise.resolve(1)
// equals to
new Promise(function(resolve, reject) {
        resolve(1);
    });
```

## Promise.reject
Analog to `Promise.resolve` but for rejecting promises.
```js
Promise.reject(Error('an error'))
// equals to
new Promise(funtion(resolve, reject) {
        reject(Error('an error'));
    });
```


## Promise.all
It allows the manipulation of a list of promises in parallel with a single resolve handler:
```js
Promise.all([Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)])
    .then(function(result) {
        console.log(result); //
    });
```


## Promise.race
It resolves or rejects as soon as any of the promises resolves or rejects.
```js
var p1 = new Promise(function(resolve, reject) { 
    setTimeout(resolve, 500, "one"); 
});
var p2 = new Promise(function(resolve, reject) { 
    setTimeout(resolve, 100, "two"); 
});

Promise.race([p1, p2]).then(function(value) {
  console.log(value); // "two"
  // Both resolve, but p2 is faster
});
```



## Resources
- [HTML5 Rocks: JavaScript Promises](http://www.html5rocks.com/en/tutorials/es6/promises/)
- [States and Fates](https://github.com/domenic/promises-unwrapping/blob/master/docs/states-and-fates.md)
- [We have a problem with promises](http://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html)