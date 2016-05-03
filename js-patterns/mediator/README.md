## Mediator pattern
_"is a design pattern that allows us to expose a unified interface through which the different parts of a system may communicate"_ - [Essential JS design patterns, Addy Osmani](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#mediatorpatternjavascript)

It's also normally defined as a [behavioral pattern](https://en.wikipedia.org/wiki/Behavioral_pattern).

![img1](https://addyosmani.com/largescalejavascript/assets/img/chart4a.jpg)

_[Source](https://addyosmani.com/largescalejavascript/#mediatorpattern)_

![img2](https://www.safaribooksonline.com/library/view/learning-javascript-design/9781449334840/httpatomoreillycomsourceoreillyimages1326898.png)

_[Source](https://www.safaribooksonline.com/library/view/learning-javascript-design/9781449334840/ch09s06.html)_

Example:
```js
const orgChart = {
  addEmployee: function(){
    const details = this.getDetails();
    details.on('ev1', function(){
      const manager = this.getManager(employee);
      manager.on('ev2', function(){
        employee.save();
      });
    });
  }
}
```

*Pros*
  - Reduces the interaction between different parties from many to one
  - Helps in the process of decoupling objects which often promotes smaller, reusable components.

*Cons*
  - Introduces a single point of failure

### Resources
- [Essential JS design patterns, Addy Osmani](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#mediatorpatternjavascript)
- [Event Aggregator And/Or/vs Mediator: A Tale Of Two Patterns](https://lostechies.com/derickbailey/2013/03/18/event-aggregator-andorvs-mediator-a-tale-of-two-patterns/)
- [Mediator.js](http://thejacklawson.com/Mediator.js/)