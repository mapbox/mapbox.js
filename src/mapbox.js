var mapbox = {};

mapbox.HTTP_URLS = [
    'http://a.tiles.mapbox.com/v3/',
    'http://b.tiles.mapbox.com/v3/',
    'http://c.tiles.mapbox.com/v3/',
    'http://d.tiles.mapbox.com/v3/'];

mapbox.HTTPS_URLS = [];

mapbox.idUrl = function(_, t) {
    if (_.indexOf('/') == -1) t.loadID(_);
    else t.loadURL(_);
};

mapbox.lbounds = function(_) {
    // leaflet-compatible bounds, since leaflet does not do geojson
    return new L.LatLngBounds([[_[1], _[0]], [_[3], _[2]]]);
};

// Return the base url of a specific version of MapBox's API.
//
// `hash`, if provided must be a number and is used to distribute requests
// against multiple `CNAME`s in order to avoid connection limits in browsers
mapbox.base = function(hash) {
    // By default, use public HTTP urls
    var urls = mapbox.HTTP_URLS;

    // Support HTTPS if the user has specified HTTPS urls to use, and this
    // page is under HTTPS
    if (window.location.protocol === 'https:' && mapbox.HTTPS_URLS.length) {
        urls = mapbox.HTTPS_URLS;
    }

    if (hash === undefined || typeof hash !== 'number') {
        return urls[0];
    } else {
        return urls[hash % urls.length];
    }
};

mapbox.browser = (function() {
    var browser = {};
    browser.cors = ("withCredentials" in new XMLHttpRequest());
    return browser;
})();

mapbox.log = function(_) {
    if (console && typeof console.error === 'function') {
        console.error(_);
    }
};

// http://stackoverflow.com/questions/9404793/check-if-same-origin-policy-applies
mapbox.isSameOrigin = function(url) {
    var loc = window.location,
        a = document.createElement('a');

    a.href = url;

    return a.hostname === loc.hostname &&
        a.port === loc.port &&
        a.protocol === loc.protocol;
};

// Request a resouce, with intelligent json/jsonp switching
mapbox.request = function(url, callback) {
    if (!url) return;
    if (!callback) return mapbox.log('mapbox.request requires a callback function');
    reqwest({
        url: url,
        type: (mapbox.browser.cors || mapbox.isSameOrigin(url)) ? 'json' : 'jsonp',
        crossOrigin: mapbox.browser.cors,
        success: function(result) { callback(undefined, result); },
        error: function(error) { callback(error, null); }
    });
};

// Request a resouce via jsonp
mapbox.requestp = function(url, callback) {
    if (!url) return;
    if (!callback) return mapbox.log('mapbox.requestp requires a callback function');
    reqwest({
        url: url,
        type: 'jsonp',
        success: function(result) { callback(undefined, result); },
        error: function(error) { callback(error, null); }
    });
};
