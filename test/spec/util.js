describe("util", function() {
    describe('#lbounds', function() {
        it('generates a L.LLatLngBounds object', function() {
            expect(private.util.lbounds([0, 1, 2, 3])).to.be.a(L.LatLngBounds);
        });
    });

    describe('#strict', function() {
        it('throws an error on object/string', function() {
            expect(function() {
                private.util.strict({}, 'string');
            }).to.throwException(function(e) {
                expect(e.message).to.eql('Invalid argument: string expected');
            });
            expect(function() {
                private.util.strict('foo', 'object');
            }).to.throwException(function(e) {
                expect(e.message).to.eql('Invalid argument: object expected');
            });
        });
        it('throws an error on string/number', function() {
            expect(function() {
                private.util.strict(5, 'string');
            }).to.throwException(function(e) {
                expect(e.message).to.eql('Invalid argument: string expected');
            });
            expect(function() {
                private.util.strict('5', 'number');
            }).to.throwException(function(e) {
                expect(e.message).to.eql('Invalid argument: number expected');
            });
        });
    });

    describe('#strip_tags', function() {
        it('strips a basic tag', function() {
            expect(private.util.strip_tags('<div>foo</div>')).to.eql('foo');
        });
        it('strips a self-closing tag', function() {
            expect(private.util.strip_tags('foo <br /> bar')).to.eql('foo  bar');
        });
        it('does not botch non-tag input', function() {
            expect(private.util.strip_tags('rabbit')).to.eql('rabbit');
        });
    });
});
