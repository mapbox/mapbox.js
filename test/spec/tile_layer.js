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

        it('loads TileJSON from a URL', function(done) {
            var layer = L.mapbox.tileLayer('https://a.tiles.mapbox.com/v3/L.mapbox.map-0l53fhk2.json');

            layer.on('ready', function() {
                expect(this).to.equal(layer);
                expect(layer.getTileJSON()).to.eql(helpers.tileJSON);
                done();
            });

            server.respondWith("GET", "https://a.tiles.mapbox.com/v3/L.mapbox.map-0l53fhk2.json?secure",
                [200, { "Content-Type": "application/json" }, JSON.stringify(helpers.tileJSON)]);
            server.respond();
        });

        it('loads TileJSON from an ID', function(done) {
            var layer = L.mapbox.tileLayer('L.mapbox.map-0l53fhk2');

            layer.on('ready', function() {
                expect(this).to.equal(layer);
                expect(layer.getTileJSON()).to.eql(helpers.tileJSON);
                done();
            });

            server.respondWith("GET", "https://a.tiles.mapbox.com/v3/L.mapbox.map-0l53fhk2.json?secure",
                [200, { "Content-Type": "application/json" }, JSON.stringify(helpers.tileJSON)]);
            server.respond();
        });

        it('emits an error event', function(done) {
            var layer = L.mapbox.tileLayer('https://a.tiles.mapbox.com/v3/L.mapbox.map-0l53fhk2.json?secure');

            layer.on('error', function(e) {
                expect(this).to.equal(layer);
                expect(e.error.status).to.equal(400);
                done();
            });

            server.respondWith("GET", "https://a.tiles.mapbox.com/v3/L.mapbox.map-0l53fhk2.json?secure",
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
        beforeEach(setRetina(false));
        it("distributes over the URLs in the tiles property", function() {
            var layer = L.mapbox.tileLayer(helpers.tileJSON);
            expect(layer.getTileUrl({x: 0, y: 0, z: 0})).to.equal('https://a.tiles.mapbox.com/v3/examples.map-8ced9urs/0/0/0.png');
            expect(layer.getTileUrl({x: 1, y: 0, z: 0})).to.equal('https://b.tiles.mapbox.com/v3/examples.map-8ced9urs/0/1/0.png');
            expect(layer.getTileUrl({x: 2, y: 0, z: 0})).to.equal('https://c.tiles.mapbox.com/v3/examples.map-8ced9urs/0/2/0.png');
            expect(layer.getTileUrl({x: 3, y: 0, z: 0})).to.equal('https://d.tiles.mapbox.com/v3/examples.map-8ced9urs/0/3/0.png');
            expect(layer.getTileUrl({x: 4, y: 0, z: 0})).to.equal('https://a.tiles.mapbox.com/v3/examples.map-8ced9urs/0/4/0.png');
        });
        it("changes format of tiles", function() {
            var layer = L.mapbox.tileLayer(helpers.tileJSON).setFormat('jpg70');
            expect(layer.getTileUrl({x: 0, y: 0, z: 0})).to.equal('https://a.tiles.mapbox.com/v3/examples.map-8ced9urs/0/0/0.jpg70');
            expect(layer.getTileUrl({x: 1, y: 0, z: 0})).to.equal('https://b.tiles.mapbox.com/v3/examples.map-8ced9urs/0/1/0.jpg70');
            expect(layer.getTileUrl({x: 2, y: 0, z: 0})).to.equal('https://c.tiles.mapbox.com/v3/examples.map-8ced9urs/0/2/0.jpg70');
            expect(layer.getTileUrl({x: 3, y: 0, z: 0})).to.equal('https://d.tiles.mapbox.com/v3/examples.map-8ced9urs/0/3/0.jpg70');
            expect(layer.getTileUrl({x: 4, y: 0, z: 0})).to.equal('https://a.tiles.mapbox.com/v3/examples.map-8ced9urs/0/4/0.jpg70');
        });
    });

    describe("#autoScale", function() {
        it("uses retina automatically", function() {
            setRetina(true)();
            var layer = L.mapbox.tileLayer(helpers.tileJSON_autoscale, {
                detectRetina: true
            });
            expect(layer.getTileUrl({x: 0, y: 0, z: 0})).to.equal('https://a.tiles.mapbox.com/v3/tmcw.map-oitj0si5/0/0/0@2x.png');
        });
        it("does not engage on non-retina systems", function() {
            setRetina(false)();
            var layer = L.mapbox.tileLayer(helpers.tileJSON_autoscale, {
                detectRetina: true
            });
            expect(layer.getTileUrl({x: 0, y: 0, z: 0})).to.equal('https://a.tiles.mapbox.com/v3/tmcw.map-oitj0si5/0/0/0.png');
        });
        it("does not engage with detectRetina: false", function() {
            setRetina(true)();
            var layer = L.mapbox.tileLayer(helpers.tileJSON_autoscale, {
                detectRetina: false
            });
            expect(layer.getTileUrl({x: 0, y: 0, z: 0})).to.equal('https://a.tiles.mapbox.com/v3/tmcw.map-oitj0si5/0/0/0.png');
        });
    });



    function setRetina(x) {
        return function() {
            L.Browser.retina = x;
        };
    }
});
