## Iterables
ES2015 introduces a new interface for iteration, _Iterables_. It could be resumed as data consumers (`for...of` or the `spread` operator) and data sources.
Data sources could be any of the following:
- Strings
- Arrays
- Maps
- Sets
- arguments object (even though you shouldn't be using it)

Example:
```js
for (let elem of [0, 1, 2]) {
    console.log(elem);
}
// prints 1, 2 and 3
```

To know if something is iterable, you could check for the `Symbol.iterator` key.
```js
function isIterable(o) {
    if(o === null || o === undefined) {
        return false;
    }
    return o[Symbol.iterator] !== undefined;
}
```

### Making objects iterables
It's possible to modify a created object to be consumed as any other iterable:
```js
var myObj = {
    [Symbol.iterator](){
        var i= 0, arr = [1,2,3];
        return {
            next(){
                var value = arr[i];
                i++;
                return {value, done: i === arr.length + 1};
            }
        }
    }
}

// will print 1, 2 and 3
for(let x of myObj) {
  console.log(x);
}
```



Related reading:
- [Iterables and iterators in ECMAScript 6](http://www.2ality.com/2015/02/es6-iteration.html)
- [Iteration protocols](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Iteration_protocols)