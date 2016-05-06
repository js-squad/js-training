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

  var called = 0, ps1, ps2, ps3;

  assertEqual(typeof sendRequest, 'function', 'Should define a function named "sendRequest".');

  ps1 = sendRequest(Math.random(), {
    method: 'get'
  }, function(err, result) {
    called++;
    assertEqual(typeof err, 'object');
    assertEqual(err.status, 404, 'The status code should be 404 Not Found.');
    assertEqual(typeof result, 'undefined');
  });

  ps2 = sendRequest('/facade.html', {
    method: 'get'
  }, function(err, result) {
    called++;
    assertEqual(err, null, 'Error should be null.');
    assertEqual(result instanceof Response, true, 'If not dataType option is passed, should return the response object.');
    assertEqual(result.ok, true, 'When giving a valid path the response should be ok.');
    assertEqual(result.status, 200, 'The response status should be 200.');
  }); 

  ps3 = sendRequest('/facade.html', {
    method: 'get',
    dataType: 'text'
  }, function(err, result) {
    called++;
    assertEqual(err, null, 'Error should be null.');
    assertEqual(typeof result, 'string', 'When sending a request to a valid path and with dataType: "text", the type of the response should be string.');

  });

  Promise.all([ps1, ps2, ps3]).then(function() {
    assertEqual(called, 3, 'The callback function should have been called exaclty thrice.');
    console.log('All tests are passing.');
  })

})();