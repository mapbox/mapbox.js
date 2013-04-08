window.L = require('Leaflet/dist/leaflet-src');

require('leaflet-hash/leaflet-hash');
require('leaflet-fullscreen/src/Leaflet.fullscreen');

window.mapbox = module.exports = {};
module.exports.request = require('./src/request');
module.exports.util = require('./src/util');
module.exports.geocoder = require('./src/geocoder');
module.exports.sanitize = require('./src/sanitize');
module.exports.marker = require('./src/marker');
module.exports.tileLayer = require('./src/tile_layer');
module.exports.legendControl = require('./src/legend_control');
module.exports.geocoderControl = require('./src/geocoder_control');
module.exports.gridControl = require('./src/grid_control');
module.exports.gridLayer = require('./src/grid_layer');
module.exports.markerLayer = require('./src/marker_layer');
module.exports.hash = require('./src/hash');
module.exports.map = require('./src/map');
