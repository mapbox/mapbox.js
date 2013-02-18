describe("mapbox", function() {
    describe('mapbox.base', function() {
        it("returns 'http://a.tiles.mapbox.com/v3/'", function() {
            expect(mapbox.base()).to.equal('http://a.tiles.mapbox.com/v3/');
        });

        it("returns a subdomain based on the number", function() {
            expect(mapbox.base(1)).to.equal('http://b.tiles.mapbox.com/v3/');
            expect(mapbox.base(6)).to.equal('http://c.tiles.mapbox.com/v3/');
        });
    });

    describe('mapbox.browser', function() {
        it('detects cors support', function() {
            expect(mapbox.browser.cors).to.be.a('boolean');
        });
    });
});
