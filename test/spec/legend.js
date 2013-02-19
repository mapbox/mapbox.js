describe("mapbox.legend", function() {
    it('mapbox.legend constructor', function() {
        var legend = mapbox.legend();
        expect(legend).to.be.ok();
    });

    it('addLegend', function() {
        var legend = mapbox.legend();
        expect(legend.addLegend('foo')).to.eql(legend);
    });

    it('removeLegend', function() {
        var legend = mapbox.legend();
        expect(legend.addLegend('foo')).to.eql(legend);
        expect(legend.removeLegend('foo')).to.eql(legend);
    });
});
