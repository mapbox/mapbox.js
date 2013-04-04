describe('mapbox.legendControl', function() {
    it('constructor', function() {
        var legend = mapbox.legendControl();
        expect(legend).to.be.ok();
    });

    describe('#addLegend', function() {

        it('returns the legend object', function() {
            var legend = mapbox.legendControl();
            expect(legend.addLegend('foo')).to.eql(legend);
        });

        it('adds a map legend element to its container', function() {
            var elem = document.createElement('div');
            var map = mapbox.map(elem);
            var legend = mapbox.legendControl();
            legend.addTo(map);
            expect(legend.addLegend('foo')).to.eql(legend);
            expect(legend._container.innerHTML).to.eql('<div class="map-legend">foo</div>');
        });

        it('handles multiple legends', function() {
            var elem = document.createElement('div');
            var map = mapbox.map(elem);
            var legend = mapbox.legendControl();
            expect(legend.addTo(map)).to.eql(legend);
            expect(legend.addLegend('foo')).to.eql(legend);
            expect(legend.addLegend('bar')).to.eql(legend);
            expect(legend._container.innerHTML).to.eql('<div class="map-legend">foo</div><div class="map-legend">bar</div>');
        });

    });

    describe('#removeLegend', function() {
        it('returns the legend object', function() {
            var legend = mapbox.legendControl();
            expect(legend.addLegend('foo')).to.eql(legend);
            expect(legend.removeLegend('foo')).to.eql(legend);
            expect(legend.removeLegend()).to.eql(legend);
        });

        it('adds and removes dom elements', function() {
            var elem = document.createElement('div');
            var map = mapbox.map(elem);
            var legend = mapbox.legendControl();
            legend.addTo(map);
            expect(legend.addLegend('foo')).to.eql(legend);
            expect(legend.addLegend('bar')).to.eql(legend);
            expect(legend._container.innerHTML).to.eql('<div class="map-legend">foo</div><div class="map-legend">bar</div>');
            expect(legend.removeLegend('bar')).to.eql(legend);
            expect(legend._container.innerHTML).to.eql('<div class="map-legend">foo</div>');
        });
    });

    it('sanitizes its content', function() {
        var elem = document.createElement('div');
        var map = L.map(elem);
        var legend = new mapbox.legendControl();
        legend.addTo(map);
        expect(legend.addLegend('<script></script>')).to.eql(legend);
        expect(legend._container.innerHTML).to.eql('<div class="map-legend"></div>');
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
