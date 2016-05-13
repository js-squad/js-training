## Event-aggregation pattern

![image](http://martinfowler.com/eaaDev/eventAggregator/objects.gif)

_[Source](http://martinfowler.com/eaaDev/EventAggregator.html)_

![image2](https://i-msdn.sec.s-msft.com/dynimg/IC245765.png)

_[Source](https://msdn.microsoft.com/en-us/library/ff921122.aspx)_

Core idea is to channel multiple event sources through a single object so that other objects needing to subscribe to the events don’t need to know about every event source.

### Resources

- [Event Aggregator - Martin Fowler](http://martinfowler.com/eaaDev/EventAggregator.html)
