var corslite = require('corslite'),
    JSON3 = require('json3');

module.exports = function(url, callback) {
    function strict(_, type) {
        if (typeof _ !== type) {
            throw Error('Invalid argument: ' + type + ' expected');
        }
    }
    strict(url, 'string');
    strict(callback, 'function');
    corslite(url, function(err, resp) {
        if (!err && resp) resp = JSON3.parse(resp.responseText);
        callback(err, resp);
    }, true);
};
