'use strict';

var ShareControl = L.Control.extend({
    includes: [require('./load_tilejson')],

    options: {
        position: 'topleft'
    },

    initialize: function(_, options) {
        L.setOptions(this, options);
        this._loadTileJSON(_);
    },

    _setTileJSON: function(json) {
        this._tilejson = json;
    },

    onAdd: function(map) {
        this._map = map;

        var container = L.DomUtil.create('div', 'leaflet-control-mapbox-share leaflet-bar');
        var link = L.DomUtil.create('a', 'mapbox-share', container);
        link.href = '#';

        L.DomEvent.addListener(link, 'click', this._share, this);
        L.DomEvent.disableClickPropagation(container);

        return container;
    },

    _share: function(e) {
        L.DomEvent.stop(e);

        if (this._popup) {
            this._map.closePopup(this._popup);
            return;
        }

        var tilejson = this._tilejson || this._map._tilejson || {};

        var twitter = 'http://twitter.com/intent/tweet?status='
            + encodeURIComponent(tilejson.name + '\n' + (tilejson.webpage || window.location));
        var facebook = 'https://www.facebook.com/sharer.php?u='
            + encodeURIComponent(tilejson.webpage || window.location)
            + '&t=' + encodeURIComponent(tilejson.name);

        var share = L.DomUtil.create('div', 'mapbox-share-popup');
        share.innerHTML = ("<h3>Share this map</h3>"
            + "<div class='mapbox-share-buttons'><a class='mapbox-share-facebook' target='_blank' href='{{facebook}}'>Facebook</a>"
            + "<a class='mapbox-share-twitter' target='_blank' href='{{twitter}}'>Twitter</a></div>")
            .replace('{{twitter}}', twitter)
            .replace('{{facebook}}', facebook);
        share.innerHTML += "<h3>Get the embed code</h3>";
        share.innerHTML += "<small>Copy and paste this HTML into your website or blog.</small>";

        var embed = document.createElement('textarea');

        embed.rows = 4;
        embed.value = "<iframe width='500' height='300' frameBorder='0' src='{{embed}}'></iframe>"
            .replace('{{embed}}', tilejson.embed || window.location);

        L.DomEvent.addListener(embed, 'click', function(e) {
            L.DomEvent.stop(e);
            embed.focus();
            embed.select();
        });

        share.appendChild(embed);

        this._popup = new L.Popup({className: 'mapbox-share-popup'});

        this._popup
            .setContent(share)
            .setLatLng(this._map.getCenter())
            .openOn(this._map)
            .on('close', function() {
                this._popup = null;
            }, this);
    }
});

module.exports = function(_, options) {
    return new ShareControl(_, options);
};
