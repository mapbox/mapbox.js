mapbox.geocoder = L.Control.extend({

    initialize: function(_) {
        // map id 'tmcw.foo'
        if (_.indexOf('/') == -1) this.id(_);
        // url 'http://foo.com/foo.bar'
        else this.url(_);
    },

    url: function(url) {
        if (!arguments.length) return this._url;
        this._url = url;
        return this;
    },

    id: function(id) {
        return this.url(mapbox.base() + id + '/geocode/{query}.json');
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

        var query = encodeURIComponent(this._input.value);

        L.TileJSON.load(L.Util.template(this.url(), {query: query}), L.bind(function(err, json) {
            if (json && json.results && json.results.length) {
                this._map.setView([json.results[0][0].lat, json.results[0][0].lon], 6);
            }
        }, this));
    }

});
