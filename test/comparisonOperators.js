var test = require('tape');
var parse = require('..').parse;

test('Test Comparison Operators', function (t) {
  t.deepEqual(parse('age=25'), {
    "age": 25
  });
  t.deepEqual(parse('age="25"'), {
    "age": "25"
  });
  t.deepEqual(parse('age=25abc'), {
    "age": "25abc"
  });
  t.deepEqual(parse('sale=true'), {
    "sale": true
  });
  t.deepEqual(parse('sale="true"'), {
    "sale": "true"
  });

  t.deepEqual(parse('age[$type]=-1'), {
    "age": {
      "$type": -1
    }
  });

  t.deepEqual(parse('price=>=0.99'), {
    "price": {
      "$gte": 0.99
    }
  });
  t.deepEqual(parse('price>=0.99'), {
    "price": {
      "$gte": 0.99
    }
  });

  t.deepEqual(parse('price=<=2.99'), {
    "price": {
      "$lte": 2.99
    }
  });
  t.deepEqual(parse('price<=2.99'), {
    "price": {
      "$lte": 2.99
    }
  });

  t.deepEqual(parse('price=!=1.99'), {
    "price": {
      "$ne": 1.99
    }
  });
  t.deepEqual(parse('price!=1.99'), {
    "price": {
      "$ne": 1.99
    }
  });
  t.deepEqual(parse('price=<>1.99'), {
    "price": {
      "$ne": 1.99
    }
  });
  t.deepEqual(parse('price<>1.99'), {
    "price": {
      "$ne": 1.99
    }
  });

  t.deepEqual(parse('price=>0.99'), {
    "price": {
      "$gt": 0.99
    }
  });
  t.deepEqual(parse('price>0.99'), {
    "price": {
      "$gt": 0.99
    }
  });

  t.deepEqual(parse('price=<2.99'), {
    "price": {
      "$lt": 2.99
    }
  });
  t.deepEqual(parse('price<2.99'), {
    "price": {
      "$lt": 2.99
    }
  });

  t.deepEqual(parse('price=0.99&qty>=20'), {
    "price": 0.99,
    "qty": {"$gte": 20}
  });

  t.end();
});