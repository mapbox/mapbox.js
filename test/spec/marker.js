describe('L.mapbox.marker', function() {
    var retina = L.Browser.retina;

    beforeEach(function() {
        L.Browser.retina = false;
    });

    afterEach(function() {
        L.Browser.retina = retina;
    });

    describe('#style', function() {
        it("produces a small marker", function() {
            var marker = L.mapbox.marker.style({
                properties: {
                    'marker-size': 'small'
                }
            });
            expect(marker.options.icon.options.iconUrl).to.equal(internals.url('/v4/marker/pin-s+7e7e7e.png'));
        });

        it("uses @2x suffix on retina", function() {
            L.Browser.retina = true;
            var marker = L.mapbox.marker.style({
                properties: {
                    'marker-size': 'small'
                }
            });
            expect(marker.options.icon.options.iconUrl).to.equal(internals.url('/v4/marker/pin-s+7e7e7e@2x.png'));
        });

        it("produces a medium marker", function() {
            var marker = L.mapbox.marker.style({
                properties: {
                    'marker-size': 'medium'
                }
            });
            expect(marker.options.icon.options.iconUrl).to.contain('pin-m');
        });

        it("produces a red marker", function() {
            var marker = L.mapbox.marker.style({
                properties: {
                    'marker-color': 'f00'
                }
            });
            expect(marker.options.icon.options.iconUrl).to.contain('f00');
        });

        it("supports custom access token", function() {
            var marker = L.mapbox.marker.style({
                properties: {
                    'marker-size': 'small'
                }
            }, [0, 0], {
                accessToken: 'custom'
            });
            expect(marker.options.icon.options.iconUrl).to.equal(internals.url('/v4/marker/pin-s+7e7e7e.png', 'custom'));
        });

        it("tolerates empty input", function() {
            var marker = L.mapbox.marker.style({});
            expect(marker.options).to.be.ok();
        });

        it("sets a marker's title", function() {
            var marker = L.mapbox.marker.style({
                properties: {
                    title: 'test'
                }
            });
            expect(marker.options.title).to.equal('test');
        });

        it("strips tags from a marker's title", function() {
            var marker = L.mapbox.marker.style({
                properties: {
                    title: '<a href="foo">test</a>'
                }
            });
            expect(marker.options.title).to.equal('test');
        });

        it('integrates with leaflet', function() {
            expect(function() {
                L.geoJson(helpers.geoJson, {
                    pointToLayer: L.mapbox.marker.style
                });
            }).to.not.throwException();
        });
    });

    describe('#icon', function() {
        it("produces an icon", function() {
            var icon = L.mapbox.marker.icon({
                'marker-size': 'large'
            });
            expect(icon.options.iconUrl).to.equal(internals.url('/v4/marker/pin-l+7e7e7e.png'));
        });

        it("supports custom access token", function() {
            var icon = L.mapbox.marker.icon({
                'marker-size': 'large'
            }, {
                accessToken: 'custom'
            });
            expect(icon.options.iconUrl).to.equal(internals.url('/v4/marker/pin-l+7e7e7e.png', 'custom'));
        });

        it("supports integer 'marker-symbol' values", function() {
            expect(L.mapbox.marker.icon({'marker-symbol': 0}).options.iconUrl)
                .to.equal(internals.url('/v4/marker/pin-m-0+7e7e7e.png'));
            expect(L.mapbox.marker.icon({'marker-symbol': 1}).options.iconUrl)
                .to.equal(internals.url('/v4/marker/pin-m-1+7e7e7e.png'));
        });

        it("supports 'marker-symbol' with empty string", function() {
            expect(L.mapbox.marker.icon({'marker-symbol': ''}).options.iconUrl)
                .to.equal(internals.url('/v4/marker/pin-m+7e7e7e.png'));
        });
    });

    describe('#createPopup', function() {
        it("returns an empty string for an undefined feature", function() {
            expect(L.mapbox.marker.createPopup({})).to.eql('');
            expect(L.mapbox.marker.createPopup({
                properties: { title: '' }
            })).to.eql('');
        });

        it("renders a title", function() {
            expect(L.mapbox.marker.createPopup({})).to.eql('');
            expect(L.mapbox.marker.createPopup({
                properties: { title: 'test' }
            })).to.eql('<div class="marker-title">test</div>');
        });

        it("renders a description", function() {
            expect(L.mapbox.marker.createPopup({})).to.eql('');
            expect(L.mapbox.marker.createPopup({
                properties: { description: 'test' }
            })).to.eql('<div class="marker-description">test</div>');
        });
    });
});
