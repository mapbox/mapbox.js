mapbox.geocoderControl = L.Control.extend({

    initialize: function(_) {
        this.geocoder = mapbox.geocoder(_);
        this._errorHandler = function() {};
    },

    url: function(_) {
        if (!arguments.length) return this.geocoder.url();
        this.geocoder.url(_);
        return this;
    },

    id: function(_) {
        this.geocoder.id(_);
        return this;
    },

    tilejson: function(_) {
        this.geocoder.tilejson(_);
        return this;
    },

    errorHandler: function(_) {
        this._errorHandler = _;
        return this;
    },

    onAdd: function(map) {
        this._map = map;

        var className = 'leaflet-control-mapbox-geocoder',
            container = L.DomUtil.create('div', className);

        L.DomEvent.disableClickPropagation(container);

        var form = this._form = L.DomUtil.create('form', className + '-form');
        L.DomEvent.addListener(form, 'submit', this._geocode, this);

        var input = this._input = document.createElement('input');
        input.type = 'text';

        var submit = this._submit = document.createElement('input');
        submit.type = 'submit';
        submit.value = 'Locate';

        form.appendChild(input);
        form.appendChild(submit);
        container.appendChild(form);

        return container;
    },

    _geocode: function(event) {
        L.DomEvent.preventDefault(event);
        this.geocoder.query(encodeURIComponent(this._input.value), L.bind(function(err, res) {
            if (err) return this._errorHandler(err);
            if (res.lbounds) this._map.fitBounds(res.lbounds);
            else this._map.setView(res.latlng, 6);
        }, this));
    }

});
