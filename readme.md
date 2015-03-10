## qs-mongodb

Parse URL querystring to MongoDB query.

### Install

    npm i qs-mongodb --save

### Usage

```
qs.parse(string, [options]);

```
see [options](https://www.npmjs.com/package/qs#parsing-objects).

### Documentation

```
var qs = require('qs-mongodb');
```

#### =

```
qs.parse('age=25')

{
  "age": 25
}
```

```
qs.parse('age="25"')

{
  "age": "25"
}
```

```
qs.parse('age=25abc')

{
  "age": "25abc"
}
```

```
qs.parse('sale=true')

{
  "sale": true
}
```

```
qs.parse('sale="true"')

{
  "sale": "true"
}
```

```
qs.parse('age[$type]=-1')

{
  "age": {
    "$type": -1
  }
}
```

#### >=

```
qs.parse('price=>=0.99')

{
  "price": {
    "$gte": 0.99
  }
}
```

```
qs.parse('price>=0.99')

{
  "price": {
    "$gte": 0.99
  }
}
```

```
qs.parse('price=0.99&qty>=20')

{
  "price": 0.99,
  "qty": {"$gte": 20}
}
```

#### <=

```
qs.parse('price=<=2.99')

{
  "price": {
    "$lte": 2.99
  }
}
```

```
qs.parse('price<=2.99')

{
  "price": {
    "$lte": 2.99
  }
}
```

#### != or <>

```
qs.parse('price=!=1.99')

{
  "price": {
    "$ne": 1.99
  }
}
```

```
qs.parse('price!=1.99')

{
  "price": {
    "$ne": 1.99
  }
}
```

```
qs.parse('price=<>1.99')

{
  "price": {
    "$ne": 1.99
  }
}
```

```
qs.parse('price<>1.99')

{
  "price": {
    "$ne": 1.99
  }
}
```

#### >

```
qs.parse('price=>0.99')

{
  "price": {
    "$gt": 0.99
  }
}
```

```
qs.parse('price>0.99')

{
  "price": {
    "$gt": 0.99
  }
}
```

#### <

```
qs.parse('price=<2.99')

{
  "price": {
    "$lt": 2.99
  }
}
```

```
qs.parse('price<2.99')

{
  "price": {
    "$lt": 2.99
  }
}
```

#### ,

```
qs.parse('price=0.99,1.99,2.99')

{
  "price": {
    "$in": [0.99, 1.99, 2.99]
  }
}
```

```
qs.parse('price=0.99,1.99,"2.99"')

{
  "price": {
    "$in":[0.99, 1.99, "2.99"]
  }
}
```

```
qs.parse('price=-0.99,1.99abc,"2.99"')

{
  "price": {
    "$in":[-0.99, "1.99abc", "2.99"]
  }
}
```

#### !

```
qs.parse('price!0.99')

{
  "price": {
    "$not": 0.99
  }
}
```

```
qs.parse('price=!0.99')

{
  "price": {
    "$not": 0.99
  }
}
```

#### ||

```
qs.parse('price=0.99||price=1.99')

{
  "$or": [
    {"price": 0.99},
    {"price": 1.99}
  ]
}
```

```
qs.parse('price=0.99||price=1.99||price=2.99');

{
  "$or": [
    {"price": 0.99},
    {"price": 1.99},
    {"price": 2.99}
  ]
}
```

#### &&

```
qs.parse('price=0.99&&qty<20')

{
  "$and": [
    {"price": 0.99},
    {"qty": {"$lt": 20}}
  ]
}
```

#### ^

```
qs.parse('price>=0.99^price<=2.99')

{
  "$nor": [
    {"price": {"$gte": 0.99}},
    {"price": {"$lte": 2.99}}
  ]
}
```

#### ()

`()` have the highest priority when parse querystring.

```
qs.parse('price=0.99||price=1.99&&qty=20')

{
  "$and": [
    {"price": '0.99||price=1.99'},
    {"qty": 20}
  ]
}
```

```
qs.parse('(price=0.99||price=1.99)&&qty=20')

{
  "$and": [
    {"$or": [{"price": 0.99}, {"price": 1.99}]},
    {"qty": 20}
  ]
}
```

```
qs.parse('price=0.99||(price=1.99&&qty=20)')

{
  "$or": [
    {"price": 0.99},
    {"$and": [{"price": 1.99}, {"qty": 20}]}
  ]
}
```

```
qs.parse('(price=0.99||price=1.99)&&(sale=true||qty<20)')

{
  "$and": [
    {"$or": [{"price": 0.99}, {"price": 1.99}]},
    {"$or": [{"sale": true}, {"qty": {"$lt": 20}}]}
  ]
}
```

```
qs.parse('(price=0.99||price=1.99)&&((sale=true&&name=tomato)||qty<20)')

{
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
}

```

```
qs.parse('(price=0.99||price=1.99)&&((sale=true&&name=tomato)||qty<20)', {depth: Infinity})

{
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
}

```

More examples see [test]('https://github.com/nswbmw/qs-mongodb/test/').

### Test

    npm test

### License

MIT