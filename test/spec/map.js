describe("mapbox.map", function() {
    var server, element, tileJSON = helpers.tileJSON;

    beforeEach(function() {
        server = sinon.fakeServer.create();
        element = document.createElement('div');
    });

    afterEach(function() {
        server.restore();
    });

    it("allows access to the tilejson object after assignment", function() {
        var layer = new mapbox.map(element, tileJSON);
        expect(layer.tilejson()).to.equal(tileJSON);
    });

    it("adds a tile layer immediately", function() {
        var group = new mapbox.map(element, 'data/tilejson.json');
        expect(group.tileLayer).to.be.ok();
    });

    it("initializes the tile layer", function() {
        var group = new mapbox.map(element, tileJSON);
        expect(group.tileLayer.tilejson()).to.equal(tileJSON);
    });

    it("adds a data layer immediately", function() {
        var group = new mapbox.map(element, 'data/tilejson.json');
        expect(group.markerLayer).to.be.ok();
    });

    it("adds a grid layer immediately", function() {
        var group = new mapbox.map(element, 'data/tilejson.json');
        expect(group.gridLayer).to.be.ok();
    });

    it("initializes the grid layer", function() {
        var group = new mapbox.map(element, tileJSON);
        expect(group.gridLayer.tilejson()).to.equal(tileJSON);
    });
});
