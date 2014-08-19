describe("url", function() {
    var FORCE_HTTPS;

    beforeEach(function() {
        FORCE_HTTPS = internals.config.FORCE_HTTPS;
    });

    afterEach(function() {
        internals.config.FORCE_HTTPS = FORCE_HTTPS;
    });

    it('returns a v4 URL with access_token parameter', function() {
        expect(internals.url('/user.map.json')).to.equal('http://a.tiles.mapbox.com/v4/user.map.json?access_token=key')
    });

    it('uses provided access token', function() {
        expect(internals.url('/user.map.json', 'token')).to.equal('http://a.tiles.mapbox.com/v4/user.map.json?access_token=token')
    });

    it('throws an error if no access token is provided', function() {
        L.mapbox.accessToken = null;
        expect(function() { internals.url('/user.map.json') }).to.throwError('An API access token is required to use Mapbox.js.');
    });

    it('throws an error if a secret access token is provided', function() {
        L.mapbox.accessToken = 'sk.abc.123';
        expect(function() { internals.url('/user.map.json') }).to.throwError('Use a public access token (pk.*) with Mapbox.js.');
    });

    describe('.tileJSON', function() {
        it('returns the input when passed a URL', function() {
            expect(internals.url.tileJSON('http://a.tiles.mapbox.com/v3/user.map.json')).to.equal('http://a.tiles.mapbox.com/v3/user.map.json')
        });

        it('returns a v4 URL with access_token parameter', function() {
            expect(internals.url.tileJSON('user.map')).to.equal('http://a.tiles.mapbox.com/v4/user.map.json?access_token=key')
        });

        it('appends &secure and uses https when FORCE_HTTPS is set', function() {
            internals.config.FORCE_HTTPS = true;
            expect(internals.url.tileJSON('user.map')).to.equal('https://a.tiles.mapbox.com/v4/user.map.json?access_token=key&secure');
        });
    });
});
