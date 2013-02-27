// # Legend
mapbox.LegendControl = L.Control.extend({

    options: {
        position: 'bottomright'
    },

    initialize: function(options) {
        L.setOptions(this, options);
        mapbox.sanitize.enable(options && options.sanitize);
        this._legends = {};
    },

    onAdd: function(map) {
        this._container = L.DomUtil.create('div', 'map-legends');
        L.DomEvent.disableClickPropagation(this._container);

        this._update();

        return this._container;
    },

    addLegend: function(text) {
        if (!text) { return; }

        if (!this._legends[text]) {
            this._legends[text] = 0;
        }

        this._legends[text]++;

        this._update();

        return this;
    },

    removeLegend: function(text) {
        if (!text) { return; }

        if (this._legends[text]) this._legends[text]--;
        this._update();

        return this;
    },

    _update: function() {
        if (!this._map) { return; }

        this._container.innerHTML = '';

        for (var i in this._legends) {
            if (this._legends.hasOwnProperty(i) && this._legends[i]) {
                var div = this._container.appendChild(document.createElement('div'));
                div.className = 'map-legend';
                div.innerHTML = i;
            }
        }
    }
});

mapbox.legendControl = function(options) {
    return new mapbox.LegendControl(options);
};
