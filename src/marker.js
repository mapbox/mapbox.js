// mapbox-related markers functionality
mapbox.marker = {};

// provide an icon from mapbox's simple-style spec and hosted markers
// service
mapbox.marker.icon = function(fp) {
    fp = fp || {};

    var sizes = {
            small: [20, 50],
            medium: [30, 70],
            large: [35, 90]
        },
        size = fp['marker-size'] || 'medium',
        symbol = (fp['marker-symbol']) ? '-' + fp['marker-symbol'] : '',
        color = (fp['marker-color'] || '7e7e7e').replace('#', '');

    return L.icon({
        iconUrl: mapbox.base() + 'marker/' +
            'pin-' + size.charAt(0) + symbol + '+' + color +
            // detect and use retina markers, which are x2 resolution
            ((L.Browser.retina) ? '@2x' : '') + '.png',
        iconSize: sizes[size],
        iconAnchor: [sizes[size][0] / 2, sizes[size][1] / 2],
        popupAnchor: [0, -sizes[size][1] / 2]
    });
};

// a factory that provides markers for Leaflet from MapBox's
// [simple-style specification](https://github.com/mapbox/simplestyle-spec)
// and [Markers API](http://mapbox.com/developers/api/#markers).
mapbox.marker.style = function(f, latlon) {
    return L.marker(latlon, {
        icon: mapbox.marker.icon(f.properties),
        title: f.properties.title
    });
};

mapbox.marker.layer = L.GeoJSON.extend({
    options: {
        pointToLayer: mapbox.marker.style,
        onEachFeature: function(feature, layer) {
            layer.bindPopup(feature.properties.title);
        }
    },

    initialize: function(_) {
        L.GeoJSON.prototype.initialize.call(this);

        if (typeof _ === 'string') {
            // map id 'tmcw.foo'
            if (_.indexOf('/') == -1) this.id(_);
            // url 'http://foo.com/foo.bar'
            else this.url(_);
        // javascript object of TileJSON data
        } else if (typeof _ === 'object') {
            this.addData(_);
        }
    },

    url: function(url) {
        var url = url.replace(/\.(geo)?jsonp(?=$|\?)/, '.$1json');
        L.TileJSON.load(url, L.bind(function(err, json) {
            if (err) return mapbox.log('could not load markers at ' + url);
            this.addData(json);
        }, this));
        return this;
    },

    id: function(id) {
        return this.url(mapbox.base() + id + '/markers.geojson');
    }
});
