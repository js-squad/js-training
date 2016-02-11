/////////////////////////////////////
//            TESTS    (do not modify)
/////////////////////////////////////
;(function(exports){
  'use strict';

  exports.assertEqual = function (a,b) {
    if(a !== b) {
      throw new Error('The values are not equal.');
    }
  };

  var parseJSONTest = {};

  assertEqual(typeof parseJSON, 'function');
  var result = parseJSON("{}");
  assertEqual(typeof result.then, 'function');
  var test1 = Promise.all([result.then(function(res) {
    assertEqual(typeof res, 'object');
    if(res === null) {
      throw new Error('Incorrect result.');
    }
  }), parseJSON("").then(function() {
    throw new Error('Unexpected resolve with bad input');
  }).catch(function() {
    parseJSONTest.rejectedWhenItShould = true;
  }).then(function() {
    assertEqual(parseJSONTest.rejectedWhenItShould, true);
  })]).then(function() {
    console.log('parseJSON test passed.');
  }).catch(function() {
    throw new Error('Unexpected reject.');
  });

  var primeTest = {};

  assertEqual(typeof arePrime, 'function');

  var test2 = Promise.all([
    // check valid cases
    arePrime([Promise.resolve(5)]),
    arePrime(Promise.resolve(13)),
    // check invalid cases
    arePrime(Promise.resolve(6)).catch(function() {
      primeTest.rejectedWhenItShould = true;
    }).then(function() {
      assertEqual(primeTest.rejectedWhenItShould, true);
    })
    
    ]).then(function() {
      console.log('arePrime test passed.');
    }).catch(function() {
      throw new Error('Unexpected reject.')
    });


  Promise.all([test1, test2]).then(function() {
    console.log('All tests passed.');
  });
})(this);