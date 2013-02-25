mapbox.geocoder = function(_) {
    var geocoder = {}, tilejson = {};

    // leaflet-compatible bounds, since leaflet does not do geojson
    function lbounds(_) {
        return [[_[1], _[0]], [_[3], _[2]]];
    }

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
                var res = {
                    results: json.results,
                    latlng: [json.results[0][0].lat, json.results[0][0].lon]
                };
                if (json.results[0][0].bounds !== undefined) {
                    res.bounds = json.results[0][0].bounds;
                    res.lbounds = lbounds(res.bounds);
                }
                callback(null, res);
            } else callback(err);
        });
    };

    if (typeof _ === 'string') mapbox.idUrl(_, geocoder);
    else if (typeof _ === 'object') geocoder.tilejson(_);

    return geocoder;
};

