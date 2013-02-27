mapbox.tileLayer = L.TileLayer.extend({

    initialize: function(_, options) {
        L.TileLayer.prototype.initialize.call(this, undefined, options);

        this._tilejson = {};
        this._url = '';

        if (options && options.detectRetina &&
            L.Browser.retina && options.retinaVersion) {
            _ = options.retinaVersion;
        }

        if (typeof _ === 'string') {
            mapbox.idUrl(_, this);
        } else if (_ && typeof _ === 'object') {
            this.tilejson(_);
        }
    },

    // # TileJSON
    setTileJSON: function(json) {
        L.extend(this.options, {
            tiles: json.tiles,
            attribution: json.attribution,
            legend: json.legend,
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

    tilejson: function(json) {
        if (!arguments.length) return this.getTileJSON();
        else return this.setTileJSON(json);
    },

    // # URL
    setUrl: function(_) {
        this._url = _;
        mapbox.request(this._url, L.bind(function(err, json) {
            if (err) return mapbox.log('could not load TileJSON at ' + url);
            this.tilejson(json);
        }, this));
        return this;
    },

    getUrl: function() {
        return this._url;
    },

    url: function(url) {
        if (!arguments.length) return this.getUrl();
        else return this.setUrl(url);
    },

    setId: function(id) {
        return this.tilejson({
            id: id,
            tiles: [
                'http://a.tiles.mapbox.com/v3/' + id + '/{z}/{x}/{y}.png',
                'http://b.tiles.mapbox.com/v3/' + id + '/{z}/{x}/{y}.png',
                'http://c.tiles.mapbox.com/v3/' + id + '/{z}/{x}/{y}.png',
                'http://d.tiles.mapbox.com/v3/' + id + '/{z}/{x}/{y}.png'
            ]
        });
    },

    getId: function() {
        return this._tilejson && this._tilejson.id;
    },

    id: function(id) {
        if (!arguments.length) return this.getId();
        else return this.setId(id);
    },

    getLegend: function() {
        return this.options.legend;
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
