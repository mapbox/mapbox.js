window.L = require('Leaflet/dist/leaflet-src');

window.mapbox = module.exports = {};
module.exports.geocoder = require('./src/geocoder');
module.exports.marker = require('./src/marker');
module.exports.tileLayer = require('./src/tile_layer');
module.exports.legendControl = require('./src/legend_control');
module.exports.geocoderControl = require('./src/geocoder_control');
module.exports.gridControl = require('./src/grid_control');
module.exports.gridLayer = require('./src/grid_layer');
module.exports.markerLayer = require('./src/marker_layer');
module.exports.map = require('./src/map');

require('leaflet-hash/leaflet-hash');
module.exports.hash = L.Hash;

require('leaflet-fullscreen/src/Leaflet.fullscreen');
module.exports.fullscreenControl = L.Control.Fullscreen;
