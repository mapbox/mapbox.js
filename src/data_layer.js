mapbox.dataLayer = L.FeatureGroup.extend({
    options: {
        filter: function() { return true; }
    },

    initialize: function(_, options) {
        L.setOptions(this, options);

        this._layers = {};

        if (typeof _ === 'string') {
            mapbox.idUrl(_, this);
        // javascript object of TileJSON data
        } else if (_ && typeof _ === 'object') {
            this.geojson(_);
        }
    },

    geojson: function(_) {
        if (!arguments.length) return this._geojson;
        this._geojson = _;
        this._initialize(_);
        return this;
    },

    url: function(url) {
        url = url.replace(/\.(geo)?jsonp(?=$|\?)/, '.$1json');
        mapbox.request(url, L.bind(function(err, json) {
            if (err) return mapbox.log('could not load markers at ' + url);
            this.geojson(json);
        }, this));
        return this;
    },

    id: function(id) {
        return this.url(mapbox.base() + id + '/markers.geojson');
    },

    filter: function(_) {
        if (!arguments.length) return this.options.filter;
        this.options.filter = _;
        if (this._geojson) {
            this.clearLayers();
            this._initialize(this._geojson);
        }
        return this;
    },

    _initialize: function(json) {
        var features = L.Util.isArray(json) ? json : json.features,
            i, len;

        if (features) {
            for (i = 0, len = features.length; i < len; i++) {
                // Only add this if geometry or geometries are set and not null
                if (features[i].geometries || features[i].geometry || features[i].features) {
                    this._initialize(features[i]);
                }
            }
        } else if (this.options.filter(json)) {
            var layer = L.GeoJSON.geometryToLayer(json, mapbox.marker.style);

            layer.feature = json;
            layer.bindPopup(json.properties.title);

            this.addLayer(layer);
        }
    }
});
