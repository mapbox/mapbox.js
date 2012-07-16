if (typeof mapbox === 'undefined') mapbox = {};

var smooth_handlers = [
easey.TouchHandler, easey.DragHandler, easey.DoubleClickHandler, easey.MouseWheelHandler];

var default_handlers = [MM.TouchHandler, MM.DragHandler, MM.DoubleClickHandler, MM.MouseWheelHandler];

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

// a `mapbox.map` is a modestmaps object with the
// easey handlers as defaults
mapbox.map = function(el, layer) {
    var m = new MM.Map(el, layer, null, [
            easey.TouchHandler(),
            easey.DragHandler(),
            easey.DoubleClickHandler(),
            easey.MouseWheelHandler()
        ]);

    // Attach easey
    m.ease = easey().map(m);

    // Attach UI
    m.ui = mapbox.ui().map(m);

    m.center = function(location, animate) {
        if (location && animate) {
            this.ease.location(location).zoom(this.zoom())
                .optimal(null, null, animate.callback);
        } else {
            return MM.Map.prototype.center.call(this, location);
        }
    };

    m.zoom = function(zoom, animate) {
        if (zoom !== undefined && animate) {
            this.ease.to(this.coordinate).zoom(zoom).run(600);
        } else {
            return MM.Map.prototype.zoom.call(this, zoom);
        }
    };

    m.centerzoom = function(location, zoom, animate) {
        if (location && zoom !== undefined && animate) {
            this.ease.location(location).zoom(zoom).optimal(null, null, animate.callback);
        } else if (location && zoom !== undefined) {
            return this.setCenterZoom(location, zoom);
        }
    };

    return m;
};

this.mapbox = mapbox;
