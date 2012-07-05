// mapbox.js
var mapbox = {};

// mapbox.load pulls a [TileJSON](http://mapbox.com/wax/tilejson.html)
// object from a server and uses it to configure a map and various map-related
// objects
mapbox.load = function(url, callback) {
    wax.tilejson(url, function(tj) {
        var options = {};

        // Instantiate center as a Modest Maps-compatible object
        options.center = { lat: tj.center[1], lon: tj.center[0] };

        // Pull zoom level out of center
        options.zoom = tj.center[2];

        // Instantiate tile layer
        if (tj.tiles) {
            options.layer = new wax.mm.connector(tj);
        }

        // Instantiate markers layer
        if (tj.data) {
            options.markers = mmg().factory(simplestyle_factory);
            options.markers.url(tj.data, function() {
                mmg_interaction(options.markers);
                callback(options);
            });
        } else {
            callback(options);
        }
    });
};

mapbox.auto = function(el) {
    return function(options) {
        var map = mapbox.map(el);
        if (options.layer) map.addLayer(options.layer);
        if (options.markers) map.addLayer(options.markers);
        if (options.attribution) wax.mm.attribution(options.attribution);
        if (options.legend) wax.mm.legend(options.legend);
        wax.mm.zoomer(map).appendTo(map.parent);
        map.zoom(options.zoom)
            .center(options.center);
        wax.mm.interaction()
            .map(map)
            .on(wax.tooltip().parent(map.parent).events());
    };
};

mapbox.markers = mmg;

mapbox.map = function(el, layer) {
    return new MM.Map(el, layer);
};
