L.TileJSON = {
    load: function(url, callback) {
        reqwest({
            url: url,
            type: mapbox.browser.cors ? 'json' : 'jsonp',
            crossOrigin: mapbox.browser.cors,
            success: function(result) { callback(undefined, result); },
            error: function(error) { callback(error); }
        });
    }
};

L.TileJSON.TileLayer = L.TileLayer.extend({
    tilejson: function(json) {
        L.extend(this.options, {
            tiles: json.tiles,
            attribution: json.attribution,
            legend: json.legend,
            minZoom: json.minzoom,
            maxZoom: json.maxzoom,
            tms: json.scheme === 'tms'
        });
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

// A layer that loads its metadata from an endpoint that distributes TileJSON.
// From that endpoint it gets a center, zoom level, attribution, zoom
// extent, and more.
L.TileJSON.LayerGroup = L.LayerGroup.extend({

    _tilejson: {},

    initialize: function(_) {
        L.LayerGroup.prototype.initialize.call(this);

        this._tileLayer = new L.TileJSON.TileLayer();
        this.addLayer(this._tileLayer);

        this._dataLayer = new mapbox.marker.layer();
        this.addLayer(this._dataLayer);

        if (typeof _ === 'string') {
            // map id 'tmcw.foo'
            if (_.indexOf('/') == -1) this.id(_);
            // url 'http://foo.com/foo.bar'
            else this.url(_);
        // javascript object of TileJSON data
        } else if (typeof _ === 'object') {
            this.tilejson(_);
        }
    },

    // use a javascript object of tilejson data to configure this layer
    tilejson: function(_) {
        if (!arguments.length) return this._tilejson;
        this._initialize(_);
        return this;
    },

    // pull tilejson data from an endpoint
    url: function(url) {
        L.TileJSON.load(url, L.bind(function(err, json) {
            if (err) return mapbox.log('could not load TileJSON at ' + url);
            this._initialize(json);
        }, this));
        return this;
    },

    // pull tilejson data from an endpoint, given just by an id
    id: function(id) {
        return this.url(mapbox.base() + id + '.json');
    },

    _initialize: function(json) {

        var zoom = json.center[2],
            center = L.latLng(json.center[1], json.center[0]);

        this._tilejson = json;

        if (this._map) {
            this._map.setView(center, zoom);
        }

        this._tileLayer.tilejson(json);

        if (json.data && json.data[0]) {
            this._dataLayer.url(json.data[0]);
        }
    }
});

L.TileJSON.layerGroup = function(url) {
    return new L.TileJSON.LayerGroup(url);
};
