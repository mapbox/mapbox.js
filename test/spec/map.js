describe('mapbox.map', function() {
    var server, element, tileJSON = helpers.tileJSON;

    beforeEach(function() {
        server = sinon.fakeServer.create();
        element = document.createElement('div');
    });

    afterEach(function() {
        server.restore();
    });

    it('allows access to the tilejson object after assignment', function() {
        var map = mapbox.map(element, tileJSON);
        expect(map.getTileJSON()).to.equal(tileJSON);
    });

    it('passes options to constructor when called without new', function() {
        var map = mapbox.map(element, tileJSON, {zoomControl: false});
        expect(map.options.zoomControl).to.equal(false);
    });

    describe('layers', function() {
        it('adds a tile layer immediately', function() {
            var map = mapbox.map(element, 'data/tilejson.json');
            expect(map.tileLayer).to.be.ok();
        });

        it('initializes the tile layer', function() {
            var map = mapbox.map(element, tileJSON);
            expect(map.tileLayer.getTileJSON()).to.equal(tileJSON);
        });

        it('adds a data layer immediately', function() {
            var map = mapbox.map(element, 'data/tilejson.json');
            expect(map.markerLayer).to.be.ok();
        });

        it('adds a grid layer immediately', function() {
            var map = mapbox.map(element, 'data/tilejson.json');
            expect(map.gridLayer).to.be.ok();
        });

        it('initializes the grid layer', function() {
            var map = mapbox.map(element, tileJSON);
            expect(map.gridLayer.getTileJSON()).to.equal(tileJSON);
        });
    });

    describe('corner cases', function() {
        it('re-initialization throws', function() {
            var map = mapbox.map(element, tileJSON);
            expect(map.tileLayer.getTileJSON()).to.equal(tileJSON);

            expect(function() {
                mapbox.map(element, tileJSON);
            }).to.throwException(function(e) {
                expect(e.message).to.eql('Map container is already initialized.');
            });
        });
    });

    describe("#loadURL", function() {
        it('returns self', function() {
            var map = mapbox.map(element);
            expect(map.loadURL('http://a.tiles.mapbox.com/v3/mapbox.map-0l53fhk2.json')).to.eql(map);
        });

        it('calls a callback on success', function(done) {
            var map = mapbox.map(element);

            map.loadURL('http://a.tiles.mapbox.com/v3/mapbox.map-0l53fhk2.json', function(err, json) {
                expect(this).to.equal(map);
                expect(err).to.equal(null);
                expect(json).to.eql(helpers.tileJSON);
                done();
            });

            server.respondWith("GET", "http://a.tiles.mapbox.com/v3/mapbox.map-0l53fhk2.json",
                [200, { "Content-Type": "application/json" }, JSON.stringify(helpers.tileJSON)]);
            server.respond();
        });

        it('calls a callback on error', function(done) {
            var map = mapbox.map(element);

            map.loadURL('http://a.tiles.mapbox.com/v3/mapbox.map-0l53fhk2.json', function(err, json) {
                expect(this).to.equal(map);
                expect(err.status).to.equal(400);
                expect(json).to.equal(null);
                done();
            });

            server.respondWith("GET", "http://a.tiles.mapbox.com/v3/mapbox.map-0l53fhk2.json",
                [400, { "Content-Type": "application/json" }, JSON.stringify({error: 'error'})]);
            server.respond();
        });
    });
});
