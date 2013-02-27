describe("mapbox.gridLayer", function() {
    var server, tileJSON = helpers.tileJSON;

    beforeEach(function() {
        server = sinon.fakeServer.create();
    });

    afterEach(function() {
        server.restore();
    });

    it("is initialized", function() {
        var layer = new mapbox.gridLayer();
        expect(layer).to.be.ok();
    });

    describe("#getTileJSON", function() {
        it('is by default empty', function() {
            var layer = new mapbox.gridLayer();
            expect(layer.getTileJSON()).to.eql({});
        });

        it('can get and set tilejson', function() {
            var layer = new mapbox.gridLayer();
            expect(layer.getTileJSON()).to.eql({});
        });
    });

    describe("#setTileJSON", function() {
        it('is by default empty', function() {
            var layer = new mapbox.gridLayer();
            expect(layer.setTileJSON(tileJSON)).to.eql(layer);
            expect(layer.getTileJSON()).to.eql(tileJSON);
        });
    });
    describe("#_utfDecode", function() {
        var layer = new mapbox.gridLayer();
        it('decrements not-out-of-range values', function() {
            expect(layer._utfDecode(33)).to.eql(1);
        });
        it('adjusts for bad codepoints', function() {
            expect(layer._utfDecode(133)).to.eql(99);
        });
    });
});
