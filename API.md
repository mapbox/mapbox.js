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

### map.setPanLimits(locations)

Set the map's panning limits. The parameter, `locations` can be either an instance of MM.Extent or an array of locations in the order north, west, south, east.

### map.auto()

Enables defaults settings for UI and interaction. Also sets map's center and zoom to that of the baselayer.

### map.refresh()
Refreshes map.ui and map.interaction to reflect any layer changes.

### map.addTileLayer(layer)
Adds a tile layer to the map, below any marker layers to prevent them from being covered up.

### map.ease

An instance of easey initialized with the map.

    map.ease.location({ lat: 10, lon: -88 }).zoom(5).optimal();

See [Easey documentation](https://github.com/mapbox/easey/wiki) for a full reference.

### map.ui

An instance of mapbox.ui attached to the map for convenience.

### map.interaction

An instance of mapbox.interaction attached to map for convenience.



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

## mapbox.auto(element, url [, callback])

Automatically load and create a map with sensible defaults.

- `element` is the id of the element within which to create the map
- `url` can be a TileJSON URL, a MapBox map id, or an array of multiple.
- `callback` if specified, receives the map as its first argument, and the same object as `mapbox.load` as the second argument.

For instance, to create a simple map, you can call

    <div id='map' style='width:500px;height:400px;'></div>
    <script>
    mapbox.auto('map', 'http://a.tiles.mapbox.com/v3/tmcw.map-hehqnmda.jsonp');
    </script>

# MapBox Layer

`mapbox.layer` is a fast way to add layers to your map without having to deal with complex configuration.

## mapbox.layer()

You can add a tiled layer to your map with `mapbox.layer()`, a simple interface to layers from [MapBox Hosting](http://mapbox.com/tour/) and elsewhere.

### var layer = mapbox.layer();

Create a mapbox layer. This layer will be blank until you call `.id()` or `.url()` to give it an identity.

### layer.id(value, callback)

This sets the layer ID, which corresponds to a MapBox map. The value must be the id of
a MapBox Hosting map. This also calls `.named()` setting the name to be the same as the id -
call `named()` to reset it. For instance, if you were trying
to add the map at `https://tiles.mapbox.com/tmcw/map/map-hehqnmda`, you could create this layer like so:

    var layer = mapbox.layer().id('map-hehqnmda');

The callback is called with on argument, the layer.

### layer.named([value])

Set the name of the layer, as referred to by the map. The value must be a string. If the
value is omitted, the current name is returned.

### layer.url(value, callback)

If you're using another server that supports [TileJSON](https://github.com/mapbox/tilejson-spec), like a self-hosted [TileStream](https://github.com/mapbox/tilestream), you can use `.url()` to specify the full URL of a layer's TileJSON file.

The argument to this function must be a String value that is a fully-formed URL.
The previous call to `.id()` is equal to this usage of `.url()`:

    var layer = mapbox.layer().url('http://a.tiles.mapbox.com/v3/tmcw.map-hehqnmda.jsonp');

The callback is called with on argument, the layer.

### layer.tilejson([{ tilejson object }])

If you're using another [TileJSON](https://github.com/mapbox/tilejson-spec) layer and have the
TileJSON in your Javascript scope instead of at a URL, you can call `.tilejson()` to specify the tilejson blob directly.
The argument to this function must be a TileJSON object as a Javascript object.
If the value is omitted, the current TileJSON object that corresponds to this layer
is returned.


# Map UI

Common UI components for maps.

## var ui = mapbox.ui()

### ui.map(map)

Set the map to add UI components for.

### ui.auto()

Automatically add default UI components: a zoomer and the zoombox control.

The following are Wax UI components

### ui.hash()

Adds map position to URL, making map locations linkable.

### ui.zoombox()

Adds zoombox control, which lets users zoom by shift-clicking and drawing a box.

### ui.zoomer()

Adds a zoom in and zoom out buttons to map.

### ui.attribution(tilejson)

Adds attribution to map using the provided tilejson.

### ui.legend(tilejson)

Adds a legend to map using provided legend.

### ui.pointselector(callback)

Add the pointselector to the map. The callback gets called with a single argument, an array of coordinates of the points you have selected. To get the pointselector object, provide no callback.

### ui.boxselector(callback)

Add the boxselector to the map. The callback gets called with a single argument, an array of two instances of MM.Location, representing the extent of the selection. To get the boxselector object, provide no callback.


# Interaction

## var interaction = mapbox.interaction()

Creates a Wax interaction control with several extra features. See [Wax documentation](http://mapbox.com/wax/interaction-mm.html) for full reference.

### interaction.map(map)

Set the map to add interaction for.

### interaction.auto()

Enable interactivity for topmost layer with interactive features.

### interaction.refresh()

Refresh interactivity control to reflect any layer changes.
