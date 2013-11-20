describe('L.mapbox.attributionControl', function() {
    it('constructor', function() {
        var attribution = L.mapbox.attributionControl();
        expect(attribution).to.be.ok();
    });

    describe('#addAttribution', function() {
        it('returns the attribution object', function() {
            var attribution = L.mapbox.attributionControl();
            expect(attribution.addAttribution('foo')).to.eql(attribution);
        });

        it('adds a map attribution element to its container', function() {
            var elem = document.createElement('div');
            var map = L.mapbox.map(elem);
            var attribution = L.mapbox.attributionControl();
            attribution.addTo(map);
            expect(attribution.addAttribution('foo')).to.eql(attribution);
            expect(attribution._content.innerHTML).to.eql('<span class="map-attribute">foo </span>');
        });

        it('handles multiple attributions', function() {
            var elem = document.createElement('div');
            var map = L.mapbox.map(elem);
            var attribution = L.mapbox.attributionControl();
            expect(attribution.addTo(map)).to.eql(attribution);
            expect(attribution.addAttribution('foo')).to.eql(attribution);
            expect(attribution.addAttribution('bar')).to.eql(attribution);
            expect(attribution._content.innerHTML).to.eql('<span class="map-attribute">foo </span><span class="map-attribute">bar </span>');
        });
    });

    describe('#removeAttribution', function() {
        it('returns the attribution object', function() {
            var attribution = L.mapbox.attributionControl();
            expect(attribution.addAttribution('foo')).to.eql(attribution);
            expect(attribution.removeAttribution('foo')).to.eql(attribution);
            expect(attribution.removeAttribution()).to.eql(attribution);
        });

        it('adds and removes dom elements', function() {
            var elem = document.createElement('div');
            var map = L.mapbox.map(elem);
            var attribution = L.mapbox.attributionControl();
            attribution.addTo(map);
            expect(attribution.addAttribution('foo')).to.eql(attribution);
            expect(attribution.addAttribution('bar')).to.eql(attribution);
            expect(attribution._content.innerHTML).to.eql('<span class="map-attribute">foo </span><span class="map-attribute">bar </span>');
            expect(attribution.removeAttribution('bar')).to.eql(attribution);
            expect(attribution._content.innerHTML).to.eql('<span class="map-attribute">foo </span>');
        });
    });

    it('sanitizes its content', function() {
        var map = L.map(document.createElement('div'));
        var attribution = L.mapbox.attributionControl().addTo(map);

        attribution.addAttribution('<script></script>');

        expect(attribution._content.innerHTML).to.eql('');
    });

    it('supports a custom sanitizer', function() {
        var map = L.map(document.createElement('div'));
        var attribution = L.mapbox.attributionControl({
            sanitizer: function(_) { return _; }
        }).addTo(map);

        attribution.addAttribution('<script></script>');

        expect(attribution._content.innerHTML).to.eql('<span class="map-attribute"><script></script> </span>');
    });
});
