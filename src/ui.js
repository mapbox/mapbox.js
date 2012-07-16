if (typeof mapbox === 'undefined') mapbox = {};

mapbox.ui = function() {

    var ui = {},
        map,
        container = document.createElement('div');

    container.id = 'controls';

    ui.map = function(x) {
        if (!x) return map;
        map = x;
        map.parent.appendChild(container);
        return this;
    };

    ui.auto = function() {
        ui.zoomer();
        ui.zoombox();
        return this;
    };

    ui.pointselector = function() {
        ui._pointselector = wax.mm.pointselector(map);
        return this;
    };

    ui.boxselector = function() {
        ui._boxselector = wax.mm.boxselector(map);
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

    return ui;
};
