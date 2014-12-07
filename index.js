'use strict';

var XHRStream = require('buffered-xhr-stream');

module.exports = CSVStream;

require('component-emitter')(CSVStream.prototype);

function CSVStream() {
  var self = this;

  this.open = function(url) {
    var stream = new XHRStream({url: url});
    var head = true;
    var row = [];
    var pos = 0;
    var cell = '';

    stream.on('data', function(res) {
      var i = 0;
      var len = res.length;
      var ch;

      for (; i < len; i++) {
        ch = res[i];

        if (ch === ',') {
          row[pos++] = cell.trim();
          cell = '';
          continue;
        }

        if (ch === '\n') {
          row[pos++] = cell.trim();

          self.emit('data', row, head);

          row.length = 0;
          pos = 0;
          cell = '';
          head = false;
          continue;
        }

        cell += ch;
      }
    });

    stream.on('end', function() {
      self.emit('end');
    });
  };

  this.dispose = function() {
    self.removeAllListeners();
  };
}
