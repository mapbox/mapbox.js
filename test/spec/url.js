describe("url", function() {
    describe('#base', function() {
        it("returns 'http://a.tiles.mapbox.com/v3/'", function() {
            expect(private.url.base()).to.equal('http://a.tiles.mapbox.com/v3/');
        });

        it("returns a subdomain based on the number", function() {
            expect(private.url.base(1)).to.equal('http://b.tiles.mapbox.com/v3/');
            expect(private.url.base(6)).to.equal('http://c.tiles.mapbox.com/v3/');
        });
    });
    describe('#httpsify', function() {
        it('replaces urls with https urls', function() {
            private.config.FORCE_HTTPS = true;
            private.config.HTTPS_URLS = ['https://foo/'];
            expect(private.url.httpsify(helpers.tileJSON))
                .to.eql({
                    "attribution":"Data provided by NatureServe in collaboration with Robert Ridgely",
                    "bounds":[-180,-85.0511,180,85.0511],
                    "center":[-98.976,39.386,4],
                    "data":["https://foo/examples.map-8ced9urs/markers.geojsonp"],
                    "description":"Bird species of North America, gridded by species count.",
                    "geocoder":"http://a.tiles.mapbox.com/v3/examples.map-8ced9urs/geocode/{query}.jsonp",
                    "grids":[
                        "https://foo/examples.map-8ced9urs/{z}/{x}/{y}.grid.json",
                        "https://foo/examples.map-8ced9urs/{z}/{x}/{y}.grid.json",
                        "https://foo/examples.map-8ced9urs/{z}/{x}/{y}.grid.json",
                        "https://foo/examples.map-8ced9urs/{z}/{x}/{y}.grid.json"],
                    "id":"examples.map-8ced9urs",
                    "maxzoom":17,
                    "minzoom":0,
                    "name":"Bird species",
                    "private":true,
                    "scheme":"xyz",
                    "template":"{{#__l0__}}{{#__location__}}{{/__location__}}{{#__teaser__}}<div class='birds-tooltip'>\n  <strong>{{name}}</strong>\n  <strong>{{count}} species</strong>\n  <small>{{species}}</small>\n  <div class='carmen-fields' style='display:none'>\n  {{search}} {{lon}} {{lat}} {{bounds}}\n  </div>\n</div>\n<style type='text/css'>\n.birds-tooltip strong { display:block; font-size:16px; }\n.birds-tooltip small { font-size:10px; display:block; overflow:hidden; max-height:90px; line-height:15px; }\n</style>{{/__teaser__}}{{#__full__}}{{/__full__}}{{/__l0__}}",
                    "tilejson":"2.0.0",
                    "tiles":[
                        "https://foo/examples.map-8ced9urs/{z}/{x}/{y}.png",
                        "https://foo/examples.map-8ced9urs/{z}/{x}/{y}.png",
                        "https://foo/examples.map-8ced9urs/{z}/{x}/{y}.png",
                        "https://foo/examples.map-8ced9urs/{z}/{x}/{y}.png"],
                    "webpage":"http://tiles.mapbox.com/examples/map/map-8ced9urs"
                });
            private.config.FORCE_HTTPS = false;
            private.config.HTTPS_URLS = [];
        });
    });
});
