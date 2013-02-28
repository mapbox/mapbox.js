// A layer that loads its metadata from an endpoint that distributes TileJSON.
// From that endpoint it gets a center, zoom level, attribution, zoom
// extent, and more.
mapbox.layerGroup = L.LayerGroup.extend({

    options: {
        legendControl: true
    },

    _tilejson: {},

    initialize: function(_) {
        L.LayerGroup.prototype.initialize.call(this);

        this.tileLayer = new mapbox.tileLayer();
        this.addLayer(this.tileLayer);

        this.dataLayer = new mapbox.dataLayer();
        this.addLayer(this.dataLayer);

        this.gridLayer = new mapbox.gridLayer();
        this.addLayer(this.gridLayer);

        this.legendControl = new mapbox.legendControl();

        if (typeof _ === 'string') {
            mapbox.idUrl(_, this);
        // javascript object of TileJSON data
        } else if (_ && typeof _ === 'object') {
            this.tilejson(_);
        }
    },

    // use a javascript object of tilejson data to configure this layer
    tilejson: function(_) {
        if (!arguments.length) return this._tilejson;
        this._tilejson = _;
        this._initialize(_);
        return this;
    },

    getTileJSON: function() { this.tilejson(); },
    setTileJSON: function(_) { this.tilejson(_); },

    // pull tilejson data from an endpoint
    url: function(url) {
        mapbox.request(url, L.bind(function(err, json) {
            if (err) return mapbox.log('could not load TileJSON at ' + url);
            this.tilejson(json);
        }, this));
        return this;
    },

    // pull tilejson data from an endpoint, given just by an id
    id: function(id) {
        return this.url(mapbox.base() + id + '.json');
    },

    setId: function(_) { this.id(_); },

    onAdd: function(map) {
        L.LayerGroup.prototype.onAdd.call(this, map);
        if (this.options.legendControl) {
            this.legendControl.addTo(map);
        }
    },

    onRemove: function(map) {
        L.LayerGroup.prototype.onRemove.call(this, map);
        if (this.options.legendControl) {
            this.legendControl.removeFrom(map);
        }
    },

    _initialize: function(json) {
        this.tileLayer.tilejson(json);

        if (json.data && json.data[0]) {
            this.dataLayer.url(json.data[0]);
        }

        this.gridLayer.tilejson(json);

        if (json.legend) {
            this.legendControl.addLegend(json.legend);
        }
    }
});
