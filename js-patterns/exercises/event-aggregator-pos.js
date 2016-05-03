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

  document.addEventListener("DOMContentLoaded", function() {
    //////////////////// Event aggregator: first excercise ////////////////////
    var called, selector, e1, e2;

    // add two dom elements with random class
    called = 0;
    selector = 'c' + Math.round(Math.random()*10000);

    e1 = document.createElement('div');
    e1.className = selector;
    e1.style.display = 'none';
    document.body.appendChild(e1);

    e2 = document.createElement('div');
    e2.className = selector;
    e2.style.display = 'none';
    document.body.appendChild(e2);


    assertEqual(typeof on, 'function', 'Should define a function named "on".');

    on('.' + selector, 'click', function() {
      called++;
    });

    e1.click();
    assertEqual(called, 1, 'Should have been called exactly once.');
    e2.click();
    assertEqual(called, 2, 'Should have been called exactly twice.');


    ///////////////// Event aggregator: second excercise /////////////////////
    var result;
    var randomEvent = Math.random();
    var handler = function() {
      result = arguments;
      called++;
    };
    called = 0;

    app.on(randomEvent, handler);

    app.trigger(randomEvent);
    assertEqual(called, 1, 'Should have been called exactly once.');

    app.trigger(randomEvent, true);
    assertEqual(result[0], true, 'Should have been called with the correct parameter.');

    console.log('All tests are passing.');
  });
})();
