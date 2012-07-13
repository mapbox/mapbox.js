# The Map

The map is, of course, the central element of most mapping sites.

## var map = mapbox.map(element [, layers])

Create a map on the page

* `element` can be either the `id` of an element on the page, or an element itself. Typically maps are created within `<div>` elements.
* `layers` can be a layer created with `mapbox.layer()`, an array of layers. You can also _omit_ this entirely and add a layer later on if you'd like.

### map.smooth(value)

By default, maps smoothly pan and zoom with inertia. You can turn off this behavior by calling `map.smooth(false)`.
The argument to this function must be `true` or `false`.

### map.center(centerpoint [, animate])

Center the map on a geographical location. The argument to centerpoint is an object like

    map.center({ lat: 10, lon: -88 });

The second parameter, `animates`, animates the transition: set it to `true` to animate, omit or set it to `false` to not animate.

### map.zoom(zoom [, animate])

Set the map's zoom level.

    map.zoom(5)

The second parameter, `animates`, animates the transition: set it to `true` to animate, omit or set it to `false` to not animate.

### map.centerzoom(center, zoom [, animate])

Set the map's zoom level and centerpoint simultaneously.

    map.centerzoom({ lat: 10, lon: -88 }, 5)

The third parameter, `animates`, animates the transition: set it to `true` to animate, omit or set it to `false` to not animate. This will animate center and zoom changes at the same time.

See [Modest Maps parent documentation](https://github.com/modestmaps/modestmaps-js/wiki) for a full reference.

# Loading Utilities

To load information about a certain map you've created on MapBox, we provide `mapbox.load` and
`mapbox.auto`, which pull the [TileJSON](http://mapbox.com/wax/tilejson.html) file from a server and
auto-instantiate many of its features.

## mapbox.load(url, callback)

This loads the information about a map on [MapBox Hosting](http://mapbox.com/tour/). The first argument can either be a full URL to a TileJSON file, like `http://a.tiles.mapbox.com/v3/tmcw.map-hehqnmda.jsonp`, or a bare id, like `tmcw.map-hehqnmda`, which will get expanded to the former.

After pulling the information from MapBox, it calls the function specified at the second argument with an object with map parts you can combine for yourself:

    {
      zoom: ZOOM_LEVEL,
      center: CENTER,

      // like you could create with mapbox.layer()
      layer: TILE_LAYER,

      // if present, like you would create with mapbox.markers()
      markers: MARKERS_LAYER 
    }

## mapbox.auto(element, callback)

This is a function you can provide as the second argument to `mapbox.load` that automatically builds a map with default settings.

For instance, to create a simple map, you can call

    <div id='map' style='width:500px;height:400px;'></div>
    <script>
    mapbox.load('http://a.tiles.mapbox.com/v3/tmcw.map-hehqnmda.jsonp', mapbox.auto('map'));
    </script>

# MapBox Layer

`mapbox.layer` is a fast way to add layers to your map without having to deal with complex configuration.

## mapbox.layer()

You can add a tiled layer to your map with `mapbox.layer()`, a simple interface to layers from [MapBox Hosting](http://mapbox.com/tour/) and elsewhere.

### var layer = mapbox.layer();

Create a mapbox layer. This layer will be blank until you call `.id()` or `.url()` to give it an identity.

### layer.id(value)

This sets the layer ID, which corresponds to a MapBox map. The value must be the id of
a MapBox Hosting map. This also calls `.named()` setting the name to be the same as the id -
call `named()` to reset it. For instance, if you were trying
to add the map at `https://tiles.mapbox.com/tmcw/map/map-hehqnmda`, you could create this layer like so:

    var layer = mapbox.layer().id('map-hehqnmda');

### layer.named([value])

Set the name of the layer, as referred to by the map. The value must be a string. If the
value is omitted, the current name is returned.

### layer.url(value)

If you're using another server that supports [TileJSON](https://github.com/mapbox/tilejson-spec), like a self-hosted [TileStream](https://github.com/mapbox/tilestream), you can use `.url()` to specify the full URL of a layer's TileJSON file.

The argument to this function must be a String value that is a fully-formed URL.
The previous call to `.id()` is equal to this usage of `.url()`:

    var layer = mapbox.layer().url('http://a.tiles.mapbox.com/v3/tmcw.map-hehqnmda.jsonp');

### layer.tilejson([{ tilejson object }])

If you're using another [TileJSON](https://github.com/mapbox/tilejson-spec) layer and have the
TileJSON in your Javascript scope instead of at a URL, you can call `.tilejson()` to specify the tilejson blob directly.
The argument to this function must be a TileJSON object as a Javascript object.
If the value is omitted, the current TileJSON object that corresponds to this layer
is returned.
