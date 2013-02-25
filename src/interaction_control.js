mapbox.interactionControl = L.Control.extend({

    initialize: function(_) {
    },

    onAdd: function(map) {
        this._map = map;

        var className = 'leaflet-control-interaction',
            container = L.DomUtil.create('div', className);

        L.DomEvent.disableClickPropagation(container);

        return container;
    }

});
