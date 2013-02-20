describe('mapbox.marker', function() {
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

    describe('.style', function() {
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
            expect(function() {
                L.geoJson(geoJson, {
                    pointToLayer: mapbox.marker.style
                });
            }).to.not.throwException();
        });
    });

    describe('.layer', function() {
        var server;

        beforeEach(function() {
            server = sinon.fakeServer.create();
        });

        afterEach(function() {
            server.restore();
        });

        it('loads data from a GeoJSON source', function() {
            var layer = new mapbox.marker.layer(geoJson),
                marker = layersOf(layer)[0];
            expect(marker instanceof L.Marker).to.equal(true);
            expect(marker.getLatLng()).to.be.near({lng: -77.0203, lat: 38.8995}, 0);
        });

        it('loads data from a GeoJSON URL', function() {
            var url = 'http://api.tiles.mapbox.com/v3/examples.map-zr0njcqy/markers.geojson',
                layer = new mapbox.marker.layer(url);

            server.respondWith("GET", url,
                [200, { "Content-Type": "application/json" }, JSON.stringify(geoJson)]);
            server.respond();

            var marker = layersOf(layer)[0];
            expect(marker instanceof L.Marker).to.equal(true);
            expect(marker.getLatLng()).to.be.near({lng: -77.0203, lat: 38.8995}, 0);
        });

        it('loads data for a map ID', function() {
            var id = 'examples.map-zr0njcqy',
                url = 'http://a.tiles.mapbox.com/v3/examples.map-zr0njcqy/markers.geojson',
                layer = new mapbox.marker.layer(id);

            server.respondWith("GET", url,
                [200, { "Content-Type": "application/json" }, JSON.stringify(geoJson)]);
            server.respond();

            var marker = layersOf(layer)[0];
            expect(marker instanceof L.Marker).to.equal(true);
            expect(marker.getLatLng()).to.be.near({lng: -77.0203, lat: 38.8995}, 0);
        });

        it('replaces jsonp URLs with the equivalent json URL', function() {
            var url = 'http://api.tiles.mapbox.com/v3/examples.map-zr0njcqy/markers.geojson',
                layer = new mapbox.marker.layer(url + 'p');

            server.respondWith("GET", url,
                [200, { "Content-Type": "application/json" }, JSON.stringify(geoJson)]);
            server.respond();

            var marker = layersOf(layer)[0];
            expect(marker instanceof L.Marker).to.equal(true);
            expect(marker.getLatLng()).to.be.near({lng: -77.0203, lat: 38.8995}, 0);
        });
    });
});
