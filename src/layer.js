// mapbox tilelayer shortcut
//
// related to [vladimir's example](https://gist.github.com/mourner/1804938)
// and [leaflet-providers](https://github.com/seelmann/leaflet-providers)
L.TileLayer.MapBox = L.TileLayer.Common.extend({
    url: 'http://{s}.tiles.mapbox.com/v3/{user}.{map}/{z}/{x}/{y}.png'
});
