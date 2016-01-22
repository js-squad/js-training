1 - Transform the following singleton (calculator) to a proper (stateless or stateful) module representation (it has to receive the export destination)

```javascript
var calculator = {
    _result: 0,

    add: function(value) {
        this._result += value;
    },

    substract: function(value) {
        this._result -= value;
    },

    multiply: function(value) {
        this._result *= value;
    },

    divide: function(value) {
        this._result /= value;
    }

    getResult: function() {
        return this._result;
    }
};
```

2 - Apply all the changes required to convert the module that you created in the previous exercise to its opposite (if it was stateless, then create its stateful version, and if it was stateful, then create its stateless version)