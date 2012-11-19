describe("mapbox.map", function() {
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

    it("behaves the same as unaffected modestmaps", function() {
        var m = mapbox.map(document.createElement('div'));
        expect(m.addLayer(mapbox.markers.layer())).toEqual(m);
    });

    it("has ui, ease, interaction members", function() {
        var m = mapbox.map(document.createElement('div'));
        expect(m.ease).toBeTruthy();
        expect(m.interaction).toBeTruthy();
        expect(m.ui).toBeTruthy();
    });

    it("proxied center method is a getter setter", function() {
        var m = mapbox.map(document.createElement('div'));
        expect(m.center({ lat: 10, lon: 10 })).toEqual(m);
        expect(m.center().lat).toBeCloseTo(10);
        expect(m.center().lon).toBeCloseTo(10);
    });

    it("proxied zoom method is a getter setter", function() {
        var m = mapbox.map(document.createElement('div'));
        expect(m.zoom(5)).toEqual(m);
        expect(m.zoom()).toEqual(5);
    });

    it("center zoom method sets both", function() {
        var m = mapbox.map(document.createElement('div'));
        expect(m.centerzoom({ lat: 10, lon: 10 }, 5)).toEqual(m);
        expect(m.zoom(5)).toEqual(m);
        expect(m.zoom()).toEqual(5);
        expect(m.center().lat).toBeCloseTo(10);
        expect(m.center().lon).toBeCloseTo(10);
    });

    it("has a refresh method that is callable", function() {
        var m = mapbox.map(document.createElement('div'));
        expect(m.addLayer(mapbox.markers.layer())).toEqual(m);
        expect(m.refresh()).toEqual(m);
    });

    it("has setPanLimits", function() {
        var locations = [{ lat: -20, lon: 0 }, { lat: 0, lon: 20 }];
        var m = mapbox.map(document.createElement('div'));
        expect(m.addLayer(mapbox.markers.layer())).toEqual(m);
        expect(m.setPanLimits(locations)).toEqual(m);
    });

    it("accepts an array in pan limits", function() {
        var locations = [{ lat: -20, lon: 0 }, { lat: 0, lon: 20 }];
        var m = mapbox.map(document.createElement('div'));
        expect(m.setPanLimits(locations)).toEqual(m);
        expect(m.coordLimits[0].row).toEqual(0.5);
    });
    
    it("sorts lat lons given to it in setPanLimits", function() {
        var locations = [
            { lat: 0, lon: 20 },
            { lat: -20, lon: 0 }];
        var m = mapbox.map(document.createElement('div'));
        expect(m.setPanLimits(locations)).toEqual(m);
        expect(m.coordLimits[0].row).toEqual(0.5);
    });

    it("can take an extent in pan limits", function() {
        var locations = new MM.Extent(0, -20, -20, 0);
        var m = mapbox.map(document.createElement('div'));
        expect(m.setPanLimits(locations)).toEqual(m);
        expect(m.coordLimits[0].row).toEqual(0.5);
    });

    it("can set and reset smooth", function() {
        var m = mapbox.map(document.createElement('div'));
        expect(m.smooth(false)).toEqual(m);
        expect(m.smooth(true)).toEqual(m);
    });
});
