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

  function checkFinished() {
    if(called === 3) console.log('All tests are passing.');
  }

  var called = 0;

  assertEqual(typeof sendRequest, 'function', 'Should define a function named "sendRequest".');

  sendRequest(Math.random(), {
    method: 'get'
  }, function(err, result) {
    called++;
    assertEqual(called, 1, 'The callback function should have been called exaclty once.');
    assertEqual(typeof err, 'object');
    assertEqual(err.status, 404, 'The status code should be 404 Not Found.');
    assertEqual(typeof result, 'undefined');
  });

  sendRequest('/facade.html', {
    method: 'get'
  }, function(err, result) {
    called++;
    assertEqual(called, 2, 'The callback function should have been called exaclty twice.');
    assertEqual(err, null, 'Error should be null.');
    assertEqual(result instanceof Response, true, 'If not dataType option is passed, should return the response object.');
    assertEqual(result.ok, true, 'When giving a valid path the response should be ok.');
    assertEqual(result.status, 200, 'The response status should be 200.');
  }); 

  sendRequest('/facade.html', {
    method: 'get',
    dataType: 'text'
  }, function(err, result) {
    called++;
    assertEqual(called, 3, 'The callback function should have been called exaclty thrice.');
    assertEqual(err, null, 'Error should be null.');

    assertEqual(typeof result, 'string', 'When sending a request to a valid path and with dataType: "text", the type of the response should be string.');

    checkFinished();
  });

  Promise.resolve().then(function() { // we need to go deeper...
    Promise.resolve().then(function() {
      assertEqual(called, 3, 'The callback function should have been called exaclty thrice.');
    })
  })
})();