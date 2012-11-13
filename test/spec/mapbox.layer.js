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
              if (key.indexOf('reqwest') !== 0)leaked.push(key);
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
      expect(l.id('tmcw.map-hehqnmda')).toEqual(l);
      expect(l.id()).toEqual('tmcw.map-hehqnmda');
  });

  it("when an id is set, so is the name", function() {
      var l = mapbox.layer();
      expect(l).toBeTruthy();
      expect(l.id('tmcw.map-hehqnmda')).toEqual(l);
      expect(l.name).toEqual('tmcw.map-hehqnmda');
  });

  it("mapbox.layer can create layers", function() {
      expect(mapbox.layer().tilejson()).toEqual({});
      expect(mapbox.layer().provider.options.tiles[0])
        .toEqual('data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7');
  });

  it("mapbox.layer has named and name", function() {
      var l = mapbox.layer().named('test');
      expect(l.named()).toEqual('test');
      expect(l.name).toEqual('test');
      expect(l.name == 'test').toBeTruthy();
  });

  // Compositing
  it("mapbox.layer has compositing enabled by default", function() {
      var l = mapbox.layer();
      expect(l.composite()).toEqual(true);
  });

  it("mapbox.layer can disable compositing", function() {
      var l = mapbox.layer().composite(false);
      expect(l.composite()).toEqual(false);
  });

  it("mapbox.layer can enable compositing", function() {
      var l = mapbox.layer().composite(false).composite(true);
      expect(l.composite()).toEqual(true);
  });

  var tjs = [
      'http://a.tiles.mapbox.com/v3/tmcw.map-j5a868tu.jsonp',
      'http://a.tiles.mapbox.com/v3/tmcw.map-j5a868tu.jsonp',
      'http://a.tiles.mapbox.com/v3/tmcw.map-j5a868tu.jsonp',
      'http://a.tiles.mapbox.com/v3/tmcw.map-j5a868tu.jsonp',
      'http://a.tiles.mapbox.com/v3/tmcw.map-j5a868tu.jsonp'];

  it('mapbox.layer.draw groups composited layers together correctly', function() {
      var m;
      runs(function() {
          mapbox.auto(document.createElement('div'), tjs, function(o, t) {
              m = o;
              m.getLayerAt(2).composite(false);
              for (var i = 0; i < 5; i++) {
                  t[i].layer.draw();
              }
          });
      });
      waits(600);
      runs(function() {
          expect(m.getLayerAt(0).compositeLayer).toBeTruthy();
          expect(m.getLayerAt(1).compositeLayer).toBeFalsy();
          expect(m.getLayerAt(2).compositeLayer).toBeFalsy();
          expect(m.getLayerAt(3).compositeLayer).toBeTruthy();
          expect(m.getLayerAt(4).compositeLayer).toBeFalsy();
          expect(m.getLayerAt(0).parent.style.display).not.toEqual('none');
          expect(m.getLayerAt(1).parent.style.display).toEqual('none');
          expect(m.getLayerAt(2).parent.style.display).not.toEqual('none');
          expect(m.getLayerAt(3).parent.style.display).not.toEqual('none');
          expect(m.getLayerAt(4).parent.style.display).toEqual('none');
      });
  });

  it('mapbox.layer.draw skips disabled layers without interrupting compositing groupings.', function() {
      var m;
      runs(function() {
          mapbox.auto(document.createElement('div'), tjs, function(o, t) {
              m = o;
              m.getLayerAt(2).disable(false);
              m.getLayerAt(3).disable(false);
              for (var i = 0; i < 5; i++) {
                  t[i].layer.draw();
              }
          });
      });
      waits(600);
      runs(function() {
          expect(m.getLayerAt(0).compositeLayer).toBeTruthy();
          expect(m.getLayerAt(1).compositeLayer).toBeFalsy();
          expect(m.getLayerAt(2).compositeLayer).toBeFalsy();
          expect(m.getLayerAt(3).compositeLayer).toBeFalsy();
          expect(m.getLayerAt(4).compositeLayer).toBeFalsy();
          expect(m.getLayerAt(0).parent.style.display).not.toEqual('none');
          expect(m.getLayerAt(1).parent.style.display).toEqual('none');
          expect(m.getLayerAt(4).parent.style.display).toEqual('none');
      });
  });

  it('mapbox.layer.draw clears tiles if the layer is now composited in a different layer', function() {
      var m, t;
      runs(function() {
          mapbox.auto(document.createElement('div'), tjs, function(o, d) {
              m = o;
              t = d;
          });
      });
      waits(600);
      runs(function() {
          m.getLayerAt(2).composite(false);
          for (var i = 0; i < 5; i++) {
              t[i].layer.draw();
          }
          expect(m.getLayerAt(0).compositeLayer).toBeTruthy();
          expect(m.getLayerAt(1).compositeLayer).toBeFalsy();
          expect(m.getLayerAt(2).compositeLayer).toBeFalsy();
          expect(m.getLayerAt(3).compositeLayer).toBeTruthy();
          expect(m.getLayerAt(4).compositeLayer).toBeFalsy();
          m.getLayerAt(2).composite(true);
          for (var i = 0; i < 5; i++) {
              t[i].layer.draw();
          }
      });
      waits(50);
      runs(function() {
          expect(m.getLayerAt(0).compositeLayer).toBeTruthy();
          expect(m.getLayerAt(1).compositeLayer).toBeFalsy();
          expect(m.getLayerAt(2).compositeLayer).toBeFalsy();
          expect(m.getLayerAt(3).compositeLayer).toBeFalsy();
          expect(m.getLayerAt(4).compositeLayer).toBeFalsy();
          expect(m.getLayerAt(0).parent.style.display).not.toEqual('none');
          expect(m.getLayerAt(1).parent.style.display).toEqual('none');
          expect(m.getLayerAt(2).parent.style.display).toEqual('none');
          expect(m.getLayerAt(3).parent.style.display).toEqual('none');
          expect(m.getLayerAt(4).parent.style.display).toEqual('none');
      });
  });
});
