describe("url", function() {
    describe('#base', function() {
        it("returns 'http://a.tiles.mapbox.com/v3/'", function() {
            expect(private.url.base()).to.equal('http://a.tiles.mapbox.com/v3/');
        });

        it("returns a subdomain based on the number", function() {
            expect(private.url.base(1)).to.equal('http://b.tiles.mapbox.com/v3/');
            expect(private.url.base(6)).to.equal('http://c.tiles.mapbox.com/v3/');
        });
    });
});
