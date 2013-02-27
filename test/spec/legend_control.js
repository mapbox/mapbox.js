describe('mapbox.legendControl', function() {
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

    it('sanitizes its content', function() {
        var map = L.Map(document.createElement('div'));
        var control = new mapbox.legendControl();
    });

    it('turns sanitization off', function() {
        mapbox.sanitize.on();
        var control = new mapbox.legendControl({
            sanitize: false
        });
        expect(control).to.be.ok();
        expect(mapbox.sanitize.enable()).to.eql(false);
    });
});
