'use strict';

var util = require('./util'),
    url = require('./url'),
    request = require('./request');

var Map = L.Map.extend({
    options: {
        tileLayer: true,
        markerLayer: true,
        gridLayer: true,
        legendControl: true,
        gridControl: true
    },

    _tilejson: {},

    initialize: function(element, _, options) {
        L.Map.prototype.initialize.call(this, element, options);

        // disable the default 'Powered by Leaflet' text
        if (this.attributionControl) this.attributionControl.setPrefix('');

        if (this.options.tileLayer) {
            this.tileLayer = mapbox.tileLayer();
            this.addLayer(this.tileLayer);
        }

        if (this.options.markerLayer) {
            this.markerLayer = mapbox.markerLayer();
            this.addLayer(this.markerLayer);
        }

        if (this.options.gridLayer) {
            this.gridLayer = mapbox.gridLayer();
            this.addLayer(this.gridLayer);
        }

        if (this.options.gridLayer && this.options.gridControl) {
            this.gridControl = mapbox.gridControl(this.gridLayer);
            this.addControl(this.gridControl);
        }

        if (this.options.legendControl) {
            this.legendControl = mapbox.legendControl();
            this.addControl(this.legendControl);
        }

        if (typeof _ === 'string') {
            util.idUrl(_, this);
        // javascript object of TileJSON data
        } else if (_ && typeof _ === 'object') {
            this.setTileJSON(_);
        }
    },

    // use a javascript object of tilejson data to configure this layer
    setTileJSON: function(_) {
        this._tilejson = _;
        this._initialize(_);
        return this;
    },

    getTileJSON: function() {
        return this._tilejson;
    },

    // pull tilejson data from an endpoint
    loadURL: function(url, cb) {
        request(url, L.bind(function(err, json) {
            if (err) util.log('could not load TileJSON at ' + url);
            else if (json) this.setTileJSON(json);
            if (cb) cb.call(this, err, json);
        }, this));
        return this;
    },

    // pull tilejson data from an endpoint, given just by an id
    loadID: function(id, cb) {
        return this.loadURL(url.base() + id + '.json', cb);
    },

    _initialize: function(json) {
        if (this.tileLayer) {
            this.tileLayer.setTileJSON(json);
        }

        if (this.markerLayer && json.data && json.data[0]) {
            this.markerLayer.loadURL(json.data[0]);
        }

        if (this.gridLayer) {
            this.gridLayer.setTileJSON(json);
        }

        if (this.legendControl && json.legend) {
            this.legendControl.addLegend(json.legend);
        }

        if (!this._loaded) {
            var zoom = json.center[2],
                center = L.latLng(json.center[1], json.center[0]);

            this.setView(center, zoom);
        } else if (this.attributionControl) {
            this.attributionControl.addAttribution(json.attribution);
        }
    }
});

module.exports = function(element, _, options) {
    return new Map(element, _, options);
};
