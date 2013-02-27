describe("mapbox.gridControl", function() {
    var server, tileJSON = helpers.tileJSON;

    beforeEach(function() {
        server = sinon.fakeServer.create();
    });

    afterEach(function() {
        server.restore();
    });

    it("is initialized", function() {
        var control = new mapbox.gridControl();
        expect(control).to.be.ok();
    });

    it("turns sanitization off", function() {
        var layer = new mapbox.gridLayer();
        var control = new mapbox.gridControl(layer, {
            sanitize: false
        });
        expect(layer).to.be.ok();
        expect(mapbox.sanitize.enable()).to.eql(false);
    });
});
