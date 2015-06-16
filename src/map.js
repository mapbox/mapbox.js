'use strict';

var tileLayer = require('./tile_layer').tileLayer,
    featureLayer = require('./feature_layer').featureLayer,
    gridLayer = require('./grid_layer').gridLayer,
    gridControl = require('./grid_control').gridControl,
    infoControl = require('./info_control').infoControl,
    shareControl = require('./share_control').shareControl,
    legendControl = require('./legend_control').legendControl,
    mapboxLogoControl = require('./mapbox_logo').mapboxLogoControl,
    feedback = require('./feedback');

function withAccessToken(options, accessToken) {
    if (!accessToken || options.accessToken)
        return options;
    return L.extend({accessToken: accessToken}, options);
}

var LMap = L.Map.extend({
    includes: [require('./load_tilejson')],

    options: {
        tileLayer: {},
        featureLayer: {},
        gridLayer: {},
        legendControl: {},
        gridControl: {},
        infoControl: false,
        shareControl: false,
        sanitizer: require('sanitize-caja')
    },

    _tilejson: {},

    initialize: function(element, _, options) {

        L.Map.prototype.initialize.call(this, element,
            L.extend({}, L.Map.prototype.options, options));

        // Disable the default 'Leaflet' text
        if (this.attributionControl) {
            this.attributionControl.setPrefix('');

            var compact = this.options.attributionControl.compact;
            // Set a compact display if map container width is < 640 or
            // compact is set to `true` in attributionControl options.
            if (compact || (compact !== false && this._container.offsetWidth <= 640)) {
                L.DomUtil.addClass(this.attributionControl._container, 'leaflet-compact-attribution');
            }

            if (compact === undefined) {
                this.on('resize', function() {
                    if (this._container.offsetWidth > 640) {
                        L.DomUtil.removeClass(this.attributionControl._container, 'leaflet-compact-attribution');
                    } else {
                        L.DomUtil.addClass(this.attributionControl._container, 'leaflet-compact-attribution');
                    }
                });
            }
        }

        if (this.options.tileLayer) {
            this.tileLayer = tileLayer(undefined,
                withAccessToken(this.options.tileLayer, this.options.accessToken));
            this.addLayer(this.tileLayer);
        }

        if (this.options.featureLayer) {
            this.featureLayer = featureLayer(undefined,
                withAccessToken(this.options.featureLayer, this.options.accessToken));
            this.addLayer(this.featureLayer);
        }

        if (this.options.gridLayer) {
            this.gridLayer = gridLayer(undefined,
                withAccessToken(this.options.gridLayer, this.options.accessToken));
            this.addLayer(this.gridLayer);
        }

        if (this.options.gridLayer && this.options.gridControl) {
            this.gridControl = gridControl(this.gridLayer, this.options.gridControl);
            this.addControl(this.gridControl);
        }

        if (this.options.infoControl) {
            this.infoControl = infoControl(this.options.infoControl);
            this.addControl(this.infoControl);
        }

        if (this.options.legendControl) {
            this.legendControl = legendControl(this.options.legendControl);
            this.addControl(this.legendControl);
        }

        if (this.options.shareControl) {
            this.shareControl = shareControl(undefined,
                withAccessToken(this.options.shareControl, this.options.accessToken));
            this.addControl(this.shareControl);
        }

        this._mapboxLogoControl = mapboxLogoControl(this.options.mapboxLogoControl);
        this.addControl(this._mapboxLogoControl);

        this._loadTileJSON(_);

        this.on('layeradd', this._onLayerAdd, this)
            .on('layerremove', this._onLayerRemove, this)
            .on('moveend', this._updateMapFeedbackLink, this);

        this.whenReady(function () {
            feedback.on('change', this._updateMapFeedbackLink, this);
        });

        this.on('unload', function () {
            feedback.off('change', this._updateMapFeedbackLink, this);
        });
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

    _initialize: function(json) {
        if (this.tileLayer) {
            this.tileLayer._setTileJSON(json);
            this._updateLayer(this.tileLayer);
        }

        if (this.featureLayer && !this.featureLayer.getGeoJSON() && json.data && json.data[0]) {
            this.featureLayer.loadURL(json.data[0]);
        }

        if (this.gridLayer) {
            this.gridLayer._setTileJSON(json);
            this._updateLayer(this.gridLayer);
        }

        if (this.infoControl && json.attribution) {
            this.infoControl.addInfo(this.options.sanitizer(json.attribution));
            this._updateMapFeedbackLink();
        }

        if (this.legendControl && json.legend) {
            this.legendControl.addLegend(json.legend);
        }

        if (this.shareControl) {
            this.shareControl._setTileJSON(json);
        }

        this._mapboxLogoControl._setTileJSON(json);

        if (!this._loaded && json.center) {
            var zoom = this.getZoom() !== undefined ? this.getZoom() : json.center[2],
                center = L.latLng(json.center[1], json.center[0]);

            this.setView(center, zoom);
        }
    },

    _updateMapFeedbackLink: function() {
        if (!this._controlContainer.getElementsByClassName) return;
        var link = this._controlContainer.getElementsByClassName('mapbox-improve-map');
        if (link.length && this._loaded) {
            var center = this.getCenter().wrap();
            var tilejson = this._tilejson || {};
            var id = tilejson.id || '';

            var hash = '#' + id + '/' +
                center.lng.toFixed(3) + '/' +
                center.lat.toFixed(3) + '/' +
                this.getZoom();

            for (var key in feedback.data) {
                hash += '/' + key + '=' + feedback.data[key];
            }

            for (var i = 0; i < link.length; i++) {
                link[i].hash = hash;
            }
        }
    },

    _onLayerAdd: function(e) {
        if ('on' in e.layer) {
            e.layer.on('ready', this._onLayerReady, this);
        }
        window.setTimeout(L.bind(this._updateMapFeedbackLink, this), 0); // Update after attribution control resets the HTML.
    },

    _onLayerRemove: function(e) {
        if ('on' in e.layer) {
            e.layer.off('ready', this._onLayerReady, this);
        }
        window.setTimeout(L.bind(this._updateMapFeedbackLink, this), 0); // Update after attribution control resets the HTML.
    },

    _onLayerReady: function(e) {
        this._updateLayer(e.target);
    },

    _updateLayer: function(layer) {
        if (!layer.options) return;

        if (this.infoControl && this._loaded) {
            this.infoControl.addInfo(layer.options.infoControl);
        }

        if (this.attributionControl && this._loaded && layer.getAttribution) {
            this.attributionControl.addAttribution(layer.getAttribution());
        }

        if (!(L.stamp(layer) in this._zoomBoundLayers) &&
                (layer.options.maxZoom || layer.options.minZoom)) {
            this._zoomBoundLayers[L.stamp(layer)] = layer;
        }

        this._updateMapFeedbackLink();
        this._updateZoomLevels();
    }
});

module.exports.Map = LMap;

module.exports.map = function(element, _, options) {
    return new LMap(element, _, options);
};
