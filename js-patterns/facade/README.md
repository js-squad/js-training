## Facade pattern

> Provide a unified interface to a set of interfaces in a subsystem. Facade defines a higher-level interface that makes the subsystem easier to use. This can be used to simplify a number of complicated object interactions into a single interface.
[Source](http://c2.com/cgi/wiki?FacadePattern)

![img1](http://martinfowler.com/eaaCatalog/distributedFacadeSketch.gif)

_[Source](http://martinfowler.com/eaaCatalog/remoteFacade.html)_

![img2](https://en.wikipedia.org/wiki/File:Example_of_Facade_design_pattern_in_UML.png)

_[Source](https://en.wikipedia.org/wiki/Facade_pattern)_

It's categorized as a [Structural Pattern](https://en.wikipedia.org/wiki/Structural_pattern) in the Gang of Four.

Examples:
  1. [components/api/index.js](https://github.com/js-squad/tiendas-oficiales/blob/master/components/api/index.js), Tiendas oficiales
  2. jQuery's [$( document ).ready()](https://learn.jquery.com/using-jquery-core/document-ready/)


*Pros*
- Hides the complexity of implementations
- Simplifies API

*Cons*
- Bad implementations lead to objects tightly coupled


### Resources
- [Application Facades, Martin Fowler](http://martinfowler.com/apsupp/appfacades.pdf)
- [Facade Pattern](http://c2.com/cgi/wiki?FacadePattern)