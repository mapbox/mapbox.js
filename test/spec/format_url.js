describe("format_url", function() {
    var FORCE_HTTPS;

    beforeEach(function() {
        FORCE_HTTPS = internals.config.FORCE_HTTPS;
    });

    afterEach(function() {
        internals.config.FORCE_HTTPS = FORCE_HTTPS;
    });

    it('returns a v4 URL with access_token parameter', function() {
        expect(internals.url('/v4/user.map.json')).to.equal('https://a.tiles.mapbox.com/v4/user.map.json?access_token=key')
    });

    it('uses provided access token', function() {
        expect(internals.url('/v4/user.map.json', 'token')).to.equal('https://a.tiles.mapbox.com/v4/user.map.json?access_token=token')
    });

    it('throws an error if no access token is provided', function() {
        L.mapbox.accessToken = null;
        expect(function() { internals.url('/v4/user.map.json') }).to.throwError('An API access token is required to use Mapbox.js.');
    });

    it('throws an error if a Studio style id is provided', function() {
        L.mapbox.accessToken = null;
        expect(function() {
            internals.url('mapbox://styles/username/foo')
        }).to.throwError('Styles created with Mapbox Studio need to be used with ' +
            'L.mapbox.styleLayer, not L.mapbox.tileLayer');
    });

    it('throws an error if a secret access token is provided', function() {
        L.mapbox.accessToken = 'sk.abc.123';
        expect(function() { internals.url('/v4/user.map.json') }).to.throwError('Use a public access token (pk.*) with Mapbox.js.');
    });

    it('dedupes version out of custom set url', function() {
        internals.config.FORCE_HTTPS = true;
        internals.config.HTTPS_URL = 'https://api-maps-staging.tilestream.net/v4';
        expect(internals.url('/v4/ludacris.map.json')).to.equal('https://api-maps-staging.tilestream.net/v4/ludacris.map.json?access_token=key');
        internals.config.HTTPS_URL = 'https://a.tiles.mapbox.com';
    });

    describe('.tileJSON', function() {
        it('returns the input when passed a URL', function() {
            expect(internals.url.tileJSON('http://a.tiles.mapbox.com/v3/user.map.json')).to.equal('http://a.tiles.mapbox.com/v3/user.map.json')
        });

        it('returns a v4 URL with access_token parameter, uses https and appends &secure', function() {
            expect(internals.url.tileJSON('user.map')).to.equal('https://a.tiles.mapbox.com/v4/user.map.json?access_token=key&secure');
        });

        it('does not append &secure and uses http when FORCE_HTTPS is set to false', function() {
            internals.config.FORCE_HTTPS = false;
            expect(internals.url.tileJSON('user.map')).to.equal('http://a.tiles.mapbox.com/v4/user.map.json?access_token=key');
        });
    });

    describe('.style', function() {
        it('returns a style url with access_token parameter', function() {
            expect(internals.url.style('mapbox://styles/bobbysud/cifr15emd00007zlzxjew2rar')).to.equal('https://a.tiles.mapbox.com/styles/v1/bobbysud/cifr15emd00007zlzxjew2rar?access_token=key')
        });
    });
});
