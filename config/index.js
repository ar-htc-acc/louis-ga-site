function extend(target) {
    var sources = [].slice.call(arguments, 1);
    sources.forEach(function (source) {
        for (var prop in source) {
            target[prop] = source[prop];
        }
    });
    return target;
}

var defaultConfig = require('./default');
var envConfig = require('./' + (process.env.NODE_ENV || 'development') + '.js');

module.exports = extend({}, defaultConfig, envConfig);