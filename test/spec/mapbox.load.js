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
              if (key.indexOf('reqwest') !== 0)leaked.push(key);
          }
      }
      if (leaked.length > 0) {
          throw new Error('Leaked global variables: [' + leaked.join(', ') + ']');
      }
  });

  it("mapbox.load should load and initialize objects", function() {
    var l;
    runs(function() {
        mapbox.load('http://a.tiles.mapbox.com/v3/tmcw.map-j5a868tu.jsonp', function(o) { l = o; });
    });
    waits(500);
    runs(function() {
        expect(l.id).toEqual('tmcw.map-j5a868tu');
        expect(l.thumbnail).toEqual('http://a.tiles.mapbox.com/v3/tmcw.map-j5a868tu/thumb.png');
        expect(l.tiles).toBeTruthy();
        expect(l.markers).toBeTruthy();
        expect(l.markers.features().length).toEqual(2);
        expect(l.center).toEqual({lat: 38.904, lon: -77.017});
        expect(l.zoom).toEqual(14);
    });
  });

  it("mapbox.load should load multiple", function() {
    var l;
    runs(function() {
        mapbox.load(['http://a.tiles.mapbox.com/v3/tmcw.map-j5a868tu.jsonp',
            'http://a.tiles.mapbox.com/v3/tmcw.map-j5a868tu.jsonp'], function(o) { l = o; });
    });
    waits(600);
    runs(function() {
        for (var i = 0; i < 2; i++) {
            expect(l[i].id).toEqual('tmcw.map-j5a868tu');
            expect(l[i].thumbnail).toEqual('http://a.tiles.mapbox.com/v3/tmcw.map-j5a868tu/thumb.png');
            expect(l[i].tiles).toBeTruthy();
            expect(l[i].markers).toBeTruthy();
            expect(l[i].markers.features().length).toEqual(2);
            expect(l[i].center).toEqual({lat: 38.904, lon: -77.017});
            expect(l[i].zoom).toEqual(14);
        }
    });
  });

  it("mapbox.load can accept just an id", function() {
    var l;
    runs(function() {
        mapbox.load('tmcw.map-j5a868tu', function(o) { l = o; });
    });
    waits(500);
    runs(function() {
        expect(l.center).toEqual({lat: 38.904, lon: -77.017});
    });
  });

  it("mapbox is present", function() {
      expect(mapbox).toBeTruthy();
  });
});
