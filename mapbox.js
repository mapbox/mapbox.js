// mapbox.js
var mapbox = {};

// mapbox.load pulls a [TileJSON](http://mapbox.com/wax/tilejson.html)
// object from a server and uses it to configure a map and various map-related
// objects
mapbox.load = function(url, callback) {
    wax.tilejson(url, function(tj) {
        // Pull zoom level out of center
        tj.zoom = tj.center[2];

        // Instantiate center as a Modest Maps-compatible object
        tj.center = { lat: tj.center[1], lon: tj.center[0] };

        // Instantiate tile layer
        if (tj.tiles) tj.layer = new wax.mm.connector(tj);

        // Instantiate markers layer
        if (tj.data) {
            tj.markers = mmg().factory(simplestyle_factory);
            tj.markers.url(tj.data, function() {
                mmg_interaction(tj.markers);
                callback(tj);
            });
        } else {
            callback(tj);
        }
    });
};

mapbox.auto = function(el, callback) {
    return function(options) {
        var map = mapbox.map(el);
        if (options.layer) map.addLayer(options.layer);
        if (options.markers) map.addLayer(options.markers);
        if (options.attribution) wax.mm.attribution(options.attribution);
        if (options.legend) wax.mm.legend(options.legend);
        wax.mm.zoomer(map).appendTo(map.parent);
        wax.mm.zoombox(map);
        map.zoom(options.zoom)
            .center(options.center);
        wax.mm.interaction()
            .map(map)
            .tilejson(options)
            .on(wax.tooltip().parent(map.parent).events());
        if (callback) callback(map);
    };
};

mapbox.markers = mmg;

var smooth_handlers = [easey.TouchHandler,
    easey.DragHandler,
    easey.DoubleClickHandler,
    easey.MouseWheelHandler];

var default_handlers = [MM.TouchHandler,
    MM.DragHandler,
    MM.DoubleClickHandler,
    MM.MouseWheelHandler];

MM.Map.prototype.smooth = function(_) {
    while (this.eventHandlers.length) {
        this.eventHandlers.pop().remove();
    }
    if (_) {
        for (var j = 0; j < smooth_handlers.length; j++) {
            var h = smooth_handlers[j]();
            this.eventHandlers.push(h);
            h.init(this);
        }
    } else {
        for (var k = 0; k < default_handlers.length; k++) {
            var h = default_handlers[k]();
            this.eventHandlers.push(h);
            h.init(this);
        }
    }
    console.log(this.eventHandlers);
};

mapbox.map = function(el, layer) {
    return new MM.Map(el, layer, null, [easey.TouchHandler(),
        easey.DragHandler(),
        easey.DoubleClickHandler(),
        easey.MouseWheelHandler()]);
};
