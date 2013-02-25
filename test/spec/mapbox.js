describe("mapbox", function() {
    describe('.auto', function() {
        var server, cors = mapbox.browser.cors;

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

    describe('.base', function() {
        it("returns 'http://a.tiles.mapbox.com/v3/'", function() {
            expect(mapbox.base()).to.equal('http://a.tiles.mapbox.com/v3/');
        });

        it("returns a subdomain based on the number", function() {
            expect(mapbox.base(1)).to.equal('http://b.tiles.mapbox.com/v3/');
            expect(mapbox.base(6)).to.equal('http://c.tiles.mapbox.com/v3/');
        });
    });

    describe('.browser', function() {
        it('detects cors support', function() {
            expect(mapbox.browser.cors).to.be.a('boolean');
        });
    });

    describe(".request", function() {
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

            it("loads from the given URL using XHR", function(done) {
                server.respondWith("GET", "data/tilejson.json",
                    [200, { "Content-Type": "application/json" }, '{"status": "success"}']);

                mapbox.request('data/tilejson.json', function(err, data) {
                    expect(err).to.be(undefined);
                    expect(data).to.eql({status: 'success'});
                    done();
                });

                server.respond();
            });

            it("calls the callback with an error if the request fails", function(done) {
                server.respondWith("GET", "data/tilejson.json",
                    [500, { "Content-Type": "application/json" }, '{"status": "error"}']);

                mapbox.request('data/tilejson.json', function(err, data) {
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

            it("loads from the given URL using JSONP", function() {
                // There's really no good way to test this without a server-side component.
            });
        });
    });
});
