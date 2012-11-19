describe("mapbox.markers", function() {
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

  it("mapbox.markers is present", function() {
      expect(mapbox.markers).toBeTruthy();
  });

  it("mapbox.markers.layer() can be instantiated", function() {
      expect(mapbox.markers.layer()).toBeTruthy();
  });
});
