describe('L.mapbox.geocoder', function() {
    var server;

    beforeEach(function() {
        server = sinon.fakeServer.create();
    });

    afterEach(function() {
        server.restore();
    });

    describe('#queryURL', function() {
        it('supports multiple arguments', function() {
            var g = L.mapbox.geocoder('mapbox.places-v1');
            expect(g.queryURL(['austin', 'houston']))
                .to.eql('http://a.tiles.mapbox.com/v4/geocode/mapbox.places-v1/austin;houston.json?access_token=key');
        });
    });

    describe('#query', function() {
        it('supports bulk geocodes', function(done) {
            var g = L.mapbox.geocoder('mapbox.places-v1');

            server.respondWith('GET',
                'http://a.tiles.mapbox.com/v4/geocode/mapbox.places-v1/austin;houston.json?access_token=key',
                [200, { 'Content-Type': 'application/json' }, JSON.stringify(helpers.geocoderBulk)]);

            g.query(['austin', 'houston'], function(err, res) {
                expect(err).to.eql(null);
                done();
            });

            server.respond();
        });

        it('performs forward geolocation', function(done) {
            var g = L.mapbox.geocoder('mapbox.places-v1');

            server.respondWith('GET',
                'http://a.tiles.mapbox.com/v4/geocode/mapbox.places-v1/austin.json?access_token=key',
                [200, { "Content-Type": "application/json" }, JSON.stringify(helpers.geocoderAustin)]);

            g.query('austin', function(err, res) {
                expect(res.latlng).to.be.near({ lat: 30.2, lng: -97.8 }, 1e-1);
                expect(res.results).to.eql(helpers.geocoderAustin);
                done();
            });

            server.respond();
        });

        it('handles no results', function(done) {
            var g = L.mapbox.geocoder('mapbox.places-v1');

            server.respondWith('GET',
                'http://a.tiles.mapbox.com/v4/geocode/mapbox.places-v1/nonesuch.json?access_token=key',
                [200, { 'Content-Type': 'application/json' }, JSON.stringify({"type":"FeatureCollection","query":["nonesuch"],"features":[]})]);

            g.query('nonesuch', function(err, res) {
                expect(err).to.eql(null);
                done();
            });

            server.respond();
        });
    });

    describe('#reverseQuery', function() {
        it('performs reverse geolocation', function() {
            var g = L.mapbox.geocoder('mapbox.places-v1');

            server.respondWith('GET',
                'http://a.tiles.mapbox.com/v4/geocode/mapbox.places-v1/-97.7%2C30.3.json?access_token=key',
                [200, { "Content-Type": "application/json" }, JSON.stringify(helpers.geocoderReverse)]);

            g.reverseQuery({ lat: 30.3, lng: -97.7 }, function(err, res) {
                expect(res).to.eql(helpers.geocoderReverse);
            });

            server.respond();
        });
    });
});
