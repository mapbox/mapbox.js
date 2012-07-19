if (typeof mapbox === 'undefined') mapbox = {};

mapbox.ui = function(map) {

    var ui = {},
        map,
        container = map.parent.appendChild(document.createElement('div')),
        auto = false;

    container.id = 'controls';

    ui.auto = function() {
        auto = true;
        ui.zoomer();
        ui.zoombox();
        return this;
    };

    ui.refresh = function() {
        return this;
    };

    ui.pointselector = function(callback) {
        if (!arguments.length) return ui._pointselector;
        ui._pointselector = wax.mm.pointselector(map, null, callback);
        return this;
    };

    ui.boxselector = function(callback) {
        if (!arguments.length) return ui._boxselector;
        ui._boxselector = wax.mm.boxselector(map, null, callback);
        return this;
    };

    ui.hash = function() {
        ui._hash = wax.mm.hash(map);
        return this;
    };

    ui.zoombox = function() {
        ui._zoombox = wax.mm.zoombox(map);
    };

    ui.fullscreen = function() {
        ui._fullscreen = wax.mm.fullscreen(map).appendTo(container);
        return this;
    };

    ui.zoomer = function() {
        ui._zoomer = wax.mm.zoomer(map).appendTo(container);
        return this;
    };

    ui.legend = function(tj) {
        ui._legend = wax.mm.legend(map, tj).appendTo(container);
        return this;
    };

    ui.attribution = function(tj) {
        ui._attribution = wax.mm.attribution(map, tj).appendTo(container);
        return this;
    };

    return ui;
};
