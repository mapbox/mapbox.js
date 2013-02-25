mapbox.geocoder = function(_) {
    var geocoder = {}, tilejson = {};

    geocoder.url = function(_) {
        if (!arguments.length) return url;
        url = _;
        return geocoder;
    };

    geocoder.id = function(_) {
        return geocoder.url(mapbox.base() + _ + '/geocode/{query}.json');
    };

    geocoder.tilejson = function(_) {
        return geocoder.id(_.id || '');
    };

    geocoder.queryUrl = function(_) {
        return L.Util.template(this.url(), {query: _});
    };

    geocoder.query = function(_, callback) {
        mapbox.request(this.queryUrl(_), function(err, json) {
            if (json && json.results && json.results.length) {
                callback(null, {
                    results: json.results,
                    latlng: [json.results[0][0].lat, json.results[0][0].lon]
                });
            } else callback(err);
        });
    };

    if (typeof _ === 'string') mapbox.idUrl(_, geocoder);
    else if (typeof _ === 'object') geocoder.tilejson(_);

    return geocoder;
};

mapbox.geocoderControl = L.Control.extend({

    initialize: function(_) {
        this.geocoder = mapbox.geocoder(_);
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
            if (!err) this._map.setView(res.latlng, 6);
        }, this));
    }

});
