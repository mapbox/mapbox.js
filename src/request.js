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
