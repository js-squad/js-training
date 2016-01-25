# CustomEvent
It provides an interface to send your own custom events to a DOM element. You can create a new event with the following:
```js
var event = new CustomEvent('myEvent');
```

To 'fire' or dispatch the custom event to a DOM object, you should use the method `dispatchEvent`.

It also lets you specify custom properties to the Event object like this:
```js
var event = new CustomEvent('myEvent', {
  detail: 'my detail for this event'
});

var listener = function(event) {
    console.log(event.detail); // prints 'my detail for this event'
}
```
Take in consideration that the `detail` property of the second argument of the constructor is the only one allowed to pass data, any other property will not be added to the fired Event object.

## Compatibility
It's supported by the majority of browsers but lacks support on older IE versions.
![img](http://i.imgur.com/FV8wsTL.png)* Source: [caniuse.com](http://caniuse.com/#search=customeve)

### Polyfill
There's a [polyfill](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent#Polyfill) used to add feature on older browsers.