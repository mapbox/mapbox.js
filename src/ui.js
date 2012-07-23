if (typeof mapbox === 'undefined') mapbox = {};

mapbox.ui = function(map) {
    return {
        zoomer: wax.mm.zoomer().map(map).smooth(true),
        pointselector: wax.mm.pointselector().map(map),
        hash: wax.mm.hash().map(map),
        zoombox: wax.mm.zoombox().map(map),
        fullscreen: wax.mm.fullscreen().map(map),
        legend: wax.mm.legend().map(map),
        attribution: wax.mm.attribution().map(map),

        auto: function() {
            this.zoomer.add();
        }
    };
};
