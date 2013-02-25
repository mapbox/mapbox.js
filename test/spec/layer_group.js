describe("mapbox.layerGroup", function() {
    var server, tileJSON = helpers.tileJSON;

    beforeEach(function() {
        server = sinon.fakeServer.create();
    });

    afterEach(function() {
        server.restore();
    });

    it("allows access to the tilejson object after assignment", function() {
        var layer = new mapbox.layerGroup(tileJSON);
        expect(layer.tilejson()).to.equal(tileJSON);
    });

    it("adds a tile layer immediately", function() {
        var group = new mapbox.layerGroup('data/tilejson.json');
        expect(group.tileLayer).to.be.ok();
    });

    it("adds a data layer immediately", function() {
        var group = new mapbox.layerGroup('data/tilejson.json');
        expect(group.dataLayer).to.be.ok();
    });

    it("adds multiple TileLayers in the order that the LayerGroups were added", function() {
        var map = new L.Map(document.createElement('div')),
            a = new mapbox.layerGroup('a'),
            b = new mapbox.layerGroup('b');

        map.addLayer(b);
        map.addLayer(a);
        map.setView([0, 0], 1);

        expect(map.getPanes().tilePane.children[0]).to.equal(b.tileLayer.getContainer());
        expect(map.getPanes().tilePane.children[1]).to.equal(a.tileLayer.getContainer());
    });
});
