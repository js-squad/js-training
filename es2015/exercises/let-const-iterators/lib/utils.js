'use strict';
const utils = {
  // it should receive an iterable element and call the received function with each element
  // of the iterable object
  forEach(iterable, fn) {
  },

  // it should receive an infinite number or parameters and return the multiplication of all
  // do not use "forEach", "map" or "reduce"
  multiply() {
  },

  // it should return an array of arrays, each array element will have only two elements,
  // the first one representing the key names and the second one its values
  // it should also check if the given parameters it's an object and throw an error otherwise
  // Example: entries({a:1, b:2, c:3}) === [['a',1], ['b', 2], ['c',3]]
  entries(obj) {
  },

  // it should return the same object, adding the functionality to be consumed as an iterable
  // it should also check if the given parameters it's an object and throw an error otherwise
  // Example: 
  // for (let x of makeIterable({a:1,b:2})) {
  //   console.log(x);
  // }
  // should print ['a',1], ['b', 2]
  makeIterable(obj) {
  }
};


module.exports = utils;