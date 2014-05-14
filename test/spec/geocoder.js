describe('L.mapbox.geocoder', function() {
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

    var multiJson = [{"query":["austin"],"attribution":{"mapbox-places":"<a href='https://www.mapbox.com/about/maps/' target='_blank'>&copy; Mapbox &copy; OpenStreetMap</a> <a class='mapbox-improve-map' href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a>"},"results":[[{"id":"mapbox-places.78701","bounds":[-98.0261839514054,30.067858231996137,-97.54154705019376,30.489398740397657],"lon":-97.804206,"lat":30.278855,"name":"Austin","type":"city"},{"id":"province.1000418602","name":"Texas","type":"province"},{"id":"country.4150104525","name":"United States","type":"country"}],[{"id":"mapbox-places.89310","bounds":[-117.80679434924265,38.62246699510231,-116.59003701731739,39.99871687910863],"lon":-117.227194,"lat":39.313976,"name":"Austin","type":"city"},{"id":"province.2975076950","name":"Nevada","type":"province"},{"id":"country.4150104525","name":"United States","type":"country"}],[{"id":"mapbox-places.16720","bounds":[-78.36877489826804,41.3983272617798,-77.82614701689207,41.73658270221914],"lon":-77.988041,"lat":41.567676,"name":"Austin","type":"city"},{"id":"province.2184819983","name":"Pennsylvania","type":"province"},{"id":"country.4150104525","name":"United States","type":"country"}],[{"id":"mapbox-places.55912","bounds":[-93.16910498309949,43.526714505771395,-92.7681080168472,43.82098238181999],"lon":-92.929212,"lat":43.674029,"name":"Austin","type":"city"},{"id":"province.4222030107","name":"Minnesota","type":"province"},{"id":"country.4150104525","name":"United States","type":"country"}],[{"id":"mapbox-places.72007","bounds":[-92.12039497936945,34.90795563316439,-91.83894201687612,35.07632430322719],"lon":-92.004189,"lat":35.036604,"name":"Austin","type":"city"},{"id":"province.3855330187","name":"Arkansas","type":"province"},{"id":"country.4150104525","name":"United States","type":"country"}]]},{"query":["houston"],"attribution":{"mapbox-places":"<a href='https://www.mapbox.com/about/maps/' target='_blank'>&copy; Mapbox &copy; OpenStreetMap</a> <a class='mapbox-improve-map' href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a>"},"results":[[{"id":"mapbox-places.77002","bounds":[-95.72045898294519,29.52891526120573,-95.06120101856504,30.04036964534467],"lon":-95.436742,"lat":29.784969,"name":"Houston","type":"city"},{"id":"province.1000418602","name":"Texas","type":"province"},{"id":"country.4150104525","name":"United States","type":"country"}],[{"id":"mapbox-places.38851","bounds":[-89.13825298311654,33.79659653948,-88.79161411435722,34.045110442750946],"lon":-88.976638,"lat":33.920944,"name":"Houston","type":"city"},{"id":"province.788686416","name":"Mississippi","type":"province"},{"id":"country.4150104525","name":"United States","type":"country"}],[{"id":"mapbox-places.55943","bounds":[-91.73075598293974,43.630618500142205,-91.39292801812475,43.93374746914107],"lon":-91.553669,"lat":43.782375,"name":"Houston","type":"city"},{"id":"province.4222030107","name":"Minnesota","type":"province"},{"id":"country.4150104525","name":"United States","type":"country"}],[{"id":"mapbox-places.65483","bounds":[-92.08846697978329,37.2050039768753,-91.84117801818292,37.42995600752302],"lon":-91.92426,"lat":37.317564,"name":"Houston","type":"city"},{"id":"province.3294535744","name":"Missouri","type":"province"},{"id":"country.4150104525","name":"United States","type":"country"}],[{"id":"mapbox-places.35572","bounds":[-87.39912489784082,34.06685573423012,-87.20429004798204,34.300837420778116],"lon":-87.264654,"lat":34.183928,"name":"Houston","type":"city"},{"id":"province.2667756795","name":"Alabama","type":"province"},{"id":"country.4150104525","name":"United States","type":"country"}]]}];

    var revJson = {
        "query":[-97.7,30.3],
        "results":[[{
            "bounds":[-97.9383829999999,30.098659,-97.5614889999999,30.516863],
            "lat":30.3071816,
            "lon":-97.7559964,
            "name":"Austin",
            "score":600000790107194.8,
            "type":"city",
            "id":"mapbox-places.4201"
        }]],"attribution":{"mapbox-places":"<a href='http://mapbox.com/about/maps' target='_blank'>Terms & Feedback</a>"}};

    describe('#setURL', function() {
        it('returns self', function() {
            var g = L.mapbox.geocoder();
            expect(g.setTileJSON(helpers.tileJSON)).to.eql(g);
        });

        it('sets URL', function() {
            var g = L.mapbox.geocoder();
            g.setURL('url');
            expect(g.getURL()).to.eql('url');
        });

        it('converts a jsonp URL', function() {
            var g = L.mapbox.geocoder();
            g.setURL('http://a.tiles.mapbox.com/v3/examples.map-8ced9urs/geocode/{query}.jsonp');
            expect(g.getURL()).to
                .eql('http://a.tiles.mapbox.com/v3/examples.map-8ced9urs/geocode/{query}.json');
        });
    });

    describe('#setTileJSON', function() {
        it('returns self', function() {
            var g = L.mapbox.geocoder();
            expect(g.setTileJSON(helpers.tileJSON)).to.eql(g);
        });

        it('validates its argument', function() {
            var g = L.mapbox.geocoder();
            expect(function() {
                g.setTileJSON('foo');
            }).to.throwException(function(e) {
                expect(e.message).to.eql('Invalid argument: object expected');
            });
        });

        it('sets URL based on geocoder property', function() {
            var g = L.mapbox.geocoder();
            g.setTileJSON({geocoder: 'http://example.com/geocode/{query}.json'});
            expect(g.getURL()).to.eql('http://example.com/geocode/{query}.json');
        });

        it('converts a jsonp URL', function() {
            var g = L.mapbox.geocoder();
            g.setTileJSON({geocoder: 'http://a.tiles.mapbox.com/v3/examples.map-8ced9urs/geocode/{query}.jsonp'});
            expect(g.getURL()).to
                .eql('http://a.tiles.mapbox.com/v3/examples.map-8ced9urs/geocode/{query}.json');
        });
    });

    describe('#setID', function() {
        it('returns self', function() {
            var g = L.mapbox.geocoder();
            expect(g.setID('foo.bar')).to.eql(g);
        });

        it('sets URL', function() {
            var g = L.mapbox.geocoder();
            g.setID('foo.bar');
            expect(g.getURL()).to
                .eql('http://a.tiles.mapbox.com/v3/foo.bar/geocode/{query}.json');
        });
    });

    describe('#queryURL', function() {
        it('supports multiple arguments', function() {
            var g = L.mapbox.geocoder('http://api.tiles.mapbox.com/v3/examples.map-i875kd35/geocode/{query}.json');
            expect(g.queryURL(['austin', 'houston']))
                .to.eql('http://api.tiles.mapbox.com/v3/examples.map-i875kd35/geocode/austin;houston.json');
        });
    });

    describe('#query', function() {
        it('supports multiple arguments', function(done) {
            var g = L.mapbox.geocoder('http://api.tiles.mapbox.com/v3/examples.map-i875kd35/geocode/{query}.json');

            server.respondWith('GET',
                'http://api.tiles.mapbox.com/v3/examples.map-i875kd35/geocode/austin;houston.json',
                [200, { 'Content-Type': 'application/json' }, JSON.stringify(multiJson)]);

            g.query(['austin', 'houston'], function(err, res) {
                expect(err).to.eql(null);
                done();
            });

            server.respond();
        });

        it('performs forward geolocation', function(done) {
            var g = L.mapbox.geocoder('http://api.tiles.mapbox.com/v3/examples.map-i875kd35/geocode/{query}.json');

            server.respondWith('GET',
                'http://api.tiles.mapbox.com/v3/examples.map-i875kd35/geocode/austin.json',
                [200, { "Content-Type": "application/json" }, JSON.stringify(json)]);

            g.query('austin', function(err, res) {
                expect(res.latlng).to.be.near({ lat: 30.3, lng: -97.7 }, 1e-1);
                done();
            });

            server.respond();
        });
    });

    describe('#reverseQuery', function() {
        it('performs reverse geolocation', function() {
            var g = L.mapbox.geocoder('http://api.tiles.mapbox.com/v3/examples.map-i875kd35/geocode/{query}.json');

            server.respondWith('GET',
                'http://api.tiles.mapbox.com/v3/examples.map-i875kd35/geocode/-97.7%2C30.3.json',
                [200, { "Content-Type": "application/json" }, JSON.stringify(revJson)]);

            g.reverseQuery({ lat: 30.3, lng: -97.7 }, function(err, res) {
                expect(res).to.eql(revJson);
            });

            server.respond();
        });
    });
});
