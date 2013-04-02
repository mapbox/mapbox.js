mapbox.Map = L.Map.extend({
    options: {
        tileLayer: true,
        markerLayer: true,
        gridLayer: true,
        legendControl: true
    },

    _tilejson: {},

    initialize: function(element, _, options) {
        L.Map.prototype.initialize.call(this, element, options);

        if (this.options.tileLayer) {
            this.tileLayer = new mapbox.tileLayer();
            this.addLayer(this.tileLayer);
        }

        if (this.options.markerLayer) {
            this.markerLayer = new mapbox.markerLayer();
            this.addLayer(this.markerLayer);
        }

        if (this.options.gridLayer) {
            this.gridLayer = new mapbox.gridLayer();
            this.addLayer(this.gridLayer);
        }

        if (this.options.legendControl) {
            this.legendControl = new mapbox.legendControl();
            this.addControl(this.legendControl);
        }

        if (typeof _ === 'string') {
            mapbox.idUrl(_, this);
        // javascript object of TileJSON data
        } else if (_ && typeof _ === 'object') {
            this.setTileJSON(_);
        }
    },

    // use a javascript object of tilejson data to configure this layer
    setTileJSON: function(_) {
        this._tilejson = _;
        this._initialize(_);
        return this;
    },

    getTileJSON: function() {
        return this._tilejson;
    },

    // pull tilejson data from an endpoint
    setURL: function(url) {
        mapbox.request(url, L.bind(function(err, json) {
            if (err) return mapbox.log('could not load TileJSON at ' + url);
            this.setTileJSON(json);
        }, this));
        return this;
    },

    // pull tilejson data from an endpoint, given just by an id
    id: function(id) {
        return this.setURL(mapbox.base() + id + '.json');
    },

    setId: function(_) { this.id(_); },

    _initialize: function(json) {
        this.tileLayer.setTileJSON(json);

        if (json.data && json.data[0]) {
            this.markerLayer.setURL(json.data[0]);
        }

        this.gridLayer.setTileJSON(json);

        if (json.legend) {
            this.legendControl.addLegend(json.legend);
        }

        if (!this._loaded) {
            var zoom = json.center[2],
                center = L.latLng(json.center[1], json.center[0]);

            this.setView(center, zoom);
        }
    }
});

mapbox.map = function(element, _) {
    return new mapbox.Map(element, _);
};
