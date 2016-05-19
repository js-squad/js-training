<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Event-aggregation pattern](#event-aggregation-pattern)
  - [Resources](#resources)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Event-aggregation pattern

![image](http://martinfowler.com/eaaDev/eventAggregator/objects.gif)

_[Source](http://martinfowler.com/eaaDev/EventAggregator.html)_

![image2](https://i-msdn.sec.s-msft.com/dynimg/IC245765.png)

_[Source](https://msdn.microsoft.com/en-us/library/ff921122.aspx)_

Core idea is to channel multiple event sources through a single object so that other objects needing to subscribe to the events don’t need to know about every event source.

### Resources

- [Event Aggregator - Martin Fowler](http://martinfowler.com/eaaDev/EventAggregator.html)
