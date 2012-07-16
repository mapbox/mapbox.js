if (typeof mapbox === 'undefined') mapbox = {};

mapbox.ui = function() {

    var ui = {},
        map;

    ui.map = function(x) {
        if (!x) return map;
        map = x;
        return this
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
        ui._fullscreen = wax.mm.fullscreen(map).appendTo(map.parent);
        return this;
    };

    ui.zoomer = function() {
        ui._zoomer = wax.mm.zoomer(map).appendTo(map.parent);
        return this;
    };

    return ui;
}
