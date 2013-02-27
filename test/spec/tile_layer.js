describe("mapbox.tileLayer", function() {
    var tileJSON = helpers.tileJSON;

    describe("#setTileJSON", function() {
        it("sets min and max zoom", function() {
            var layer = new mapbox.tileLayer();
            expect(layer.setTileJSON(tileJSON)).to.eql(layer);
            expect(layer.options.minZoom).to.equal(0);
            expect(layer.options.maxZoom).to.equal(17);
        });

        it("sets attribution", function() {
            var layer = new mapbox.tileLayer();
            layer.setTileJSON(tileJSON);
            expect(layer.options.attribution).to.equal('Data provided by NatureServe in collaboration with Robert Ridgely');
        });

        it("sets tms option", function() {
            var layer = new mapbox.tileLayer();
            layer.setTileJSON(L.extend({}, tileJSON, {scheme: 'tms'}));
            expect(layer.options.tms).to.equal(true);
        });

        it("sets bounds", function() {
            var layer = new mapbox.tileLayer();
            layer.setTileJSON(tileJSON);
            expect(layer.options.bounds).to.eql(new L.LatLngBounds([[-85.0511, -180], [85.0511, 180]]));
        });

        it("can be reinitialized", function() {
            var layer = new mapbox.tileLayer();

            layer.setTileJSON(tileJSON);
            layer.setTileJSON(L.extend({}, tileJSON, {attribution: 'Terms', bounds: undefined, scheme: 'tms'}));

            expect(layer.options.attribution).to.equal('Terms');
            expect(layer.options.tms).to.equal(true);
            expect(layer.options.bounds).to.equal(undefined);
        });
    });

    describe("#setId", function() {
        it('sets the id', function() {
            var layer = new mapbox.tileLayer();
            expect(layer.setId('mapbox.map-0l53fhk2')).to.eql(layer);
        });
    });

    describe("#getId", function() {
        it('sets the id', function() {
            var layer = new mapbox.tileLayer();
            expect(layer.setId('mapbox.map-0l53fhk2')).to.eql(layer);
            expect(layer.getId()).to.eql('mapbox.map-0l53fhk2');
        });
    });

    describe("#getTileJSON", function() {
        it('gets tilejson', function() {
            var layer = new mapbox.tileLayer();
            layer.setTileJSON(tileJSON);
            expect(layer.getTileJSON()).to.eql(tileJSON);
        });
    });

    describe("#getTileUrl", function() {
        it("distributes over the URLs in the tiles property", function() {
            var layer = new mapbox.tileLayer(tileJSON);
            layer.tilejson(tileJSON);
            expect(layer.getTileUrl({x: 0, y: 0, z: 0})).to.equal('http://a.tiles.mapbox.com/v3/examples.map-8ced9urs/0/0/0.png');
            expect(layer.getTileUrl({x: 1, y: 0, z: 0})).to.equal('http://b.tiles.mapbox.com/v3/examples.map-8ced9urs/0/1/0.png');
            expect(layer.getTileUrl({x: 2, y: 0, z: 0})).to.equal('http://c.tiles.mapbox.com/v3/examples.map-8ced9urs/0/2/0.png');
            expect(layer.getTileUrl({x: 3, y: 0, z: 0})).to.equal('http://d.tiles.mapbox.com/v3/examples.map-8ced9urs/0/3/0.png');
            expect(layer.getTileUrl({x: 4, y: 0, z: 0})).to.equal('http://a.tiles.mapbox.com/v3/examples.map-8ced9urs/0/4/0.png');
        });
    });
});
