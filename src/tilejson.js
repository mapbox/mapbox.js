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
    initialize: function(urlOrJson) {
        L.LayerGroup.prototype.initialize.call(this);

        if (urlOrJson && urlOrJson.tilejson) {
            this._initialize(urlOrJson);
        } else if (urlOrJson) {
            var that = this;
            L.TileJSON.load(urlOrJson, function(json) {
                that._initialize(json);
            });
        }
    },

    _initialize: function(json) {
        var that = this,
            zoom = json.center[2],
            center = L.latLng(json.center[1], json.center[0]);

        if (this._map) {
            this._map.setView(center, zoom);
        }

        var tileLayer = new L.TileLayer(undefined, {
            attribution: json.attribution,
            minZoom: json.minzoom,
            maxZoom: json.maxzoom,
            tms: json.scheme === 'tms'
        });

        tileLayer.getTileUrl = function (tilePoint) {
            this._adjustTilePoint(tilePoint);

            var index = (tilePoint.x + tilePoint.y) % json.tiles.length,
                url = json.tiles[index];

            return L.Util.template(url, L.extend({
                z: this._getZoomForUrl(),
                x: tilePoint.x,
                y: tilePoint.y
            }, this.options));
        };

        this.addLayer(tileLayer);

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
