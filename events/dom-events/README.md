# DOM Events

## Event flow

- image: https://goo.gl/XAz2Jd
- event.eventPhase: https://goo.gl/1mMmBR

#### Concepts

- Phases are specifically used to reduce the amount of listeners, and therefore increase of the application the performance and simplify the dynamic addition of children (only html)
- The event **propagation** can be cancelled on any listener using the corresponding event method
- `event.target` VS `event.currentTarget`

### Capture / Capturing

> event.eventPhase === Event.CAPTURING_PHASE === 1

#### Concepts

- The event is being propagated through the target's ancestor objects.
- **Window** > **Document** > ... > **Target's Parent**
- listener `useCapture = true` (3rd param of addEventListener) => executed

### Target

> event.eventPhase === Event.AT_TARGET === 2

#### Concepts

- The flow reached the element where the event was dispatched
- `event.bubbles === false` => flow stops here

### Bubbling

> event.eventPhase === Event.BUBBLING_PHASE === 3

#### Concepts

- It only happens if `event.bubbles === true`
- **Target's parent** > ... > **Document** > **Window** 

### Default browser behavior (if it was not previously cancelled)

#### Concepts

- It only happens if none of the listeners cancelled it (`event.preventDefault()`)
- It executes the default action for a given event (ex. for links, it redirects to the url specified in the **href** attribute)

## Reacting to events

### Attaching listeners

#### DOM Level 0

> Just one event handler

##### Directly in the HTML: Using the specific element attribute

###### Concepts

- This approach is highly discouraged since it promotes coupling between the presentation and the business layers (**separation of concerns**)
- If we change some listener (function) signature, we must also change all the html parts that refers to it

###### Example

```html
<button onclick="alert('hello!');"> Say Hello! </button>
```

##### In the script: Using the specific element property 

###### Concepts

###### Example

```javascript
var el = document.getElementById('myButton');

el.onclick = function onElementClick(){
    alert('Hello!');
};
```

#### DOM Level 2

> Multiple event handlers

##### Concepts

- It introduces an standard way to add multiple listeners
- Before the standarization there were
    - **IE**
        - name starts with *on* (ex. *onclick*)
        - only bubbling
        - **this**: global object / undefined (strict mode) 
        - attachEvent / detachEvent 
        - cancelBubble / returnValue
    - **FF**
        - only capturing
        - **this**: target element
        - addEventListener / removeEventListener
        - preventDefault / stopPropagation

##### Example

```javascript
var el = document.getElementById('myButton')

el.addEventListener( 'click', function onElementClick(){
     alert('Hello!');
}, false);
```

### Removing Listeners

#### DOM Level 0

##### Example

```javascript
var el = document.getElementById('myButton');

el.onclick = null;
```

#### DOM Level 2

##### Concepts

- It introduces a way to remove a single listener
- You must pass the exact same listener (function) you have previously used with **addEventListener** (be careful with *.bind*)

##### Example

```javascript
var user = {
    _name: "Luke",
    sayName: function() {
        console.log(this._name);
    }
};

var sayUserName = user.sayName.bind(user);

var el = document.getElementById("printUserName");

el.addEventListener("click", sayUserName);

// ...

el.removeEventListener("click", sayUserName);
```

## Event interface

### preventDefault

#### Concepts

- It prevents the default action of the event to be triggered
- Not all the events are cancelable (`event.cancelable: boolean`)

### target VS currentTarget

> **event.currentTarget** identifies the current target for the event, as the event traverses the DOM (capturing and bubbling phases) while **event.target** holds the reference of the element on which the event occurred

### stopPropagation VS stopImmediatePropagation

> **stopPropagation** (DOM Level 2) prevents handlers attached to the *parent elements* to be executed while **stopImmediatePropagation** (DOM Level 3) does the same but also prevents handlers attached to the *current element* to be executed

## Bonus Tracks

### DOMContentLoaded vs Window.load

> The DOMContentLoaded event is fired when the initial HTML document has been completely loaded and parsed, without waiting for stylesheets, images, and subframes to finish loading. A very different event - [load](https://developer.mozilla.org/en-US/docs/Mozilla_event_reference/load) - should be used only to detect a fully-loaded page

## References

- DOM Level 2 Events Specification: https://goo.gl/v26pHe
- DOM Level 2 Events Specification / Event interface: https://goo.gl/bhFVfc
- List of standard events: https://goo.gl/aajng4
- Event interface: https://goo.gl/iyC88K
- addEventListener: https://goo.gl/dlGfbh
- removeEventListener: https://goo.gl/9KjX1L
- A crash course in how DOM events work: http://goo.gl/j0LHsc
- An Introduction To DOM Events: https://goo.gl/Cuabcc
