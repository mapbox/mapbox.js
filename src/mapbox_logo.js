'use strict';

var MapboxLogoControl = L.Control.extend({

    options: {
        position: 'bottomleft'
    },

    initialize: function(options) {
        L.setOptions(this, options);
    },

    onAdd: function() {
        this._container = L.DomUtil.create('div', 'mapbox-logo');
        return this._container;
    },

    _setTileJSON: function(json) {
        // Check if account referenced by the accessToken
        // is asscociated with the Mapbox Logo
        // as determined by mapbox-maps.
        if (json.mapbox_logo) {
            L.DomUtil.addClass(this._container, 'mapbox-logo-true');
        }

        // account for usage of styleJSON as functional tileJSON for defaults
        if (!json.tilejson && json.owner === 'mapbox') {
            L.DomUtil.addClass(this._container, 'mapbox-logo-true');
        }
    }
});

module.exports.MapboxLogoControl = MapboxLogoControl;

module.exports.mapboxLogoControl = function(options) {
    return new MapboxLogoControl(options);
};
