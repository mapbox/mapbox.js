L.TileJSON = {};

L.TileJSON.Layer = L.LayerGroup.extend({
    initialize: function(url) {
        L.LayerGroup.prototype.initialize.call(this);
        var that = this;
        reqwest({
            url: url,
            type: 'json',
            crossOrigin: true,
            success: function(json) { that._initialize(json); }
        })
    },

    _initialize: function(json) {
        json.zoom = json.center[2];
        json.center = L.latLng(json.center[1], json.center[0]);

        if (this._map) {
            this._map.setView(json.center, json.zoom);
        }

        this.addLayer(L.tileLayer(json.tiles[0], {
            attribution: json.attribution,
            maxZoom: json.maxzoom
        }));
    }
});

L.TileJSON.layer = function(url) {
    return new L.TileJSON.Layer(url);
};
