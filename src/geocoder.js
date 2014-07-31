'use strict';

var util = require('./util'),
    urlhelper = require('./url'),
    request = require('./request');

// Low-level geocoding interface - wraps specific API calls and their
// return values.
module.exports = function(url, options) {

    var geocoder = {};

    util.strict(url, 'string');

    if (url.indexOf('/') === -1) {
        url = urlhelper('/geocode/' + url + '/{query}.json', options && options.accessToken);
    }

    geocoder.getURL = function() {
        return url;
    };

    geocoder.queryURL = function(_) {
        if (typeof _ !== 'string') {
            var parts = [];
            for (var i = 0; i < _.length; i++) {
                parts[i] = encodeURIComponent(_[i]);
            }
            return L.Util.template(geocoder.getURL(), {
                query: parts.join(';')
            });
        } else {
            return L.Util.template(geocoder.getURL(), {
                query: encodeURIComponent(_)
            });
        }
    };

    geocoder.query = function(_, callback) {
        util.strict(callback, 'function');
        request(geocoder.queryURL(_), function(err, json) {
            if (json && (json.length || json.features)) {
                var res = {
                    results: json
                };
                if (json.features && json.features.length) {
                    res.latlng = [
                        json.features[0].center[1],
                        json.features[0].center[0]];

                    if (json.features[0].bbox) {
                        res.bounds = json.features[0].bbox;
                        res.lbounds = util.lbounds(res.bounds);
                    }
                }
                callback(null, res);
            } else callback(err || true);
        });

        return geocoder;
    };

    // a reverse geocode:
    //
    //  geocoder.reverseQuery([80, 20])
    geocoder.reverseQuery = function(_, callback) {
        var q = '';

        // sort through different ways people represent lat and lon pairs
        function normalize(x) {
            if (x.lat !== undefined && x.lng !== undefined) {
                return x.lng + ',' + x.lat;
            } else if (x.lat !== undefined && x.lon !== undefined) {
                return x.lon + ',' + x.lat;
            } else {
                return x[0] + ',' + x[1];
            }
        }

        if (_.length && _[0].length) {
            for (var i = 0, pts = []; i < _.length; i++) {
                pts.push(normalize(_[i]));
            }
            q = pts.join(';');
        } else {
            q = normalize(_);
        }

        request(geocoder.queryURL(q), function(err, json) {
            callback(err, json);
        });

        return geocoder;
    };

    return geocoder;
};
