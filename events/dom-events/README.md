<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [DOM Events](#dom-events)
  - [Event flow (phases)](#event-flow-phases)
    - [Capture / Capturing](#capture--capturing)
    - [Target](#target)
    - [Bubbling](#bubbling)
  - [Default browser behavior (if it was not previously cancelled)](#default-browser-behavior-if-it-was-not-previously-cancelled)
  - [Reacting to events](#reacting-to-events)
    - [Attaching listeners](#attaching-listeners)
      - [DOM Level 0](#dom-level-0)
        - [Directly in the HTML (inline model):](#directly-in-the-html-inline-model)
          - [Concepts](#concepts)
          - [Example](#example)
        - [In the script (traditional model)](#in-the-script-traditional-model)
          - [Concepts](#concepts-1)
          - [Example](#example-1)
      - [DOM Level 2](#dom-level-2)
        - [Concepts](#concepts-2)
        - [Example](#example-2)
    - [Removing Listeners](#removing-listeners)
      - [DOM Level 0](#dom-level-0-1)
        - [Example](#example-3)
      - [DOM Level 2](#dom-level-2-1)
        - [Concepts](#concepts-3)
        - [Example](#example-4)
  - [Event interface](#event-interface)
    - [isTrusted](#istrusted)
    - [target VS currentTarget](#target-vs-currenttarget)
    - [preventDefault](#preventdefault)
    - [stopPropagation VS stopImmediatePropagation](#stoppropagation-vs-stopimmediatepropagation)
  - [Bonus Tracks](#bonus-tracks)
    - [DOMContentLoaded vs Window.load](#domcontentloaded-vs-windowload)
  - [References](#references)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# DOM Events

## Event flow (phases)

- image: https://goo.gl/XAz2Jd
- event.eventPhase: https://goo.gl/1mMmBR
- The event **propagation** can be cancelled on any listener using the corresponding event method
- `event.target` VS `event.currentTarget`
- One of the uses of phases is to reduce the amount of listeners, since it allows adding just one to a common ancestor and then do the corresponding action comparing event.currentTarget with the required DOMElement

### Capture / Capturing

> event.eventPhase === Event.CAPTURING_PHASE === 1

- Propagation starts in the root ancestor and continues thoughout all the descendants until it reaches the target
- **Window** > **Document** > ... > **Target's Parent**
- listener `useCapture = true` (3rd param of addEventListener) => executed

### Target

> event.eventPhase === Event.AT_TARGET === 2

- The flow reached the element where the event was dispatched (target)
- `event.bubbles === false` => flow stops here

### Bubbling

> event.eventPhase === Event.BUBBLING_PHASE === 3

- It only happens if `event.bubbles === true`
- Propagation continues from the target until it reaches the root ancestor
- **Target's parent** > ... > **Document** > **Window**

## Default browser behavior (if it was not previously cancelled)

- It only happens if none of the listeners cancelled it (`event.preventDefault()`)
- It executes the default action for a given event (ex. for links, it redirects to the url specified in the **href** attribute)

## Reacting to events

### Attaching listeners

#### DOM Level 0

> Just one event handler

##### Directly in the HTML (inline model):

> Using the specific element attribute

###### Concepts

- The listener's code is directly specified in the element attribute with the name on + *event*
- This approach is highly discouraged since it promotes coupling between the presentation and the business layers (**separation of concerns**)
- If we change some listener (function) signature, we must also change all the html parts that refers to it

###### Example

```html
<button onclick="alert('hello!');"> Say Hello! </button>
```

##### In the script (traditional model)

> Using the specific element property

###### Concepts

- The listener (callback) is registered simply assigning it to the element's property with the name on + *event*
- This was the recommended approach since business logic was entirely specified within the script

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

el.addEventListener('click', function onElementClick(){
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

## [Event interface](https://developer.mozilla.org/en-US/docs/Web/API/Event)

### isTrusted

It can be used to identify events that

- **true**: were dispatched by the user agent (from an user action)
- **false**: were programatically triggered ([dispatchEvent](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent))

### target VS currentTarget

- **event.target** identifies the element on which the event originated, and keeps the same during the entire event propagation (capturing and bubbling phases)

- **event.currentTarget** event propagation can be though as a process in which the event traverses the DOM tree (capturing: top -> down, bubbling: down - top), and continuing with this way of thinking, then, current target will hold the current traversed element

### preventDefault

- It prevents the default action of the event to be triggered
- Not all the events are cancelable (`event.cancelable: boolean`)

### stopPropagation VS stopImmediatePropagation

- **stopPropagation** (DOM Level 2) prevents handlers attached to the *parent elements* to be executed

- **stopImmediatePropagation** (DOM Level 3) does the same as **stopPropagation** but also prevents handlers attached to the *current element* to be executed

## Bonus Tracks

### DOMContentLoaded vs Window.load

> The DOMContentLoaded event is fired when the initial HTML document has been completely loaded and parsed, without waiting for stylesheets, images, and subframes to finish loading. A very different event - [load](https://developer.mozilla.org/en-US/docs/Mozilla_event_reference/load) - should be used only to detect a fully-loaded page

## References

- [DOM Level 2 Events Specification](https://www.w3.org/TR/DOM-Level-2-Events/events.html)
- [DOM - Living Standard - Events](https://dom.spec.whatwg.org/#events)
- [List of standard events](https://developer.mozilla.org/en-US/docs/Web/Events)
- [Event interface](https://developer.mozilla.org/en/docs/Web/API/Event)
- [addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
- [removeEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener)
- [A crash course in how DOM events work](https://www.bitovi.com/blog/a-crash-course-in-how-dom-events-work)
- [An Introduction To DOM Events](https://www.smashingmagazine.com/2013/11/an-introduction-to-dom-events)
