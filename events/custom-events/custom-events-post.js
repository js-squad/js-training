/////////////////////////////////////
//            TESTS    (do not modify)
/////////////////////////////////////
;(function(exports){
  'use strict';

  document.addEventListener("DOMContentLoaded", function() {
    if(!exports.tests) {
      return;
    }
    assertEqual(exports.tests.clicked, true);
    console.log('\'click\' test passed.');
    if(!exports.tests.customEvent1) {
      throw new Error('Failed test for customEvent1.');
    }
    assertEqual(exports.tests.customEvent1.customProp, 'my custom property');
    console.log('Custom property test passed.');
    console.log('All tests passed.');
  });
})(this);