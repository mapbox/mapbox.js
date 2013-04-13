'use strict';

var util = require('./util'),
    url = require('./url'),
    request = require('./request'),
    tileLayer = require('./tile_layer'),
    markerLayer = require('./marker_layer'),
    gridLayer = require('./grid_layer'),
    gridControl = require('./grid_control'),
    legendControl = require('./legend_control');

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
            this.tileLayer = tileLayer();
            this.addLayer(this.tileLayer);
        }

        if (this.options.markerLayer) {
            this.markerLayer = markerLayer();
            this.addLayer(this.markerLayer);
        }

        if (this.options.gridLayer) {
            this.gridLayer = gridLayer();
            this.addLayer(this.gridLayer);
        }

        if (this.options.gridLayer && this.options.gridControl) {
            this.gridControl = gridControl(this.gridLayer);
            this.addControl(this.gridControl);
        }

        if (this.options.legendControl) {
            this.legendControl = legendControl();
            this.addControl(this.legendControl);
        }

        if (typeof _ === 'string') {
            if (_.indexOf('/') == -1) this._loadID(_);
            else this._loadURL(_);
        // javascript object of TileJSON data
        } else if (_ && typeof _ === 'object') {
            this._setTileJSON(_);
        }
    },

    // use a javascript object of tilejson data to configure this layer
    _setTileJSON: function(_) {
        this._tilejson = _;
        this._initialize(_);
        return this;
    },

    getTileJSON: function() {
        return this._tilejson;
    },

    // pull tilejson data from an endpoint
    _loadURL: function(url) {
        request(url, L.bind(function(err, json) {
            if (err) {
                util.log('could not load TileJSON at ' + url);
                this.fire('error');
            } else if (json) {
                this._setTileJSON(json);
                this.fire('ready');
            }
        }, this));
        return this;
    },

    // pull tilejson data from an endpoint, given just by an id
    _loadID: function(id) {
        return this._loadURL(url.base() + id + '.json');
    },

    _initialize: function(json) {
        if (this.tileLayer) {
            this.tileLayer._setTileJSON(json);
        }

        if (this.markerLayer && json.data && json.data[0]) {
            this.markerLayer.loadURL(json.data[0]);
        }

        if (this.gridLayer) {
            this.gridLayer._setTileJSON(json);
        }

        if (this.gridControl && json.template) {
            this.gridControl.setTemplate(json.template);
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
