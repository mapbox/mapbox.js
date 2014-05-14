describe('L.mapbox.map', function() {
    var server, element, tileJSON = helpers.tileJSON;

    beforeEach(function() {
        server = sinon.fakeServer.create();
        element = document.createElement('div');
    });

    afterEach(function() {
        server.restore();
    });

    it('allows access to the tilejson object after assignment', function() {
        var map = L.mapbox.map(element, tileJSON);
        expect(map.getTileJSON()).to.equal(tileJSON);
        expect(map instanceof L.mapbox.Map).to.eql(true);
    });

    it('passes options to constructor when called without new', function() {
        var map = L.mapbox.map(element, tileJSON, {zoomControl: false});
        expect(map.options.zoomControl).to.equal(false);
    });

    describe('constructor', function() {
        it('loads TileJSON from a URL', function(done) {
            var map = L.mapbox.map(element, 'http://a.tiles.mapbox.com/v3/mapbox.map-0l53fhk2.json');

            map.on('ready', function() {
                expect(this).to.equal(map);
                expect(map.getTileJSON()).to.eql(helpers.tileJSON);
                done();
            });

            server.respondWith("GET", "http://a.tiles.mapbox.com/v3/mapbox.map-0l53fhk2.json",
                [200, { "Content-Type": "application/json" }, JSON.stringify(helpers.tileJSON)]);
            server.respond();
        });

        it('loads TileJSON from an ID', function(done) {
            var map = L.mapbox.map(element, 'mapbox.map-0l53fhk2');

            map.on('ready', function() {
                expect(this).to.equal(map);
                expect(map.getTileJSON()).to.eql(helpers.tileJSON);
                done();
            });

            server.respondWith("GET", "http://a.tiles.mapbox.com/v3/mapbox.map-0l53fhk2.json",
                [200, { "Content-Type": "application/json" }, JSON.stringify(helpers.tileJSON)]);
            server.respond();
        });

        it('emits an error event', function(done) {
            var map = L.mapbox.map(element, 'http://a.tiles.mapbox.com/v3/mapbox.map-0l53fhk2.json');

            map.on('error', function(e) {
                expect(this).to.equal(map);
                expect(e.error.status).to.equal(400);
                done();
            });

            server.respondWith("GET", "http://a.tiles.mapbox.com/v3/mapbox.map-0l53fhk2.json",
                [400, { "Content-Type": "application/json" }, JSON.stringify({error: 'error'})]);
            server.respond();
        });

        it('aliases featureLayer as markerLayer', function() {
            var map = L.mapbox.map(element, 'http://a.tiles.mapbox.com/v3/mapbox.map-0l53fhk2.json');
            expect(map.featureLayer).to.be.ok();
            expect(map.markerLayer).to.be.ok();
        });

        it('can deactivate markerLayer as markerLayer', function() {
            var map = L.mapbox.map(element, 'http://a.tiles.mapbox.com/v3/mapbox.map-0l53fhk2.json', {
                markerLayer: false
            });
            expect(map.featureLayer).to.eql(undefined);
        });

        it('can deactivate markerLayer as featureLayer', function() {
            var map = L.mapbox.map(element, 'http://a.tiles.mapbox.com/v3/mapbox.map-0l53fhk2.json', {
                featureLayer: false
            });
            expect(map.featureLayer).to.eql(undefined);
        });

        it('preserves manually-set marker layer GeoJSON', function() {
            var map = L.mapbox.map(element, 'http://a.tiles.mapbox.com/v3/mapbox.map-0l53fhk2.json');
            map.featureLayer.setGeoJSON(helpers.geoJson);

            server.respondWith("GET", "http://a.tiles.mapbox.com/v3/mapbox.map-0l53fhk2.json",
                [200, { "Content-Type": "application/json" }, JSON.stringify(helpers.tileJSON)]);
            server.respondWith("GET", "http://a.tiles.mapbox.com/v3/examples.map-8ced9urs/markers.geojson",
                [200, { "Content-Type": "application/json" }, JSON.stringify({})]);

            server.respond();

            expect(map.featureLayer.getGeoJSON()).to.eql(helpers.geoJson);
        });

        it('passes tileLayer options to tile layer', function() {
            var map = L.mapbox.map(element, 'mapbox.map-0l53fhk2', {tileLayer: {detectRetina: true}});
            expect(map.tileLayer.options.detectRetina).to.equal(true);
        });

        it('passes featureLayer options to marker layer', function() {
            var filter = function() { return true; },
                map = L.mapbox.map(element, 'mapbox.map-0l53fhk2', {featureLayer: {filter: filter}});
            expect(map.featureLayer.options.filter).to.equal(filter);
        });

        it('passes gridLayer options to grid layer', function() {
            var template = function() { return ''; },
                map = L.mapbox.map(element, 'mapbox.map-0l53fhk2', {gridLayer: {template: template}});
            expect(map.gridLayer.options.template).to.equal(template);
        });

        it('passes gridControl options to grid control', function() {
            var map = L.mapbox.map(element, 'mapbox.map-0l53fhk2', {gridControl: {pinnable: true}});
            expect(map.gridControl.options.pinnable).to.equal(true);
        });

        it('passes legendControl options to legend control', function() {
            var map = L.mapbox.map(element, 'mapbox.map-0l53fhk2', {legendControl: {position: 'topleft'}});
            expect(map.legendControl.options.position).to.equal('topleft');
        });

        it('passes shareControl options to share control', function() {
            var map = L.mapbox.map(element, 'mapbox.map-0l53fhk2', {shareControl: {position: 'bottomleft'}});
            expect(map.shareControl.options.position).to.equal('bottomleft');
        });

        it('supports tilejson without a center property', function(){
            var map = L.mapbox.map(element, helpers.tileJSON_nocenter);
            expect(map._loaded).not.to.be.ok();

        });
    });

    describe('layers', function() {
        it('adds a tile layer immediately', function() {
            var map = L.mapbox.map(element, 'data/tilejson.json');
            expect(map.tileLayer).to.be.ok();
        });

        it('initializes the tile layer', function() {
            var map = L.mapbox.map(element, tileJSON);
            expect(map.tileLayer.getTileJSON()).to.equal(tileJSON);
        });

        it('creates no tile layer given tileLayer: false option', function() {
            var map = L.mapbox.map(element, tileJSON, {tileLayer: false});
            expect(map.tileLayer).to.be(undefined);
        });

        it('adds a maker layer immediately', function() {
            var map = L.mapbox.map(element, 'data/tilejson.json');
            expect(map.featureLayer).to.be.ok();
        });

        it('creates no marker layer given featureLayer: false option', function() {
            var map = L.mapbox.map(element, tileJSON, {featureLayer: false});
            expect(map.featureLayer).to.be(undefined);
        });

        it('adds a grid layer immediately', function() {
            var map = L.mapbox.map(element, 'data/tilejson.json');
            expect(map.gridLayer).to.be.ok();
        });

        it('initializes the grid layer', function() {
            var map = L.mapbox.map(element, tileJSON);
            expect(map.gridLayer.getTileJSON()).to.equal(tileJSON);
        });

        it('creates no grid layer given gridLayer: false option', function() {
            var map = L.mapbox.map(element, tileJSON, {gridLayer: false});
            expect(map.gridLayer).to.be(undefined);
        });
    });

    describe('controls', function() {
        it('creates a legendControl', function() {
            var map = L.mapbox.map(element, tileJSON);
            expect(map.legendControl).to.be.ok();
        });

        it('creates no legendControl given legendControl: false option', function() {
            var map = L.mapbox.map(element, tileJSON, {legendControl: false});
            expect(map.legendControl).to.be(undefined);
        });

        it('creates a gridControl', function() {
            var map = L.mapbox.map(element, tileJSON);
            expect(map.gridControl).to.be.ok();
        });

        it('does not create a shareControl by default', function() {
            var map = L.mapbox.map(element, tileJSON);
            expect(map.shareControl).to.be(undefined);
        });

        it('creates a shareControl by default', function() {
            var map = L.mapbox.map(element, tileJSON, {shareControl: true});
            expect(map.shareControl).to.be.ok();
        });

        it('creates no gridControl given gridLayer: false option', function() {
            var map = L.mapbox.map(element, tileJSON, {gridLayer: false});
            expect(map.gridControl).to.be(undefined);
        });

        it('creates no gridControl given gridControl: false option', function() {
            var map = L.mapbox.map(element, tileJSON, {gridControl: false});
            expect(map.gridControl).to.be(undefined);
        });
    });

    describe('corner cases', function() {
        it('re-initialization throws', function() {
            var map = L.mapbox.map(element, tileJSON);
            expect(map.tileLayer.getTileJSON()).to.equal(tileJSON);

            expect(function() {
                L.mapbox.map(element, tileJSON);
            }).to.throwException(function(e) {
                expect(e.message).to.eql('Map container is already initialized.');
            });
        });

        it('attributionControl enabled', function(done) {
            var map = L.mapbox.map(element, 'mapbox.map-0l53fhk2', {
                infoControl: false,
                attributionControl: true
            });

            map.on('ready', function() {
                expect(map.attributionControl._container.innerHTML).to.eql('Data provided by NatureServe in collaboration with Robert Ridgely');
                map.removeLayer(map.tileLayer);
                expect(map.attributionControl._container.innerHTML).to.eql('');
                done();
            });

            server.respondWith("GET", "http://a.tiles.mapbox.com/v3/mapbox.map-0l53fhk2.json",
                [200, { "Content-Type": "application/json" }, JSON.stringify(helpers.tileJSON)]);
            server.respond();
        });

        it('adds mapid and coordinates to improve link in attribution when .mapbox-improve-map is present', function(done) {
            'use strict';
            var server = sinon.fakeServer.create();
            var element = document.createElement('div');
            var map = L.mapbox.map(element, 'examples.h8e9h88l', {
                infoControl: true
            });

            map.on('ready', function() {
                map.setView([38.902, -77.001], 13);
                var val = '<a href="https://www.mapbox.com/about/maps/" target="_blank">© Mapbox © OpenStreetMap</a> <a class="mapbox-improve-map" href="https://www.mapbox.com/map-feedback/#examples.h8e9h88l/-77.001/38.902/13" target="_blank">Improve this map</a>';
                expect(map.infoControl._content.innerHTML).to.eql(val);
                 expect(map.attributionControl._container.innerHTML).to.eql(val);
                map.setView([48.902, -77.001], 13);
                val = '<a href="https://www.mapbox.com/about/maps/" target="_blank">© Mapbox © OpenStreetMap</a> <a class="mapbox-improve-map" href="https://www.mapbox.com/map-feedback/#examples.h8e9h88l/-77.001/48.902/13" target="_blank">Improve this map</a>';
                expect(map.infoControl._content.innerHTML).to.eql(val);
                expect(map.attributionControl._container.innerHTML).to.eql(val);
                map.setView([48.902, -77.001 - 360], 13);
                val = '<a href="https://www.mapbox.com/about/maps/" target="_blank">© Mapbox © OpenStreetMap</a> <a class="mapbox-improve-map" href="https://www.mapbox.com/map-feedback/#examples.h8e9h88l/-77.001/48.902/13" target="_blank">Improve this map</a>';
                expect(map.infoControl._content.innerHTML).to.eql(val);
                expect(map.attributionControl._container.innerHTML).to.eql(val);
                done();
            });

            server.respondWith("GET", "http://a.tiles.mapbox.com/v3/examples.h8e9h88l.json",
                [200, { "Content-Type": "application/json" }, JSON.stringify(helpers.tileJSON_improvemap)]);
            server.respond();
        });

    });
});
