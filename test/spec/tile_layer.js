describe("mapbox.tileLayer", function() {
    var tileJSON = {
        'tilejson': '2.0.0',
        'attribution': 'Terms & Feedback',
        'center': [-77.046, 38.907, 12],
        'minzoom': 1,
        'maxzoom': 11,
        'tiles': [
            'http://a.tiles.mapbox.com/v3/examples.map-zr0njcqy/{z}/{x}/{y}.png',
            'http://b.tiles.mapbox.com/v3/examples.map-zr0njcqy/{z}/{x}/{y}.png',
            'http://c.tiles.mapbox.com/v3/examples.map-zr0njcqy/{z}/{x}/{y}.png',
            'http://d.tiles.mapbox.com/v3/examples.map-zr0njcqy/{z}/{x}/{y}.png'
        ]
    };

    describe("#tilejson", function() {
        it("sets the appropriate min and max zoom", function() {
            var layer = new mapbox.tileLayer();
            layer.tilejson(tileJSON);
            expect(layer.options.minZoom).to.equal(1);
            expect(layer.options.maxZoom).to.equal(11);
        });

        it("sets the appropriate attribution", function() {
            var layer = new mapbox.tileLayer();
            layer.tilejson(tileJSON);
            expect(layer.options.attribution).to.equal('Terms & Feedback');
        });

        it("sets the appropriate tms option", function() {
            var layer = new mapbox.tileLayer();
            layer.tilejson(L.extend({}, tileJSON, {scheme: 'tms'}));
            expect(layer.options.tms).to.equal(true);
        });
    });

    describe("#getTileUrl", function() {
        it("distributes over the URLs in the tiles property", function() {
            var layer = new mapbox.tileLayer(tileJSON);
            layer.tilejson(tileJSON);
            expect(layer.getTileUrl({x: 0, y: 0, z: 0})).to.equal('http://a.tiles.mapbox.com/v3/examples.map-zr0njcqy/0/0/0.png');
            expect(layer.getTileUrl({x: 1, y: 0, z: 0})).to.equal('http://b.tiles.mapbox.com/v3/examples.map-zr0njcqy/0/1/0.png');
            expect(layer.getTileUrl({x: 2, y: 0, z: 0})).to.equal('http://c.tiles.mapbox.com/v3/examples.map-zr0njcqy/0/2/0.png');
            expect(layer.getTileUrl({x: 3, y: 0, z: 0})).to.equal('http://d.tiles.mapbox.com/v3/examples.map-zr0njcqy/0/3/0.png');
            expect(layer.getTileUrl({x: 4, y: 0, z: 0})).to.equal('http://a.tiles.mapbox.com/v3/examples.map-zr0njcqy/0/4/0.png');
        });
    });
});
