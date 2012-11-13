describe("mapbox", function() {
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

  it("has mapbox and its members in the global scope", function() {
      var l = [mapbox, mapbox.map,
          mapbox.load, mapbox.auto,
          mapbox.layer, mapbox.markers];

      for (var i = 0; i < l.length; i++) {
          expect(l[i]).toBeTruthy();
      }
  });

});
