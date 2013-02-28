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

        map.eachLayer(function(layer) {
            this._onLayerAdd({layer: layer});
            }, this)
            .on('layeradd', this._onLayerAdd, this)
            .on('layerremove', this._onLayerRemove, this);

        this._update();

        return this._container;
    },

    onRemove: function(map) {
        map.eachLayer(function(layer) {
            this._onLayerRemove({layer: layer});
            }, this)
            .off('layeradd', this._onLayerAdd)
            .off('layerremove', this._onLayerRemove);

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
    },

    _onLayerAdd: function(e) {
        if (e.layer.getLegend) {
            this.addLegend(e.layer.getLegend());
        }
    },

    _onLayerRemove: function(e) {
        if (e.layer.getLegend) {
            this.removeLegend(e.layer.getLegend());
        }
    }
});

mapbox.legendControl = function(options) {
    return new mapbox.LegendControl(options);
};
