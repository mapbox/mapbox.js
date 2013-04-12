describe("L.mapbox.gridControl", function() {
    var element, map, gridLayer;

    beforeEach(function() {
        element = document.createElement('div');
        map = L.mapbox.map(element);
        gridLayer = L.mapbox.gridLayer().addTo(map);
    });

    it('sanitizes its content', function() {
        var control = L.mapbox.gridControl(gridLayer, {
            template: '<script></script>'
        }).addTo(map);

        gridLayer.fire('click', {latLng: L.latLng(0, 0), data: 'data'});
        expect(control._currentContent).to.equal('');
    });

    it('supports a custom sanitizer', function() {
        var control = L.mapbox.gridControl(gridLayer, {
            template: '<script></script>',
            sanitizer: function(_) { return _; }
        }).addTo(map);

        gridLayer.fire('click', {latLng: L.latLng(0, 0), data: 'data'});
        expect(control._currentContent).to.equal('<script></script>');
    });
});
