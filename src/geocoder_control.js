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
        var link = L.DomUtil.create('a', 'mapbox-geocoder-toggle', container);
        link.href = '#';
        link.innerHTML = '&nbsp;';

        this._results = L.DomUtil.create('div', 'leaflet-control-mapbox-geocoder-results', container);

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
        var map = this._map;
        this.geocoder.query(this._input.value, L.bind(function(err, resp) {
            L.DomUtil.removeClass(this._container, 'searching');
            if (err || !resp || !resp.results || !resp.results.length) {
                this.fire('error', {error: err});
            } else {
                if (resp.results.length === 1 && resp.lbounds) {
                    return this._map.fitBounds(resp.lbounds);
                } else {
                    for (var i = 0, l = Math.min(resp.results.length, 5); i < l; i++) {
                        var name = [];
                        for (var j = 0; j < resp.results[i].length; j++) {
                            resp.results[i][j].name && name.push(resp.results[i][j].name);
                        }
                        if (!name.length) continue;

                        var r = L.DomUtil.create('a', '', this._results);
                        r.innerHTML = name.join(', ');
                        r.href = '#';

                        (function(result) {
                            L.DomEvent.addListener(r, 'click', function(e) {
                                // var _ = result.bounds;
                                // map.fitBounds(new L.LatLngBounds([[_[1], _[0]], [_[3], _[2]]]));
                                L.DomEvent.stop(e);
                            });
                        })(resp.results[i]);
                    }
                }
                this.fire('found', resp);
            }
        }, this));
    }
});

module.exports = function(options) {
    return new GeocoderControl(options);
};
