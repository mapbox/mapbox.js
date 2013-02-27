describe("mapbox", function() {
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
                    expect(data).to.be(null);
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
    describe('.sanitize', function() {
        var bad = '<a href="data:foo/bar">foo</a>';
        describe('default', function() {
            it('cleans a simple string', function() {
                expect(mapbox.sanitize('foo bar')).to.eql('foo bar');
            });
            it('sanitizes data urls', function() {
                expect(mapbox.sanitize(bad)).to.eql('<a>foo</a>');
            });
        });
        describe('.on', function() {
            it('turns the sanitization on and off', function() {
                mapbox.sanitize.off();
                expect(mapbox.sanitize(bad)).to.eql(bad);
                mapbox.sanitize.on();
            });
        });
        describe('.enable', function() {
            it('turns the sanitization on and off', function() {
                mapbox.sanitize.enable(false);
                expect(mapbox.sanitize(bad)).to.eql(bad);
                mapbox.sanitize.enable(true);
            });
        });
    });
});
