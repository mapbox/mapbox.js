'use strict';

var geocoder = require('./geocoder');

var GeocoderControl = L.Control.extend({
    includes: L.Mixin.Events,

    options: {
        position: 'topleft'
    },

    initialize: function(_) {
        this.geocoder = geocoder(_);
    },

    setURL: function(_) {
        this.geocoder.setURL(_);
        return this;
    },

    getURL: function() {
        return this.geocoder.getURL();
    },

    setID: function(_) {
        this.geocoder.setID(_);
        return this;
    },

    setTileJSON: function(_) {
        this.geocoder.setTileJSON(_);
        return this;
    },

    _toggle: function(e) {
        L.DomEvent.stop(e);
        if (L.DomUtil.hasClass(this._container, 'active')) {
            L.DomUtil.removeClass(this._container, 'active');
        } else {
            L.DomUtil.addClass(this._container, 'active');
            this._input.focus();
        }
    },

    onAdd: function(map) {
        this._map = map;

        var container = L.DomUtil.create('div', 'leaflet-control-mapbox-geocoder leaflet-bar');
        var wrap = L.DomUtil.create('div', 'leaflet-control-mapbox-geocoder-wrap', container);
        var link = L.DomUtil.create('a', 'mapbox-geocoder-toggle', wrap);
        link.href = '#';
        link.innerHTML = '&nbsp;';

        L.DomEvent.addListener(link, 'click', this._toggle, this);
        L.DomEvent.disableClickPropagation(container);

        var form = this._form = L.DomUtil.create('form', 'leaflet-control-mapbox-geocoder-form', wrap);
        L.DomEvent.addListener(form, 'submit', this._geocode, this);

        var input = this._input = L.DomUtil.create('input', '', form);
        input.type = 'text';
        input.setAttribute('placeholder', 'Search');
        this._input = input;

        return container;
    },

    _geocode: function(event) {
        L.DomEvent.preventDefault(event);
        L.DomUtil.addClass(this._container, 'searching');
        this.geocoder.query(this._input.value, L.bind(function(err, res) {
            L.DomUtil.removeClass(this._container, 'searching');
            if (err) {
                this.fire('error', {error: err});
            } else {
                if (res.lbounds) this._map.fitBounds(res.lbounds);
                else this._map.setView(res.latlng, 6);
                this.fire('found', res);
            }
        }, this));
    }
});

module.exports = function(options) {
    return new GeocoderControl(options);
};
