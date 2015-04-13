describe('L.control.attribution', function() {
    'use strict';

    var el;

    beforeEach(function() {
        el = document.querySelector('body').appendChild(document.createElement('div'));
    });

    afterEach(function() {
        el.parentNode.removeChild(el);
    });

    it('toggles leaflet-compact-attribution class', function() {
        var map = L.mapbox.map(el);

        el.style.width = '200px';
        map.fire('resize');

        var attributionControl = el.querySelector('.leaflet-control-attribution');
        expect(attributionControl.classList.contains('leaflet-compact-attribution')).to.eql(true);

        el.style.width = '641px';
        map.fire('resize');

        expect(attributionControl.classList.contains('leaflet-compact-attribution')).to.eql(false);
    });

    it('always adds the leaflet-compact-attribution class when {compact: true} is specified', function() {
        var map = L.mapbox.map(el, undefined, {
          attributionControl: {
            compact:true
          }
        });
        var attributionControl = el.querySelector('.leaflet-control-attribution');

        el.style.width = '641px';
        map.fire('resize');

        expect(attributionControl.classList.contains('leaflet-compact-attribution')).to.eql(true);
    });

    it('never adds the leaflet-compact-attribution class when {compact: false} is specified', function() {
        var map = L.mapbox.map(el, undefined, {
          attributionControl: {
            compact:false
          }
        });
        var attributionControl = el.querySelector('.leaflet-control-attribution');

        el.style.width = '640px';
        map.fire('resize');

        expect(attributionControl.classList.contains('leaflet-compact-attribution')).to.eql(false);

        el.style.width = '641px';
        map.fire('resize');

        expect(attributionControl.classList.contains('leaflet-compact-attribution')).to.eql(false);
    });
});
