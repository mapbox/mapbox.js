describe('mapbox.markerLayer', function() {
    var server, layersOf = helpers.layersOf;

    beforeEach(function() {
        server = sinon.fakeServer.create();
    });

    afterEach(function() {
        server.restore();
    });

    it('loads data from a GeoJSON source', function() {
        var layer = new mapbox.markerLayer(helpers.geoJson),
            marker = layersOf(layer)[0];
        expect(marker instanceof L.Marker).to.equal(true);
        expect(marker.getLatLng()).to.be.near({lng: -77.0203, lat: 38.8995}, 0);
    });

    it('loads data from a GeoJSON URL', function() {
        var url = 'http://api.tiles.mapbox.com/v3/examples.map-zr0njcqy/markers.geojson',
            layer = new mapbox.markerLayer(url);

        server.respondWith("GET", url,
            [200, { "Content-Type": "application/json" }, JSON.stringify(helpers.geoJson)]);
        server.respond();

        var marker = layersOf(layer)[0];
        expect(marker instanceof L.Marker).to.equal(true);
        expect(marker.getLatLng()).to.be.near({lng: -77.0203, lat: 38.8995}, 0);
    });

    it('loads data for a map ID', function() {
        var id = 'examples.map-zr0njcqy',
            url = 'http://a.tiles.mapbox.com/v3/examples.map-zr0njcqy/markers.geojson',
            layer = new mapbox.markerLayer(id);

        server.respondWith("GET", url,
            [200, { "Content-Type": "application/json" }, JSON.stringify(helpers.geoJson)]);
        server.respond();

        var marker = layersOf(layer)[0];
        expect(marker instanceof L.Marker).to.equal(true);
        expect(marker.getLatLng()).to.be.near({lng: -77.0203, lat: 38.8995}, 0);
    });

    it('replaces jsonp URLs with the equivalent json URL', function() {
        var url = 'http://api.tiles.mapbox.com/v3/examples.map-zr0njcqy/markers.geojson',
            layer = new mapbox.markerLayer(url + 'p');

        server.respondWith("GET", url,
            [200, { "Content-Type": "application/json" }, JSON.stringify(helpers.geoJson)]);
        server.respond();

        var marker = layersOf(layer)[0];
        expect(marker instanceof L.Marker).to.equal(true);
        expect(marker.getLatLng()).to.be.near({lng: -77.0203, lat: 38.8995}, 0);
    });

    describe("#getFilter", function() {
        it("returns the filter option when not given an argument", function() {
            var filter = function () {},
                layer = new mapbox.markerLayer(null, {filter: filter});
            expect(layer.getFilter()).to.equal(filter);
        });
    });

    describe("#setFilter", function() {
        it("filters features to those for which the function returns true", function() {
            var layer = new mapbox.markerLayer(helpers.geoJson);

            var fooFilter = function (f) { return f.properties.title === 'foo'; };
            expect(layer.setFilter(fooFilter)).to.eql(layer);
            expect(layer.getFilter()).to.eql(fooFilter);
            expect(layersOf(layer).length).to.equal(1);

            layer.setFilter(function (f) { return f.properties.title !== 'foo'; });
            expect(layersOf(layer).length).to.equal(0);
        });
    });
});
