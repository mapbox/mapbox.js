describe("mapbox.tileLayer", function() {
    var tileJSON = helpers.tileJSON;

    describe("#tilejson", function() {
        it("sets min and max zoom", function() {
            var layer = new mapbox.tileLayer();
            layer.tilejson(tileJSON);
            expect(layer.options.minZoom).to.equal(1);
            expect(layer.options.maxZoom).to.equal(11);
        });

        it("sets attribution", function() {
            var layer = new mapbox.tileLayer();
            layer.tilejson(tileJSON);
            expect(layer.options.attribution).to.equal('Terms & Feedback');
        });

        it("sets tms option", function() {
            var layer = new mapbox.tileLayer();
            layer.tilejson(L.extend({}, tileJSON, {scheme: 'tms'}));
            expect(layer.options.tms).to.equal(true);
        });

        it("sets bounds", function() {
            var layer = new mapbox.tileLayer();
            layer.tilejson(tileJSON);
            expect(layer.options.bounds).to.eql(new L.LatLngBounds([[43.6487, -79.4972], [43.6788, -79.4558]]));
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
