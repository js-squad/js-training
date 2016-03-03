## Testing

<p align="center"><img width="440" height="350" src ="http://i.imgur.com/Ba9iGlr.png"/></p>

The components of the testing pyramid are described below.

- “Unit tests” test individual units of code in isolation (for instance, individual functions). They are fast and you usually have a lot of them.
- “Integration tests” test the integrations between different units, for example the interaction between one module and its dependencies.
- “E2E (or end-to-end) tests” test the system as a whole, from the UI down to the data store, and back.

### Unit testing
By convention, the assert expressions should read _actual_ vs _expected_.
```js
var myModule = require('./myModule');

assert(miModule.multiply(), 0);
assert(miModule.multitple(2,3), 6);
```

### Integration testing
Integration testing could be used in a broad number of elements between an application, for example in a Node.js application could be used for API-level tests.
```js
const miModule = require('./myModule');

const entriesResult = myModule.entries({a:1,b:2});
let i = 0;
myModule.forEach(entriesResult, ([key, value]) => {
    const [expectedKey, expectedValue] = expected[i];
    assert(key, expectedKey);
    assert(value, expectedValue);
    i++;
});
```


### E2E Testing
End-to-end testing is a methodology used to test whether the flow of an application is performing as designed from start to finish. The purpose of carrying out end-to-end tests is to identify system dependencies and to ensure that the right information is passed between various system components and system. [\[Source\]](https://www.techopedia.com/definition/7035/end-to-end-test)

Some of the tools available for End-to-End testing in Node.js are:
- [Nightwatch.js](http://nightwatchjs.org/)
- [Casper.js](http://casperjs.org/)


--------------------------

### Test-Driven development (aka TDD)
<p align="center"><img src ="http://joshldavis.com/img/tdd-vs-bdd/tdd-flowchart.png" /></p>

Test-driven development (TDD) is a software development process that relies on the repetition of a very short development cycle: first the developer writes an (initially failing) automated test case that defines a desired improvement or new function, then produces the minimum amount of code to pass that test, and finally refactors the new code to acceptable standards. [Wikipedia](https://en.wikipedia.org/wiki/Test-driven_development)

### Behavior-Driven development (aka BDD)
The main difference is just the wording. BDD uses a more verbose style so that it can be read almost like a sentence.

This is what I meant by saying that BDD eliminates issues that TDD might cause. The ability to read your tests like a sentence is a cognitive shift in how you will think about your tests. The argument is that if you can read your tests fluidly, you will naturally write better and more comprehensive tests.[\[Source\]](http://joshldavis.com/2013/05/27/difference-between-tdd-and-bdd/)

### Code coverage
Code coverage is a well-known metric used as quality indicator for software. It's often implied when doing TDD or BDD to get a _high_ percentage of code coverage.

### Mocking
In strict applications of TDD or BDD, mocking could be an important part to decouple dependencies from methods or functions that would be otherwise tested in a integration test.

#### Proxyquire
#### Sinon

### node-tap
node-tap is a test framework for Node.js that implements the [Test-Anything-Protocol](https://testanything.org/). Its most useful features are out-of-the-box code-coverage, support for various reporters and a high-level of integration with already existing tooling that implements the Test-Anythin-Protocol.
Tap includes some assertion methods such as:
- t.throws
- t.doesNotThrow
- t.equal
- t.notEqual

You'll find the comprehensive list at the [docs](http://www.node-tap.org/asserts/).

###Reading resources
- [TAP & Tape, the awesome way to test JavaScript](http://www.macwright.org/2014/03/11/tape-is-cool.html)
- [Testing JavaScript Modules with Tape](https://ponyfoo.com/articles/testing-javascript-modules-with-tape)
- [Tape versus Tap](https://remysharp.com/2016/02/08/testing-tape-vs-tap)
- [Code coverage goal: 80% and no less!](http://googletesting.blogspot.com.ar/2010/07/code-coverage-goal-80-and-no-less.html)
