describe('L.mapbox.geocoderControl', function() {
    'use strict';
    var server;

    beforeEach(function() {
        server = sinon.fakeServer.create();
    });

    afterEach(function() {
        server.restore();
    });

    it('performs forward geolocation, centering the map on the first result', function() {
        var map = new L.Map(document.createElement('div')),
            control = L.mapbox.geocoderControl('mapbox.places', { proximity: false }).addTo(map);

        expect(control instanceof L.mapbox.GeocoderControl).to.eql(true);

        server.respondWith('GET',
            'http://a.tiles.mapbox.com/geocoding/v5/mapbox.places/austin.json?access_token=key',
            [200, { "Content-Type": "application/json" }, JSON.stringify(helpers.geocoderAustin)]);

        control._input.value = 'austin';
        happen.once(control._form, { type: 'submit' });
        server.respond();

        expect(map.getCenter()).to.be.near({lat: 30.3, lng: -97.7}, 1e-1);
    });

    it('performs forward geolocation, centering the map on the first result even if a point', function() {
        var map = new L.Map(document.createElement('div')),
            control = L.mapbox.geocoderControl('mapbox.places', { proximity: false }).addTo(map);

        server.respondWith('GET',
            'http://a.tiles.mapbox.com/geocoding/v5/mapbox.places/white%20house.json?access_token=key',
            [200, { "Content-Type": "application/json" }, JSON.stringify(helpers.geocoderWhiteHouse)]);

        control._input.value = 'white house';
        happen.once(control._form, { type: 'submit' });
        server.respond();

        expect(map.getCenter()).to.be.near({lat:  38.898761, lng: -77.035117}, 1e-1);
        expect(map.getZoom()).to.eql(16);
    });

    it('supports the pointzoom option for preferred zoom for point results', function() {
        var map = new L.Map(document.createElement('div')),
            control = L.mapbox.geocoderControl('mapbox.places', {
                proximity: false,
                pointZoom: 10
            }).addTo(map);

        server.respondWith('GET',
            'http://a.tiles.mapbox.com/geocoding/v5/mapbox.places/white%20house.json?access_token=key',
            [200, { "Content-Type": "application/json" }, JSON.stringify(helpers.geocoderWhiteHouse)]);

        control._input.value = 'white house';
        happen.once(control._form, { type: 'submit' });
        server.respond();

        expect(map.getCenter()).to.be.near({lat:  38.898761, lng: -77.035117}, 1e-1);
        expect(map.getZoom()).to.eql(10);
    });

    it('supports queryOptions including autocomplete and country', function() {
        var map = new L.Map(document.createElement('div')),
            control = L.mapbox.geocoderControl('mapbox.places', {
                proximity: false,
                pointZoom: 10,
                queryOptions: {
                    autocomplete: false,
                    country: 'us'
                }
            }).addTo(map);

        server.respondWith('GET',
            'http://a.tiles.mapbox.com/geocoding/v5/mapbox.places/white%20house.json?access_token=key&country=us&autocomplete=false',
            [200, { "Content-Type": "application/json" }, JSON.stringify(helpers.geocoderWhiteHouse)]);

        control._input.value = 'white house';
        happen.once(control._form, { type: 'submit' });
        server.respond();

        expect(map.getCenter()).to.be.near({lat:  38.898761, lng: -77.035117}, 1e-1);
        expect(map.getZoom()).to.eql(10);
    });

    it('pointzoom does not zoom out zoomed-in maps', function() {
        var map = new L.Map(document.createElement('div')),
            control = L.mapbox.geocoderControl('mapbox.places', {
                proximity: false,
                pointZoom: 10
            }).addTo(map);

        map.setView([0, 0], 14);

        server.respondWith('GET',
            'http://a.tiles.mapbox.com/geocoding/v5/mapbox.places/white%20house.json?access_token=key',
            [200, { "Content-Type": "application/json" }, JSON.stringify(helpers.geocoderWhiteHouse)]);

        control._input.value = 'white house';
        happen.once(control._form, { type: 'submit' });
        server.respond();

        expect(map.getCenter()).to.be.near({lat:  38.898761, lng: -77.035117}, 1e-1);
        expect(map.getZoom()).to.eql(14);
    });

    it('sets url based on an id', function() {
        var control = L.mapbox.geocoderControl('mapbox.places');
        expect(control.getURL()).to.equal('http://a.tiles.mapbox.com/geocoding/v5/mapbox.places/{query}.json?access_token=key');
    });

    it('supports custom access token', function() {
        var control = L.mapbox.geocoderControl('mapbox.places', {accessToken: 'custom'});
        expect(control.getURL()).to.equal('http://a.tiles.mapbox.com/geocoding/v5/mapbox.places/{query}.json?access_token=custom');
    });

    it('#setURL', function() {
        var control = L.mapbox.geocoderControl('mapbox.places');
        control.setURL('foo/{query}.json');
        expect(control.getURL()).to.equal('foo/{query}.json');
    });

    it('#setID', function() {
        var control = L.mapbox.geocoderControl('mapbox.places');
        expect(control.setID('mapbox.places')).to.eql(control);
        expect(control.getURL()).to.equal('http://a.tiles.mapbox.com/geocoding/v5/mapbox.places/{query}.json?access_token=key');
    });

    it('is by default in the top left', function() {
        var control = L.mapbox.geocoderControl('mapbox.places');
        expect(control.options.position).to.equal('topleft');
    });

    it('supports an options object', function() {
        var control = L.mapbox.geocoderControl('mapbox.places', {
            position: 'bottomright'
        });
        expect(control.options.position).to.equal('bottomright');
    });

    describe('#keepOpen', function(done) {
        it('true', function() {
            var map = new L.Map(document.createElement('div'));
            var control = L.mapbox.geocoderControl('http://example.com/{query}.json', {
                keepOpen: true
            }).addTo(map);
            expect(control._container.className).to.eql('leaflet-control-mapbox-geocoder leaflet-bar leaflet-control active');
        });
        it('false', function() {
            var map = new L.Map(document.createElement('div'));
            var control = L.mapbox.geocoderControl('http://example.com/{query}.json').addTo(map);
            expect(control._container.className).to.eql('leaflet-control-mapbox-geocoder leaflet-bar leaflet-control');
        });
    });

    describe('events', function() {
        var map, control;

        beforeEach(function() {
            map = new L.Map(document.createElement('div'));
            control = L.mapbox.geocoderControl('http://example.com/{query}.json', {
                proximity: false
            }).addTo(map);
        });


        it('emits a "found" event when geocoding succeeds', function(done) {
            control.on('found', function(e) {
                expect(e.results).to.eql(helpers.geocoderAustin);
                done();
            });

            control._input.value = 'austin';
            happen.once(control._form, { type: 'submit' });

            server.respondWith('GET', 'http://example.com/austin.json',
                [200, { "Content-Type": "application/json" }, JSON.stringify(helpers.geocoderAustin)]);
            server.respond();
        });

        it('emits a "notfound" event when geocoding succeeds', function(done) {
            control.on('notfound', function(e) {
                done();
            });

            control._input.value = 'unfindable';
            happen.once(control._form, { type: 'submit' });

            server.respondWith('GET', 'http://example.com/unfindable.json',
                [200, { "Content-Type": "application/json" }, JSON.stringify({features:[]})]);
            server.respond();
        });

        it('emits a "autoselect" event when geocoding succeeds', function(done) {
            control.on('autoselect', function(e) {
                expect(e.feature).to.eql(helpers.geocoderAustin.features[0]);
                done();
            });

            control._input.value = 'austin';
            happen.once(control._form, { type: 'submit' });

            server.respondWith('GET', 'http://example.com/austin.json',
                [200, { "Content-Type": "application/json" }, JSON.stringify(helpers.geocoderAustin)]);
            server.respond();
        });

        it('emits a "select" event when a result is clicked', function(done) {
            control._input.value = 'chester';
            happen.once(control._form, { type: 'submit' });

            server.respondWith('GET', 'http://example.com/chester.json',
                [200, { "Content-Type": "application/json" }, JSON.stringify(helpers.geocoderMulti)]);
            server.respond();

            control.on('select', function(e) {
                expect(e.feature).to.eql(helpers.geocoderMulti.features[0]);
                done();
            });

            // First link is the toggle button
            happen.click(control._container.getElementsByTagName('a')[1]);
        });

        it('emits an "error" event when geocoding fails', function(done) {
            control.on('error', function(e) {
                expect(e.error.status).to.eql(400);
                done();
            });

            control._input.value = 'austin';
            happen.once(control._form, { type: 'submit' });

            server.respondWith('GET', 'http://example.com/austin.json',
                [400, { "Content-Type": "application/json" }, JSON.stringify(helpers.geocoderAustin)]);
            server.respond();
        });
    });

    describe('autocomplete events', function() {
        var map, control;

        beforeEach(function() {
            map = new L.Map(document.createElement('div'));
            control = L.mapbox.geocoderControl('http://example.com/{query}.json', {
                autocomplete: true,
                proximity: false
            }).addTo(map);
        });

        it('emits a "found" event when geocoding with autocomplete succeeds', function(done) {
            control.on('found', function(e) {
                expect(e.results).to.eql(helpers.geocoderAustin);
                done();
            });

            control._input.value = 'austin';
            happen.once(control._form, { type: 'submit' });

            server.respondWith('GET', 'http://example.com/austin.json',
                [200, { "Content-Type": "application/json" }, JSON.stringify(helpers.geocoderAustin)]);
            server.respond();
        });
    });

    describe('autocomplete+proximity events', function() {
        var map, control;

        beforeEach(function() {
            map = new L.Map(document.createElement('div'), { center: [0,0], zoom: 0});
            control = L.mapbox.geocoderControl('http://example.com/{query}.json', {
                autocomplete: true,
                proximity: true
            }).addTo(map);
        });

        it('emits a "found" event when geocoding with autocomplete succeeds', function(done) {
            control.on('found', function(e) {
                expect(e.results).to.eql(helpers.geocoderAustin);
                done();
            });

            control._input.value = 'austin';
            happen.once(control._form, { type: 'submit' });

            server.respondWith('GET', 'http://example.com/austin.json&proximity=0,0',
                [200, { "Content-Type": "application/json" }, JSON.stringify(helpers.geocoderAustin)]);
            server.respond();
        });
    });
});
