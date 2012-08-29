if (typeof mapbox === 'undefined') mapbox = {};

// Simplest way to create a map. Just provide an element id and
// a tilejson url (or an array of many) and an optional callback
// that takes one argument, the map.
mapbox.auto = function(elem, url, callback) {
    mapbox.load(url, function(tj) {

        var opts = tj instanceof Array ? tj : [tj];

        var tileLayers = [],
            markerLayers = [];
        for (var i = 0; i < opts.length; i++) {
            if (opts[i].layer) tileLayers.push(opts[i].layer);
            if (opts[i].markers) markerLayers.push(opts[i].markers);
        }

        var map = mapbox.map(elem, tileLayers.concat(markerLayers)).auto();
        if (callback) callback(map, tj);
    });
};


// mapbox.load pulls a [TileJSON](http://mapbox.com/wax/tilejson.html)
// object from a server and uses it to configure a map and various map-related
// objects
mapbox.load = function(url, callback) {

    // Support multiple urls
    if (url instanceof Array) {
        return mapbox.util.asyncMap(url, mapbox.load, callback);
    }

    // Support bare IDs as well as fully-formed URLs
    if (url.indexOf('http') !== 0) {
        url = mapbox.MAPBOX_URL + url + '.jsonp';
    }

    wax.tilejson(url, function(tj) {
        // Pull zoom level out of center
        tj.zoom = tj.center[2];

        // Instantiate center as a Modest Maps-compatible object
        tj.center = {
            lat: tj.center[1],
            lon: tj.center[0]
        };

        tj.thumbnail = mapbox.MAPBOX_URL + tj.id + '/thumb.png';

        // Instantiate tile layer
        tj.layer = mapbox.layer().tilejson(tj);

        // Instantiate markers layer
        if (tj.data) {
            tj.markers = mapbox.markers.layer();
            tj.markers.url(tj.data, function() {
                mapbox.markers.interaction(tj.markers);
                callback(tj);
            });
        } else {
            callback(tj);
        }
    });
};
