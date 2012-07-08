;(function() {
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
            tj.center = {
                lat: tj.center[1],
                lon: tj.center[0]
            };

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

    // Full auto mode. This can be supplied as the argument to mapbox.load
    // in order to construct a map from a tilejson snippet.
    mapbox.auto = function(el, callback) {
        return function(options) {
            var map = mapbox.map(el);
            if (options.layer) map.addLayer(options.layer);
            if (options.markers) map.addLayer(options.markers);
            if (options.attribution) wax.mm.attribution(map, options).appendTo(map.parent);
            if (options.legend) wax.mm.legend(map, options).appendTo(map.parent);
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

    mapbox.markers = function() {
        var m = mmg().factory(simplestyle_factory);
        mmg_interaction(m);
        return m;
    }

    var smooth_handlers = [
        easey.TouchHandler,
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
                var def = default_handlers[k]();
                this.eventHandlers.push(def);
                def.init(this);
            }
        }
        return this;
    };

    MM.Map.prototype.on = function(evt, callback) {
        if (evt in this.callbackManager.callbacks) {
            this.addCallback(evt, callback);
        }
    };

    // a `mapbox.map` is a modestmaps object with the
    // easey handlers as defaults
    mapbox.map = function(el, layer) {
        return new MM.Map(el, layer, null, [
            easey.TouchHandler(),
            easey.DragHandler(),
            easey.DoubleClickHandler(),
            easey.MouseWheelHandler()]);
    };

    // mapbox.layer is a permissive layer type
    //
    // it tolerates x being
    //
    // * the 'id' of a mapbox tileset
    // * the url of a tilejson blob
    // * a tilejson object
    /*
    mapbox.layer = function(x) {
        // we have a tilejson object, just create a layer
        if (typeof x === 'object') {
            return wax.mm.connector(x);
        }

        // If this is not a string, we can't do anything useful
        // and can't give good errors.
        if (typeof x !== string) {
            throw 'mapbox.layer accepts a layer id, tilejson blob, or tilejson url';
        }

        // We have just an id, expand it into a full URL
        if (x.indexOf('http://') === -1) {
            return mapbox.layer().id(x);
        }

        // Okay, so now we have a URL. We return an eventual layer.
        return mapbox.layer().url(x);
    };
    */

    this.mapbox = mapbox;
})(this);
