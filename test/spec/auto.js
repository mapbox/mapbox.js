describe('mapbox.auto', function() {
    var server,
        tileJSON = helpers.tileJSON,
        cors = mapbox.browser.cors;

    beforeEach(function() {
        mapbox.browser.cors = true;
        server = sinon.fakeServer.create();
    });

    afterEach(function() {
        mapbox.browser.cors = cors;
        server.restore();
    });

    it("loads TileJSON from the URL for the given ID", function() {
        var div = document.createElement('div');

        server.respondWith("GET", "http://a.tiles.mapbox.com/v3/tmcw.map-5hafkxww.json",
            [200, { "Content-Type": "application/json" }, JSON.stringify(tileJSON)]);

        mapbox.auto(div, 'tmcw.map-5hafkxww');

        server.respond();
        expect(div.className).to.contain('leaflet');
    });

    it("loads TileJSON from the URL for the given URL", function() {
        var div = document.createElement('div');

        server.respondWith("GET", "http://a.tiles.mapbox.com/v3/tmcw.map-5hafkxww.json",
            [200, { "Content-Type": "application/json" }, JSON.stringify(tileJSON)]);

        mapbox.auto(div, 'http://a.tiles.mapbox.com/v3/tmcw.map-5hafkxww.json');

        server.respond();
        expect(div.className).to.contain('leaflet');
    });

    it("calls the provided callback on success with the map", function(done) {
        var div = document.createElement('div');

        mapbox.auto(div, 'tmcw.map-5hafkxww', function(err, map) {
            expect(map).to.be.an(L.Map);
            done();
        });

        server.respondWith("GET", "http://a.tiles.mapbox.com/v3/tmcw.map-5hafkxww.json",
            [200, { "Content-Type": "application/json" }, JSON.stringify(tileJSON)]);
        server.respond();
    });

    it("calls the provided callback on error", function(done) {
        var div = document.createElement('div');

        mapbox.auto(div, 'tmcw.map-5hafkxww', function(err, map) {
            expect(err).to.be.ok();
            done();
        });

        server.respondWith("GET", "http://a.tiles.mapbox.com/v3/tmcw.map-5hafkxww.json",
            [500, { "Content-Type": "application/json" }, ""]);
        server.respond();
    });
});
