
# simple search parser

Parses expressions like:

* "Cars or Boats"
* "Donald and not Trump"
* "Snakes and Planes"
* "Cars or Boats and not Snakes"

And returns a function that matches strings on the given expression.

## install

```bash
npm install simple-search-parser
```

## usage

```js
const parse = require('simple-search-parser');

const match = parse('Cars or Boats');

match('I like cars!'); // ==> true
```

