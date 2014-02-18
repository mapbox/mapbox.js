'use strict';

var InfoControl = L.Control.extend({
    options: {
        position: 'bottomright',
        sanitizer: require('sanitize-caja'),
        editLink: false
    },

    initialize: function(options) {
        L.setOptions(this, options);
        this._info = {};
    },

    onAdd: function(map) {
        this._container = L.DomUtil.create('div', 'mapbox-control-info mapbox-small');
        this._content = L.DomUtil.create('div', 'map-info-container', this._container);

        if (this.options.position === 'bottomright' ||
            this.options.position === 'topright') {
            this._container.className += ' mapbox-control-info-right';
        }

        var link = L.DomUtil.create('a', 'mapbox-info-toggle mapbox-icon mapbox-icon-info', this._container);
        link.href = '#';

        L.DomEvent.addListener(link, 'click', this._showInfo, this);
        L.DomEvent.disableClickPropagation(this._container);

        for (var i in map._layers) {
            if (map._layers[i].getAttribution) {
                this.addInfo(map._layers[i].getAttribution());
            }
        }

        map
            .on('layeradd', this._onLayerAdd, this)
            .on('layerremove', this._onLayerRemove, this);

        this._update();
        return this._container;
    },

    onRemove: function(map) {
        map
            .off('layeradd', this._onLayerAdd)
            .off('layerremove', this._onLayerRemove);
    },

    addInfo: function(text) {
        if (!text) return this;
        if (!this._info[text]) this._info[text] = 0;

        this._info[text] = true;
        return this._update();
    },

    removeInfo: function (text) {
        if (!text) return this;
        if (this._info[text]) this._info[text] = false;
        return this._update();
    },

    _showInfo: function(e) {
        L.DomEvent.preventDefault(e);
        if (this._active === true) return this._hidecontent();

        L.DomUtil.addClass(this._container, 'active');
        this._active = true;
        this._update();
    },

    _hidecontent: function() {
        this._content.innerHTML = '';
        this._active = false;
        L.DomUtil.removeClass(this._container, 'active');
        return;
    },

    _update: function() {
        if (!this._map) { return this; }
        this._content.innerHTML = '';
        var hide = 'none';
        var info = [];

        for (var i in this._info) {
            if (this._info.hasOwnProperty(i) && this._info[i]) {
                info.push(this.options.sanitizer(i));
                hide = 'block';
            }
        }

        this._content.innerHTML += info.join(' | ');

        // Check for the existence of this element in the attribution list
        // and attach an event handler to it.
        var improvemap = this._content.querySelectorAll('.mapbox-improve-map');

        for (var link = 0; link < improvemap.length; link++) {
            L.DomEvent.on(improvemap[link], 'click', this._editlink, this);
        }

        if (this.options.editLink && !L.Browser.mobile && !improvemap.length) {
            this._content.innerHTML += (info.length) ? ' | ' : '';
            var edit = L.DomUtil.create('a', '', this._content);
            edit.href = '#';
            edit.innerHTML = 'Improve this map';
            L.DomEvent.on(edit, 'click', this._editlink, this);
        }

        // If there are no results in _info then hide this.
        this._container.style.display = hide;
        return this;
    },

    _editlink: function(e) {
        L.DomEvent.preventDefault(e);
        var tilejson = this._tilejson || this._map._tilejson || {};
        var id = tilejson.id || '';
        var center = this._map.getCenter();
        window.open('https://www.mapbox.com/map-feedback/#' + id + '/' + center.lng + '/' + center.lat + '/' + this._map.getZoom());
    },

    _onLayerAdd: function(e) {
        if (e.layer.getAttribution && e.layer.getAttribution()) {
            this.addInfo(e.layer.getAttribution());
        } else if ('on' in e.layer && e.layer.getAttribution) {
            e.layer.on('ready', L.bind(function() {
                this.addInfo(e.layer.getAttribution());
            }, this));
        }
    },

    _onLayerRemove: function (e) {
        if (e.layer.getAttribution) {
            this.removeInfo(e.layer.getAttribution());
        }
    }
});

module.exports = function(options) {
    return new InfoControl(options);
};
