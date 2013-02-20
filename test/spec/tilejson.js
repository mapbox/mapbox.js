describe("L.TileJSON", function() {
    var tileJSON = {
        'tilejson': '2.0.0',
        'attribution': 'Terms & Feedback',
        'center': [-77.046, 38.907, 12],
        'minzoom': 1,
        'maxzoom': 11,
        'tiles': [
            'http://a.tiles.mapbox.com/v3/examples.map-zr0njcqy/{z}/{x}/{y}.png',
            'http://b.tiles.mapbox.com/v3/examples.map-zr0njcqy/{z}/{x}/{y}.png',
            'http://c.tiles.mapbox.com/v3/examples.map-zr0njcqy/{z}/{x}/{y}.png',
            'http://d.tiles.mapbox.com/v3/examples.map-zr0njcqy/{z}/{x}/{y}.png'
        ]
    };

    describe("#load", function() {
        var server;

        beforeEach(function() {
            server = sinon.fakeServer.create();
        });

        afterEach(function() {
            server.restore();
        });

        describe("in browsers which support CORS", function() {
            var cors = mapbox.browser.cors;

            beforeEach(function() {
                mapbox.browser.cors = true;
            });

            afterEach(function() {
                mapbox.browser.cors = cors;
            });

            it("loads TileJSON from the given URL using XHR", function(done) {
                server.respondWith("GET", "data/tilejson.json",
                    [200, { "Content-Type": "application/json" },
                        JSON.stringify(tileJSON)]);

                L.TileJSON.load('data/tilejson.json', function(err, data) {
                    expect(err).to.be(undefined);
                    expect(data).to.eql(tileJSON);
                    done();
                });

                server.respond();
            });

            it("calls the callback with an error if the request fails", function(done) {
                server.respondWith("GET", "data/tilejson.json",
                    [500, { "Content-Type": "application/json" }, "{error: 'error'}"]);

                L.TileJSON.load('data/tilejson.json', function(err, data) {
                    expect(err).to.be.ok();
                    expect(data).to.be(undefined);
                    done();
                });

                server.respond();
            });
        });

        describe("in browsers which do not support CORS", function() {
            var cors = mapbox.browser.cors;

            beforeEach(function() {
                mapbox.browser.cors = false;
            });

            afterEach(function() {
                mapbox.browser.cors = cors;
            });

            it("loads TileJSON from the given URL using JSONP", function() {
                // There's really no good way to test this without a server-side component.
            });
        });
    });

    describe("LayerGroup", function() {
        it("creates a TileLayer with the appropriate min and max zoom", function() {
            var group = new L.TileJSON.LayerGroup(tileJSON),
                layers = layersOf(group);

            expect(layers[0].options.minZoom).to.equal(1);
            expect(layers[0].options.maxZoom).to.equal(11);
        });

        it("allows access to the tilejson object after assignment", function() {
            var layer = new L.TileJSON.LayerGroup(tileJSON);
            expect(layer.tilejson()).to.equal(tileJSON);
        });

        it("creates a TileLayer with the appropriate attribution", function() {
            var group = new L.TileJSON.LayerGroup(tileJSON),
                layers = layersOf(group);

            expect(layers[0].options.attribution).to.equal('Terms & Feedback');
        });

        it("creates a TileLayer with the appropriate tms option", function() {
            var group = new L.TileJSON.LayerGroup(L.extend({}, tileJSON, {scheme: 'tms'})),
                layers = layersOf(group);

            expect(layers[0].options.tms).to.equal(true);
        });

        it("customizes the TileLayer's getTileUrl method", function() {
            var group = new L.TileJSON.LayerGroup(tileJSON),
                layer = layersOf(group)[0];

            expect(layer.getTileUrl({x: 0, y: 0, z: 0})).to.equal('http://a.tiles.mapbox.com/v3/examples.map-zr0njcqy/0/0/0.png');
            expect(layer.getTileUrl({x: 1, y: 0, z: 0})).to.equal('http://b.tiles.mapbox.com/v3/examples.map-zr0njcqy/0/1/0.png');
            expect(layer.getTileUrl({x: 2, y: 0, z: 0})).to.equal('http://c.tiles.mapbox.com/v3/examples.map-zr0njcqy/0/2/0.png');
            expect(layer.getTileUrl({x: 3, y: 0, z: 0})).to.equal('http://d.tiles.mapbox.com/v3/examples.map-zr0njcqy/0/3/0.png');
            expect(layer.getTileUrl({x: 4, y: 0, z: 0})).to.equal('http://a.tiles.mapbox.com/v3/examples.map-zr0njcqy/0/4/0.png');
        });

        describe("asynchronously", function() {
            var server;

            beforeEach(function() {
                server = sinon.fakeServer.create();
            });

            afterEach(function() {
                server.restore();
            });

            it("adds a TileLayer immediately", function() {
                var group = new L.TileJSON.LayerGroup('data/tilejson.json'),
                    layer = layersOf(group)[0];

                expect(layer).to.be.ok();
            });

            it("adds multiple TileLayers in the order that the LayerGroups were added", function() {
                var map = new L.Map(document.createElement('div')),
                    a = new L.TileJSON.LayerGroup('a'),
                    b = new L.TileJSON.LayerGroup('b');

                map.addLayer(b);
                map.addLayer(a);
                map.setView([0, 0], 1);

                expect(map.getPanes().tilePane.children[0]).to.equal(b._tileLayer._container);
                expect(map.getPanes().tilePane.children[1]).to.equal(a._tileLayer._container);
            });
        })
    });
});
