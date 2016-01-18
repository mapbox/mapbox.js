describe('security', function() {

    var map, element;

    beforeEach(function() {
        element = document.createElement('div');
        document.body.appendChild(element);
        element.style.width = '256px';
        element.style.height = '256px';
        map = L.mapbox.map(element, helpers.tileJSON_malicious);
    });

    afterEach(function() {
        element.parentNode.removeChild(element);
    });

    it('L.mapbox.sharecontrol does not allow XSS attacks', function() {
        map.setView([0,0],0);

        var shareControl = L.mapbox.shareControl(null, { url: 'foobar' });
        expect(shareControl.addTo(map)).to.eql(shareControl);
        
        var calledAttack = false;

        window.launchAttack = function launchAttack() {

                console.log("L.mapbox.sharecontrol launched an XSS attack");

                calledAttack = true;

        }

        happen.click(element.getElementsByClassName('mapbox-share')[0]);

        expect(calledAttack).to.be(false);

    });

});