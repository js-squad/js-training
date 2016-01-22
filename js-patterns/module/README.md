# Module Pattern (Are we doing it right?)

## Background

### Definitions

- **stateless**: that has no state
- **stateful**: that has state

### Dependency Inyection

#### Concepts

- Instead of letting an object to configure itself, design it to expose a way to configure it externally (this is tipically achieved using setters, or directly in the constructor)
- Implements **Inversion of Control (IoC)** for resolving dependencies: the object is not longer in charge of configuring itself (instantiate its dependencies), it instead delegates this to an external component
- It follows the **Dependency Inversion Principle (DIP)**: It decouples an object from depending on specific implementations and instead depends on interfaces (group of methods - duck typing)

#### Examples

1 - Without Dependecy Inyection

```javascript
// since we are creating the connector within the constructor
// we are coupled to this particular implementation

function Database(dataSourceName) {

    if (dataSourceName.indexOf("mysql") !== 0) {
        throw new Error("Only mysql connections are supported");
    }

    this._connector = new MySQlConnector(dataSourceName);
}

Database.prototype.query = function(mysqlStmt, onResult) {

    this._connector.query(mysqlStmt, onResult);
};
```

2 - With Dependecy Inyection

```javascript
// we now depend on an object that implements the
// connector interface (methods: createQuery, executeQuery)
// that allow us to receive any implementation of it (mysql, postgre, etc)

function Database(connector) {

    this._connector = connector;
}

Database.prototype.createQuery = function() {

    return this._connector.createQuery();
};

Database.prototype.executeQuery = function(query, onResult) {

    this._connector.executeQuery(query, onResult);
};
```

### Singleton

#### Concepts

- Ensures there is only one instance
- Provides a global point of access to that single instance
- It can be wrapped within a closure if it uses additional logic (keep that additional logic private to avoid polluting *the outside*)
- It is initialized the first time it is required (not so easy => init args)
- They violate the **Single Responsability Principle (SRP)**: apart of controlling their own logic they are also in charge of creating themselves
- Most of the times they ended up being global variables
- They promote high coupling through the whole application: they are used directly instead of receiving them using **Dependency Inyection**
- Are dfficult to test (only the stateful ones)
- **stateless** => group of functions
- **stateful** => object instance

#### Literal Singleton

##### Concepts

- It is really easy to create => object literal
- It is easy to read
- It should only be used for **stateless singletons**, otherwise it makes them difficult or even impossible to test
- If it requires some additional logic (**stateless** => functions/immutable values), it can then be wrapped within a closure to keep them private

##### Examples

1 - Stateless without additional logic (no need for closure)

```javascript
var logger = {
    debug: function() { /* ... */ },
    error: function() { /* ... */ },
    info : function() { /* ... */ },
    warn : function() { /* ... */ }
};
```

2 - Stateless With additional logic (wrapped within a closure to keep this logic private)

```javascript
var logger = (function() {

    function prettifyMessage(message) { /* ... */ }

    return {
        debug: compose(prettifyMessage, console.debug.bind(console)),
        error: compose(prettifyMessage, console.error.bind(console)),
        info : compose(prettifyMessage, console.info.bind(console)),
        warn : compose(prettifyMessage, console.warn.bind(console))
    };
})();
```

3 - Stateful (this pattern should be avoided)

```javascript
// since we are creating ApiClient within the closure
// this will indeed complicate testing this object
var logger = (function(configuration) {

    var apiClient = new ApiClient(configuration.apiBaseUrl);

    function logToServer(level, message) {

        return apiClient.post("/logger", {
            level  : level,
            message: message
        });
    }

    return {
        debug: logToServer.bind(undefined, "debug"),
        error: logToServer.bind(undefined, "error"),
        info : logToServer.bind(undefined, "info"),
        warn : logToServer.bind(undefined, "warn")
    };
})(configuration);
```


#### Constructor Singleton

##### Concepts

- Define a constructor within a closure and return an instance of it
- It fits perfect for the cases where we need **stateful singletons**
- Its state can be represented with variables within the constructor (with the proper privileged methods to give access to it), or just using simple properties (or private properties - underscore convention)
- It can be easily test it, since the returned object contains a constructor property that allows the creation of a new clean instance for each test

##### Examples

1 - Keeping the state using privileged methods

```javascript
var logger = (function(configuration) {

    function logToServer(apiClient, level, message) {

        return apiClient.post("/logger", {
            level  : level,
            message: message
        });
    }

    // we are hiding apiClient to the outside creating only
    // privileged methods to access to it instead of adding it
    // as an instance property
    function Logger(apiClient) {

        this.debug = logToServer.bind(undefined, apiClient, "debug"); 
        this.error = logToServer.bind(undefined, apiClient, "error");
        this.info  = logToServer.bind(undefined, apiClient, "info");
        this.warn  = logToServer.bind(undefined, apiClient, "warn");
    }

    return new Logger(new ApiClient(configuration.url));
})(configuration);
```

2 - Keeping the state using properties

```javascript
var logger = (function(configuration) {

    function logToServer(level) {

        return function(message) {

            return this._apiClient.post("/logger", {
                level  : level,
                message: message
            });
        };
    }

    function Logger(apiClient) {

        this._apiClient = apiClient;
    }

    Logger.prototype.debug = logToServer("debug"); 
    Logger.prototype.error = logToServer("error");
    Logger.prototype.info  = logToServer("info");
    Logger.prototype.warn  = logToServer("warn");

    return new Logger(new ApiClient(configuration.url));
})(configuration);
```

3 - The best of them: testing!

```javascript
// /src/logger.js
var logger = (function(configuration) {

    function logToServer(level) {

        return function(message) {

            return this._apiClient.post("/logger", {
                level  : level,
                message: message
            });
        };
    }

    function Logger(apiClient) {

        this._apiClient = apiClient;
    }

    Logger.prototype.debug = logToServer("debug"); 
    Logger.prototype.error = logToServer("error");
    Logger.prototype.info  = logToServer("info");
    Logger.prototype.warn  = logToServer("warn");

    return new Logger(new ApiClient(configuration.url));
})(configuration);

// /test/logger.js
function setup() {

    // var apiClientMock = ...;

    return {
        apiClientMock: apiClientMock,

        // the following line express the magic of creating singletons
        // using constructors => singleton constructors
        logger: new logger.constructor(apiClientMock)
    };
}

function test(level) {

    var objects       = setup();
    var apiClientMock = objects.apiClientMock;
    var logger        = objects.logger;

    var message = "test";

    apiClientMock.expects("post").toBeCalledWith("/logger", {
        level  : level,
        message: message
    });
}

[ "debug", "error", "info", "warn" ].forEach(test);
```

## Module Pattern

### Concepts

- It is just a singleton wrapped within a closure
- The closure is used to keep the non-exported functionality private, provide the dependencies and sometimes also to supply the export destination (module / module.exports)
- Prefer to receive the export destination vs returning the singleton and do the asignment outside the closure (it allows to consume it directly or in a commonjs enviroment)
- we should try them to be **stateless** => group of functions => literal singleton
- if we need them to be **stateful** => constructor singleton

### Examples

1 - Stateless without receiving the export destination

```javascript
var App.Module1 = (function(Module2, Module5) {

    var Module1 = {};

    Module.someFunc = function(param1, param2) {
        // use something from Module2
    };

    Module.someOtherFunc = function(param1, param2) {
        // use something from Module5
    };

    // we need to return the variable that contains
    // the module definition
    return Module1;
})(App.Module2, App.Module5);
```

2 - Stateless module (literal singleton) receiving the export destination

```javascript
(function(module, exports, Module2, Module5) {

    // there is no need to create a variable to contain the
    // module, since we can use directly the export variable

    exports.someFunc = function(param1, param2) {
        // use something from Module2
    };

    exports.someOtherFunc = function(param1, param2) {
        // use something from Module5
    };

    // there is no need to return anything, since we have already
    // added all the functionallity directly to the exports variable
}).apply(
    undefined,
    (
        (
            (typeof module === "object" && module !== null)
            && (typeof module.exports === "object" && module.exports !== null)
        )
        ? [ module, module.exports ]
        : [ { exports: (App.Module1 = {}) }, App.Module1 ]
    )
    // dependencies
    .concat(App.Module2, App.Module5)
);
```

3 - Stateful module (constructor singleton) receiving the export destination

```javascript
(function(module, exports, Module2, Module5) {

    function StatefulModule(dependency1, dependency2) {

        this._dependency1 = dependency1;
        this._dependency2 = dependency2;
    }

    StatefulModule.prototype.someMethod = function() {
        // use something from this._dependency1
    };

    StatefulModule.prototype.someOtherMethod = function() {
        // use something from this._dependency2
    };

    module.exports = new StatefulModule(
        Module2.createSomeObject(),
        Module2.createSomeOtherObject()
    );
}).apply(
    undefined,
    (
        (
            (typeof module === "object" && module !== null)
            && (typeof module.exports === "object" && module.exports !== null)
        )
        ? [ module, module.exports ]
        : [ { exports: (App.Module1 = {}) }, App.Module1 ]
    )
    // dependencies
    .concat(App.Module2, App.Module5)
);
```

## Variant: Revealing Module Pattern

### Concepts

- It should only be used to **stateless modules** (it uses a literal singleton)
- Instead of constructing the singleton throughout the closure, it is exported in a single statement as an anonymous object literal
- Because there is only a single export statement, it can be easily seen what functionallity exports (interface)
- The fact that there is an additional object (anonymous object literal) allows to keep fixed their methods (that is what the consumer sees) and change the name of the functions they contain

### Examples

1 - Without receiving the export destination

```javascript
var App.Module1 = (function(Module2, Module5) {

    function someFunc(param1, param2) {
        // use something from Module2
    };

    function someOtherFunc(param1, param2) {
        // use something from Module5
    };

    return {
        apiFunc1: someFunc,
        apiFunc2: someOtherFunc
    };
})(App.Module2, App.Module5);
```

2 - Receving the export destination

```javascript
(function(module, exports, Module2, Module5) {

    function someFunc(param1, param2) {
        // use something from Module2
    };

    function someOtherFunc(param1, param2) {
        // use something from Module5
    };

    module.exports = {
        apiFunc1: someFunc,
        apiFunc2: someOtherFunc
    };
}).apply(
    undefined,
    (
        (
            (typeof module === "object" && module !== null)
            && (typeof module.exports === "object" && module.exports !== null)
        )
        ? [ module, module.exports ]
        : [ { exports: (App.Module1 = {}) }, App.Module1 ]
    )
    // dependencies
    .concat(App.Module2, App.Module5)
);
```

