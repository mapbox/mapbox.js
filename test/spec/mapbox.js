describe("mapbox", function() {
    describe('#base', function() {
        it("returns 'http://a.tiles.mapbox.com/v3/'", function() {
            expect(private.url.base()).to.equal('http://a.tiles.mapbox.com/v3/');
        });

        it("returns a subdomain based on the number", function() {
            expect(private.url.base(1)).to.equal('http://b.tiles.mapbox.com/v3/');
            expect(private.url.base(6)).to.equal('http://c.tiles.mapbox.com/v3/');
        });
    });

    describe('#lbounds', function() {
        it('generates a L.LLatLngBounds object', function() {
            expect(mapbox.util.lbounds([0, 1, 2, 3])).to.be.a(L.LatLngBounds);
        });
    });

    describe('#strict', function() {
        it('throws an error on object/string', function() {
            expect(function() {
                mapbox.util.strict({}, 'string');
            }).to.throwException(function(e) {
                expect(e.message).to.eql('Invalid argument: string expected');
            });
            expect(function() {
                mapbox.util.strict('foo', 'object');
            }).to.throwException(function(e) {
                expect(e.message).to.eql('Invalid argument: object expected');
            });
        });
        it('throws an error on string/number', function() {
            expect(function() {
                mapbox.util.strict(5, 'string');
            }).to.throwException(function(e) {
                expect(e.message).to.eql('Invalid argument: string expected');
            });
            expect(function() {
                mapbox.util.strict('5', 'number');
            }).to.throwException(function(e) {
                expect(e.message).to.eql('Invalid argument: number expected');
            });
        });
    });
});
