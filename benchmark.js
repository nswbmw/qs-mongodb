var qs = require('./');

var count = 100000;

console.time('100000 times');
while (count--) {
  qs.parse('(price=0.99||price=1.99)&&(sale="true"||qty<20)');
}
console.timeEnd('100000 times');