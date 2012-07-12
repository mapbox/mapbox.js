if (typeof mapbox === 'undefined') mapbox = {};

// Utils
function getStyle(elem, name) {
    if (elem.style[name]) {
        return elem.style[name];
    } else if (elem.currentStyle) {
        return elem.currentStyle[name];
    }
    else if (document.defaultView && document.defaultView.getComputedStyle) {
        name = name.replace(/([A-Z])/g, '-$1');
        name = name.toLowerCase();
        s = document.defaultView.getComputedStyle(elem, '');
        return s && s.getPropertyValue(name);
    } else {
        return null;
    }
}


// mapbox.load pulls a [TileJSON](http://mapbox.com/wax/tilejson.html)
// object from a server and uses it to configure a map and various map-related
// objects
mapbox.load = function(url, callback) {
  // Support bare IDs as well as fully-formed URLs
  if (url.indexOf('http') !== 0) {
    url = 'http://a.tiles.mapbox.com/v3/' + url + '.jsonp';
  }
  wax.tilejson(url, function(tj) {
    // Pull zoom level out of center
    tj.zoom = tj.center[2];

    // Instantiate center as a Modest Maps-compatible object
    tj.center = {
      lat: tj.center[1],
      lon: tj.center[0]
    };

    tj.thumbnail = 'http://a.tiles.mapbox.com/v3/' + tj.id + '.png';

    // Instantiate tile layer
    if (tj.tiles) tj.layer = new wax.mm.connector(tj);

    // Instantiate markers layer
    if (tj.data) {
      tj.markers = mmg().factory(simplestyle_factory);
      tj.markers.url(tj.data, function() {
        mmg_interaction(tj.markers);
        callback(tj);
      });
    } else {
      callback(tj);
    }
  });
};

// Full auto mode. This can be supplied as the argument to mapbox.load
// in order to construct a map from a tilejson snippet.
mapbox.auto = function(el, callback) {
  return function(options) {
    var map = mapbox.map(el);
        map.controls = document.createElement('div');
        map.controls.style.cssText = 'position: absolute; z-index: 1000';
        map.controls.id = 'controls';
        map.parent.appendChild(map.controls);

    // Check the map parent for default properties.
    // if they aren't set then create some off the bat.
    var i, defaultProperties = ['height', 'width'];
    for (i in defaultProperties) {
        var prop = defaultProperties[i];
        if (getStyle(map.parent, prop) === '0px' || getStyle(map.parent, prop) === 'auto') {
            map.parent.style[prop] = '400px';
        }
    }
    if (options.layer) map.addLayer(options.layer);
    if (options.markers) map.addLayer(options.markers);
    if (options.attribution) wax.mm.attribution(map, options).appendTo(map.parent);
    if (options.legend) wax.mm.legend(map, options).appendTo(map.parent);
    wax.mm.zoomer(map).appendTo(map.controls);
    wax.mm.zoombox(map);
    map.zoom(options.zoom).center(options.center);
    wax.mm.interaction().map(map).tilejson(options).on(wax.tooltip().parent(map.parent).events());

    map.setZoomRange(options.minzoom, options.maxzoom);
    if (callback) callback(map, options);
  };
};

var smooth_handlers = [
easey.TouchHandler, easey.DragHandler, easey.DoubleClickHandler, easey.MouseWheelHandler];

var default_handlers = [MM.TouchHandler, MM.DragHandler, MM.DoubleClickHandler, MM.MouseWheelHandler];

MM.Map.prototype.smooth = function(_) {
  while (this.eventHandlers.length) {
    this.eventHandlers.pop().remove();
  }
  if (_) {
    for (var j = 0; j < smooth_handlers.length; j++) {
      var h = smooth_handlers[j]();
      this.eventHandlers.push(h);
      h.init(this);
    }
  } else {
    for (var k = 0; k < default_handlers.length; k++) {
      var def = default_handlers[k]();
      this.eventHandlers.push(def);
      def.init(this);
    }
  }
  return this;
};

// a `mapbox.map` is a modestmaps object with the
// easey handlers as defaults
mapbox.map = function(el, layer) {
  var m = new MM.Map(el, layer, null, [
  easey.TouchHandler(), easey.DragHandler(), easey.DoubleClickHandler(), easey.MouseWheelHandler()]);

  m.center = function(location, animate) {
    if (location && animate) {
      easey().map(this).to(this.locationCoordinate(location)).optimal(null, null, animate.callback ||
      function() {});
    } else if (location) {
      return this.setCenter(location);
    } else {
      return this.getCenter();
    }
  };

  m.zoom = function(zoom, animate) {
    if (zoom !== undefined && animate) {
      easey().map(this).to(this.locationCoordinate(this.getCenter()).copy().zoomTo(zoom)).run(600);
    } else if (zoom !== undefined) {
      return this.setZoom(zoom);
    } else {
      return this.getZoom();
    }
  };

  m.centerzoom = function(location, zoom, animate) {
    if (location && zoom !== undefined && animate) {
      easey().map(this).to(this.locationCoordinate(location).zoomTo(zoom)).run(animate.duration || 1000, animate.callback ||
      function() {});
    } else if (location && zoom !== undefined) {
      return this.setCenterZoom(location, zoom);
    }
  };

  return m;
};

this.mapbox = mapbox;
