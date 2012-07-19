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
              if (key !== 'grid') leaked.push(key);
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
});
