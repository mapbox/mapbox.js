if (typeof mapbox === 'undefined') mapbox = {};

// Utils
function getStyle(elem, name) {
    if (elem.style[name]) {
        return elem.style[name];
    } else if (elem.currentStyle) {
        return elem.currentStyle[name];
    }
    else if (document.defaultView && document.defaultView.getComputedStyle) {
        name = name.replace(/([A-Z])/g, '-$1');
        name = name.toLowerCase();
        s = document.defaultView.getComputedStyle(elem, '');
        return s && s.getPropertyValue(name);
    } else {
        return null;
    }
}


// mapbox.load pulls a [TileJSON](http://mapbox.com/wax/tilejson.html)
// object from a server and uses it to configure a map and various map-related
// objects
mapbox.load = function(url, callback) {
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

        tj.thumbnail = 'http://a.tiles.mapbox.com/v3/' + tj.id + '.png';

        // Instantiate tile layer
        if (tj.tiles) tj.layer = new wax.mm.connector(tj);

        // Calculate tile limits
        if (tj.tiles && tj.bounds) {
            var proj = new MM.MercatorProjection(0,
                MM.deriveTransformation(-Math.PI,  Math.PI, 0, 0,
                    Math.PI,  Math.PI, 1, 0,
                    -Math.PI, -Math.PI, 0, 1));
            tj.tileLimits = [
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

// Full auto mode. This can be supplied as the argument to mapbox.load
// in order to construct a map from a tilejson snippet.
mapbox.auto = function(el, callback) {
    return function(options) {
        var map = mapbox.map(el);
        map.controls = document.createElement('div');
        map.controls.style.cssText = 'position: absolute; z-index: 1000';
        map.controls.id = 'controls';
        map.parent.appendChild(map.controls);

        // Check the map parent for default properties.
        // if they aren't set then create some off the bat.
        var i, defaultProperties = ['height', 'width'];
        for (i in defaultProperties) {
            var prop = defaultProperties[i];
            if (getStyle(map.parent, prop) === '0px' || getStyle(map.parent, prop) === 'auto') {
                map.parent.style[prop] = '400px';
            }
        }
        if (options.layer) map.addLayer(options.layer);
        if (options.markers) map.addLayer(options.markers);
        if (options.attribution) wax.mm.attribution(map, options).appendTo(map.parent);
        if (options.legend) wax.mm.legend(map, options).appendTo(map.parent);
        wax.mm.zoomer(map).appendTo(map.controls);
        wax.mm.zoombox(map);
        map.zoom(options.zoom).center(options.center);
        wax.mm.interaction().map(map).tilejson(options).on(wax.tooltip().parent(map.parent).events());

        map.setZoomRange(options.minzoom, options.maxzoom);
        if (callback) callback(map, options);
    };
};
