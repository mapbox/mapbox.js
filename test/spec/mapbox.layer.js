describe("mapbox.layer", function() {
  it("mapbox.layer can create layers", function() {
      expect(mapbox.layer()).toBeTruthy();
      expect(mapbox.layer().tilejson()).toEqual({});
      expect(mapbox.layer().provider.options.tiles[0]).toEqual('data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=');
  });
});
