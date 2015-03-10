var test = require('tape');
var parse = require('..').parse;

test('Test Logical Operators', function (t) {
  t.deepEqual(parse('price=0.99||price=1.99'), {
    "$or": [
      {"price": 0.99},
      {"price": 1.99}
    ]
  });

  t.deepEqual(parse('(price=0.99&&qty<20)'), {
    "$and": [
      {"price": 0.99},
      {"qty": {"$lt": 20}}
    ]
  });

  t.deepEqual(parse('price=0.99||price=1.99&&qty=20'), {
    "$and": [
      {"price": '0.99||price=1.99'},
      {"qty": 20}
    ]
  });
  t.deepEqual(parse('(price=0.99||price=1.99)&&qty=20'), {
    "$and": [
      {"$or": [{"price": 0.99}, {"price": 1.99}]},
      {"qty": 20}
    ]
  });
  t.deepEqual(parse('price=0.99||(price=1.99&&qty=20)'), {
    "$or": [
      {"price": 0.99},
      {"$and": [{"price": 1.99}, {"qty": 20}]}
    ]
  });

  t.deepEqual(parse('(price=0.99||price=1.99)&&(sale=true||qty<20)'), {
    "$and": [
      {"$or": [{"price": 0.99}, {"price": 1.99}]},
      {"$or": [{"sale": true}, {"qty": {"$lt": 20}}]}
    ]
  });

  t.deepEqual(parse('(price=0.99||price=1.99)&&((sale=true&&name=tomato)||qty<20)'), {
    "$and": [
      {"$or": [{"price": 0.99}, {"price": 1.99}]},
      {"$or": [
        {"$and": [
          {"[sale]": true},
          {"[name]": "tomato"}
        ]},
        {"qty": {"$lt": 20}}
      ]}
    ]
  });

  t.deepEqual(parse('(price=0.99||price=1.99)&&((sale=true&&name=tomato)||qty<20)', {depth: Infinity}), {
    "$and": [
      {"$or": [{"price": 0.99}, {"price": 1.99}]},
      {"$or": [
        {"$and": [
          {"sale": true},
          {"name": "tomato"}
        ]},
        {"qty": {"$lt": 20}}
      ]}
    ]
  });

  t.deepEqual(parse('price=0.99||price=1.99||price=2.99'), {
    "$or": [
      {"price": 0.99},
      {"price": 1.99},
      {"price": 2.99}
    ]
  });

  t.deepEqual(parse('price!0.99'), {
    "price": {
      "$not": 0.99
    }
  });
  t.deepEqual(parse('price=!0.99'), {
    "price": {
      "$not": 0.99
    }
  });

  t.deepEqual(parse('price=!<=0.99&&price!>=2.99'), {
    "$and": [
      {"price": {"$not": {"$lte": 0.99}}},
      {"price": {"$not": {"$gte": 2.99}}}
    ]
  });

  t.deepEqual(parse('price>=0.99&&price<=2.99'), {
    "$and": [
      {"price": {"$gte": 0.99}},
      {"price": {"$lte": 2.99}}
    ]
  });

  t.deepEqual(parse('price>=0.99^price<=2.99'), {
    "$nor": [
      {"price": {"$gte": 0.99}},
      {"price": {"$lte": 2.99}}
    ]
  });

  t.end();
});