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
            var layer = new mapbox.gridLayer();
            expect(layer).to.be.ok();
        });

        it('is initialized with tilejson', function() {
            var layer = new mapbox.gridLayer(tileJSON);
            expect(layer).to.be.ok();
            expect(layer.getTileJSON()).to.be.eql(tileJSON);
        });
    });

    describe('#getTileJSON', function() {
        it('is by default empty', function() {
            var layer = new mapbox.gridLayer();
            expect(layer.getTileJSON()).to.eql({});
        });
    });

    describe('#setTileJSON', function() {
        it('sets TileJSON', function() {
            var layer = new mapbox.gridLayer();
            expect(layer.setTileJSON(tileJSON)).to.eql(layer);
            expect(layer.getTileJSON()).to.eql(tileJSON);
        });

        it('makes no tile requests if the JSON has an empty "grids" property', function() {
            var layer = new mapbox.gridLayer();

            new mapbox.map(element)
                .setView([0, 0], 1)
                .addLayer(layer);

            layer.setTileJSON(L.extend({}, tileJSON, {grids: []}));
            expect(server.requests).to.eql([]);
        });
    });

    describe('#_utfDecode', function() {
        var layer = new mapbox.gridLayer();
        it('decrements not-out-of-range values', function() {
            expect(layer._utfDecode(33)).to.eql(1);
        });
        it('adjusts for bad codepoints', function() {
            expect(layer._utfDecode(133)).to.eql(99);
        });
    });
});
