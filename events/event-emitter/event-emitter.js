'use strict';
var fs = require('fs');

module.exports = {
  getParsedJsonFile: function(fileName, enc, cb) {
    try {
      var file = JSON.parse(fs.readFileSync(fileName, enc || 'utf8'));
      cb(null, file);
    } catch (e) {
      cb(e);
    }
  },
  consumeStream: function(request, cb) {
    var result = '';
    var start = Date.now();
    var contentLength = 0;
    request.on('data', function(data) {
      result += data;
      contentLength += Buffer.byteLength(data);
    });
    request.on('error', function(e) {
      cb(e);
    });

    request.on('end', function() {
      cb(null, {
        data: result,
        elapsedTime: Date.now() - start,
        contentLength: contentLength
      });
    });

  }
};
