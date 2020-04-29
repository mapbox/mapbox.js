'use strict';

var request = require('./request'),
    format_url = require('./format_url'),
    util = require('./util');

module.exports = {
    _loadTileJSON: function(_) {
        if (typeof _ === 'string') {
            var style = _;
            _ = format_url.tileJSON(_, this.options && this.options.accessToken);
            var isGLStyle = _.indexOf('/styles/v1/') !== -1;
            if (!isGLStyle) {
                util.warn('Warning: this implementation is loading a Mapbox Studio Classic style (' + style + '). ' +
                    'Studio Classic styles are scheduled for deprecation: https://blog.mapbox.com/deprecating-studio-classic-styles-c65a744140a6')
            }
            request(_, L.bind(function(err, json) {
                if (err) {
                    util.log('could not load TileJSON at ' + _);
                    this.fire('error', {error: err});
                } else if (json && isGLStyle) {
                    // In order to preserve compatibility, 256x256 tiles are requested by default
                    // If you would like better resolution & fewer network requests, use a styleLayer instead
                    json.tiles = [ format_url('/styles/v1/' + json.owner + '/' + json.id + '/tiles/256/{z}/{x}/{y}', this.options.accessToken) ];
                    this._setTileJSON(json);
                    this.fire('ready');
                } else if (json) {
                    this._setTileJSON(json);
                    this.fire('ready');
                }
            }, this));
        } else if (_ && typeof _ === 'object') {
            this._setTileJSON(_);
        }
    }
};
