var qs = require('qs');
var utils = require('./utils');

var logicalOperators = {
  '&&': '$and',
  '||': '$or',
  '^' : '$nor'
};

module.exports = function (querystring, options) {
  if (!querystring) return querystring;
  querystring = formatComparisonOperators(querystring);

  var pathReg;
  while (pathReg = querystring.match(/\(([^\(]+?)\)/)) {
    querystring = querystring.replace(pathReg[0], formatLogicalOperators(pathReg[1]));
  }

  querystring = formatLogicalOperators(querystring);
  querystring = formatCommaOperators(querystring);

  return utils.convertType(qs.parse(querystring, options));
};

function formatComparisonOperators(str) {
  str = str.replace(/(=?!)(?!=)/g, '[$not]=');//special

  str = str.replace(/=?>=/g, '[$gte]=');
  str = str.replace(/=?<=/g, '[$lte]=');
  str = str.replace(/=?(!=|<>)/g, '[$ne]=');
  str = str.replace(/=?>/g, '[$gt]=');
  str = str.replace(/=?</g, '[$lt]=');

  return str;
}

function formatLogicalOperators(str) {
  for (operator in logicalOperators) {
    if (~str.indexOf(operator)) {
      str = str.split(operator).map(function (item, index) {
        return item.split('&').map(function (item) {
          return logicalOperators[operator] + '[' + index + ']' + item.replace(/^([^\[=]+)/, '[$1]');
        }).join('&');
      }).join('&');
      break;
    }
  };
  return str;
}

function formatCommaOperators(str) {
  if (!str.match(/,/)) return str;
  return str.split('&').map(function (item) {
    return item.replace(/(.+)=((.+)(,(.+))+)/g, function (querystring, p1, p2) {
      return p2.split(',').map(function (item) {
        return p1 + '[$in]=' + item;
      }).join('&');
    });
  }).join('&');
}