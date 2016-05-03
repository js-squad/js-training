/////////////// (do not modify) //////////////
// chrome will not allow using fetch against 'file://' URLs, 
// so we're mocking it for test purposes
/////////////////////////////////////////////
;(function(){
  window.fetch = function(path, options) {
    var validPaths = ['facade.html', '/facade.html'];
    var response;

    if(arguments.length === 0) {
      throw new Error('1 argument required, but only 0 present.');
    }

    if (validPaths.indexOf(path) === -1) {
      response = new Response(null, {
        status: 404,
        ok: false,
        statusText: '',
        url: path
      });
    } else {
        response = new Response(null);
    }

    return Promise.resolve(response);
  }
}());