describe('sanitize', function() {
    it('sanitizes a simple string', function() {
        expect(private.sanitize('foo bar')).to.eql('foo bar');
    });

    it('sanitizes data urls', function() {
        expect(private.sanitize('<a href="data:foo/bar">foo</a>'))
            .to.eql('<a>foo</a>');
    });
});
