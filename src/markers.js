// mapbox-related markers functionality
mapbox.markers = {};

// a factory that provides markers for Leaflet from MapBox's
// [simple-style specification](https://github.com/mapbox/simplestyle-spec)
// and [Markers API](http://mapbox.com/developers/api/#markers).
mapbox.markers.style = function(f, latlon) {
    var sizes = {
        small: [20, 50],
        medium: [30, 70],
        large: [35, 90]
    };

    var fp = f.properties || {},
        size = fp['marker-size'] || 'medium',
        symbol = (fp['marker-symbol']) ? '-' + fp['marker-symbol'] : '',
        color = (fp['marker-color'] || '7e7e7e').replace('#', '');

    return new L.Marker(latlon, {
        icon: new L.Icon({
            iconUrl: mapbox.base() + 'marker/' +
                'pin-' + size.charAt(0) + symbol + '+' + color +
                // detect and use retina markers, which are x2 resolution
                ((L.Browser.retina) ? '@2x' : '') + '.png',
            iconSize: sizes[size],
            iconAnchor: [sizes[size][0] / 2, sizes[size][1] / 2],
            popupAnchor: [sizes[size][0] / 2, 0]
        })
    });
};
