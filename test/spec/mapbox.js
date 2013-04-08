describe("mapbox", function() {
    describe('#base', function() {
        it("returns 'http://a.tiles.mapbox.com/v3/'", function() {
            expect(private.url.base()).to.equal('http://a.tiles.mapbox.com/v3/');
        });

        it("returns a subdomain based on the number", function() {
            expect(private.url.base(1)).to.equal('http://b.tiles.mapbox.com/v3/');
            expect(private.url.base(6)).to.equal('http://c.tiles.mapbox.com/v3/');
        });
    });

    describe('#lbounds', function() {
        it('generates a L.LLatLngBounds object', function() {
            expect(mapbox.util.lbounds([0, 1, 2, 3])).to.be.a(L.LatLngBounds);
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

            it('loads from the given URL using XHR', function(done) {
                server.respondWith("GET", "data/tilejson.json",
                    [200, { "Content-Type": "application/json" }, '{"status": "success"}']);

                mapbox.request('data/tilejson.json', function(err, data) {
                    expect(err).to.be(null);
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
    });

    describe('#strict', function() {
        it('throws an error on object/string', function() {
            expect(function() {
                mapbox.util.strict({}, 'string');
            }).to.throwException(function(e) {
                expect(e.message).to.eql('Invalid argument: string expected');
            });
            expect(function() {
                mapbox.util.strict('foo', 'object');
            }).to.throwException(function(e) {
                expect(e.message).to.eql('Invalid argument: object expected');
            });
        });
        it('throws an error on string/number', function() {
            expect(function() {
                mapbox.util.strict(5, 'string');
            }).to.throwException(function(e) {
                expect(e.message).to.eql('Invalid argument: string expected');
            });
            expect(function() {
                mapbox.util.strict('5', 'number');
            }).to.throwException(function(e) {
                expect(e.message).to.eql('Invalid argument: number expected');
            });
        });
    });
});
