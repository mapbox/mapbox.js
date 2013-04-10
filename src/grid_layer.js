var util = require('./util'),
    url = require('./url'),
    request = require('./request'),
    Mustache = require('mustache');

// forked from danzel/L.UTFGrid
module.exports = L.Class.extend({
    includes: L.Mixin.Events,

    options: {
        minZoom: 0,
        maxZoom: 18
    },

    _mouseOn: null,
    _urls: [],
    _tilejson: {},
    _template: function() { return ''; },
    _cache: {},

    initialize: function(_, options) {
        L.Util.setOptions(this, options);

        if (typeof _ === 'string') util.idUrl(_, this);
        else if (_ && typeof _ === 'object') this.setTileJSON(_);
    },

    setTileJSON: function(_) {
        util.strict(_, 'object');
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

    active: function() {
        return !!(this._map && this._urls && this._urls.length);
    },

    loadURL: function(url, cb) {
        request(url, L.bind(function(err, json) {
            if (err) util.log('could not load TileJSON at ' + url);
            else if (json) this.setTileJSON(json);
            if (cb) cb.call(this, err, json);
            this.fire('load', json);
        }, this));
        return this;
    },

    loadID: function(id, cb) {
        return this.loadURL(url.base() + id + '.json', cb);
    },

    onAdd: function(map) {
        this._map = map;
        this._update();

        var zoom = this._map.getZoom();
        if (zoom > this.options.maxZoom || zoom < this.options.minZoom) return;

        this._map
            .on('click', this._click, this)
            .on('mousemove', this._move, this)
            .on('moveend', this._update, this);
    },

    onRemove: function() {
        this._map
            .off('click', this._click, this)
            .off('mousemove', this._move, this)
            .off('moveend', this._update, this);
    },

    // given a template string x, return a template function that accepts
    // (data, format)
    _getTemplate: function(x) {
        return function(data, format) {
            var clone = {};
            for (var key in data) { clone[key] = data[key]; }
            if (format) { clone['__' + format + '__'] = true; }
            return Mustache.to_html(x, clone);
        };
    },

    _click: function(e) {
        if (!this.active()) return;
        this._objectForEvent(e, L.bind(function(on) {
            this.fire('click', on.content);
        }, this));
    },

    _move: function(e) {
        if (!this.active()) return;
        this._objectForEvent(e, L.bind(function(on) {
            if (on.data !== this._mouseOn) {
                if (this._mouseOn) {
                    this.fire('mouseout', {
                        latLng: e.latlng,
                        data: this._mouseOn
                    });
                }
                if (on.data) this.fire('mouseover', on);
                this._mouseOn = on.data;
            } else if (on.data) {
                this.fire('mousemove', on);
            }
        }, this));
    },

    featureAtScreenPoint: function(latlng, callback) {
        var map = this._map,
            point = map.project(latlng),
            tileSize = 256,
            resolution = 4,
            x = Math.floor(point.x / tileSize),
            y = Math.floor(point.y / tileSize),
            gridX = Math.floor((point.x - (x * tileSize)) / resolution),
            gridY = Math.floor((point.y - (y * tileSize)) / resolution),
            max = map.options.crs.scale(map.getZoom()) / tileSize;

        x = (x + max) % max;
        y = (y + max) % max;

        this.getGrid(map.getZoom(), x, y, L.bind(function(data) {
            if (!data) return { latlng: latlng, data: null };
            var idx = this._utfDecode(data.grid[gridY].charCodeAt(gridX)),
                key = data.keys[idx];
            if (!data.data.hasOwnProperty(key)) callback(null);
            else callback(data.data[key]);
        }, this));
    },

    _objectForEvent: function(e, callback) {
        var o = null;
        this.featureAtScreenPoint(e.latlng, L.bind(function(data) {
            if (!data) {
                return { latLng: e.latlng };
            } else {
                o = {
                    latLng: e.latlng,
                    data: data,
                    url: this._template(data, 'location'),
                    teaser: this._template(data, 'teaser'),
                    full: this._template(data, 'full')
                };
                return callback(o);
            }
        }, this));
        return o;
    },

    // a successful grid load. returns a function that maintains the
    // value of `key` in a closure, and fills the `_cache` with the
    // value if returned
    _load: function(key) {
        return L.bind(function(err, json) {
            if (!err) this._cache[key] = json;
        }, this);
    },

    _getURL: function(h) {
        return this._urls[h % (this._urls.length - 1)] || '';
    },

    // Load up all required json grid files
    _update: function() {

        if (!this.active()) return;

        var bounds = this._map.getPixelBounds(),
            z = this._map.getZoom(),
            tileSize = 256;

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
                // x wrapped
                var xw = (x + max) % max, yw = (y + max) % max;
                var key = z + '_' + xw + '_' + yw;
                this.getGrid(z, xw, yw, this._load(key));
            }
        }
    },

    getGrid: function(z, x, y, callback) {
        var key = z + '_' + x + '_' + y;
        if (this._cache.hasOwnProperty(key)) {
            callback(this._cache[key]);
        } else {
            this._cache[key] = null;
            request(L.Util.template(this._getURL(x + y), {
                z: z, x: x, y: y
            }), callback, true);
        }
    },

    _utfDecode: function(c) {
        if (c >= 93) c--;
        if (c >= 35) c--;
        return c - 32;
    }
});
