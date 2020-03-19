describe('mapbox_logo', function() {
    var server, element, doc, tileJSON = helpers.tileJSON;

    beforeEach(function() {
        server = sinon.fakeServer.create();
        element = document.createElement('div');
    });

    afterEach(function() {
        server.restore();
    });

    it('constructor', function() {
        var map = L.mapbox.map(element, tileJSON);
        var mapboxLogoControl = map._mapboxLogoControl.getContainer();
        expect(map._mapboxLogoControl instanceof L.Control);
    });

    it('is not on tilejson map without mapbox_logo flag', function() {
        var map = L.mapbox.map(element, helpers.tileJSON_mapboxlogoMissing);
        var mapboxLogoControl = map._mapboxLogoControl.getContainer();
        expect(L.DomUtil.hasClass(mapboxLogoControl, 'mapbox-logo-true')).to.be(false);
    });

    it('is on map when tilejson is mapbox styleJSON without mapbox_logo flag', function() {
        var map = L.mapbox.map(element, helpers.styleJSON);
        var mapboxLogoControl = map._mapboxLogoControl.getContainer();
        expect(L.DomUtil.hasClass(mapboxLogoControl, 'mapbox-logo-true')).to.be(true);
    });

    it('is on tilejson map with mapbox_logo === true', function() {
        var map = L.mapbox.map(element, helpers.tileJSON_mapboxlogo);
        var mapboxLogoControl = map._mapboxLogoControl.getContainer();
        expect(L.DomUtil.hasClass(mapboxLogoControl, 'mapbox-logo-true')).to.be(true);

    });

    it('is not on tilejson map with mapbox_logo === false', function() {
        var map = L.mapbox.map(element, helpers.tileJSON_mapboxlogoFalse);
        var mapboxLogoControl = map._mapboxLogoControl.getContainer();
        expect(L.DomUtil.hasClass(mapboxLogoControl, 'mapbox-logo-true')).to.be(false);
    });

    it('is on mapid map with mapbox_logo flag === true', function(done) {
        var map = L.mapbox.map(element, 'mapbox.map-0l53fhk2');
        map.on('ready', function() {
            var mapboxLogoControl = map._mapboxLogoControl.getContainer();
            expect(L.DomUtil.hasClass(mapboxLogoControl, 'mapbox-logo-true')).to.be(true);
            done();
        });

        server.respondWith("GET", "https://api.mapbox.com/v4/mapbox.map-0l53fhk2.json?access_token=key&secure",
            [200, { "Content-Type": "application/json" }, JSON.stringify(helpers.tileJSON_mapboxlogo)]);
        server.respond();
    });

    it('is not on mapid map with mapbox_logo flag === false', function(done) {
        var map = L.mapbox.map(element, 'mapbox.map-0l53fhk2');
        map.on('ready', function() {
            var mapboxLogoControl = map._mapboxLogoControl.getContainer();
            expect(L.DomUtil.hasClass(mapboxLogoControl, 'mapbox-logo-true')).to.be(false);
            done();
        });

        server.respondWith("GET", "https://api.mapbox.com/v4/mapbox.map-0l53fhk2.json?access_token=key&secure",
            [200, { "Content-Type": "application/json" }, JSON.stringify(helpers.tileJSON_mapboxlogoFalse)]);
        server.respond();
    });

    it('is on mapid map when layer added after map initialization', function (done) {
        var layer = L.mapbox.tileLayer('mapbox.map-0l53fhk2');
        var map = L.mapbox.map(element)
            .setView([0, 0], 3)
            .addLayer(layer);

        layer.on('ready', function() {
            var mapboxLogoControl = map._mapboxLogoControl.getContainer();
            expect(L.DomUtil.hasClass(mapboxLogoControl, 'mapbox-logo-true')).to.be(true);
            done();
        });

        server.respondWith("GET", "https://api.mapbox.com/v4/mapbox.map-0l53fhk2.json?access_token=key&secure",
            [200, { "Content-Type": "application/json" }, JSON.stringify(helpers.tileJSON_mapboxlogo)]);
        server.respond();
    });
});
