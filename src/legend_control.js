'use strict';

var LegendControl = L.Control.extend({

    options: {
        position: 'bottomright',
        sanitizer: require('@mapbox/sanitize-caja')
    },

    initialize: function(options) {
        L.setOptions(this, options);
        this._legends = {};
    },

    onAdd: function() {
        this._container = L.DomUtil.create('div', 'map-legends wax-legends');
        L.DomEvent.disableClickPropagation(this._container);

        this._update();

        return this._container;
    },

    addLegend: function(text) {
        if (!text) { return this; }

        if (!this._legends[text]) {
            this._legends[text] = 0;
        }

        this._legends[text]++;
        return this._update();
    },

    removeLegend: function(text) {
        if (!text) { return this; }
        if (this._legends[text]) this._legends[text]--;
        return this._update();
    },

    _update: function() {
        if (!this._map) { return this; }

        this._container.innerHTML = '';
        var hide = 'none';

        for (var i in this._legends) {
            if (this._legends.hasOwnProperty(i) && this._legends[i]) {
                var div = L.DomUtil.create('div', 'map-legend wax-legend', this._container);
                div.innerHTML = this.options.sanitizer(i);
                hide = 'block';
            }
        }

        // hide the control entirely unless there is at least one legend;
        // otherwise there will be a small grey blemish on the map.
        this._container.style.display = hide;

        return this;
    }
});

module.exports.LegendControl = LegendControl;

module.exports.legendControl = function(options) {
    return new LegendControl(options);
};
