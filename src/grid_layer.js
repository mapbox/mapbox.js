'use strict';

var util = require('./util'),
    url = require('./url'),
    request = require('./request'),
    Mustache = require('mustache'),
    grid = require('./grid');

// forked from danzel/L.UTFGrid
var GridLayer = L.Class.extend({
    includes: L.Mixin.Events,

    options: {
        minZoom: 0,
        maxZoom: 18,
        template: function() { return ''; }
    },

    _mouseOn: null,
    _tilejson: {},
    _cache: {},

    initialize: function(_, options) {
        L.Util.setOptions(this, options);

        if (typeof _ === 'string') util.idUrl(_, this);
        else if (_ && typeof _ === 'object') this.setTileJSON(_);
    },

    setTileJSON: function(json) {
        util.strict(json, 'object');
        json = url.httpsify(json);

        L.extend(this.options, {
            grids: json.grids,
            minZoom: json.minzoom,
            maxZoom: json.maxzoom,
            bounds: json.bounds && util.lbounds(json.bounds),
            template: json.template && this._getTemplate(json.template)
        });

        if (json.template) {
            this.options.template = this._getTemplate(json.template);
        } else {
            this.options.template = function() { return ''; };
        }

        this._tilejson = json;
        this._cache = {};
        this._update();

        return this;
    },

    getTileJSON: function() {
        return this._tilejson;
    },

    active: function() {
        return !!(this._map && this.options.grids && this.options.grids.length);
    },

    loadURL: function(url, cb) {
        request(url, L.bind(function(err, json) {
            if (err) {
                util.log('could not load TileJSON at ' + url);
                if (cb) cb.call(this, err, json);
            } else if (json) {
                this.setTileJSON(json);
                if (cb) cb.call(this, err, json);
                this.fire('ready');
            }
        }, this));
        return this;
    },

    loadID: function(id, cb) {
        return this.loadURL(url.base() + id + '.json', cb);
    },

    addTo: function (map) {
        map.addLayer(this);
        return this;
    },

    onAdd: function(map) {
        this._map = map;
        this._update();

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

    getData: function(latlng, callback) {
        var map = this._map,
            point = map.project(latlng),
            tileSize = 256,
            resolution = 4,
            x = Math.floor(point.x / tileSize),
            y = Math.floor(point.y / tileSize),
            max = map.options.crs.scale(map.getZoom()) / tileSize;

        x = (x + max) % max;
        y = (y + max) % max;

        this._getTile(map.getZoom(), x, y, function(grid) {
            var gridX = Math.floor((point.x - (x * tileSize)) / resolution),
                gridY = Math.floor((point.y - (y * tileSize)) / resolution);

            callback(grid(gridX, gridY));
        });
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
            this.fire('click', on);
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
            } else {
                this.fire('mousemove', on);
            }
        }, this));
    },

    _objectForEvent: function(e, callback) {
        return this.getData(e.latlng, L.bind(function(data) {
            if (data) {
                callback({
                    latLng: e.latlng,
                    data: data,
                    url: this.options.template(data, 'location'),
                    teaser: this.options.template(data, 'teaser'),
                    full: this.options.template(data, 'full')
                });
            } else {
                callback({
                    latLng: e.latlng,
                    data: data
                });
            }
        }, this));
    },

    _getTileURL: function(tilePoint) {
        var urls = this.options.grids,
            index = (tilePoint.x + tilePoint.y) % urls.length,
            url = urls[index];

        return L.Util.template(url, tilePoint);
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
                this._getTile(z, xw, yw);
            }
        }
    },

    _getTile: function(z, x, y, callback) {
        var key = z + '_' + x + '_' + y,
            tilePoint = L.point(x, y);

        tilePoint.z = z;

        if (!this._tileShouldBeLoaded(tilePoint)) {
            return;
        }

        if (key in this._cache) {
            if (!callback) return;

            if (typeof this._cache[key] === 'function') {
                callback(this._cache[key]); // Already loaded
            } else {
                this._cache[key].push(callback); // Pending
            }

            return;
        }

        this._cache[key] = [];

        if (callback) {
            this._cache[key].push(callback);
        }

        request(this._getTileURL(tilePoint), L.bind(function(err, json) {
            var callbacks = this._cache[key];
            this._cache[key] = grid(json);
            for (var i = 0; i < callbacks.length; ++i) {
                callbacks[i](this._cache[key]);
            }
        }, this));
    },

    _tileShouldBeLoaded: function(tilePoint) {
        if (tilePoint.z > this.options.maxZoom || tilePoint.z < this.options.minZoom) {
            return false;
        }

        if (this.options.bounds) {
            var tileSize = 256,
                nwPoint = tilePoint.multiplyBy(tileSize),
                sePoint = nwPoint.add(new L.Point(tileSize, tileSize)),
                nw = this._map.unproject(nwPoint),
                se = this._map.unproject(sePoint),
                bounds = new L.LatLngBounds([nw, se]);

            if (!this.options.bounds.intersects(bounds)) {
                return false;
            }
        }

        return true;
    }
});

module.exports = function(_, options) {
    return new GridLayer(_, options);
};
