describe("url", function() {
    var FORCE_HTTPS;

    beforeEach(function() {
        FORCE_HTTPS = internals.config.FORCE_HTTPS;
    });

    afterEach(function() {
        internals.config.FORCE_HTTPS = FORCE_HTTPS;
    });

    describe('.tileJSON', function() {
        it('returns the input when passed a URL', function() {
            expect(internals.url.tileJSON('http://a.tiles.mapbox.com/v3/user.map.json')).to.equal('http://a.tiles.mapbox.com/v3/user.map.json')
        });

        describe('when L.mapbox.key is set', function() {
            beforeEach(function() {
                L.mapbox.key = 'key';
            });

            afterEach(function() {
                delete L.mapbox.key;
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
});
