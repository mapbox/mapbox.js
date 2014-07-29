describe("url", function() {
    describe('#secureFlag', function() {
        it('adds a json flag to urls when the page is secure', function() {
            internals.url.isSSL = function() { return true; };
            expect(internals.url.secureFlag('foo')).to.equal('foo?secure');
            expect(internals.url.secureFlag('foo?foo=bar')).to.equal('foo?foo=bar&secure');
        });
        it('does not add an ssl flag when pages are not ssl', function() {
            internals.url.isSSL = function() { return false; };
            expect(internals.url.secureFlag('foo')).to.equal('foo');
            expect(internals.url.secureFlag('foo?foo=bar')).to.equal('foo?foo=bar');
        });
    });
});
