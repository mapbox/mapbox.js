if (typeof mapbox === 'undefined') mapbox = {};

mapbox.layer = function() {
    if (!(this instanceof mapbox.layer)) {
        return new mapbox.layer();
    }
    // instance variables
    this._tilejson = {};
    this._url = '';
    this._id = '';
    this._composite = true;

    this.name = '';
    this.parent = document.createElement('div');
    this.parent.style.cssText = 'position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; margin: 0; padding: 0; z-index: 0';
    this.levels = {};
    this.requestManager = new MM.RequestManager();
    this.requestManager.addCallback('requestcomplete', this.getTileComplete());
    this.requestManager.addCallback('requesterror', this.getTileError());
    this.setProvider(new wax.mm._provider({
        tiles: ['data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7']
    }));
};

mapbox.layer.prototype.refresh = function(callback) {
    var that = this;
    // When the async request for a TileJSON blob comes back,
    // this resets its own tilejson and calls setProvider on itself.
    wax.tilejson(this._url, function(o) {
        that.tilejson(o);
        if (callback) callback(that);
    });
    return this;
};

mapbox.layer.prototype.url = function(x, callback) {
    if (!arguments.length) return this._url;
    this._mapboxhosting = x.indexOf(mapbox.MAPBOX_URL) == 0;
    this._url = x;
    return this.refresh(callback);
};

mapbox.layer.prototype.id = function(x, callback) {
    if (!arguments.length) return this._id;
    this.named(x);
    this._id = x;
    return this.url(mapbox.MAPBOX_URL + x + '.jsonp', callback);
};

mapbox.layer.prototype.named = function(x) {
    if (!arguments.length) return this.name;
    this.name = x;
    return this;
};

mapbox.layer.prototype.tilejson = function(x) {
    if (!arguments.length) return this._tilejson;

    if (!this._composite || !this._mapboxhosting) this.setProvider(new wax.mm._provider(x));

    this._tilejson = x;

    this.name = this.name || x.id;
    this._id = this._id || x.id;

    if (x.bounds) {
        var proj = new MM.MercatorProjection(0,
            MM.deriveTransformation(
                -Math.PI,  Math.PI, 0, 0,
                Math.PI,  Math.PI, 1, 0,
                -Math.PI, -Math.PI, 0, 1));

        this.provider.tileLimits = [
            proj.locationCoordinate(new MM.Location(x.bounds[3], x.bounds[0]))
                .zoomTo(x.minzoom ? x.minzoom : 0),
            proj.locationCoordinate(new MM.Location(x.bounds[1], x.bounds[2]))
                .zoomTo(x.maxzoom ? x.maxzoom : 18)
        ];
    }

    return this;
};

mapbox.layer.prototype.draw = function() {
    if (!this.enabled || !this.map) return;

    if (this._composite && this._mapboxhosting) {

        // Get index of current layer
        var i = 0;
        for (i; i < this.map.layers.length; i++) {
            if (this.map.layers[i] == this) break;
        }

        // If layer is composited by layer below it, don't draw
        for (var j = i - 1; j >= 0; j--) {
            if (this.map.getLayerAt(j).enabled) {
                if (this.map.getLayerAt(j)._composite) {
                    this.parent.style.display = 'none';
                    this.compositeLayer = false;
                    return this;
                }
                else break;
            }
        }

        // Get map IDs for all consecutive composited layers
        var ids = [];
        for (var k = i; k < this.map.layers.length; k++) {
            var l = this.map.getLayerAt(k);
            if (l.enabled) {
                if (l._composite && l._mapboxhosting) ids.push(l.id());
                else break;
            }
        }
        ids = ids.join(',');

        if (this.compositeLayer !== ids) {
            this.compositeLayer = ids;
            var that = this;
            wax.tilejson(mapbox.MAPBOX_URL + ids + '.jsonp', function(tiledata) {
                that.setProvider(new wax.mm._provider(tiledata));
                // setProvider calls .draw()
            });
            this.parent.style.display = '';
            return this;
        }

    } else {
        this.parent.style.display = '';
        // Set back to regular provider
        if (this.compositeLayer) {
            this.compositeLayer = false;
            this.setProvider(new wax.mm._provider(this.tilejson()));
            // .draw() called by .tilejson()
        }
    }

    return MM.Layer.prototype.draw.call(this);
};

mapbox.layer.prototype.composite = function(x) {
    if (!arguments.length) return this._composite;
    if (x) this._composite = true;
    else this._composite = false;
    return this;
};

// we need to redraw map due to compositing
mapbox.layer.prototype.enable = function(x) {
    MM.Layer.prototype.enable.call(this, x);
    if (this.map) this.map.draw();
    return this;
};

// we need to redraw map due to compositing
mapbox.layer.prototype.disable = function(x) {
    MM.Layer.prototype.disable.call(this, x);
    if (this.map) this.map.draw();
    return this;
};

MM.extend(mapbox.layer, MM.Layer);
