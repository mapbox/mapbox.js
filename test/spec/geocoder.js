describe('mapbox.geocoder', function() {
    var server;

    beforeEach(function() {
        server = sinon.fakeServer.create();
    });

    afterEach(function() {
        server.restore();
    });

    var json = {
        "query": ["austin"],
        "results": [[{
            "bounds": [-97.9383829999999, 30.098659, -97.5614889999999, 30.516863],
            "lat": 30.3071816,
            "lon": -97.7559964,
            "name": "Austin",
            "score": 600000790107194.8,
            "type": "city",
            "id": "mapbox-places.4201"
        }]]};

    it('performs forward geolocation, centering the map on the first result', function() {
        var g = mapbox.geocoder('http://api.tiles.mapbox.com/v3/examples.map-vyofok3q/geocode/{query}.json');

        server.respondWith('GET',
            'http://api.tiles.mapbox.com/v3/examples.map-vyofok3q/geocode/austin.json',
            [200, { "Content-Type": "application/json" }, JSON.stringify(json)]);

        g.query('austin', function(err, res) {
            expect(res.latlng).to.be.near({lat: 30.3, lng: -97.7}, 1e-1);
        });

        server.respond();
    });

    it('accepts tilejson input and constructs urls', function() {
        var g = mapbox.geocoder();

        expect(g.tilejson(helpers.tileJSON)).to.eql(g);

        expect(g.tilejson(helpers.tileJSON).url()).to
            .eql('http://a.tiles.mapbox.com/v3/examples.map-8ced9urs/geocode/{query}.json');

        expect(g.url()).to
            .eql('http://a.tiles.mapbox.com/v3/examples.map-8ced9urs/geocode/{query}.json');
    });

    it('accepts id input and constructs urls', function() {
        var g = mapbox.geocoder();

        expect(g.id('foo.bar').url()).to
            .eql('http://a.tiles.mapbox.com/v3/foo.bar/geocode/{query}.json');
    });
});
