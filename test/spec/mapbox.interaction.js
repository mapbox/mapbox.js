describe("mapbox.interaction", function() {
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

    it("mapbox.interaction can be intialized", function() {
        expect(mapbox.interaction()).toBeTruthy();
    });

    it("mapbox interaction can be refreshed on a map", function() {
        var m;
        runs(function() {
            m = mapbox.map(document.createElement('div'), mapbox.layer().id('examples.map-8ced9urs'));
        });
        waits(1000);
        runs(function() {
            var i = mapbox.interaction();
            expect(i).toBeTruthy();
            i.map(m);
            expect(i.refresh()).toEqual(i);
            expect(i.auto()).toEqual(i);
            expect(i.map()).toEqual(m);
        });
    });
});
