// Load a map from  URL or id
mapbox.auto = function(element, url, callback) {
    // Support bare IDs as well as fully-formed URLs
    if (url.indexOf('http') !== 0) {
        url = mapbox.base() + url + '.json';
    }

    mapbox.request(url, function(err, json) {
        if (err) {
            if (callback) callback(err);
            else mapbox.log('could not load TileJSON at ' + url);
            return;
        }

        var zoom = json.center[2],
            center = L.latLng(json.center[1], json.center[0]);

        var map = new L.Map(element)
            .setView(center, zoom)
            .addLayer(new mapbox.layerGroup(json));

        if (callback) callback(undefined, map);
    });
};
