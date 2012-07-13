describe("mapbox.layer", function() {
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

  it("mapbox.layer is present", function() {
      expect(mapbox.layer()).toBeTruthy();
  });

  it("layers by default have an empty object as tilejson", function() {
      var l = mapbox.layer();
      expect(l).toBeTruthy();
      expect(l.tilejson()).toEqual({});
  });
  
  it("an id can be set on layers", function() {
      var l = mapbox.layer();
      expect(l).toBeTruthy();
      expect(l.id('map-hehqnmda')).toEqual(l);
      expect(l.id()).toEqual('map-hehqnmda');
  });

  it("when an id is set, so is the name", function() {
      var l = mapbox.layer();
      expect(l).toBeTruthy();
      expect(l.id('map-hehqnmda')).toEqual(l);
      expect(l.name).toEqual('map-hehqnmda');
  });

  it("mapbox.layer can create layers", function() {
      expect(mapbox.layer().tilejson()).toEqual({});
      expect(mapbox.layer().provider.options.tiles[0])
        .toEqual('data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=');
  });
});
