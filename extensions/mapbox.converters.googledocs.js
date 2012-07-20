// Takes a spreadsheet key, worksheet ID, and callback function with a
// features argument. Use this to find the worksheet ID:
// https://spreadsheets.google.com/feeds/worksheets/[spreadsheet_key]/public/basic?alt=json

if (typeof mapbox === 'undefined') mapbox = {};
if (typeof mapbox.converters === 'undefined') mapbox.converters = {};

mapbox.converters.googledocs = function(spreadsheet, sheet, callback) {
    if (typeof reqwest === 'undefined') {
        throw 'googledocs: reqwest required for mapbox.converters.googledocs';
    }

    function response(x) {
        var features = [],
            latfield = '',
            lonfield = '';
        if (!x || !x.feed) return features;

        for (var f in x.feed.entry[0]) {
            if (f.match(/\$Lat/i)) latfield = f;
            if (f.match(/\$Lon/i)) lonfield = f;
        }

        for (var i = 0; i < x.feed.entry.length; i++) {
            var entry = x.feed.entry[i];
            var feature = {
                geometry: {
                    type: 'Point',
                    coordinates: []
                },
                properties: {}
            };
            for (var y in entry) {
                if (y === latfield) feature.geometry.coordinates[1] = parseFloat(entry[y].$t);
                else if (y === lonfield) feature.geometry.coordinates[0] = parseFloat(entry[y].$t);
                else if (y.indexOf('gsx$') === 0) {
                    feature.properties[y.replace('gsx$', '')] = entry[y].$t;
                }
            }
            if (feature.geometry.coordinates.length == 2) features.push(feature);
        }

        return callback(features);
    }

    // Get sheet id with this: 
    var url = 'https://spreadsheets.google.com/feeds/list/' + spreadsheet +
        '/' + sheet + '/public/values?alt=json-in-script&callback=callback';

    reqwest({
        url: url,
        type: 'jsonp',
        jsonpCallback: 'callback',
        success: response,
        error: response
    });
};
