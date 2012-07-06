(function($) {
    $.fn.mapbox = function() {
        return this.map(function(x) {
            var $this = $(this);
            if (!$this.data('map')) $(this).data('map', mapbox.map(this));
            return $this.data('map');
        });
    };
})(jQuery);
