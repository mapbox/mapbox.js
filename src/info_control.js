'use strict';

var InfoControl = L.Control.extend({
    options: {
        position: 'bottomleft',
        sanitizer: require('sanitize-caja'),
        editinosm: false
    },

    initialize: function(options) {
        L.setOptions(this, options);
        this._infos = {};
    },

    onAdd: function(map) {
        this._container = L.DomUtil.create('div', 'mapbox-control-info mapbox-small');
        this._content = L.DomUtil.create('div', 'map-infos-container', this._container);

        var link = L.DomUtil.create('a', 'mapbox-info-toggle mapbox-icon mapbox-icon-info', this._container);
        link.href = '#';

        L.DomEvent.addListener(link, 'click', this._showInfo, this);
        L.DomEvent.disableClickPropagation(this._container);

        this._update();
        return this._container;
    },

    addInfo: function(text) {
        if (!text) return this;
        if (!this._infos[text]) this._infos[text] = 0;

        this._infos[text]++;
        return this._update();
    },

    removeInfo: function (text) {
        if (!text) return this;
        if (this._infos[text]) this._infos[text]--;
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

        for (var i in this._infos) {
            if (this._infos.hasOwnProperty(i) && this._infos[i]) {
                var sanitized = this.options.sanitizer(i);
                if (sanitized !== '') {
                    var attribute = L.DomUtil.create('span', 'map-attribute', this._content);
                    attribute.innerHTML = this.options.sanitizer(i) + ' ';
                }
            }
        }

        if (this.options.editinosm && !L.Browser.mobile) {
            var edit = L.DomUtil.create('a', '', this._content);
            edit.href = '#';
            edit.innerHTML = 'Improve this map';
            edit.title = 'Edit in OpenStreetMap';
            L.DomEvent.on(edit, 'click', L.bind(this._osmlink, this), this);
        }

        return this;
    },

    _osmlink: function() {
        var center = this._map.getCenter();
        var z = this._map.getZoom();
        window.open('http://www.openstreetmap.org/edit?' + 'zoom=' + z +
        '&editor=id' + '&lat=' + center.lat + '&lon=' + center.lng);
    },
});

module.exports = function(options) {
    return new InfoControl(options);
};
