if (typeof mapbox === 'undefined') mapbox = {};

mapbox.ui = function(map) {
    var ui = {
        zoomer: wax.mm.zoomer().map(map).smooth(true),
        pointselector: wax.mm.pointselector().map(map),
        hash: wax.mm.hash().map(map),
        zoombox: wax.mm.zoombox().map(map),
        fullscreen: wax.mm.fullscreen().map(map),
        legend: wax.mm.legend().map(map),
        attribution: wax.mm.attribution().map(map)
    };

    function unique(x) {
        var u = {}, l = [];
        for (var i = 0; i < x.length; i++) u[x[i]] = true;
        for (var a in u) { if (a) l.push(a); }
        return l;
    }

    ui.refresh = function() {
        if (!map) return console && console.error('ui not attached to map');

        var attributions = [], legends = [];
        for (var i = 0; i < map.layers.length; i++) {
            if (map.layers[i].enabled && map.layers[i].tilejson) {
                var attribution = map.layers[i].tilejson().attribution;
                if (attribution) attributions.push(attribution);
                var legend = map.layers[i].tilejson().legend;
                if (legend) legends.push(legend);
            }
        }

        var unique_attributions = unique(attributions);
        var unique_legends = unique(legends);

        ui.attribution.content(unique_attributions.length ? unique_attributions.join('<br />') : '');
        ui.legend.content(unique_legends.length ? unique_legends.join('<br />') : '');

        ui.attribution.element().style.display = unique_attributions.length ? '' : 'none';
        ui.legend.element().style.display = unique_legends.length ? '' : 'none';
    };

    return ui;
};
