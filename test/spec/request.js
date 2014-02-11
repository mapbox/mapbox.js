describe('request', function() {
    'use strict';

    var server;

    beforeEach(function() {
        server = sinon.fakeServer.create();
    });

    afterEach(function() {
        server.restore();
    });

    it('loads from the given URL using XHR', function(done) {
        server.respondWith("GET", "data/tilejson.json",
            [200, { "Content-Type": "application/json" }, '{"status": "success"}']);

        expect(internals.request('data/tilejson.json', function(err, data) {
            expect(err).to.be(null);
            expect(data).to.eql({status: 'success'});
            done();
        })).to.be.ok();

        server.respond();
    });

    it('calls the callback with an error if the request fails', function(done) {
        server.respondWith("GET", "data/tilejson.json",
            [500, { "Content-Type": "application/json" }, '{"status": "error"}']);

        expect(internals.request('data/tilejson.json', function(err, data) {
            expect(err).to.be.ok();
            expect(data).to.be(null);
            done();
        })).to.be.ok();

        server.respond();
    });
});
