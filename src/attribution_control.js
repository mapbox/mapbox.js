'use strict';

var AttributionControl = L.Control.extend({
    options: {
        position: 'bottomright',
        sanitizer: require('sanitize-caja')
    },

    initialize: function(options) {
        L.setOptions(this, options);
    },

    onAdd: function(map) {
        this._container = L.DomUtil.create('div', 'mapbox-control-attribution');

        var link = L.DomUtil.create('a', 'mapbox-attribution-toggle mapbox-icon mapbox-icon-info', this._container);
        link.href = '#';

        L.DomEvent.addListener(link, 'click', this._showAttribution, this);
        L.DomEvent.disableClickPropagation(this._container);

        this._update();
        return this._container;
    },

    _showAttribution: function(e) {
        L.DomEvent.preventDefault(e);
        if (this._active === true) return this._hidecontent();

        L.DomUtil.addClass(this._container, 'active');

        // Show the attribution here.
        var edit = L.DomUtil.create('a', '', this._content);
        edit.href = '#';
        edit.innerHTML = 'Edit in osm';
        edit.title = 'Edit in OpenStreetMap';
        L.DomEvent.on(edit, 'click', L.bind(this._osmlink, this), this);

        this._active = true;
    },

    _hidecontent: function() {
        this._content.innerHTML = '';
        this._active = false;
        L.DomUtil.removeClass(this._container, 'active');
        return;
    },

    _osmlink: function() {
        var center = this._map.getCenter();
        var z = this._map.getZoom();
        window.open('http://www.openstreetmap.org/edit?' + 'zoom=' + z +
            '&editor=id' + '&lat=' + center.lat + '&lon=' + center.lng);
    },

    _update: function() {
        if (!this._map) { return this; }

        this._content = L.DomUtil.create('div', 'map-attributions-container', this._container);
        //for (var i in this._attributions) {
            //if (this._attributions.hasOwnProperty(i) && this._attributions[i]) {
                //var div = this._container.appendChild(document.createElement('div'));
                //div.className = 'map-attribution';
                //div.innerHTML = this.options.sanitizer(i);
            //}
        //}

        return this;
    }
});

module.exports = function(options) {
    return new AttributionControl(options);
};
