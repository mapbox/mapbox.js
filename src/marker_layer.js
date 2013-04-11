var util = require('./util');
var urlhelper = require('./url');
var request = require('./request');

// # markerLayer
//
// A layer of markers, loaded from MapBox or else. Adds the ability
// to reset markers, filter them, and load them from a GeoJSON URL.
var MarkerLayer = L.FeatureGroup.extend({
    options: {
        filter: function() { return true; }
    },

    initialize: function(_, options) {
        L.setOptions(this, options);

        this._layers = {};

        if (typeof _ === 'string') {
            util.idUrl(_, this);
        // javascript object of TileJSON data
        } else if (_ && typeof _ === 'object') {
            this.setGeoJSON(_);
        }
    },

    setGeoJSON: function(_, fn) {
        this._geojson = _;
        this._initialize(_, fn);
    },

    getGeoJSON: function() {
        return this._geojson;
    },

    loadURL: function(url, cb) {
        url = urlhelper.jsonify(url);
        request(url, L.bind(function(err, json) {
            if (err) return util.log('could not load markers at ' + url);
            else if (json) this.setGeoJSON(json);
            if (cb) cb.call(this, null, json);
            this.fire('ready', json);
        }, this));
        return this;
    },

    loadID: function(id, cb) {
        return this.loadURL(urlhelper.base() + id + '/markers.geojson', cb);
    },

    setFilter: function(_) {
        this.options.filter = _;
        if (this._geojson) {
            this.clearLayers();
            this._initialize(this._geojson);
        }
        return this;
    },

    getFilter: function() {
        return this.options.filter;
    },

    _initialize: function(json, fn) {
        var features = L.Util.isArray(json) ? json : json.features,
            i, len;

        if (features) {
            for (i = 0, len = features.length; i < len; i++) {
                // Only add this if geometry or geometries are set and not null
                if (features[i].geometries || features[i].geometry || features[i].features) {
                    this._initialize(features[i], fn);
                }
            }
        } else if (this.options.filter(json)) {

            var layer = L.GeoJSON.geometryToLayer(json, mapbox.marker.style);

            layer.feature = json;
            layer.bindPopup(json.properties.title, {
                closeButton: false
            });

            // If function is provided, run features against it
            if (fn) {
                fn(json, layer);
            }

            this.addLayer(layer);
        }
    }
});

module.exports = function(_, options) {
    return new MarkerLayer(_, options);
};
