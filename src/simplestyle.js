'use strict';

// an implementation of the simplestyle spec for polygon and linestring features
// https://github.com/mapbox/simplestyle-spec
var defaults = {
    stroke: '#555555',
    'stroke-width': 2,
    'stroke-opacity': 1,
    fill: '#555555',
    'fill-opacity': 0.5
};

function style(feature) {
    var properties = feature.properties || {};
    return {
        color: properties.stroke || defaults.stroke,
        weight: properties['stroke-width'] || defaults['stroke-width'],
        opacity: properties['stroke-opacity'] !== undefined ? properties['stroke-opacity'] : defaults['stroke-opacity'],
        fill: (feature.geometry &&
            (feature.geometry.type === 'Polygon' || feature.geometry.type === 'MultiPolygon')),
        fillColor: properties.fill || defaults.fill,
        fillOpacity: properties['fill-opacity'] !== undefined ? properties['fill-opacity'] : defaults['fill-opacity'],
    };
}

module.exports = {
    style: style,
    defaults: defaults
};
