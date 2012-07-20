if (typeof mapbox === 'undefined') mapbox = {};

mapbox.ui = function(map) {

    var container = map.parent.appendChild(document.createElement('div')),
        auto = false;

    var ui = {
        zoomer: wax.mm.zoomer().map(map),
        pointselector: wax.mm.pointselector().map(map),
        hash: wax.mm.hash().map(map),
        zoombox: wax.mm.zoombox().map(map),
        fullscreen: wax.mm.fullscreen().map(map),
        legend: wax.mm.legend().map(map),
        attribution: wax.mm.attribution().map(map)
    };

    container.id = 'controls';
    ui.auto = function() {
        auto = true;
        ui.zoomer();
        ui.zoombox();
        return ui;
    };

    return ui;
};
