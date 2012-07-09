function mmg() {

    var m = {},
        // external list of geojson features
        features = [],
        // internal list of markers
        markers = [],
        // internal list of callbacks
        callbackManager = new MM.CallbackManager(m, ['drawn', 'markeradded']),
        // the absolute position of the parent element
        position = null,
        // a factory function for creating DOM elements out of
        // GeoJSON objects
        factory = null,
        // a sorter function for sorting GeoJSON objects
        // in the DOM
        sorter = null,
        // a list of urls from which features can be loaded.
        // these can be templated with {z}, {x}, and {y}
        urls,
        // map bounds
        left = null,
        right = null,
        // a function that filters points
        filter = null;

    // The parent DOM element
    m.parent = document.createElement('div');
    m.parent.style.cssText = 'position: absolute; top: 0px;' +
        'left:0px; width:100%; height:100%; margin:0; padding:0; z-index:0';

    // reposition a single marker element
    function reposition(marker) {
        // remember the tile coordinate so we don't have to reproject every time
        if (!marker.coord) marker.coord = m.map.locationCoordinate(marker.location);
        var pos = m.map.coordinatePoint(marker.coord);
        var pos_loc;

        // If this point has wound around the world, adjust its position
        // to the new, onscreen location
        if (pos.x < 0) {
            pos_loc = new MM.Location(marker.location.lat, marker.location.lon);
            pos_loc.lon += Math.ceil((left.lon - marker.location.lon) / 360) * 360;
            pos = m.map.locationPoint(pos_loc);
            marker.coord = m.map.locationCoordinate(pos_loc);
        } else if (pos.x > m.map.dimensions.x) {
            pos_loc = new MM.Location(marker.location.lat, marker.location.lon);
            pos_loc.lon -= Math.ceil((marker.location.lon - right.lon) / 360) * 360;
            pos = m.map.locationPoint(pos_loc);
            marker.coord = m.map.locationCoordinate(pos_loc);
        }

        pos.scale = 1;
        pos.width = pos.height = 0;
        MM.moveElement(marker.element, pos);
    }

    // Adding and removing callbacks is mainly a way to enable mmg_interaction to operate.
    // I think there are better ways to do this, by, for instance, having mmg be able to
    // register 'binders' to markers, but this is backwards-compatible and equivalent
    // externally.
    m.addCallback = function(event, callback) {
        callbackManager.addCallback(event, callback);
        return m;
    };

    m.removeCallback = function(event, callback) {
        callbackManager.removeCallback(event, callback);
        return m;
    };

    // Draw this layer - reposition all markers on the div. This requires
    // the markers library to be attached to a map, and will noop otherwise.
    m.draw = function() {
        if (!m.map) return;
        left = m.map.pointLocation(new MM.Point(0, 0));
        right = m.map.pointLocation(new MM.Point(m.map.dimensions.x, 0));
        callbackManager.dispatchCallback('drawn', m);
        for (var i = 0; i < markers.length; i++) {
            reposition(markers[i]);
        }
    };

    // Add a fully-formed marker to the layer. This fires a `markeradded` event.
    // This does not require the map element t be attached.
    m.add = function(marker) {
        if (!marker || !marker.element) return null;
        m.parent.appendChild(marker.element);
        markers.push(marker);
        callbackManager.dispatchCallback('markeradded', marker);
        return marker;
    };

    // Remove a fully-formed marker - which must be the same exact marker
    // object as in the markers array - from the layer.
    m.remove = function(marker) {
        if (!marker) return null;
        m.parent.removeChild(marker.element);
        for (var i = 0; i < markers.length; i++) {
            if (markers[i] === marker) {
                markers.splice(i, 1);
                return marker;
            }
        }
        return marker;
    };

    m.markers = function(x) {
        if (!arguments.length) return markers;
    };

    // Add a GeoJSON feature to the markers layer.
    m.add_feature = function(x) {
        return m.features(m.features().concat([x]));
    };

    // Public data interface
    m.features = function(x) {
        // Return features
        if (!arguments.length) return features;

        // Clear features
        while (m.parent.hasChildNodes()) {
            // removing lastChild iteratively is faster than
            // innerHTML = ''
            // http://jsperf.com/innerhtml-vs-removechild-yo/2
            m.parent.removeChild(m.parent.lastChild);
        }

        // clear markers representation
        markers = [];
        // Set features
        if (!x) x = [];
        features = x.slice();

        features.sort(sorter);

        for (var i = 0; i < features.length; i++) {
            if (filter(features[i])) {
                m.add({
                    element: factory(features[i]),
                    location: new MM.Location(
                        features[i].geometry.coordinates[1],
                        features[i].geometry.coordinates[0]),
                    data: features[i]
                });
            }
        }

        if (m.map && m.map.coordinate) m.map.draw();

        return m;
    };

    // Request features from a URL - either a local URL or a JSONP call.
    // Expects GeoJSON-formatted features.
    m.url = function(x, callback) {
        if (!arguments.length) return urls;
        if (typeof reqwest === 'undefined') throw 'reqwest is required for url loading';
        if (typeof x === 'string') x = [x];

        urls = x;
        function add_features(x) {
            if (x && x.features) m.features(x.features);
            if (callback) callback(x.features, m);
        }

        reqwest((urls[0].match(/geojsonp$/)) ? {
            url: urls[0] + (~urls[0].indexOf('?') ? '&' : '?') + 'callback=grid',
            type: 'jsonp',
            jsonpCallback: 'callback',
            success: add_features,
            error: add_features
        } : {
            url: urls[0],
            type: 'json',
            success: add_features,
            error: add_features
        });
        return m;
    };

    m.extent = function() {
        var ext = [{
            lat: Infinity,
            lon: Infinity
        }, {
            lat: -Infinity,
            lon: -Infinity
        }];
        var ft = m.features();
        for (var i = 0; i < ft.length; i++) {
            var coords = ft[i].geometry.coordinates;
            if (coords[0] < ext[0].lon) ext[0].lon = coords[0];
            if (coords[1] < ext[0].lat) ext[0].lat = coords[1];
            if (coords[0] > ext[1].lon) ext[1].lon = coords[0];
            if (coords[1] > ext[1].lat) ext[1].lat = coords[1];
        }
        return ext;
    };

    // Factory interface
    m.factory = function(x) {
        if (!arguments.length) return factory;
        factory = x;
        // re-render all features
        m.features(m.features());
        return m;
    };
    m.factory(function defaultFactory(feature) {
        var d = document.createElement('div');
        d.className = 'mmg-default';
        d.style.position = 'absolute';
        return d;
    });

    m.sort = function(x) {
        if (!arguments.length) return sorter;
        sorter = x;
        return m;
    };
    m.sort(function(a, b) {
        return b.geometry.coordinates[1] -
          a.geometry.coordinates[1];
    });

    m.filter = function(x) {
        if (!arguments.length) return filter;
        filter = x;
        // Setting a filter re-sets the features into a new array.
        // This does _not_ change the actual output of .features()
        m.features(m.features());
        return m;
    };
    m.filter(function() {
        return true;
    });

    m.destroy = function() {
        if (m.parent.parentNode) {
            m.parent.parentNode.removeChild(m.parent);
        }
    };

    return m;
}
