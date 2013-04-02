describe('mapbox.sanitize', function() {
    describe('sanitize', function() {
        var bad = '<a href="data:foo/bar">foo</a>',
            good = '<a>foo</a>';
        describe('default', function() {
            it('cleans a simple string', function() {
                expect(mapbox.sanitize('foo bar')).to.eql('foo bar');
            });
            it('sanitizes data urls', function() {
                mapbox.sanitize.on();
                expect(mapbox.sanitize(bad)).to.eql(good);
            });
        });
        describe('#on', function() {
            it('turns the sanitization on and off', function() {
                mapbox.sanitize.off();
                expect(mapbox.sanitize(bad)).to.eql(bad);
                mapbox.sanitize.on();
            });
        });
        describe('#enable', function() {
            it('turns the sanitization on and off', function() {
                mapbox.sanitize.enable(false);
                expect(mapbox.sanitize(bad)).to.eql(bad);
                mapbox.sanitize.enable(true);
                expect(mapbox.sanitize(bad)).to.eql(good);
            });
        });
    });
});
