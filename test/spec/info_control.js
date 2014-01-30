describe('L.mapbox.infoControl', function() {
    'use strict';
    var improvelink = '<a class="mapbox-improve-link" href="#" title="Improve this map">Improve this map</a>';

    it('constructor', function() {
        var info = L.mapbox.infoControl();
        expect(info).to.be.ok();
    });

    describe('#addInfo', function() {
        it('returns the info object', function() {
            var info = L.mapbox.infoControl();
            expect(info.addInfo('foo')).to.eql(info);
        });

        it('adds a map info element to its container', function() {
            var elem = document.createElement('div');
            var map = L.mapbox.map(elem);
            var info = L.mapbox.infoControl();
            info.addTo(map);
            expect(info.addInfo('foo')).to.eql(info);
            expect(info._content.innerHTML).to.eql('foo' + improvelink);
        });

        it('handles multiple infos', function() {
            var elem = document.createElement('div');
            var map = L.mapbox.map(elem);
            var info = L.mapbox.infoControl();
            expect(info.addTo(map)).to.eql(info);
            expect(info.addInfo('foo')).to.eql(info);
            expect(info.addInfo('bar')).to.eql(info);
            expect(info._content.innerHTML).to.eql('foo | bar' + improvelink);
        });
    });

    describe('#removeInfo', function() {
        it('returns the info object', function() {
            var info = L.mapbox.infoControl();
            expect(info.addInfo('foo')).to.eql(info);
            expect(info.removeInfo('foo')).to.eql(info);
            expect(info.removeInfo()).to.eql(info);
        });

        it('adds and removes dom elements', function() {
            var elem = document.createElement('div');
            var map = L.mapbox.map(elem);
            var info = L.mapbox.infoControl();
            info.addTo(map);
            expect(info.addInfo('foo')).to.eql(info);
            expect(info.addInfo('bar')).to.eql(info);
            expect(info._content.innerHTML).to.eql('foo | bar' + improvelink);
            expect(info.removeInfo('bar')).to.eql(info);
            expect(info._content.innerHTML).to.eql('foo' + improvelink);
        });
    });

    it('sanitizes its content', function() {
        var map = L.map(document.createElement('div'));
        var info = L.mapbox.infoControl().addTo(map);

        info.addInfo('<script></script>');
        expect(info._content.innerHTML).to.eql(improvelink);
    });

    it('supports a custom sanitizer', function() {
        var map = L.map(document.createElement('div'));
        var info = L.mapbox.infoControl({
            sanitizer: function(_) { return _; }
        }).addTo(map);

        info.addInfo('<script></script>');

        expect(info._content.innerHTML).to.eql('<script></script>' + improvelink);
    });
});
