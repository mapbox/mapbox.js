// mapbox tilelayer shortcut
//
// related to [vladimir's example](https://gist.github.com/mourner/1804938)
// and [leaflet-providers](https://github.com/seelmann/leaflet-providers)
L.TileLayer.MapBox = L.TileLayer.extend({
    initialize: function (options) {
		L.TileLayer.prototype.initialize.call(this,
            'http://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png',
            options);
	}
});
