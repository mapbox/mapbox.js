if (typeof mapbox === 'undefined') mapbox = {};

mapbox.MAPBOX_URL = 'http://a.tiles.mapbox.com/v3/';

// a `mapbox.map` is a modestmaps object with the
// easey handlers as defaults
mapbox.map = function(el, layer, dimensions, eventhandlers) {
    var m = new MM.Map(el, layer, dimensions,
            eventhandlers || [
            easey_handlers.TouchHandler(),
            easey_handlers.DragHandler(),
            easey_handlers.DoubleClickHandler(),
            easey_handlers.MouseWheelHandler()
        ]);

    // Set maxzoom to 17, highest zoom level supported by MapBox streets
    m.setZoomRange(0, 17);

    // Attach easey, ui, and interaction
    m.ease = easey().map(m);
    m.ui = mapbox.ui(m);
    m.interaction = mapbox.interaction().map(m);

    // Autoconfigure map with sensible defaults
    m.auto = function() {
        this.ui.zoomer.add();
        this.ui.zoombox.add();
        this.ui.legend.add();
        this.ui.attribution.add();
        this.ui.refresh();
        this.interaction.auto();

        for (var i = 0; i < this.layers.length; i++) {
            if (this.layers[i].tilejson) {
                var tj = this.layers[i].tilejson(),
                    center = tj.center || new MM.Location(0, 0),
                    zoom = tj.zoom || 0;
                this.setCenterZoom(center, zoom);
                break;
            }
        }
        return this;
    };

    m.refresh = function() {
        this.ui.refresh();
        this.interaction.refresh();
        return this;
    };

    var smooth_handlers = [
        easey_handlers.TouchHandler,
        easey_handlers.DragHandler,
        easey_handlers.DoubleClickHandler,
        easey_handlers.MouseWheelHandler
    ];

    var default_handlers = [
        MM.TouchHandler,
        MM.DragHandler,
        MM.DoubleClickHandler,
        MM.MouseWheelHandler
    ];

    MM.Map.prototype.smooth = function(_) {
        while (this.eventHandlers.length) {
            this.eventHandlers.pop().remove();
        }

        var handlers = _ ? smooth_handlers : default_handlers;
        for (var j = 0; j < handlers.length; j++) {
            var h = handlers[j]();
            this.eventHandlers.push(h);
            h.init(this);
        }
        return m;
    };

    m.setPanLimits = function(locations) {
        if (!(locations instanceof MM.Extent)) {
            locations = new MM.Extent(
                new MM.Location(
                    locations[0].lat,
                    locations[0].lon),
                new MM.Location(
                    locations[1].lat,
                    locations[1].lon));
        }
        locations = locations.toArray();
        this.coordLimits = [
            this.locationCoordinate(locations[0]).zoomTo(this.coordLimits[0].zoom),
            this.locationCoordinate(locations[1]).zoomTo(this.coordLimits[1].zoom)
        ];
        return m;
    };

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

    // Insert a tile layer below marker layers
    m.addTileLayer = function(layer) {
        for (var i = m.layers.length; i > 0; i--) {
            if (!m.layers[i - 1].features) {
                return this.insertLayerAt(i, layer);
            }
        }
        return this.insertLayerAt(0, layer);
    };

    // We need to redraw after removing due to compositing
    m.removeLayerAt = function(index) {
        MM.Map.prototype.removeLayerAt.call(this, index);
        MM.getFrame(this.getRedraw());
        return this;
    };

    // We need to redraw after removing due to compositing
    m.swapLayersAt = function(a, b) {
        MM.Map.prototype.swapLayersAt.call(this, a, b);
        MM.getFrame(this.getRedraw());
        return this;
    };

    return m;
};

this.mapbox = mapbox;
