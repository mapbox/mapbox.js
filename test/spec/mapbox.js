describe("mapbox", function() {
  it("mapbox.load should load and initialize objects", function() {

    var l;
    runs(function() {
        mapbox.load('http://a.tiles.mapbox.com/v3/tmcw.map-hehqnmda.jsonp', function(o) {
            l = o;
        });
    });

    waits(1000);

    runs(function() {
        expect(l.id).toEqual('tmcw.map-hehqnmda');
        expect(l.thumbnail).toEqual('http://a.tiles.mapbox.com/v3/tmcw.map-hehqnmda.png');
        expect(l.tiles).toBeTruthy();
    });
  });
});
