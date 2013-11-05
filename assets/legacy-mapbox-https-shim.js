(function() {
  var public_url = /http:\/\/\w.tiles.mapbox.com\/v3\//;
  mapbox.MAPBOX_URL = 'https://api.tiles.mapbox.com/v3/';
  mapbox.markers.marker_baseurl = 'https://api.tiles.mapbox.com/v3/marker/';
  var tj = wax.tilejson;
  wax.tilejson = function(u, c) {
      tj(u, function(x) {
          for (var i in x) {
              if (typeof x[i] === 'string') x[i] = x[i].replace(public_url, mapbox.MAPBOX_URL);
              if (typeof x[i] === 'object') {
                  for (var j in x[i]) {
                      if (typeof x[i][j] === 'string') x[i][j] = x[i][j].replace(public_url, mapbox.MAPBOX_URL);
                  }
              }
          }
          c(x);
      });
  };
})();
