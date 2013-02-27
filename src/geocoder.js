mapbox.geocoder = function(_) {
    var geocoder = {};

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
                    res.lbounds = mapbox.lbounds(res.bounds);
                }
                callback(null, res);
            } else callback(err);
        });

        return geocoder;
    };

    // a reverse geocode:
    //
    //  geocoder.reverseQuery([80, 20])
    geocoder.reverseQuery = function(_, callback) {
        var q = '';

        function norm(x) {
            if (x.lat !== undefined && x.lng !== undefined) return x.lng + ',' + x.lat;
            else if (x.lat !== undefined && x.lon !== undefined) return x.lon + ',' + x.lat;
            else return x[0] + ',' + x[1];
        }

        if (_.length && _[0].length) {
            for (var i = 0, pts = []; i < _.length; i++) pts.push(norm(_[i]));
            q = pts.join(';');
        } else q = norm(_);

        mapbox.request(this.queryUrl(q), function(err, json) {
            callback(err, json);
        });

        return geocoder;
    };

    if (typeof _ === 'string') mapbox.idUrl(_, geocoder);
    else if (typeof _ === 'object') geocoder.tilejson(_);

    return geocoder;
};

