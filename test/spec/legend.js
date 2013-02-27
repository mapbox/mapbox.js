describe("mapbox.legendControl", function() {
    it('mapbox.legend constructor', function() {
        var legend = mapbox.legendControl();
        expect(legend).to.be.ok();
    });

    it('addLegend', function() {
        var legend = mapbox.legendControl();
        expect(legend.addLegend('foo')).to.eql(legend);
    });

    it('removeLegend', function() {
        var legend = mapbox.legendControl();
        expect(legend.addLegend('foo')).to.eql(legend);
        expect(legend.removeLegend('foo')).to.eql(legend);
    });
});
