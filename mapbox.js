// mapbox.js
var mapbox = {};

mapbox.load = function(url, callback) {
    wax.tilejson(url, function(tj) {
        var options = {};
        options.center = { lat: tj.center[1], lon: tj.center[0] };
        options.zoom = tj.center[2];
        options.layer = new wax.mm.connector(tj);
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

mapbox.markers = mmg;

mapbox.map = function(el, layer) {
    return new MM.Map(el, layer);
};
