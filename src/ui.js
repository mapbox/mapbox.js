if (typeof mapbox === 'undefined') mapbox = {};

mapbox.ui = function(map) {

    var ui = {},
        map,
        container = map.parent.appendChild(document.createElement('div')),
        auto = false;

    container.id = 'controls';

    ui.zoomer = wax.mm.zoomer().map(map);
    ui.pointselector = wax.mm.pointselector().map(map);
    ui.hash = wax.mm.hash().map(map);
    ui.zoombox = wax.mm.zoombox().map(map);
    ui.fullscreen = wax.mm.fullscreen().map(map);
    ui.legend = wax.mm.legend();
    ui.attribution = wax.mm.attribution();

    ui.auto = function() {
        auto = true;
        ui.zoomer();
        ui.zoombox();
        return ui;
    };

    return ui;
};
