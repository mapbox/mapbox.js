mapbox.geocoderControl = L.Control.extend({

    initialize: function(_) {
        this.geocoder = mapbox.geocoder(_);
        this._errorHandler = function() {};
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

    setErrorHandler: function(_) {
        this._errorHandler = _;
        return this;
    },

    getErrorHandler: function(_) {
        return this._errorHandler;
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
