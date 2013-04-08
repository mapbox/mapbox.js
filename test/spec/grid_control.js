describe("mapbox.gridControl", function() {
    var server;

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

    it('sanitizes its content');
    it('supports a custom sanitizer');
});
