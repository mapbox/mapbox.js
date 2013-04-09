describe("mapbox.gridControl", function() {
    var server;

    beforeEach(function() {
        server = sinon.fakeServer.create();
    });

    afterEach(function() {
        server.restore();
    });

    it("is initialized", function() {
        var layer = new mapbox.gridLayer('examples.foo');
        var control = new mapbox.gridControl(layer);
        expect(control).to.be.ok();
    });

    it('sanitizes its content');
    it('supports a custom sanitizer');
});
