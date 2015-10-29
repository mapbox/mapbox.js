describe('L.mapbox.styleLayer', function() {
    var server;

    beforeEach(function() {
        server = sinon.fakeServer.create();
    });

    afterEach(function() {
        server.restore();
    });

    describe('Constructor', function() {

        it('sets attribution', function(done) {
            var layer = L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v8');
            layer.on('ready', function(e) {
                expect(layer.options.attribution).to.equal('<a href="https://www.mapbox.com/about/maps/" target="_blank">&copy; Mapbox</a> <a href="http://www.openstreetmap.org/about/" target="_blank">&copy; OpenStreetMap</a> <a class="mapbox-improve-map" href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a>');
                done();
            });

            server.respondWith('GET', 'https://a.tiles.mapbox.com/styles/v1/mapbox/streets-v8?access_token=key',
                [200, { "Content-Type": "application/json" }, JSON.stringify({"sources":{"composite":{"url":"mapbox://mapbox.mapbox-terrain-v2,mapbox.mapbox-streets-v6","type":"vector"}}})]);
            server.respond();

            server.respondWith('GET', 'http://a.tiles.mapbox.com/v4/mapbox.mapbox-terrain-v2,mapbox.mapbox-streets-v6.json?access_token=key',
                [200, { "Content-Type": "application/json" }, JSON.stringify(helpers.tileJSON_street_terrain)]);
            server.respond();
        });

        it('sets attribution', function(done) {
            var layer = L.mapbox.styleLayer('mapbox://styles/mapbox/satellite-hybrid-v8');
            layer.on('ready', function(e) {
                expect(layer.options.attribution).to.equal('<a href="https://www.mapbox.com/about/maps/" target="_blank">&copy; Mapbox</a> <a href="http://www.openstreetmap.org/about/" target="_blank">&copy; OpenStreetMap</a> <a class="mapbox-improve-map" href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a> <a href="https://www.digitalglobe.com/" target="_blank">&copy; DigitalGlobe</a>');
                done();
            });

            server.respondWith('GET', 'https://a.tiles.mapbox.com/styles/v1/mapbox/satellite-hybrid-v8?access_token=key',
                [200, { "Content-Type": "application/json" }, JSON.stringify({"sources":{"mapbox":{"url":"mapbox://mapbox.mapbox-streets-v6","type":"vector"},"satellite":{"url":"mapbox://mapbox.satellite","type":"raster","tileSize":256}}})]);
            server.respond();

            server.respondWith('GET', 'http://a.tiles.mapbox.com/v4/mapbox.mapbox-streets-v6,mapbox.satellite.json?access_token=key',
                [200, { "Content-Type": "application/json" }, JSON.stringify(helpers.tileJSON_satellite_streets)]);
            server.respond();
        });

        it('tms option is always false', function() {
            var layer = L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v8', {
                tms: true
            });
            layer.on('ready', function(e) {
                expect(layer.options.tms).to.equal(false);
            });
        });

        it('tileSize is always 512', function() {
            var layer = L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v8', {
                tileSize: 256
            });
            layer.on('ready', function(e) {
                expect(layer.options.tileSize).to.equal(512);
            });
        });

        it('zoomOffset is always -1', function() {
            var layer = L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v8', {
                zoomOffset: 0
            });
            layer.on('ready', function(e) {
                expect(layer.options.zoomOffset).to.equal(-1);
            });
        });

        it('sanitizes attribution', function() {
            var layer = L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v8', {attribution: '<script>alert("test")</script>'});
            layer.on('ready', function(e) {
                expect(layer.options.attribution).to.equal('');
            });
        });
    });

    describe('#getTileUrl', function() {
        var retina;

        beforeEach(function() {
            retina = L.Browser.retina;
            L.Browser.retina = false;
        });

        afterEach(function() {
            L.Browser.retina = retina;
        });

        it('generates valid tile requests', function() {
            var layer = L.mapbox.styleLayer('mapbox://styles/bobbysud/cifr15emd00007zlzxjew2rar');
            expect(layer.getTileUrl({x: 0, y: 0, z: 0})).to.equal('http://a.tiles.mapbox.com/styles/v1/bobbysud/cifr15emd00007zlzxjew2rar/tiles/0/0/0?access_token=key');
            expect(layer.getTileUrl({x: 1, y: 0, z: 0})).to.equal('http://a.tiles.mapbox.com/styles/v1/bobbysud/cifr15emd00007zlzxjew2rar/tiles/0/1/0?access_token=key');
            expect(layer.getTileUrl({x: 2, y: 0, z: 0})).to.equal('http://a.tiles.mapbox.com/styles/v1/bobbysud/cifr15emd00007zlzxjew2rar/tiles/0/2/0?access_token=key');
            expect(layer.getTileUrl({x: 3, y: 0, z: 0})).to.equal('http://a.tiles.mapbox.com/styles/v1/bobbysud/cifr15emd00007zlzxjew2rar/tiles/0/3/0?access_token=key');
            expect(layer.getTileUrl({x: 4, y: 0, z: 0})).to.equal('http://a.tiles.mapbox.com/styles/v1/bobbysud/cifr15emd00007zlzxjew2rar/tiles/0/4/0?access_token=key');
        });

        it('requests @2x tiles on retina', function() {
            L.Browser.retina = true;
            var layer = L.mapbox.styleLayer('mapbox://styles/bobbysud/cifr15emd00007zlzxjew2rar');
            expect(layer.getTileUrl({x: 0, y: 0, z: 0})).to.equal('http://a.tiles.mapbox.com/styles/v1/bobbysud/cifr15emd00007zlzxjew2rar/tiles/0/0/0@2x?access_token=key');
        });
    });
});
