describe("L.TileJSON", function() {
    describe("#load", function() {
        it("loads TileJSON from the given URL using XHR+CORS", function(done) {
            L.TileJSON.load('data/tilejson.json', function(data) {
                expect(data.id).to.equal('examples.map-zr0njcqy');
                done();
            });
        });

        it("loads TileJSON from the given URL using XHR+JSONP", function(done) {
            L.TileJSON.load('data/tilejson.json', function(data) {
                expect(data.id).to.equal('examples.map-zr0njcqy');
                done();
            });
        });
    });

    describe("Layer", function() {
        var tileJSON = {
            'tilejson': '2.0.0',
            'attribution': 'Terms & Feedback',
            'center': [-77.046, 38.907, 12],
            'minzoom': 1,
            'maxzoom': 11,
            'tiles': [
                'http://a.tiles.mapbox.com/v3/examples.map-zr0njcqy/{z}/{x}/{y}.png',
                'http://b.tiles.mapbox.com/v3/examples.map-zr0njcqy/{z}/{x}/{y}.png',
                'http://c.tiles.mapbox.com/v3/examples.map-zr0njcqy/{z}/{x}/{y}.png',
                'http://d.tiles.mapbox.com/v3/examples.map-zr0njcqy/{z}/{x}/{y}.png'
            ]
        };

        function layersOf(layerGroup) {
            var result = [];
            layerGroup.eachLayer(function(layer) {
                result.push(layer);
            });
            return result;
        }

        it("creates a TileLayer with the appropriate min and max zoom", function() {
            var group = new L.TileJSON.Layer(tileJSON),
                layers = layersOf(group);

            expect(layers[0].options.minZoom).to.equal(1);
            expect(layers[0].options.maxZoom).to.equal(11);
        });

        it("allows access to the tilejson object after assignment", function() {
            var layer = new L.TileJSON.Layer(tileJSON);
            expect(layer.tilejson()).to.equal(tileJSON);
        });

        it("creates a TileLayer with the appropriate attribution", function() {
            var group = new L.TileJSON.Layer(tileJSON),
                layers = layersOf(group);

            expect(layers[0].options.attribution).to.equal('Terms & Feedback');
        });

        it("creates a TileLayer with the appropriate tms option", function() {
            var group = new L.TileJSON.Layer(L.extend({}, tileJSON, {scheme: 'tms'})),
                layers = layersOf(group);

            expect(layers[0].options.tms).to.equal(true);
        });

        it("customizes the TileLayer's getTileUrl method", function() {
            var group = new L.TileJSON.Layer(tileJSON),
                layer = layersOf(group)[0];

            expect(layer.getTileUrl({x: 0, y: 0, z: 0})).to.equal('http://a.tiles.mapbox.com/v3/examples.map-zr0njcqy/0/0/0.png');
            expect(layer.getTileUrl({x: 1, y: 0, z: 0})).to.equal('http://b.tiles.mapbox.com/v3/examples.map-zr0njcqy/0/1/0.png');
            expect(layer.getTileUrl({x: 2, y: 0, z: 0})).to.equal('http://c.tiles.mapbox.com/v3/examples.map-zr0njcqy/0/2/0.png');
            expect(layer.getTileUrl({x: 3, y: 0, z: 0})).to.equal('http://d.tiles.mapbox.com/v3/examples.map-zr0njcqy/0/3/0.png');
            expect(layer.getTileUrl({x: 4, y: 0, z: 0})).to.equal('http://a.tiles.mapbox.com/v3/examples.map-zr0njcqy/0/4/0.png');
        });
    });
});
