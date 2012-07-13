describe("mapbox.load", function() {
  var globalsBefore = {};

  beforeEach(function(){
      for (var key in window)
          globalsBefore[key] = true;
  });

  afterEach(function(){
      var leaked = [];
      for (var key in window) {
          if (!(key in globalsBefore)) {
              if (key !== 'grid')leaked.push(key);
          }
      }
      if (leaked.length > 0) {
          throw new Error('Leaked global variables: [' + leaked.join(', ') + ']');
      }
  });

  it("mapbox.load should load and initialize objects", function() {

    var l;
    runs(function() {
        mapbox.load('http://a.tiles.mapbox.com/v3/tmcw.map-j5a868tu.jsonp', function(o) {
            l = o;
        });
    });

    waits(500);

    runs(function() {
        expect(l.id).toEqual('tmcw.map-j5a868tu');
        expect(l.thumbnail).toEqual('http://a.tiles.mapbox.com/v3/tmcw.map-j5a868tu.png');
        expect(l.tiles).toBeTruthy();
        expect(l.markers).toBeTruthy();
        expect(l.markers.features().length).toEqual(2);
    });
  });

  it("mapbox is present", function() {
      expect(mapbox).toBeTruthy();
  });
});
