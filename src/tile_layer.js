mapbox.tileLayer = L.TileLayer.extend({

    initialize: function(_, options) {
        L.TileLayer.prototype.initialize.call(this, undefined, options);

        this._tilejson = {};

        if (options && options.detectRetina &&
            L.Browser.retina && options.retinaVersion) {
            _ = options.retinaVersion;
        }

        if (typeof _ === 'string') {
            mapbox.idUrl(_, this);
        } else if (_ && typeof _ === 'object') {
            this.setTileJSON(_);
        }
    },

    setTileJSON: function(json) {
        L.extend(this.options, {
            tiles: json.tiles,
            attribution: json.attribution,
            minZoom: json.minzoom,
            maxZoom: json.maxzoom,
            tms: json.scheme === 'tms',
            bounds: json.bounds && mapbox.lbounds(json.bounds)
        });

        this._tilejson = json;
        this.redraw();
        return this;
    },

    getTileJSON: function() {
        return this._tilejson;
    },

    loadURL: function(url, cb) {
        mapbox.request(url, L.bind(function(err, json) {
            if (err) mapbox.log('could not load TileJSON at ' + url);
            else if (json) this.setTileJSON(json);
            if (cb) cb.call(this, err, json);
        }, this));
        return this;
    },

    loadID: function(id, cb) {
        return this.loadURL(mapbox.base() + id + '.json', cb);
    },

    getTileUrl: function(tilePoint) {
        var tiles = this.options.tiles,
            index = (tilePoint.x + tilePoint.y) % tiles.length,
            url = tiles[index];

        return L.Util.template(url, tilePoint);
    },

    // TileJSON.TileLayers are added to the map immediately, so that they get
    // the desired z-index, but do not update until the TileJSON has been loaded.
    _update: function() {
        if (this.options.tiles) {
            L.TileLayer.prototype._update.call(this);
        }
    }
});
