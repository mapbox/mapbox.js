describe('mapbox.ui', function() {
    var globalsBefore = {};

    beforeEach(function(){
        for (var key in window)
            globalsBefore[key] = true;
    });

    afterEach(function(){
        var leaked = [];
        for (var key in window) {
            if (!(key in globalsBefore)) {
                if (key.indexOf('reqwest') !== 0)leaked.push(key);
            }
        }
        if (leaked.length > 0) {
            throw new Error('Leaked global variables: [' + leaked.join(', ') + ']');
        }
    });

    it('mapbox.ui is present', function() {
        expect(mapbox.ui).toBeTruthy();
    });

    it('a newly created map has a UI member', function() {
        var m = mapbox.map(document.createElement('div'));
        expect(m.ui).toBeTruthy();
    });

    it('attribution is populated by refresh', function() {
        var m;
        runs(function() {
            m = mapbox.map(document.createElement('div'));
            m.addLayer(mapbox.layer().id('examples.map-vyofok3q'));
        });
        waits(500);
        runs(function() {
            expect(m.getLayerAt(0).name).toEqual('examples.map-vyofok3q');
            expect(m.ui.attribution.add()).toEqual(m.ui.attribution);
            m.ui.refresh();
            expect(m.ui.attribution.content()).toEqual('<a href="http://mapbox.com/about/maps" target="_blank">Terms &amp; Feedback</a>');
        });
    });

    it('legends are populated by refresh', function() {
        var m;
        runs(function() {
            m = mapbox.map(document.createElement('div'));
            m.addLayer(mapbox.layer().id('tmcw.map-2sdcp6um'));
        });
        waits(500);
        runs(function() {
            expect(m.getLayerAt(0).name).toEqual('tmcw.map-2sdcp6um');
            expect(m.ui.legend.add()).toEqual(m.ui.legend);
            m.ui.refresh();
            expect(m.ui.legend.content()).toEqual('<strong><span style="color:#FFAB7A;">schools</span> / <span style="color:#ae8;">fire houses</span> / <span style="color:#1f78b4;">colleges</span></strong>');
        });
    });
});
