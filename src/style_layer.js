'use strict';

var util = require('./util');
var format_url = require('./format_url');
var request = require('./request');

var StyleLayer = L.TileLayer.extend({

    options: {
        sanitizer: require('sanitize-caja')
    },

    initialize: function(_, options) {
        L.TileLayer.prototype.initialize.call(this, undefined, options);

        this.options.tiles = this._formatTileURL(_);
        this.options.tileSize = 512;
        this.options.zoomOffset = -1;
        this.options.tms = false;

        this._getAttribution(_);
    },

    _getAttribution: function(_) {
        var styleURL = format_url.style(_, this.options && this.options.accessToken);
        request(styleURL, L.bind(function(err, style) {
            if (err) {
                util.log('could not load Mapbox style at ' + styleURL);
                this.fire('error', {error: err});
            }
            var sources = [];
            for (var id in style.sources) {
                var source = style.sources[id].url.split('mapbox://')[1];
                sources.push(source);
            }
            request(format_url.tileJSON(sources.join(), this.options.accessToken), L.bind(function(err, json) {
                if (err) {
                    util.log('could not load TileJSON at ' + _);
                    this.fire('error', {error: err});
                } else if (json) {
                    util.strict(json, 'object');

                    this.options.attribution = this.options.sanitizer(json.attribution);

                    this._tilejson = json;
                    this.fire('ready');
                }
            }, this));
        }, this));
    },

    // disable the setUrl function, which is not available on mapbox tilelayers
    setUrl: null,

    _formatTileURL: function(style) {
        var retina = L.Browser.retina ? '@2x' : '';
        if (typeof style === 'string') {
            if (style.indexOf('mapbox://styles/') === -1) {
                util.log('Incorrectly formatted Mapbox style at ' + style);
                this.fire('error');
            }
            var ownerIDStyle = style.split('mapbox://styles/')[1];
            return format_url('/styles/v1/' + ownerIDStyle + '/tiles/{z}/{x}/{y}' + retina, this.options.accessToken);
        } else if (typeof style === 'object') {
            return format_url('/styles/v1/' + style.owner + '/' + style.id + '/tiles/{z}/{x}/{y}' + retina, this.options.accessToken);
        }
    },

    // this is an exception to mapbox.js naming rules because it's called
    // by `L.map`
    getTileUrl: function(tilePoint) {
        var templated = L.Util.template(this.options.tiles, tilePoint);
        return templated;
    }
});

module.exports.StyleLayer = StyleLayer;

module.exports.styleLayer = function(_, options) {
    return new StyleLayer(_, options);
};
