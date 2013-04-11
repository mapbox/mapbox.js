'use strict';

var config = require('./config');

// Return the base url of a specific version of MapBox's API.
//
// `hash`, if provided must be a number and is used to distribute requests
// against multiple `CNAME`s in order to avoid connection limits in browsers
module.exports = {
    base: function(hash) {
        // By default, use public HTTP urls
        var urls = config.HTTP_URLS;

        // Support HTTPS if the user has specified HTTPS urls to use, and this
        // page is under HTTPS
        if ((window.location.protocol === 'https:' || config.FORCE_HTTPS) &&
            config.HTTPS_URLS.length) {
            urls = config.HTTPS_URLS;
        }

        if (hash === undefined || typeof hash !== 'number') {
            return urls[0];
        } else {
            return urls[hash % urls.length];
        }
    }, 
    httpsify: function(tilejson) {
        function httpUrls(urls) {
            var tiles_https = [];
            for (var i = 0; i < urls.length; i++) {
                var tile_url = urls[i];
                for (var j = 0; j < config.HTTP_URLS.length; j++) {
                    tile_url = tile_url.replace(config.HTTP_URLS[j],
                        config.HTTPS_URLS[j % config.HTTPS_URLS.length]);
                }
                tiles_https.push(tile_url);
            }
            return tiles_https;
        }
        if ((window.location.protocol === 'https:' || config.FORCE_HTTPS) &&
            config.HTTPS_URLS.length) {
            if (tilejson.tiles) tilejson.tiles = httpUrls(tilejson.tiles);
            if (tilejson.grids) tilejson.grids = httpUrls(tilejson.grids);
            if (tilejson.data) tilejson.data = httpUrls(tilejson.data);
        }
        return tilejson;
    },
    // Convert a JSONP url to a JSON URL. (MapBox TileJSON sometimes hardcodes JSONP.)
    jsonify: function(url) {
        return url.replace(/\.(geo)?jsonp(?=$|\?)/, '.$1json');
    }
};
