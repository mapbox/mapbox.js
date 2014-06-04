'use strict';

var config = require('./config');

module.exports = function(path, accessToken) {
    var url = ('https:' === document.location.protocol || config.FORCE_HTTPS) ? config.HTTPS_URL : config.HTTP_URL;
    url += path;
    url += url.indexOf('?') !== -1 ? '&access_token=' : '?access_token=';
    url += accessToken || L.mapbox.accessToken;
    return url;
};

module.exports.tileJSON = function(urlOrMapID, accessToken) {
    if (urlOrMapID.indexOf('/') !== -1)
        return urlOrMapID;

    var url = module.exports('/' + urlOrMapID + '.json', accessToken);

    // TileJSON requests need a secure flag appended to their URLs so
    // that the server knows to send SSL-ified resource references.
    if (url.indexOf('https') === 0)
        url += '&secure';

    return url;
};
