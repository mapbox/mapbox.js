'use strict';

var geocoder = require('./geocoder'),
    util = require('./util');

var GeocoderControl = L.Control.extend({
    includes: L.Mixin.Events,

    options: {
        proximity: true,
        position: 'topleft',
        pointZoom: 16,
        keepOpen: false,
        autocomplete: false,
        queryOptions: {}
    },

    initialize: function(_, options) {
        L.Util.setOptions(this, options);
        this.setURL(_);
        this._updateSubmit = L.bind(this._updateSubmit, this);
        this._updateAutocomplete = L.bind(this._updateAutocomplete, this);
        this._chooseResult = L.bind(this._chooseResult, this);
    },

    setURL: function(_) {
        this.geocoder = geocoder(_, {
            accessToken: this.options.accessToken
        });
        return this;
    },

    getURL: function() {
        return this.geocoder.getURL();
    },

    setID: function(_) {
        return this.setURL(_);
    },

    setTileJSON: function(_) {
        return this.setURL(_.geocoder);
    },

    _toggle: function(e) {
        if (e) L.DomEvent.stop(e);
        if (L.DomUtil.hasClass(this._container, 'active')) {
            L.DomUtil.removeClass(this._container, 'active');
            this._results.innerHTML = '';
            this._input.blur();
        } else {
            L.DomUtil.addClass(this._container, 'active');
            this._input.focus();
            this._input.select();
        }
    },

    _closeIfOpen: function() {
        if (L.DomUtil.hasClass(this._container, 'active') &&
            !this.options.keepOpen) {
            L.DomUtil.removeClass(this._container, 'active');
            this._results.innerHTML = '';
            this._input.blur();
        }
    },

    onAdd: function(map) {

        var container = L.DomUtil.create('div', 'leaflet-control-mapbox-geocoder leaflet-bar leaflet-control'),
            link = L.DomUtil.create('a', 'leaflet-control-mapbox-geocoder-toggle mapbox-icon mapbox-icon-geocoder', container),
            results = L.DomUtil.create('div', 'leaflet-control-mapbox-geocoder-results', container),
            wrap = L.DomUtil.create('div', 'leaflet-control-mapbox-geocoder-wrap', container),
            form = L.DomUtil.create('form', 'leaflet-control-mapbox-geocoder-form', wrap),
            input = L.DomUtil.create('input', '', form);

        link.href = '#';
        link.innerHTML = '&nbsp;';

        input.type = 'text';
        input.setAttribute('placeholder', 'Search');

        L.DomEvent.addListener(form, 'submit', this._geocode, this);
        L.DomEvent.addListener(input, 'keyup', this._autocomplete, this);
        L.DomEvent.disableClickPropagation(container);

        this._map = map;
        this._results = results;
        this._input = input;
        this._form = form;

        if (this.options.keepOpen) {
            L.DomUtil.addClass(container, 'active');
        } else {
            this._map.on('click', this._closeIfOpen, this);
            L.DomEvent.addListener(link, 'click', this._toggle, this);
        }

        return container;
    },

    _updateSubmit: function(err, resp) {
        L.DomUtil.removeClass(this._container, 'searching');
        this._results.innerHTML = '';
        if (err || !resp) {
            this.fire('error', {error: err});
        } else {
            var features = [];
            if (resp.results && resp.results.features) {
                features = resp.results.features;
            }
            if (features.length === 1) {
                this.fire('autoselect', { feature: features[0] });
                this.fire('found', {results: resp.results});
                this._chooseResult(features[0]);
                this._closeIfOpen();
            } else if (features.length > 1) {
                this.fire('found', {results: resp.results});
                this._displayResults(features);
            } else {
                this.fire('notfound');
                this._displayResults(features);
            }
        }
    },

    _updateAutocomplete: function(err, resp) {
        this._results.innerHTML = '';
        if (err || !resp) {
            this.fire('error', {error: err});
        } else {
            var features = [];
            if (resp.results && resp.results.features) {
                features = resp.results.features;
            }
            if (features.length) {
                this.fire('found', {results: resp.results});
            } else {
                this.fire('notfound');
            }
            this._displayResults(features);
        }
    },

    _displayResults: function(features) {
        for (var i = 0, l = Math.min(features.length, 5); i < l; i++) {
            var feature = features[i];
            var name = feature.place_name;
            if (!name.length) continue;

            var r = L.DomUtil.create('a', '', this._results);
            var text = ('innerText' in r) ? 'innerText' : 'textContent';
            r[text] = name;
            r.setAttribute('title', name);
            r.href = '#';

            (L.bind(function(feature) {
                L.DomEvent.addListener(r, 'click', function(e) {
                    this._chooseResult(feature);
                    L.DomEvent.stop(e);
                    this.fire('select', { feature: feature });
                }, this);
            }, this))(feature);
        }
        if (features.length > 5) {
            var outof = L.DomUtil.create('span', '', this._results);
            outof.innerHTML = 'Top 5 of ' + features.length + '  results';
        }
    },

    _chooseResult: function(result) {
        if (result.bbox) {
            this._map.fitBounds(util.lbounds(result.bbox));
        } else if (result.center) {
            this._map.setView([result.center[1], result.center[0]], (this._map.getZoom() === undefined) ?
                this.options.pointZoom :
                Math.max(this._map.getZoom(), this.options.pointZoom));
        }
    },

    _geocode: function(e) {
        L.DomEvent.preventDefault(e);
        if (this._input.value === '') return this._updateSubmit();
        L.DomUtil.addClass(this._container, 'searching');
        this.geocoder.query(L.Util.extend({
            query: this._input.value,
            proximity: this.options.proximity ? this._map.getCenter() : false
        }, this.options.queryOptions), this._updateSubmit);
    },

    _autocomplete: function() {
        if (!this.options.autocomplete) return;
        if (this._input.value === '') return this._updateAutocomplete();
        this.geocoder.query(L.Util.extend({
            query: this._input.value,
            proximity: this.options.proximity ? this._map.getCenter() : false
        }, this.options.queryOptions), this._updateAutocomplete);
    }
});

module.exports.GeocoderControl = GeocoderControl;

module.exports.geocoderControl = function(_, options) {
    return new GeocoderControl(_, options);
};
