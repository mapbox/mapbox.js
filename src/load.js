if (typeof mapbox === 'undefined') mapbox = {};

// Simplest way to create a map. Just provide an element id and
// a tilejson url (or an array of many) and an optional callback
// that takes one argument, the map.
mapbox.auto = function(elem, url, callback) {
    mapbox.load(url, function(opts) {

        if (!(opts instanceof Array)) opts = [opts];

        var tileLayers = [],
            markerLayers = [];
        for (var i = 0; i < opts.length; i++) {
            if (opts[i].layer) tileLayers.push(opts[i].layer);
            if (opts[i].markers) markerLayers.push(opts[i].markers);
        }

        var map = mapbox.map(elem, tileLayers.concat(markerLayers)).auto();
        callback(map, opts);
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
        url = 'http://a.tiles.mapbox.com/v3/' + url + '.jsonp';
    }

    wax.tilejson(url, function(tj) {
        // Pull zoom level out of center
        tj.zoom = tj.center[2];

        // Instantiate center as a Modest Maps-compatible object
        tj.center = {
            lat: tj.center[1],
            lon: tj.center[0]
        };

        tj.thumbnail = 'http://a.tiles.mapbox.com/v3/' + tj.id + '/thumb.png';

        // Instantiate tile layer
        tj.layer = mapbox.layer().tilejson(tj);

        // Set tile limits
        if (tj.bounds) {
            var proj = new MM.MercatorProjection(0,
                MM.deriveTransformation(
                    -Math.PI,  Math.PI, 0, 0,
                    Math.PI,  Math.PI, 1, 0,
                    -Math.PI, -Math.PI, 0, 1));

            tj.layer.provider.tileLimits = [
                proj.locationCoordinate(new MM.Location(tj.bounds[3], tj.bounds[0]))
                    .zoomTo(tj.minzoom ? tj.minzoom : 0),
                proj.locationCoordinate(new MM.Location(tj.bounds[1], tj.bounds[2]))
                    .zoomTo(tj.maxzoom ? tj.maxzoom : 18),
            ];
        }

        // Instantiate markers layer
        if (tj.data) {
            tj.markers = mmg().factory(mapbox.markers.simplestyle_factory);
            tj.markers.url(tj.data, function() {
                mmg_interaction(tj.markers);
                callback(tj);
            });
        } else {
            callback(tj);
        }
    });
};
