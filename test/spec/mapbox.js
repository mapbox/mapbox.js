describe("mapbox", function() {
    describe('#base', function() {
        it("returns 'http://a.tiles.mapbox.com/v3/'", function() {
            expect(mapbox.base()).to.equal('http://a.tiles.mapbox.com/v3/');
        });

        it("returns a subdomain based on the number", function() {
            expect(mapbox.base(1)).to.equal('http://b.tiles.mapbox.com/v3/');
            expect(mapbox.base(6)).to.equal('http://c.tiles.mapbox.com/v3/');
        });
    });

    describe('#browser', function() {
        it('detects cors support', function() {
            expect(mapbox.browser.cors).to.be.a('boolean');
        });
    });

    describe('#lbounds', function() {
        it('generates a L.LLatLngBounds object', function() {
            expect(mapbox.lbounds([0, 1, 2, 3])).to.be.a(L.LatLngBounds);
        });
    });

    describe('request', function() {
        var server;

        beforeEach(function() {
            server = sinon.fakeServer.create();
        });

        afterEach(function() {
            server.restore();
        });

        describe('in browsers which support CORS', function() {
            var cors = mapbox.browser.cors;

            beforeEach(function() {
                mapbox.browser.cors = true;
            });

            afterEach(function() {
                mapbox.browser.cors = cors;
            });

            it('loads from the given URL using XHR', function(done) {
                server.respondWith("GET", "data/tilejson.json",
                    [200, { "Content-Type": "application/json" }, '{"status": "success"}']);

                mapbox.request('data/tilejson.json', function(err, data) {
                    expect(err).to.be(undefined);
                    expect(data).to.eql({status: 'success'});
                    done();
                });

                server.respond();
            });

            it('calls the callback with an error if the request fails', function(done) {
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

    describe('#strict', function() {
        it('throws an error on object/string', function() {
            expect(function() {
                mapbox.strict({}, 'string');
            }).to.throwException(function(e) {
                expect(e.message).to.eql('Invalid argument: string expected');
            });
            expect(function() {
                mapbox.strict('foo', 'object');
            }).to.throwException(function(e) {
                expect(e.message).to.eql('Invalid argument: object expected');
            });
        });
        it('throws an error on string/number', function() {
            expect(function() {
                mapbox.strict(5, 'string');
            }).to.throwException(function(e) {
                expect(e.message).to.eql('Invalid argument: string expected');
            });
            expect(function() {
                mapbox.strict('5', 'number');
            }).to.throwException(function(e) {
                expect(e.message).to.eql('Invalid argument: number expected');
            });
        });
    });
});
