# The Map

The map is, of course, the central element of most mapping sites. In the MapBox JavaScript API,
the map object manages a set of layers, stores and displays zoom levels and centerpoints,
and accepts a set of UI controls to which you can add your own finishing touches.

Technically speaking, maps are based on [Modest Maps](http://modestmaps.com/),
so [the full Modest Maps API](https://github.com/modestmaps/modestmaps-js/wiki)
is available to power-users.

## mapbox.map(element [, layers])

Create a map on the current page.

**Arguments:**

* `element` must be the `id` of an element on the page, or an element itself. Typically maps are created within `<div>` elements
* `layers` can be a layer created with `mapbox.layer()`, an array of such layers, or omitted

**Returns** a map object, which has the following methods:

### map.smooth(value)

Enable or disable inertial panning on maps. By default, maps smoothly pan and
zoom with inertia.

**Arguments:**

* `value` must be `true` or `false` to set whether the map uses inertia.

**Returns** the map object.

**Example:**

    map.smooth(false); // disable inertial panning

### map.center(centerpoint [, animate])

Center the map on a geographical location, or get its current center.

**Arguments:**

* `centerpoint` can be an object with `lat` and `lon` values, like `{ lat: 10, lon: -88 }`, or
  ommitted to get the map's current location
* `animate` can be `true` to animate the map's movement, or omitted to move immediately

**Returns** the map object if arguments are given, the map's center location (in the same form as
specified in `centerpoint`) otherwise.

### map.zoom(zoom [, animate])

Set the map's zoom level, or get its current zoom level.

**Arguments:**

* `zoom` can be zoom level in the range supported by the map's layers (an integer from 0-20, typically),
  or omitted to get the current zoom level..
* `animate` can be `true` to animate the map's movement, or omitted to move immediately.

**Returns** the map object if arguments are given, the map's current zoom level otherwise.

**Example:**

    map.zoom(10, true);

### map.centerzoom(center, zoom [, animate])

Set the map's zoom level and centerpoint simultaneously. Especially with the third argument, `animate`,
set to `true`, this allows for a better animation effect.

**Arguments:**

* `centerpoint` can be an object with `lat` and `lon` values, like `{ lat: 10, lon: -88 }`
* `zoom` must be zoom level in the range supported by the map's layers (an integer from 0-20, typically)
* `animate` can be `true` to animate the map's movement, or omitted to move immediately.

**Returns** the map object.

**Example:**

    map.centerzoom({ lat: 10, lon: -88 }, 5);

### map.setPanLimits(locations)

Set the map's panning limits.

**Arguments:**

* `locations` must be either an instance of MM.Extent or an array of locations in the order north, west, south, east.

**Returns** the map object.

### map.refresh()

Refreshes map.ui and map.interaction to reflect any layer changes.

### map.addTileLayer(layer)

Adds a tile layer to the map, below any marker layers to prevent them from being covered up.

### map.ease

An instance of easey initialized with the map.

**Example:**

    map.ease.location({ lat: 10, lon: -88 }).zoom(5).optimal();

### map.ui

An instance of mapbox.ui attached to the map for convenience.

### map.interaction

An instance of mapbox.interaction attached to map for convenience.

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

**Arguments:**

* `element` must be the `id` of an element on the page, or an element itself. Typically maps are created within `<div>` elements
* `url` must be a TileJSON URL, the id of a MapBox map, multiple IDs and URLs in an array.
* `callback` if specified, receives the map as its first argument, and the same object as `mapbox.load` as the second argument. It is called after all resources have been loaded and the map is complete.

**Returns** `undefined`: this is an asynchronous function without a useful return value.

**Example:**

    <div id='map' style='width:500px;height:400px;'></div>
    <script>
    mapbox.auto('map', 'http://a.tiles.mapbox.com/v3/tmcw.map-hehqnmda.jsonp');
    </script>

# MapBox Layer

`mapbox.layer` is a fast way to add layers to your map without having to deal with complex configuration.

## mapbox.layer()

You can add a tiled layer to your map with `mapbox.layer()`, a simple interface to
layers from [MapBox Hosting](http://mapbox.com/tour/) and elsewhere.

**Returns** a layer object, which has the following methods:

### layer.id(id, callback)

Get or set the layer ID, which corresponds to a MapBox map.

**Arguments:**

* `id` can be the id of a MapBox Hosting map, or omitted to get the current `id` value.
  This also calls `.named()` setting
  the name to be the same as the id - call `named()` to reset it. For instance, if you were trying
  to add the map at `https://tiles.mapbox.com/tmcw/map/map-hehqnmda`, you could create this layer like so:
* `callback`, if provided, is called after the layer has been asynchronously loaded from MapBox.
  It is called with on argument, the layer object.

**Returns** the layer object if arguments are given, the layer's `id` otherwise.

**Example:**

    var layer = mapbox.layer().id('map-hehqnmda');

### layer.named([name])

Get or set the name of the layer, as referred to by the map.

**Arguments:**

* `name` can be a new name to call this layer

**Returns** the layer object if arguments are given, the layer's `name` otherwise.

### layer.url([url, callback])

Pull a layer from a server besides MapBox Hosting that supports [TileJSON](https://github.com/mapbox/tilejson-spec), like a self-hosted [TileStream](https://github.com/mapbox/tilestream).

**Arguments:**

* `url` can be a string value that is a fully-formed URL, or omitted to get the URL from which
  this layer was sourced.
* `callback`, if provided, is called with one argument, the layer object, after the
  TileJSON information has been asynchronously loaded.

**Returns** the layer object if arguments are given, the pulled URL otherwise.

**Example:**

    var layer = mapbox.layer().url('http://a.tiles.mapbox.com/v3/tmcw.map-hehqnmda.jsonp');

### layer.tilejson([tilejson])

Set layer options directly from a TileJSON object.

**Arguments:**

* `tilejson` must be a TileJSON object as a Javascript object.

**Returns** the layer object if arguments are given, the layer's TileJSON settings otherwise.

# Map UI

The API provides a set of UI elements that can be freely mixed & matched, as well as styled
beyond the default (provided in the `mapbox.css` stylesheet).
Maps created with `mapbox.map` have an array of pre-initialized UI elements at `.ui`.
All UI elements support the simple operations `.add()` and `.remove()` to add &
remove them from the map.

#### .add()

Add the UI element to the map. Add the HTML elements that the UI element
manages (if any) to the map element, and bind any events.

#### .remove()

Remove the UI element from the map. Removes the HTML elements from the
map, if any, and removes listeners, if any.

### map.ui.hash

Add the map's changing position to the URL, making map locations linkable

### map.ui.zoombox

Add the ability to zoom into the map by shift-clicking and dragging a box,
to which the map zooms

### map.ui.zoomer

Add zoom in and zoom out buttons to map

### map.ui.attribution

Add an element with attribution information to the map

### map.ui.legend

Add an element with legend information to map

### map.ui.pointselector

Allow simple location selection on the map: clicking without dragging will select
a point, and notify listeners with the new list of points.

#### pointselector.addCallback(event, callback)

Adds a callback that is called on changes to the pointselector contents.

**Arguments:**

* `event` is a string of the event you want to bind the callback to
* `callback` is a funcion that is called on the event specified by `event`

Event should be a String which is one of the following:

* `change`: whenever points are added or removed

Callback is a Function that is called with arguments depending on what `event` is bound:

* `drawn`: the layer object
* `locations`: a list of locations currently selected

**Returns** the pointselector

### pointselector.removeCallback(event, callback)

Remove a callback bound by `.addCallback(event, callback)`.

**Arguments:**

* `event` is a string of the event you want to bind the callback to
  This must be the same string that was given in `addCallback`

* `callback` is a funcion that is called on the event specified by `event`.
  This must be the same function as was given in `addCallback`. 

**Returns** the pointselector

### map.ui.boxselector

Allow extents to be selected on the map.

#### boxselector.addCallback(event, callback)

Adds a callback that is called on changes to the boxselector contents.

**Arguments:**

* `event` is a string of the event you want to bind the callback to
* `callback` is a funcion that is called on the event specified by `event`

Event should be a String which is one of the following:

* `change`: whenever an extent is selected

Callback is a Function that is called with arguments depending on what `event` is bound:

* `drawn`: the layer object
* `extent`: the currently selected extent

**Returns** the boxselector

### boxselector.removeCallback(event, callback)

Remove a callback bound by `.addCallback(event, callback)`.

**Arguments:**

* `event` is a string of the event you want to bind the callback to
  This must be the same string that was given in `addCallback`

* `callback` is a funcion that is called on the event specified by `event`.
  This must be the same function as was given in `addCallback`. 

**Returns** the boxselector

# Interaction

## var interaction = mapbox.interaction()

Creates a interaction control with several extra features. See [Wax documentation](http://mapbox.com/wax/interaction-mm.html) for full reference.

### interaction.map(map)

Set the map to add interaction for.

### interaction.auto()

Enable interactivity for topmost layer with interactive features.

### interaction.refresh()

Refresh interactivity control to reflect any layer changes.
