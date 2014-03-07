describe('L.mapbox.infoControl', function() {
    'use strict';
    it('constructor', function() {
        var info = L.mapbox.infoControl();
        expect(info).to.be.ok();
    });

    describe('#addInfo', function() {
        it('returns the info object', function() {
            var info = L.mapbox.infoControl();
            expect(info.addInfo('foo')).to.eql(info);
        });

        it('adds a map info element to its container', function() {
            var elem = document.createElement('div');
            var map = L.mapbox.map(elem);
            var info = L.mapbox.infoControl();
            info.addTo(map);
            expect(info.addInfo('foo')).to.eql(info);
            expect(info._content.innerHTML).to.eql('foo');
        });

        it('handles multiple infos', function() {
            var elem = document.createElement('div');
            var map = L.mapbox.map(elem);
            var info = L.mapbox.infoControl();
            expect(info.addTo(map)).to.eql(info);
            expect(info.addInfo('foo')).to.eql(info);
            expect(info.addInfo('bar')).to.eql(info);
            expect(info._content.innerHTML).to.eql('foo | bar');
        });
    });

    describe('#removeInfo', function() {
        it('returns the info object', function() {
            var info = L.mapbox.infoControl();
            expect(info.addInfo('foo')).to.eql(info);
            expect(info.removeInfo('foo')).to.eql(info);
            expect(info.removeInfo()).to.eql(info);
        });

        it('adds and removes dom elements', function() {
            var elem = document.createElement('div');
            var map = L.mapbox.map(elem);
            var info = L.mapbox.infoControl();
            info.addTo(map);
            expect(info.addInfo('foo')).to.eql(info);
            expect(info.addInfo('bar')).to.eql(info);
            expect(info._content.innerHTML).to.eql('foo | bar');
            expect(info.removeInfo('bar')).to.eql(info);
            expect(info._content.innerHTML).to.eql('foo');
        });
    });

    it('sanitizes its content', function() {
        var map = L.map(document.createElement('div'));
        var info = L.mapbox.infoControl().addTo(map);

        info.addInfo('<script></script>');

        expect(info._content.innerHTML).to.eql('');
    });

    it('supports a custom sanitizer', function() {
        var map = L.map(document.createElement('div'));
        var info = L.mapbox.infoControl({
            sanitizer: function(_) { return _; }
        }).addTo(map);

        info.addInfo('<script></script>');

        expect(info._content.innerHTML).to.eql('<script></script>');
    });

    it('receives attribution from a layer', function(done) {
        var server = sinon.fakeServer.create();
        var element = document.createElement('div');
        var map = L.mapbox.map(element, 'mapbox.map-0l53fhk2');

        map.on('ready', function() {
            expect(map.infoControl._content.innerHTML).to.eql('Data provided by NatureServe in collaboration with Robert Ridgely');
            map.removeLayer(map.tileLayer);
            expect(map.infoControl._content.innerHTML).to.eql('');
            done();
        });

        server.respondWith("GET", "http://a.tiles.mapbox.com/v3/mapbox.map-0l53fhk2.json",
            [200, { "Content-Type": "application/json" }, JSON.stringify(helpers.tileJSON)]);
        server.respond();
    });

    it('adds map location to improve link in attribution when .mapbox-improve-map is present', function(done) {
        var server = sinon.fakeServer.create();
        var element = document.createElement('div');
        var map = L.mapbox.map(element, 'examples.h8e9h88l');

        map.on('ready', function() {
            map.setView([38.902, -77.001], 13);
            expect(map.infoControl._content.innerHTML).to.eql('<a href="https://www.mapbox.com/about/maps/" target="_blank">© Mapbox © OpenStreetMap</a> <a class="mapbox-improve-map" href="https://www.mapbox.com/map-feedback/#examples.h8e9h88l/-77.001/38.902/13" target="_blank">Improve this map</a>');
            map.setView([48.902, -77.001], 13);
            expect(map.infoControl._content.innerHTML).to.eql('<a href="https://www.mapbox.com/about/maps/" target="_blank">© Mapbox © OpenStreetMap</a> <a class="mapbox-improve-map" href="https://www.mapbox.com/map-feedback/#examples.h8e9h88l/-77.001/48.902/13" target="_blank">Improve this map</a>');
            map.setView([48.902, -77.001 - 360], 13);
            expect(map.infoControl._content.innerHTML).to.eql('<a href="https://www.mapbox.com/about/maps/" target="_blank">© Mapbox © OpenStreetMap</a> <a class="mapbox-improve-map" href="https://www.mapbox.com/map-feedback/#examples.h8e9h88l/-77.001/48.902/13" target="_blank">Improve this map</a>');
            done();
        });

        server.respondWith("GET", "http://a.tiles.mapbox.com/v3/examples.h8e9h88l.json",
            [200, { "Content-Type": "application/json" }, JSON.stringify(helpers.tileJSON_improvemap)]);
        server.respond();
    });
});
