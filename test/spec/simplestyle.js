describe('L.mapbox.simplestyle', function() {
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
        it("polygon knock-out", function() {
            var style = L.mapbox.simplestyle.style({
                properties: {
                    fill: '#f00'
                },
                geometry: {
                    type: 'LineString'
                }
            });
            expect(style.fill).to.eql(false);
        });
        it("is polygon", function() {
            var style = L.mapbox.simplestyle.style({
                properties: {
                    fill: '#f00'
                },
                geometry: {
                    type: 'Polygon'
                }
            });
            expect(style.fill).to.eql(true);
        });
    });
});
