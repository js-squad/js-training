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

  exports.tests = {};

  document.addEventListener('customEvent1', function(e) {
    exports.tests.customEvent1 = e.detail;
  });

  document.addEventListener("DOMContentLoaded", function() {
    var btn1 = document.querySelector('#btn1');
    btn1.addEventListener('click', function(e) {
      exports.tests.clicked = true;
    });
  });
})(this);