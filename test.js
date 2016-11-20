
const {equal} = require('assert');
const parse = require('./parser');

let match = parse('Cars or Boats');

equal(match('I like cars!'), true);

match = parse('X and Y');

equal(match(''), false);
equal(match('foo'), false);
equal(match('X'), false);
equal(match('Y'), false);
equal(match('X Y'), true);
equal(match('Y X'), true);

match = parse('X and not Y');

equal(match(''), false);
equal(match('foo'), false);
equal(match('X'), true);
equal(match('Y'), false);
equal(match('X Y'), false);
equal(match('Y X'), false);

match = parse('Foo or Bar');

equal(match(''), false);
equal(match('foo'), true);
equal(match('BAR'), true);
equal(match('FOOBAR'), true);
equal(match('Baz'), false);
equal(match('BAR (foo)'), true);

match = parse('Foo or Bar and not Baz');

equal(match(''), false);
equal(match('foo'), true);
equal(match('BAR'), true);
equal(match('FOOBARBAZ'), true);
equal(match('BARBAZ'), false);
equal(match('Baz'), false);
equal(match('BAR (foo)'), true);

match = parse('Foo or Bar and Baz');

equal(match(''), false);
equal(match('foo'), true);
equal(match('BAR'), false);
equal(match('FOOBARBAZ'), true);
equal(match('BARBAZ'), true);
equal(match('Baz'), false);
equal(match('BAR (foo)'), true);

match = parse('Foo or Bar or Baz');

equal(match(''), false);
equal(match('foo'), true);
equal(match('Boo'), false);
equal(match('BAR'), true);
equal(match('FOOBARBAZ'), true);
equal(match('BARBAZ'), true);
equal(match('Baz'), true);
equal(match('BAR (foo)'), true);

match = parse('Foo and Bar and not Baz');

equal(match(''), false);
equal(match('foo'), false);
equal(match('Boo'), false);
equal(match('BAR'), false);
equal(match('FOOBARBAZ'), false);
equal(match('BARBAZ'), false);
equal(match('Baz'), false);
equal(match('BAR (foo)'), true);
