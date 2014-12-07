# nk-csv-stream

Load and parse a CSV file.

## Install

With [npm](http://npmjs.org) do:

```bash
$ npm install nk-csv-stream --save-dev
```

## Usage

```js
var CsvStream = require('nk-csv-stream');
var stream = new CsvStream();

stream.on('data', function(row, head) {
  if (head) return;

  // Do something with the row.
});

stream.once('end', function() {
  stream.dispose();
});

stream.open('https://url.com/to/file.csv');
```

## API

#### `.open(url)`

#### `.dispose()`

## License

MIT
