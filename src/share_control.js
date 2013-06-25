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

        var container = L.DomUtil.create('div', 'leaflet-control-mapbox-share');
        var link = L.DomUtil.create('a', 'share', container);

        link.innerHTML = 'Share +';
        link.href = '#';

        L.DomEvent.addListener(link, 'click', this._share, this);
        L.DomEvent.disableClickPropagation(container);

        return container;
    },

    _share: function(e) {
        L.DomEvent.stop(e);

        var tilejson = this._tilejson || this._map._tilejson || {};

        var twitter = 'http://twitter.com/intent/tweet?status='
            + encodeURIComponent(tilejson.name + ' (' + (tilejson.webpage || window.location) + ')');
        var facebook = 'https://www.facebook.com/sharer.php?u='
            + encodeURIComponent(tilejson.webpage || window.location)
            + '&t=' + encodeURIComponent(tilejson.name);

        var share = document.createElement('div');
        share.innerHTML = ("<h3>Share this map</h3>"
            + "<p><a class='facebook' target='_blank' href='{{facebook}}'>Facebook</a>"
            + "<a class='twitter' target='_blank' href='{{twitter}}'>Twitter</a></p>")
            .replace('{{twitter}}', twitter)
            .replace('{{facebook}}', facebook);
        share.innerHTML += "<strong>Get the embed code</strong><br />";
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

        new L.Popup({className: 'leaflet-mapbox-share-popup'})
            .setContent(share)
            .setLatLng(this._map.getCenter())
            .openOn(this._map);
    }
});

module.exports = function(_, options) {
    return new ShareControl(_, options);
};
