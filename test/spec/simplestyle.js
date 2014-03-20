describe('L.mapbox.simplestyle', function() {
    'use strict';
    describe('#style', function() {
        it("defaults", function() {
            var style = L.mapbox.simplestyle.style({});
            expect(style.opacity).to.eql(1);
            expect(style.color).to.eql('#555555');
        });
        it("options", function() {
            var style = L.mapbox.simplestyle.style({
                properties: {
                    stroke: '#f00'
                }
            });
            expect(style.color).to.eql('#f00');
        });
        it("allows opacity and stroke to be zero", function() {
            var style = L.mapbox.simplestyle.style({
                properties: {
                    'stroke-opacity': 0,
                    'fill-opacity': 0,
                    'stroke-width': 0
                },
                geometry: {
                    type: 'Polygon'
                }
            });
            expect(style.opacity).to.eql(0);
            expect(style.fillOpacity).to.eql(0);
            expect(style.weight).to.eql(0);
        });
    });
});
