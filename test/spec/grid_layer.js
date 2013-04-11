describe('mapbox.gridLayer', function() {
    var server, element, tileJSON = helpers.tileJSON;

    beforeEach(function() {
        server = sinon.fakeServer.create();
        element = document.createElement('div');
    });

    afterEach(function() {
        server.restore();
    });

    describe('constructor', function() {
        it('is initialized', function() {
            var layer = mapbox.gridLayer();
            expect(layer).to.be.ok();
        });

        it('is initialized with tilejson', function() {
            var layer = mapbox.gridLayer(tileJSON);
            expect(layer).to.be.ok();
            expect(layer.getTileJSON()).to.be.eql(tileJSON);
        });
    });

    describe('#getTileJSON', function() {
        it('is by default empty', function() {
            var layer = mapbox.gridLayer();
            expect(layer.getTileJSON()).to.eql({});
        });
    });

    describe('#loadURL', function() {
        it('loads a TileJSON object', function(done) {
            var layer = mapbox.gridLayer();

            layer.loadURL('http://a.tiles.mapbox.com/v3/mapbox.map-0l53fhk2.json', function(err, json) {
                expect(this).to.equal(layer);
                expect(err).to.equal(null);
                expect(json).to.eql(helpers.tileJSON);
                done();
            });

            server.respondWith("GET", "http://a.tiles.mapbox.com/v3/mapbox.map-0l53fhk2.json",
                [200, { "Content-Type": "application/json" }, JSON.stringify(helpers.tileJSON)]);
            server.respond();
        });
    });

    describe('#loadID', function() {
        it('loads a TileJSON object', function(done) {
            var layer = mapbox.gridLayer();

            layer.loadID('mapbox.map-0l53fhk2', function(err, json) {
                expect(this).to.equal(layer);
                expect(err).to.equal(null);
                expect(json).to.eql(helpers.tileJSON);
                done();
            });

            server.respondWith("GET", "http://a.tiles.mapbox.com/v3/mapbox.map-0l53fhk2.json",
                [200, { "Content-Type": "application/json" }, JSON.stringify(helpers.tileJSON)]);
            server.respond();
        });
    });

    describe('#setTileJSON', function() {
        it('sets TileJSON', function() {
            var layer = mapbox.gridLayer();
            expect(layer.setTileJSON(tileJSON)).to.eql(layer);
            expect(layer.getTileJSON()).to.eql(tileJSON);
        });

        it('makes no tile requests if the JSON has an empty "grids" property', function() {
            var layer = mapbox.gridLayer();

            mapbox.map(element)
                .setView([0, 0], 1)
                .addLayer(layer);

            layer.setTileJSON(L.extend({}, tileJSON, {grids: []}));
            expect(server.requests).to.eql([]);
        });
    });

    describe('#_utfDecode', function() {
        var layer = mapbox.gridLayer();
        it('decrements not-out-of-range values', function() {
            expect(layer._utfDecode(33)).to.eql(1);
        });
        it('adjusts for bad codepoints', function() {
            expect(layer._utfDecode(133)).to.eql(99);
        });
    });
});
