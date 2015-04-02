describe("L.mapbox.tileLayer", function() {
    var server;

    beforeEach(function() {
        server = sinon.fakeServer.create();
    });

    afterEach(function() {
        server.restore();
    });

    describe("constructor", function() {
        it("sets min and max zoom", function() {
            var layer = L.mapbox.tileLayer(helpers.tileJSON);
            expect(layer.options.minZoom).to.equal(0);
            expect(layer.options.maxZoom).to.equal(17);
            expect(layer instanceof L.mapbox.TileLayer).to.eql(true);
        });

        it("sets attribution", function() {
            var layer = L.mapbox.tileLayer(helpers.tileJSON);
            expect(layer.options.attribution).to.equal('Data provided by NatureServe in collaboration with Robert Ridgely');
        });

        it("sets tms option", function() {
            var layer = L.mapbox.tileLayer(L.extend({}, helpers.tileJSON, {scheme: 'tms'}));
            expect(layer.options.tms).to.equal(true);
        });

        it("sets bounds", function() {
            var layer = L.mapbox.tileLayer(helpers.tileJSON);
            expect(layer.options.bounds).to.eql(L.latLngBounds([[-85.0511, -180], [85.0511, 180]]));
        });

        it("sanitizes attribution", function() {
            var layer = L.mapbox.tileLayer(L.extend({}, helpers.tileJSON, {attribution: '<script>alert("test")</script>'}));
            expect(layer.options.attribution).to.equal('');
        });

        it('loads TileJSON from a URL', function(done) {
            var layer = L.mapbox.tileLayer('http://a.tiles.mapbox.com/v3/mapbox.map-0l53fhk2.json');

            layer.on('ready', function() {
                expect(this).to.equal(layer);
                expect(layer.getTileJSON()).to.eql(helpers.tileJSON);
                done();
            });

            server.respondWith("GET", "http://a.tiles.mapbox.com/v3/mapbox.map-0l53fhk2.json",
                [200, { "Content-Type": "application/json" }, JSON.stringify(helpers.tileJSON)]);
            server.respond();
        });

        it('loads TileJSON from an ID', function(done) {
            var layer = L.mapbox.tileLayer('mapbox.map-0l53fhk2');

            layer.on('ready', function() {
                expect(this).to.equal(layer);
                expect(layer.getTileJSON()).to.eql(helpers.tileJSON);
                done();
            });

            server.respondWith("GET", internals.url.tileJSON('mapbox.map-0l53fhk2'),
                [200, { "Content-Type": "application/json" }, JSON.stringify(helpers.tileJSON)]);
            server.respond();
        });

        it('supports custom access token', function(done) {
            var layer = L.mapbox.tileLayer('mapbox.map-0l53fhk2', {accessToken: 'custom'});

            layer.on('ready', function() {
                expect(this).to.equal(layer);
                expect(layer.getTileJSON()).to.eql(helpers.tileJSON);
                done();
            });

            server.respondWith("GET", internals.url.tileJSON('mapbox.map-0l53fhk2', 'custom'),
                [200, { "Content-Type": "application/json" }, JSON.stringify(helpers.tileJSON)]);
            server.respond();
        });

        it('emits an error event', function(done) {
            var layer = L.mapbox.tileLayer('mapbox.map-0l53fhk2');

            layer.on('error', function(e) {
                expect(this).to.equal(layer);
                expect(e.error.status).to.equal(400);
                done();
            });

            server.respondWith("GET", internals.url.tileJSON('mapbox.map-0l53fhk2'),
                [400, { "Content-Type": "application/json" }, JSON.stringify({error: 'error'})]);
            server.respond();
        });
    });

    describe("#getTileJSON", function() {
        it('gets tilejson', function() {
            var layer = L.mapbox.tileLayer(helpers.tileJSON);
            expect(layer.getTileJSON()).to.eql(helpers.tileJSON);
        });
    });

    describe("#getTileUrl", function() {
        var retina;

        beforeEach(function() {
            retina = L.Browser.retina;
            L.Browser.retina = false;
        });

        afterEach(function() {
            L.Browser.retina = retina;
        });

        it("distributes over the URLs in the tiles property", function() {
            var layer = L.mapbox.tileLayer(helpers.tileJSON);
            expect(layer.getTileUrl({x: 0, y: 0, z: 0})).to.equal('http://a.tiles.mapbox.com/v3/examples.map-8ced9urs/0/0/0.png');
            expect(layer.getTileUrl({x: 1, y: 0, z: 0})).to.equal('http://b.tiles.mapbox.com/v3/examples.map-8ced9urs/0/1/0.png');
            expect(layer.getTileUrl({x: 2, y: 0, z: 0})).to.equal('http://c.tiles.mapbox.com/v3/examples.map-8ced9urs/0/2/0.png');
            expect(layer.getTileUrl({x: 3, y: 0, z: 0})).to.equal('http://d.tiles.mapbox.com/v3/examples.map-8ced9urs/0/3/0.png');
            expect(layer.getTileUrl({x: 4, y: 0, z: 0})).to.equal('http://a.tiles.mapbox.com/v3/examples.map-8ced9urs/0/4/0.png');
        });

        it("changes format of tiles", function() {
            var layer = L.mapbox.tileLayer(helpers.tileJSON).setFormat('jpg70');
            expect(layer.getTileUrl({x: 0, y: 0, z: 0})).to.equal('http://a.tiles.mapbox.com/v3/examples.map-8ced9urs/0/0/0.jpg70');
            expect(layer.getTileUrl({x: 1, y: 0, z: 0})).to.equal('http://b.tiles.mapbox.com/v3/examples.map-8ced9urs/0/1/0.jpg70');
            expect(layer.getTileUrl({x: 2, y: 0, z: 0})).to.equal('http://c.tiles.mapbox.com/v3/examples.map-8ced9urs/0/2/0.jpg70');
            expect(layer.getTileUrl({x: 3, y: 0, z: 0})).to.equal('http://d.tiles.mapbox.com/v3/examples.map-8ced9urs/0/3/0.jpg70');
            expect(layer.getTileUrl({x: 4, y: 0, z: 0})).to.equal('http://a.tiles.mapbox.com/v3/examples.map-8ced9urs/0/4/0.jpg70');
        });

        it("requests @2x tiles on retina", function() {
            L.Browser.retina = true;
            var layer = L.mapbox.tileLayer(helpers.tileJSON);
            expect(layer.getTileUrl({x: 0, y: 0, z: 0})).to.equal('http://a.tiles.mapbox.com/v3/examples.map-8ced9urs/0/0/0@2x.png');
        });

        it("requests @2x tiles on retina (jpg format)", function() {
            L.Browser.retina = true;
            var layer = L.mapbox.tileLayer(helpers.tileJSON_jpg);
            expect(layer.getTileUrl({x: 0, y: 0, z: 0})).to.equal('http://a.tiles.mapbox.com/v3/examples.map-8ced9urs/0/0/0@2x.jpg');
        });

        it("requests @2x tiles on retina (custom format)", function() {
            L.Browser.retina = true;
            var layer = L.mapbox.tileLayer(helpers.tileJSON).setFormat('jpg70');
            expect(layer.getTileUrl({x: 0, y: 0, z: 0})).to.equal('http://a.tiles.mapbox.com/v3/examples.map-8ced9urs/0/0/0@2x.jpg70');
        });
    });
});
