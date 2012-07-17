if (typeof mapbox === 'undefined') mapbox = {};

mapbox.interaction = function() {

    var interaction = wax.mm.interaction(),
        auto = false;

    interaction.refresh = function() {
        if (!auto) return;
        var map = this.map();
        for (var i = map.layers.length - 1; i >= 0; i --) {
            var tj = map.layers[i].tilejson && map.layers[i].tilejson();
            if (tj && tj.template) return this.tilejson(tj);
        }
        this.tilejson({});
    };

    interaction.auto = function() {
        auto = true;
        this.on(wax.tooltip().animate(true).parent(this.map().parent).events());
        this.refresh();
    };

    return interaction;
};
