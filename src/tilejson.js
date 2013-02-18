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

// A layer that loads its metadata from an endpoint that distributes TileJSON.
// From that endpoint it gets a center, zoom level, attribution, zoom
// extent, and more.
L.TileJSON.Layer = L.LayerGroup.extend({

    _tilejson: {},

    initialize: function(_) {
        L.LayerGroup.prototype.initialize.call(this);

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
        var that = this;
        L.TileJSON.load(url, function(json) {
            that._initialize(json);
        });
        return this;
    },

    // pull tilejson data from an endpoint, given just by an id
    id: function(id) {
        return this.url(mapbox.base() + id + '.json');
    },

    _initialize: function(json) {

        this._tilejson = json;

        var that = this,
            zoom = json.center[2],
            center = L.latLng(json.center[1], json.center[0]);

        if (this._map) {
            this._map.setView(center, zoom);
        }

        var tileLayer = new L.TileLayer(undefined, {
            attribution: json.attribution,
            legend: json.legend,
            minZoom: json.minzoom,
            maxZoom: json.maxzoom,
            tms: json.scheme === 'tms'
        });

        tileLayer.getLegend = function() {
			return this.options.legend;
		};

        tileLayer.getTileUrl = function(tilePoint) {
            var index = (tilePoint.x + tilePoint.y) % json.tiles.length,
                url = json.tiles[index];

            return L.Util.template(url, tilePoint);
        };

        this.addLayer(tileLayer);

        if (json.data) {
            for (var i = 0; i < json.data.length; i++) {
                var url = json.data[i].replace(/\.(geo)?jsonp(?=$|\?)/, '.$1json');
                L.TileJSON.load(url, function(data) {
                    that.addLayer(L.geoJson(data, {
                        pointToLayer: mapbox.markers.style,
                        onEachFeature: function(feature, layer) {
                            layer.bindPopup(feature.properties.title);
                        }
                    }));
                });
            }
        }
    }
});

L.TileJSON.layer = function(url) {
    return new L.TileJSON.Layer(url);
};
