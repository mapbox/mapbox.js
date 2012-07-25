!function($) {

    $.fn.geocode = geocode;

    function geocode(e) {

        e.preventDefault();
        var $this = $(this),
            map = $('#' + $this.parents('[data-map]').data('map')).data('map'),
            query = encodeURIComponent($this.find('input[type=text]').val());

        $this.addClass('loading');

        reqwest({
            url: 'http://open.mapquestapi.com/nominatim/v1/search?format=json&json_callback=callback&&limit=1&q=' + query,
            type: 'jsonp',
            jsonpCallback: 'callback',
            jsonpCallbackName: 'callback',
            success: success
        });

        function success(resp) {
            resp = resp[0];
            $this.removeClass('loading');

            if (!resp) {
                $this.find('#geocode-error').text('This address cannot be found.').fadeIn('fast');
                console.log(resp);
                return;
            }

            $this.find('#geocode-error').hide();

            map.setExtent([
                { lat: resp.boundingbox[1], lon: resp.boundingbox[2] },
                { lat: resp.boundingbox[0], lon: resp.boundingbox[3] }
            ]);

            if (!map.getLayer('geocode')) {
                var layer = mapbox.markers.layer().named('geocode');
                map.addLayer(layer);
                layer.tilejson = function() { return {
                    attribution: 'Search by <a href="http://developer.mapquest.com/web/products/open">MapQuest Open</a>'
                }};
            }

            map.getLayer('geocode').features([]).add_feature({
                'type': 'Feature',
                'geometry': { 'type': 'Point', 'coordinates': [resp.lon, resp.lat] },
                'properties': {}
            });

            map.ui.refresh(); // Update attribution
        }
    }

    
    $(function() {
        $('[data-control="geocode"] form').submit(geocode);
    });

}(window.jQuery);
