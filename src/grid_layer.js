// forked from danzel/L.UTFGrid
mapbox.gridLayer = L.Class.extend({
    includes: L.Mixin.Events,

    options: {
        minZoom: 0,
        maxZoom: 18,
        tileSize: 256,
        resolution: 4
    },

    _mouseOn: null,
    _urls: [],
    _tilejson: {},
    _template: function() { return ''; },
    _cache: {},

    initialize: function(_, options) {
        L.Util.setOptions(this, options);

        if (typeof _ === 'string') mapbox.idUrl(_, this);
        else if (_ && typeof _ === 'object') this.setTileJSON(_);
    },

    setTileJSON: function(_) {
        mapbox.strict(_, 'object');
        this._tilejson = _;
        if (this._tilejson.grids) this._urls = this._tilejson.grids;
        if (this._tilejson.template) {
            this._template = this._getTemplate(this._tilejson.template);
        }
        this._cache = {};
        this._update();
        return this;
    },

    getTileJSON: function() {
        return this._tilejson;
    },

    loadURL: function(url, cb) {
        mapbox.request(url, L.bind(function(err, json) {
            if (err) mapbox.log('could not load TileJSON at ' + url);
            else if (json) this.setTileJSON(json);
            if (cb) cb.call(this, err, json);
        }, this));
        return this;
    },

    loadID: function(id, cb) {
        return this.url(mapbox.base() + id + '.json', cb);
    },

    onAdd: function(map) {
        this._map = map;
        this._update();

        var zoom = this._map.getZoom();
        if (zoom > this.options.maxZoom || zoom < this.options.minZoom) return;

        this._map.on('click', this._click, this)
            .on('mousemove', this._move, this)
            .on('moveend', this._update, this);
    },

    onRemove: function() {
        this._map.off('click', this._click, this)
            .off('mousemove', this._move, this)
            .off('moveend', this._update, this);
    },

    _getTemplate: function(x) {
        return function(data, format) {
            var clone = {};
            for (var key in data) { clone[key] = data[key]; }
            if (format) { clone['__' + format + '__'] = true; }
            return Mustache.to_html(x, clone);
        };
    },

    _click: function(e) {
        var o = this._objectForEvent(e);
        this.fire('click', o.content);
    },

    _move: function(e) {
        var on = this._objectForEvent(e);
        // TODO: this fail.
        if (on.data !== this._mouseOn) {
            if (this._mouseOn) {
                this.fire('mouseout', {
                    latLng: e.latlng, data: this._mouseOn
                });
            }
            if (on.data) this.fire('mouseover', on);
            this._mouseOn = on.data;
        } else if (on.data) {
            this.fire('mousemove', on);
        }
    },

    _objectForEvent: function(e) {

        var map = this._map,
            point = map.project(e.latlng),
            tileSize = this.options.tileSize,
            resolution = this.options.resolution,
            x = Math.floor(point.x / tileSize),
            y = Math.floor(point.y / tileSize),
            gridX = Math.floor((point.x - (x * tileSize)) / resolution),
            gridY = Math.floor((point.y - (y * tileSize)) / resolution),
            max = map.options.crs.scale(map.getZoom()) / tileSize;

        x = (x + max) % max;
        y = (y + max) % max;

        var data = this._cache[map.getZoom() + '_' + x + '_' + y];

        if (!data) return { latlng: e.latlng, data: null };

        var idx = this._utfDecode(data.grid[gridY].charCodeAt(gridX)),
        key = data.keys[idx],
        result = data.data[key];

        if (!data.data.hasOwnProperty(key)) result = null;

        return {
            latLng: e.latlng,
            data: result,
            url: this._template(result, 'location'),
            teaser: this._template(result, 'teaser'),
            full: this._template(result, 'full')
        };
    },

    // a successful grid load. returns a function that maintains the
    // value of `key` in a closure, and fills the `_cache` with the
    // value if returned
    _load: function(key) {
        return L.bind(function(err, json) {
            if (!err) this._cache[key] = json;
        }, this);
    },

    _url: function(h) { return this._urls[h % (this._urls.length - 1)] || ''; },

    // Load up all required json grid files
    // TODO: Load from center etc
    _update: function() {

        if (!this._map) return;

        var bounds = this._map.getPixelBounds(),
            z = this._map.getZoom(),
            tileSize = this.options.tileSize;

        if (z > this.options.maxZoom || z < this.options.minZoom) return;

        var nwTilePoint = new L.Point(
                Math.floor(bounds.min.x / tileSize),
                Math.floor(bounds.min.y / tileSize)),
            seTilePoint = new L.Point(
                Math.floor(bounds.max.x / tileSize),
                Math.floor(bounds.max.y / tileSize)),
            max = this._map.options.crs.scale(z) / tileSize;

        for (var x = nwTilePoint.x; x <= seTilePoint.x; x++) {
            for (var y = nwTilePoint.y; y <= seTilePoint.y; y++) {

                var xw = (x + max) % max, yw = (y + max) % max,
                    key = z + '_' + xw + '_' + yw;

                // avoid loading the same grid tile multiple times
                if (!this._cache.hasOwnProperty(key)) {
                    this._cache[key] = null;
                    mapbox.requestp(L.Util.template(this._url(x + y), {
                        z: z, x: xw, y: yw
                    }), this._load(key));
                }
            }
        }
    },

    _utfDecode: function(c) {
        if (c >= 93) c--;
        if (c >= 35) c--;
        return c - 32;
    }
});
