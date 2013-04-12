describe('L.mapbox.map', function() {
    var server, element, tileJSON = helpers.tileJSON;

    beforeEach(function() {
        server = sinon.fakeServer.create();
        element = document.createElement('div');
    });

    afterEach(function() {
        server.restore();
    });

    it('allows access to the tilejson object after assignment', function() {
        var map = L.mapbox.map(element, tileJSON);
        expect(map.getTileJSON()).to.equal(tileJSON);
    });

    it('passes options to constructor when called without new', function() {
        var map = L.mapbox.map(element, tileJSON, {zoomControl: false});
        expect(map.options.zoomControl).to.equal(false);
    });

    describe('layers', function() {
        it('adds a tile layer immediately', function() {
            var map = L.mapbox.map(element, 'data/tilejson.json');
            expect(map.tileLayer).to.be.ok();
        });

        it('initializes the tile layer', function() {
            var map = L.mapbox.map(element, tileJSON);
            expect(map.tileLayer.getTileJSON()).to.equal(tileJSON);
        });

        it('creates no tile layer given tileLayer: false option', function() {
            var map = L.mapbox.map(element, tileJSON, {tileLayer: false});
            expect(map.tileLayer).to.be(undefined);
        });

        it('adds a maker layer immediately', function() {
            var map = L.mapbox.map(element, 'data/tilejson.json');
            expect(map.markerLayer).to.be.ok();
        });

        it('creates no marker layer given markerLayer: false option', function() {
            var map = L.mapbox.map(element, tileJSON, {markerLayer: false});
            expect(map.markerLayer).to.be(undefined);
        });

        it('adds a grid layer immediately', function() {
            var map = L.mapbox.map(element, 'data/tilejson.json');
            expect(map.gridLayer).to.be.ok();
        });

        it('initializes the grid layer', function() {
            var map = L.mapbox.map(element, tileJSON);
            expect(map.gridLayer.getTileJSON()).to.equal(tileJSON);
        });

        it('creates no grid layer given gridLayer: false option', function() {
            var map = L.mapbox.map(element, tileJSON, {gridLayer: false});
            expect(map.gridLayer).to.be(undefined);
        });
    });

    describe('controls', function() {
        it('creates a legendControl', function() {
            var map = L.mapbox.map(element, tileJSON);
            expect(map.legendControl).to.be.ok();
        });

        it('creates no legendControl given legendControl: false option', function() {
            var map = L.mapbox.map(element, tileJSON, {legendControl: false});
            expect(map.legendControl).to.be(undefined);
        });

        it('creates a gridControl', function() {
            var map = L.mapbox.map(element, tileJSON);
            expect(map.gridControl).to.be.ok();
        });

        it('creates no gridControl given gridLayer: false option', function() {
            var map = L.mapbox.map(element, tileJSON, {gridLayer: false});
            expect(map.gridControl).to.be(undefined);
        });

        it('creates no gridControl given gridControl: false option', function() {
            var map = L.mapbox.map(element, tileJSON, {gridControl: false});
            expect(map.gridControl).to.be(undefined);
        });
    });

    describe('corner cases', function() {
        it('re-initialization throws', function() {
            var map = L.mapbox.map(element, tileJSON);
            expect(map.tileLayer.getTileJSON()).to.equal(tileJSON);

            expect(function() {
                L.mapbox.map(element, tileJSON);
            }).to.throwException(function(e) {
                expect(e.message).to.eql('Map container is already initialized.');
            });
        });
    });

    describe("#loadURL", function() {
        it('returns self', function() {
            var map = L.mapbox.map(element);
            expect(map.loadURL('http://a.tiles.mapbox.com/v3/mapbox.map-0l53fhk2.json')).to.eql(map);
        });

        it('calls a callback on success', function(done) {
            var map = L.mapbox.map(element);

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
            var map = L.mapbox.map(element);

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

        it('emits a ready event', function(done) {
            var map = L.mapbox.map(element);

            map.on('ready', function(e) {
                done();
            });

            map.loadURL('http://a.tiles.mapbox.com/v3/mapbox.map-0l53fhk2.json');

            server.respondWith("GET", "http://a.tiles.mapbox.com/v3/mapbox.map-0l53fhk2.json",
                [200, { "Content-Type": "application/json" }, JSON.stringify({center: [0, 0, 0]})]);
            server.respond();
        });
    });
});
