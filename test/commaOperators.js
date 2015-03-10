var test = require('tape');
var parse = require('..').parse;

test('Test Comma Operators', function (t) {
  t.deepEqual(parse('price=0.99,1.99,2.99'), {
    "price":{
      "$in":[0.99,1.99,2.99]
    }
  });
  t.deepEqual(parse('price=0.99,1.99,"2.99"'), {
    "price":{
      "$in":[0.99,1.99,"2.99"]
    }
  });
  t.deepEqual(parse('price=-0.99,1.99abc,"2.99"'), {
    "price":{
      "$in":[-0.99,"1.99abc","2.99"]
    }
  });
  t.deepEqual(parse('price=0.99,1.99,2.99||qty<20'), {
    "$or":[
      {"price":{"$in":[0.99,1.99,2.99]}},
      {"qty":{"$lt":20}}
    ]
  });

  t.end();
});