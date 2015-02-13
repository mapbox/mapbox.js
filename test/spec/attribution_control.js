describe('L.control.attribution', function() {
    'use strict';
    it('toggles leaflet-compact-attribution class', function() {
        var el = document.querySelector('body').appendChild(document.createElement('div'));
        var map = L.mapbox.map(el);
        var attributionControl = el.querySelector('.leaflet-control-attribution');
        expect(attributionControl.classList.contains('leaflet-compact-attribution')).to.eql(true);

        el.style.width = '641px';
        map.fire('resize');

        expect(attributionControl.classList.contains('leaflet-compact-attribution')).to.eql(false);
    });

    it('persists leaflet-compact-attribution', function() {
        var el = document.querySelector('body').appendChild(document.createElement('div'));
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
});
