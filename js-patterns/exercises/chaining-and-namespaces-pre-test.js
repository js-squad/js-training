//////// required for tests //////
/////////// do not modify ////////
var app = {
  _: 'gibberish'
};

function assertEqual(a,b) {
  if(a !== b) {
    throw new Error('The values are not equal.');
  }
}
