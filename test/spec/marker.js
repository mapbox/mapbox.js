describe('mapbox.marker', function() {
    describe('#style', function() {
        it("produces a small marker", function() {
            var marker = mapbox.marker.style({
                properties: {
                    'marker-size': 'small'
                }
            });
            expect(marker.options.icon.options.iconUrl).to.contain('pin-s');
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

        it("produces a custom marker icon", function() {
            var markerIcon = L.icon({
                iconUrl: 'http://placehold.it/50x50'
            });

            var marker = mapbox.marker.style({
                properties: {
                    'icon': markerIcon
                }
            });
            expect(marker.options.icon.options.iconUrl).to.contain('50x50');
        });

        it("sets a marker's title", function() {
            var marker = mapbox.marker.style({
                properties: {
                    title: 'test'
                }
            });
            expect(marker.options.title).to.equal('test');
        });

        it('integrates with leaflet', function() {
            expect(function() {
                L.geoJson(helpers.geoJson, {
                    pointToLayer: mapbox.marker.style
                });
            }).to.not.throwException();
        });
    });

    describe('#icon', function() {
        it("produces an icon", function() {
            var icon = mapbox.marker.icon({
                'marker-size': 'large'
            });
            expect(icon.options.iconUrl).to.contain('pin-l');
        });
    });
});
