describe('L.mapbox.featureLayer', function() {
    'use strict';

    var server;

    beforeEach(function() {
        server = sinon.fakeServer.create();
    });

    afterEach(function() {
        server.restore();
    });

    it('loads data from a GeoJSON source', function() {
        var layer = L.mapbox.featureLayer(helpers.geoJson),
            marker = layer.getLayers()[0];
        expect(marker instanceof L.Marker).to.equal(true);
        expect(layer instanceof L.mapbox.FeatureLayer).to.be.equal(true);
        expect(marker.getLatLng()).to.be.near({lng: -77.0203, lat: 38.8995}, 0);
    });

    it('loads data from a GeoJSON URL', function() {
        var url = 'http://api.tiles.mapbox.com/v4/examples.map-zr0njcqy/features.json',
            layer = L.mapbox.featureLayer(url);

        server.respondWith("GET", url,
            [200, { "Content-Type": "application/json" }, JSON.stringify(helpers.geoJson)]);
        server.respond();

        var marker = layer.getLayers()[0];
        expect(marker instanceof L.Marker).to.equal(true);
        expect(marker.getLatLng()).to.be.near({lng: -77.0203, lat: 38.8995}, 0);
    });

    it('loads data for a map ID', function() {
        var layer = L.mapbox.featureLayer('mapbox.map-0l53fhk2');

        server.respondWith("GET", internals.url('/v4/mapbox.map-0l53fhk2/features.json'),
            [200, { "Content-Type": "application/json" }, JSON.stringify(helpers.geoJson)]);
        server.respond();

        var marker = layer.getLayers()[0];
        expect(marker instanceof L.Marker).to.equal(true);
        expect(marker.getLatLng()).to.be.near({lng: -77.0203, lat: 38.8995}, 0);
    });

    it('supports custom access token', function() {
        var layer = L.mapbox.featureLayer('mapbox.map-0l53fhk2', {accessToken: 'custom'});

        server.respondWith("GET", internals.url('/v4/mapbox.map-0l53fhk2/features.json', 'custom'),
            [200, { "Content-Type": "application/json" }, JSON.stringify(helpers.geoJson)]);
        server.respond();

        var marker = layer.getLayers()[0];
        expect(marker instanceof L.Marker).to.equal(true);
        expect(marker.getLatLng()).to.be.near({lng: -77.0203, lat: 38.8995}, 0);
    });

    describe("#loadURL", function() {
        it('returns self', function() {
            var layer = L.mapbox.featureLayer();
            expect(layer.loadURL('http://a.tiles.mapbox.com/v3/mapbox.map-0l53fhk2.json')).to.eql(layer);
        });

        it('emits a ready event', function(done) {
            var layer = L.mapbox.featureLayer();

            layer.on('ready', function() {
                done();
            });

            layer.loadURL('http://a.tiles.mapbox.com/v3/mapbox.map-0l53fhk2.json');

            server.respondWith("GET", "http://a.tiles.mapbox.com/v3/mapbox.map-0l53fhk2.json",
                [200, { "Content-Type": "application/json" }, JSON.stringify(helpers.geoJson)]);
            server.respond();
        });

        it('emits an error event', function(done) {
            var layer = L.mapbox.featureLayer();

            layer.on('error', function(e) {
                expect(this).to.equal(layer);
                expect(e.error.status).to.equal(400);
                done();
            });

            layer.loadURL('http://a.tiles.mapbox.com/v3/mapbox.map-0l53fhk2.json');

            server.respondWith("GET", "http://a.tiles.mapbox.com/v3/mapbox.map-0l53fhk2.json",
                [400, { "Content-Type": "application/json" }, JSON.stringify({error: 'error'})]);
            server.respond();
        });
    });

    describe("#setGeoJSON", function() {
        it("sets GeoJSON", function() {
            var layer = L.mapbox.featureLayer();
            expect(layer.setGeoJSON(helpers.geoJson)).to.eql(layer);
            expect(layer.getGeoJSON()).to.eql(helpers.geoJson);
        });

        it("styles GeoJSON features", function(done) {
            var layer = L.mapbox.featureLayer();
            expect(layer.setGeoJSON(helpers.geoJsonPoly)).to.eql(layer);
            layer.eachLayer(function(l) {
                expect(l.options.color).to.eql('#f00');
                done();
            });
        });

        it('supports custom access token', function() {
            var layer = L.mapbox.featureLayer(undefined, {accessToken: 'custom'})
                .setGeoJSON(helpers.geoJson);
            var marker = layer.getLayers()[0];
            expect(marker.options.icon.options.iconUrl).to.contain('access_token=custom');
        });

        it("removes existing layers", function() {
            var layer = L.mapbox.featureLayer(helpers.geoJson);
            layer.setGeoJSON([]);
            expect(layer.getLayers()).to.be.empty();
        });
    });

    describe("#getFilter", function() {
        it("returns the filter option when not given an argument", function() {
            var filter = function () {},
                layer = L.mapbox.featureLayer(null, {filter: filter});
            expect(layer.getFilter()).to.equal(filter);
        });
    });

    describe("#setFilter", function() {
        it("filters features to those for which the function returns true", function() {
            var layer = L.mapbox.featureLayer(helpers.geoJson);

            var fooFilter = function (f) { return f.properties.title === 'foo'; };
            expect(layer.setFilter(fooFilter)).to.eql(layer);
            expect(layer.getFilter()).to.eql(fooFilter);
            expect(layer.getLayers().length).to.equal(1);

            layer.setFilter(function (f) { return f.properties.title !== 'foo'; });
            expect(layer.getLayers().length).to.equal(0);
        });
    });

    describe("supports a style option", function() {
        it('styles polygons as a function', function(done) {
            var layer  = L.mapbox.featureLayer(helpers.geoJsonPoly, {
                style: function (feature) {
                    return {fillColor: 'blue'};
                }
            });
            layer.eachLayer(function(l) {
                expect(l.options.fillColor).to.eql('blue');
                done();
            });
        });

        it('styles polygons as an object', function(done) {
            var layer  = L.mapbox.featureLayer(helpers.geoJsonPoly, {
                style: {fillColor: 'blue'}
            });
            layer.eachLayer(function(l) {
                expect(l.options.fillColor).to.eql('blue');
                done();
            });
        });

        it('circleMarker styles are not overriden', function(done) {
            var layer  = L.mapbox.featureLayer(helpers.geoJson, {
                pointToLayer: function (feature, lonlat) {
                  return L.circleMarker(lonlat, { fillColor: 'yellow' });
                }
            });
            layer.eachLayer(function(l) {
                expect(l.options.fillColor).to.eql('yellow');
                done();
            });
        });

        it('also works with pointToLayer as a function', function(done) {
            var layer  = L.mapbox.featureLayer(helpers.geoJson, {
                pointToLayer: function (feature, lonlat) {
                  return L.circleMarker(lonlat);
                },
                style: function (feature) {
                    return {fillColor: 'blue'};
                }
            });
            layer.eachLayer(function(l) {
                expect(l.options.fillColor).to.eql('blue');
                done();
            });
        });

        it('also works with pointToLayer as an object', function(done) {
            var layer  = L.mapbox.featureLayer(helpers.geoJson, {
                pointToLayer: function (feature, lonlat) {
                  return L.circleMarker(lonlat);
                },
                style: {fillColor: 'blue'}
            });
            layer.eachLayer(function(l) {
                expect(l.options.fillColor).to.eql('blue');
                done();
            });
        });
    });

    var unsanitary = {
        type: 'Feature',
        properties: {
            title: '<script></script>',
            description: '<script></script>'
        },
        geometry: {
            type: 'Point',
            coordinates: [0, 0]
        }
    };

    it('sanitizes marker content', function() {
        var layer = L.mapbox.featureLayer(unsanitary);

        expect(layer.getLayers()[0]._popup._content).not.to.match(/<script>/);
    });

    it('supports a popupOptions argument', function() {
        var layer = L.mapbox.featureLayer(unsanitary, {
            popupOptions: {
                closeButton: true
            }
        });

        expect(layer.getLayers()[0]._popup.options.closeButton).to.eql(true);
    });

    it('supports a custom sanitizer', function() {
        var layer = L.mapbox.featureLayer(unsanitary, {
            sanitizer: function(_) { return _; }
        });

        expect(layer.getLayers()[0]._popup._content).to.match(/<script>/);
    });

    it('supports a pointToLayer option', function() {
      var layer  = L.mapbox.featureLayer(unsanitary, {
            pointToLayer: function (feature, lonlat) {
              return L.circleMarker(lonlat);
            }
          }),
          marker = layer.getLayers()[0];

        expect(marker instanceof L.Circle).to.equal(true);
    });
});
