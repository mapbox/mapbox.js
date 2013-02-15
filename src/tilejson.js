L.TileJSON = {
    load: function(url, callback) {
        reqwest({
            url: url,
            type: 'json',
            crossOrigin: true,
            success: callback,
            error: callback
        });
    }
};

L.TileJSON.Layer = L.LayerGroup.extend({
    initialize: function(url) {
        var that = this;

        L.LayerGroup.prototype.initialize.call(this);
        L.TileJSON.load(url, function(json) { that._initialize(json); });
    },

    _initialize: function(json) {
        var that = this;

        json.zoom = json.center[2];
        json.center = L.latLng(json.center[1], json.center[0]);

        if (this._map) {
            this._map.setView(json.center, json.zoom);
        }

        this.addLayer(L.tileLayer(json.tiles[0], {
            attribution: json.attribution,
            maxZoom: json.maxzoom
        }));

        if (json.data) {
            for (var i = 0; i < json.data.length; i++) {
                var url = json.data[i].replace(/\.(geo)?jsonp(?=$|\?)/, '.$1json');
                L.TileJSON.load(url, function(data) {
                    that.addLayer(L.geoJson(data, {
                        pointToLayer: mapbox.markers.style,
                        onEachFeature: function(feature, layer) {
                            layer.bindPopup(feature.properties.title);
                        }
                    }));
                });
            }
        }
    }
});

L.TileJSON.layer = function(url) {
    return new L.TileJSON.Layer(url);
};
