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
            util.idUrl(_, this);
        // javascript object of TileJSON data
        } else if (_ && typeof _ === 'object') {
            this.setTileJSON(_);
        }
    },

    // Update certain properties on 'ready' event
    addLayer: function(layer) {
        layer.on('ready', L.bind(function() { this._updateLayer(layer); }, this));
        return L.Map.prototype.addLayer.call(this, layer);
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
            if (err) {
                util.log('could not load TileJSON at ' + url);
                if (cb) cb.call(this, err, json);
            } else if (json) {
                this.setTileJSON(json);
                if (cb) cb.call(this, err, json);
                this.fire('ready');
            }
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
            this._updateLayer(this.tileLayer);
        }

        if (this.markerLayer && json.data && json.data[0]) {
            this.markerLayer.loadURL(json.data[0]);
        }

        if (this.gridLayer) {
            this.gridLayer.setTileJSON(json);
            this._updateLayer(this.gridLayer);
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
        }
    },

    _updateLayer: function(layer) {

        if (!layer.options) return;

        if (this.attributionControl && this._loaded) {
            this.attributionControl.addAttribution(layer.options.attribution);
        }

        if (!(L.stamp(layer) in this._zoomBoundLayers) &&
                (layer.options.maxZoom || layer.options.minZoom)) {
            this._zoomBoundLayers[L.stamp(layer)] = layer;
        }

        this._updateZoomLevels();
    }
});

module.exports = function(element, _, options) {
    return new Map(element, _, options);
};
