!function($) {

    // Either creates map or goes full auto
    // If map already created, map returned
    $.fn.mapbox = function(a, b, c) {

        // Return map if already created
        if (this.data('map')) return this.data('map');

        // Load tilejsons and create map using mapbox.auto
        if (typeof a === 'string' || (a instanceof Array && typeof a[0] === 'string')) {
            mapbox.auto(this.attr('id'), a, $.proxy(function(m, tj) {
                this.data('map', m);
                if (b) b(m, tj);
            }, this));
            return this;

        // Initialize a mapbox map in element
        } else {
            var map = mapbox.map(this.attr('id'), a, b, c);
            return map;
        }

    };


    // Expose functionality as jQuery plugin
    $.fn.switchLayer = switchLayer;

    function switchLayer(e) {
        var $this = $(this),
            $parent = $this.parents('[data-control="switcher"]');
            group = $this.data('group') || 0,
            map = $('#' + $parent.data('map')).data('map'),
            name = $this.attr('href').replace('#','');

        if (!map.getLayer(name).enabled) {
            // Disable all layers in same group
            var layers = $parent.find('a');
            for (var i = 0; i < layers.length; i++) {
                var l = map.getLayer($(layers[i]).attr('href').replace('#',''));
                if (l && group == $(layers[i]).data('group') && l.enabled) {
                    $(layers[i]).removeClass('active');
                    l.disable();
                }
            }

            map.enableLayer(name);
            $this.addClass('active');

        } else if ($this.data('toggle')) {
            // Toggle layer off
            map.disableLayer(name);
            $this.removeClass('active');
            map.draw();
        }
        return false;
    };


    $(function() {
        $('body').on('click.switcher.data-api', '[data-control="switcher"] a', switchLayer);
    });


    $.fn.ease = easeMap;

    function easeMap(e) {
        var $this = $(this),
            mapid = $this.data('map') || $this.parents('[data-map]').data('map');
            map = $('#' + mapid).data('map');

        if (!map) return false;

        var lat = $this.data('lat') || map.center().lat,
            lon = $this.data('lon') || map.center().lon,
            zoom = $this.data('zoom') || map.zoom();

        map.ease.location({ lat: lat, lon: lon}).zoom(zoom).optimal();
        return false;
    }

    $(function() {
        $('body').on('click.ease.data-api', '[data-lat],[data-lon],[data-zoom]', easeMap);
    });

}(window.jQuery);
