/////////////////////////////////////
//            TESTS    (do not modify)
/////////////////////////////////////
;(function(exports){
  'use strict';

  function assertEqual(a, b, msg) {
    if(a !== b) {
      throw new Error(msg || 'The values are not equal.');
    }
  }

  var result;
  var randomEvent = Math.random();
  var handler = function() {
    result = arguments;
    called++;
  };
  var customObj = {};
  var called = 0;

  mediator.subscribe(randomEvent, handler);

  mediator.publish(randomEvent);
  assertEqual(called, 1, 'Should have been called exactly once.');

  mediator.publish(randomEvent, true);
  assertEqual(result[0], true, 'Should have been called with the correct parameter.');

  mediator.installTo(customObj);
  called = 0;

  customObj.subscribe(randomEvent, handler);

  customObj.publish(randomEvent);
  assertEqual(called, 1, 'Should have been called exactly once on a custom object.');

  customObj.publish(randomEvent, true);
  assertEqual(result[0], true, 'Should have been called with the correct parameter on a custom object.');

  console.log('All tests are passing.');
})();