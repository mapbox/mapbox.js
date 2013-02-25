var helpers = {};

// permissive test of leaflet-like location objects
expect.Assertion.prototype.near = function(expected, delta) {
    if (this.obj.lat !== undefined) {
        expect(this.obj.lat).to
            .be.within(expected.lat - delta, expected.lat + delta);
        expect(this.obj.lng).to
            .be.within(expected.lng - delta, expected.lng + delta);
    } else {
        expect(this.obj[0]).to
            .be.within(expected.lat - delta, expected.lat + delta);
        expect(this.obj[1]).to
            .be.within(expected.lng - delta, expected.lng + delta);
    }
};

// enumerate the layers of a layerGroup. This should be fixed in Leaflet core
helpers.layersOf = function(layerGroup) {
    var result = [];
    layerGroup.eachLayer(function(layer) {
        result.push(layer);
    });
    return result;
};

helpers.tileJSON = {
    'tilejson': '2.0.0',
    'attribution': 'Terms & Feedback',
    'center': [-77.046, 38.907, 12],
    'minzoom': 1,
    'maxzoom': 11,
    'id': 'examples.map-zr0njcqy',
    'tiles': [
        'http://a.tiles.mapbox.com/v3/examples.map-zr0njcqy/{z}/{x}/{y}.png',
        'http://b.tiles.mapbox.com/v3/examples.map-zr0njcqy/{z}/{x}/{y}.png',
        'http://c.tiles.mapbox.com/v3/examples.map-zr0njcqy/{z}/{x}/{y}.png',
        'http://d.tiles.mapbox.com/v3/examples.map-zr0njcqy/{z}/{x}/{y}.png'
    ],
    "bounds": [-79.4972, 43.6487, -79.4558, 43.6788]
};
