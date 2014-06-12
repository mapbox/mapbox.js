'use strict';

var corslite = require('corslite'),
    strict = require('./util').strict;

module.exports = function(url, callback) {
    strict(url, 'string');
    strict(callback, 'function');
    return corslite(url, onload);
    function onload(err, resp) {
        if (!err && resp) {
            // hardcoded grid response
            if (resp.responseText[0] == 'g') {
                resp = JSON.parse(resp.responseText
                    .substring(5, resp.responseText.length - 2));
            } else {
                resp = JSON.parse(resp.responseText);
            }
        }
        callback(err, resp);
    }
};
