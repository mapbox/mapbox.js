describe("mapbox.marker", function() {

    describe('mapbox.marker.style', function() {

        it("produces a small marker", function() {
            var marker = mapbox.marker.style({
                properties: {
                    'marker-size': 'small'
                }
            });
            expect(marker.options.icon.options.iconUrl).to.contain('pin-s');
        });

        it("produces an icon", function() {
            var icon = mapbox.marker.icon({
                'marker-size': 'large'
            });
            expect(icon.options.iconUrl).to.contain('pin-l');
        });

        it("produces a medium marker", function() {
                var marker = mapbox.marker.style({
                properties: {
                    'marker-size': 'medium'
                }
            });
            expect(marker.options.icon.options.iconUrl).to.contain('pin-m');
        });

        it("produces a red marker", function() {
                var marker = mapbox.marker.style({
                properties: {
                    'marker-color': 'f00'
                }
            });
            expect(marker.options.icon.options.iconUrl).to.contain('f00');
        });

        it('integrates with leaflet', function() {
            var geoJson = {
                type: 'FeatureCollection',
                features: [{
                    type: 'Feature',
                    properties: {
                        title: 'foo',
                        'marker-color': '#f00',
                        'marker-size': 'large'
                    },
                    geometry: {
                        type: 'Point',
                        coordinates: [-77.0203, 38.8995]
                    }
                }]
            };

            expect(function() {
                L.geoJson(geoJson, {
                    pointToLayer: mapbox.marker.style
                });
            }).to.not.throwException();
        });
    });
});
