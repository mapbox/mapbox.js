describe("L.mapbox.gridControl", function() {
    var element, map, gridLayer;

    beforeEach(function() {
        element = document.createElement('div');
        map = L.mapbox.map(element);
        gridLayer = L.mapbox.gridLayer().addTo(map);
    });

    describe('mouseover data area', function() {
        it('adds map-clickable class to map container', function() {
            L.mapbox.gridControl(gridLayer).addTo(map);
            gridLayer.fire('mouseover', {data: 'data'});
            expect(element.className).to.match(/map-clickable/);
        });

        it('shows teaser content', function() {
            var control = L.mapbox.gridControl(gridLayer, {
                template: '{{#__teaser__}}{{name}}{{/__teaser__}}'
            }).addTo(map);
            gridLayer.fire('mouseover', {data: {name: 'John'}});
            expect(control._contentWrapper.innerHTML).to.equal('John');
        });

        it('does not change teaser content when pinned', function() {
            var control = L.mapbox.gridControl(gridLayer, {
                template: '{{#__teaser__}}{{name}}{{/__teaser__}}'
            }).addTo(map);
            control._pinned = true;
            gridLayer.fire('mouseover', {data: {name: 'John'}});
            expect(control._contentWrapper.innerHTML).to.equal('');
        })
    });

    describe('mouseover dataless area', function() {
        it('removes map-clickable class from map container', function() {
            L.mapbox.gridControl(gridLayer).addTo(map);
            L.DomUtil.addClass(element, 'map-clickable');
            gridLayer.fire('mouseover', {data: null});
            expect(element.className).not.to.match(/map-clickable/);
        });

        it('hides content', function() {
            var control = L.mapbox.gridControl(gridLayer, {
                template: '{{name}}'
            }).addTo(map);
            gridLayer.fire('mouseover', {data: {name: 'John'}});
            gridLayer.fire('mouseover', {data: null});
            expect(control._container.style.display).to.equal('none');
            expect(control._contentWrapper.innerHTML).to.equal('');
        });

        it('does not hide when pinned', function() {
            var control = L.mapbox.gridControl(gridLayer, {
                template: '{{name}}'
            }).addTo(map);
            gridLayer.fire('mouseover', {data: {name: 'John'}});
            control._pinned = true;
            gridLayer.fire('mouseover', {data: null});
            expect(control._container.style.display).to.equal('block');
            expect(control._contentWrapper.innerHTML).to.equal('John');
        });
    });

    describe('click data area', function() {
        it('pins full content', function() {
            var control = L.mapbox.gridControl(gridLayer, {
                template: '{{#__full__}}{{name}}{{/__full__}}'
            }).addTo(map);
            gridLayer.fire('click', {data: {name: 'John'}});
            expect(control._contentWrapper.innerHTML).to.equal('John');
            expect(control._pinned).to.equal(true);
        });
    });

    describe('click dataless area', function() {
        it('unpins content', function() {
            var control = L.mapbox.gridControl(gridLayer, {
                template: '{{name}}'
            }).addTo(map);
            gridLayer.fire('click', {data: {name: 'John'}});
            gridLayer.fire('click', {data: null});
            expect(control._container.style.display).to.equal('none');
            expect(control._contentWrapper.innerHTML).to.equal('');
        });
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
