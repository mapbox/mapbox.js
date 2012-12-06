# Map

Maps are the central element of the Javascript API - the map object manages
tile layers, contains UI elements, and provides many types of interactivity.

## mapbox.map(element [, layers] [, dimensions] [, eventHandlers])

Create a map on the current page.

_Arguments:_

* `element` must be the `id` of an element on the page, or an element itself.
  Typically maps are created within `<div>` elements. This element should have a
  _size_: whether specified with external CSS or an inline style like
  `style="width:600px;height:400px"`
* `layers` can be a layer created with [`mapbox.layer()`](#mapbox.layer), an array of such layers, or omitted
* `dimensions` can be an object with `x` and `y` attributes representing the width and height in pixels
* `eventHandlers` can be an array of event handlers, including any of the following:
    * `easey_handlers.DragHandler()`
    * `easey_handlers.DoubleClickHandler()`
    * `easey_handlers.MouseWheelHandler()`
    * `easey_handlers.TouchHandler()`
    * `MM.DragHandler()`
    * `MM.DoubleClickHandler()`
    * `MM.MouseWheelHandler()`
    * `MM.TouchHandler()`

_Returns_ a map object, which has the following methods:

_Example:_

    // for this to work, you'll need an element like
    // <div id="map"></div> on your page
    var map = mapbox.map('map');

### map.smooth(value)

Enable or disable inertial panning on maps. By default, maps smoothly pan and
zoom with inertia.

_Arguments:_

* `value` must be `true` or `false` to set whether the map uses inertia.

_Returns_ the map object.

_Example:_

    map.smooth(false); // disable inertial panning

### map.center(centerpoint [, animate])

Center the map on a geographical location, or get its current center.

_Arguments:_

* `centerpoint` can be an object with `lat` and `lon` values, like `{ lat: 10, lon: -88 }`, or
  ommitted to get the map's current location
* `animate` can be `true` to animate the map's movement, or omitted to move immediately

_Returns_ the map object if arguments are given, the map's center location (in the same form as
specified in `centerpoint`) otherwise.

_Example:_

    // center the map on Manhattan
    map.center({ lat: 40.74, lon: -73.98 });

### map.zoom(zoom [, animate])

Set the map's zoom level, or get its current zoom level.

_Arguments:_

* `zoom` can be zoom level in the range supported by the map's layers (an integer from 0-20, typically),
  or omitted to get the current zoom level..
* `animate` can be `true` to animate the map's movement, or omitted to move immediately.

_Returns_ the map object if arguments are given, the map's current zoom level otherwise.

**Example:**

    // zoom to z10 and animate the transition
    map.zoom(10, true);

### map.centerzoom(center, zoom [, animate])

Set the map's zoom level and centerpoint simultaneously. Especially with the third argument, `animate`,
set to `true`, this allows for a better animation effect.

_Arguments:_

* `centerpoint` can be an object with `lat` and `lon` values, like `{ lat: 10, lon: -88 }`
* `zoom` must be zoom level in the range supported by the map's layers (an integer from 0-20, typically)
* `animate` can be `true` to animate the map's movement, or omitted to move immediately.

_Returns_ the map object.

_Example:_

    // Center the map on Washington, DC, at zoom level 5
    map.centerzoom({ lat: 38.9, lon: -77.03 }, 5);

### map.getExtent()

Get the extent of the currently visible area.

_Returns_ an instance of `MM.Extent`.

### map.setExtent(extent [, precise]_

Modify the center and zoom of the map so that the provided extent is visible.
This can be useful because extents - the corners of the map - can implicitly
cause the map to 'show the whole world' regardless of screen size.

_Arguments:_

* `extent` can be an instance of `MM.Extent`, or an array of two locations.
* `precise` cab be `true` or `false`. If true, resulting zoom levels may be fractional. (By default, the map's zoom level is rounded down to keep tile images from blurring.)

_Returns_ the map object.

_Example:_

    // using an extent object:
    map.setExtent(new MM.Extent(80, -170, -70, 170));
    // this call can also be expressed as:
    map.setExtent([{ lat: 80, lon: -170 }, { lat: -70, lon: 170 }]);

### map.setZoomRange(minZoom, maxZoom)

Set the map's minimum and maximum zoom levels.

_Arguments:_

* `minZoom` is the minimum zoom level
* `maxZoom` is the maximum zoom level

_Returns_ the map object.

**Example:**

    map.setZoomRange(3, 17);

### map.setPanLimits(locations)

Set the map's panning limits.

_Arguments:_

* `locations` must be either an instance of MM.Extent or an array of two locations in
  `{ lat: 0, lon: 0 }` form. The order of locations doesn't matter - they're sorted internally.

_Returns_ the map object.

_Example_:

    map.setPanLimits([{ lat: -20, lon: 0 }, { lat: 0, lon: 20 }]);
    // or with an Extent object
    map.setPanLimits(new MM.Extent(0, -20, -20, 0));

### map.setSize(dimensions)

Set the map's dimensions. This sets `map.autoSize` to false to prevent further automatic resizing.

_Arguments:_

* `dimensions` is an object with `x` and `y` properties representing the map's new dimensions in pixels.

_Returns_ the map object.

### map.zoomBy(zoomOffset)

Change zoom level by the provided offset.

_Arguments:_

* `zoomOffset` is the amount to zoom by. Positive offsets zoom in. Negative offsets zoom out.

_Returns_ the map object.

_Example:_

    // zoom in by one zoom level
    map.zoomBy(1);
    // zoom out by two zoom levels
    map.zoomBy(-2);

### map.zoomByAbout(zoomOffset, point)

Change the zoom level by the provided offset, while maintaining the same location at the provided point. This is used by `MM.DoubleClickHandler`.

* `zoomOffset` is the amount to zoom by. Positive offsets zoom in. Negative offsets zoom out.
* `point` is the point on the map that maintains its current location.

_Returns_ the map object.

### map.panBy(x, y)

Pan by the specified distances.

_Arguments:_

* `x` the distance to pan horizontally. Positive values pan right, negative values pan left.
* `y` the distance to pan vertically. Positive values pan down, negative values pan up.

_Returns_ the map object.

_Example:_

    // pan right and down by one pixel
    map.panBy(1, 1);

### map.draw()

Redraw the map and its layers. First, the map enforces its coordLimits on its
center and zoom. If autoSize is true, the map's dimensions are recalculated from
its parent. Lastly, each of the map's layers is drawn.

### map.requestRedraw()

Request a "lazy" call to draw in 1 second. This is useful if you're responding
to lots of user input and know that you'll need to redraw the map
eventually, but not immediately.

### map.refresh()

Refreshes map.ui and map.interaction to reflect any layer changes.

<div class="separator">Properties</div>

### map.coordinate

The map's current center coordinate.

### map.dimensions

An object with `x` and `y` attributes expressing the dimensions of the map in pixels.

### map.parent

The DOM element containing the map.


<div class="separator">Conversions</div>

### map.pointLocation(point)

Convert a screen point to a location (longitude and latitude).

_Arguments:_

* `point` is an instance of `MM.Point` or an object with `x` and `y` properties.

_Returns_ an object with `lat` and `lon` properties indicating the latitude
and longitude of the point on the globe.

_Example:_

    // get the geographical location of the top-left corner of the map
    var top_left = map.pointLocation({ x: 0, y: 0});

### map.pointCoordinate(point)

Convert a screen point to a tile coordinate.

_Arguments:_

* `point` is an instance of `MM.Point` or an object with `x` and `y` properties.

_Returns_ an instance of `MM.Coordinate` - an object with `column`, `row`,
and `zoom` properties indicating the coordinate of the point. The `zoom` of
the point will be same as the current zoom level of the map.

_Example:_

    // get the coordinate location of the top-left corner of the map
    var top_left = map.coordinateLocation({ x: 0, y: 0});

### map.locationPoint(location)

Convert a location to a screen point.

_Arguments:_

* `location` is an instance of `MM.Location` or an object with `lat` and `lon` properties.

_Returns_ an instance of `MM.Point`.

### map.locationCoordinate(location)

Convert a location to a tile coordinate.

_Arguments:_

* `location` is an instance of `MM.Location` or an object with `lat` and `lon` properties.

_Returns_ an instance of `MM.Coordinate`.

### map.coordinatePoint(coordinate)

Convert a tile coordinate to a screen point.

_Arguments:_

* `coordinate` is an instance of `MM.Coordinate`.

_Returns_ an instance of `MM.Point`.

### map.coordinateLocation(coordinate)

Convert a tile coordinate to a location (longitude and latitude).

_Arguments:_

* `coordinate` is an instance of `MM.Coordinate`.

_Returns_ and instance of `MM.Location`.

<div class="separator">Layer management</div>

### map.addLayer(layer)

Add a layer to the map, above other layers.

_Arguments:_

* `layer` is a layer object, such as an instance of `mapbox.layer()` or `mapbox.markers.layer()`.

_Returns_ the map object.

_Example:_

    // add a layer to the map
    map.addLayer(mapbox.layer().id('examples.map-dg7cqh4z'));

### map.addTileLayer(layer)

Add a tile layer to the map, below any marker layers to prevent them from being covered up.

* `layer` is a layer object, such as an instance of `mapbox.layer()`.

_Returns_ the map object.

### map.removeLayer(layer)

Remove the provided layer from the map.

_Arguments:_

* `layer` is a layer, or the name of a layer, currently added to the map.

_Returns_ the map object.

### map.removeLayerAt(index)

Remove the layer at the provided index.

* `index` is a non-negative integer.

_Returns_ the map object.

### map.disableLayer(layer)

Disable a layer. Disabled layers maintain their position, but do not get drawn.

_Arguments:_

* `layer` is the name of a layer currently added to the map.

_Returns_ the map object.

### map.disableLayerAt(index)

Disable a layer at the provided index. Disabled layers maintain their position, but do not get drawn.

_Arguments:_

* `index` is a non-negative integer representing the position of the layer.

_Returns_ the map object.

_Example:_

    // disable the topmost layer in the map
    map.disableLayerAt(0);

### map.enableLayer(layer)

Enable a previously disabled layer.

_Arguments:_

* `layer` is the name of a layer currently added to the map.

_Returns_ the map object.

### map.enableLayerAt(index)

Enable the layer at the provided index.

_Arguments:_

* `index` is a non-negative integer representing the position of the layer to be enabled.

_Returns_ the map object.

### map.getLayer(name)

Get a layer by name.

_Arguments:_

* `name` is the name of a layer.

_Returns_ the layer object.

### map.getLayers()

_Returns_ a list the map's layers.

### map.getLayerAt(index)

Get the layer at the provided index.

_Arguments_

* `index` can be a non-negative integer.

_Returns_ a layer.

<div class="separator">Easing</div>

### map.ease

This is an instance of [mapbox.ease](#mapbox.ease) attached to the map for convenience. For full documentation take a look at [mapbox.ease](#mapbox.ease).

_Example:_

    map.ease.location({ lat: 10, lon: -88 }).zoom(5).optimal();


<div class="separator">User interface</div>

### map.ui

The API provides a set of UI elements that can be freely mixed & matched, as well as styled
beyond the default (provided in the `mapbox.css` stylesheet).
Maps created with [`mapbox.map`](#mapbox.map) have an array of pre-initialized UI elements at `.ui`.
All UI elements support the simple operations `.add()` and `.remove()` to add &
remove them from the map.

#### .add()

Add the UI element to the map. Add the HTML elements that the UI element
manages (if any) to the map element, and bind any events.

_Example:_

    // enable the zoomer control. adds + and - buttons to the map
    map.ui.zoomer.add();

#### .remove()

Remove the UI element from the map. Removes the HTML elements from the
map, if any, and removes listeners, if any.

    // remove the fullscreen control from the map visually and functionally
    map.ui.fullscreen.remove();

#### .element()

For applicable elements (zoomer, attribution, legend, fullscreen),
returns the DOM element this control exposes.

### map.ui.fullscreen

Add a link that can maximize and minimize the map on the browser page

_DOM Structure:_

    <a class="map-fullscreen" href="#fullscreen">fullscreen</a>

### map.ui.hash

Add the map's changing position to the URL, making map locations linkable

### map.ui.zoombox

Add the ability to zoom into the map by shift-clicking and dragging a box,
to which the map zooms

### map.ui.zoomer

Add zoom in and zoom out buttons to map

_DOM Structure:_

    <!-- when a zoom control is inactive, .zoomdisable is added to it -->
    <a href="#" class="zoomer zoomin">+</a>
    <a href="#" class="zoomer zoomout">-</a>

### map.ui.attribution

Add an element with attribution information to the map

_DOM Structure:_

    <div class="map-attribution map-mm"></div>

### map.ui.legend

Add an element with legend information to map

_DOM Structure:_

    <div class="map-legends">
        <div class="map-legend">
            <!-- Legend content -->
        </div>
    </div>

### map.ui.pointselector

Allow simple location selection on the map: clicking without dragging will select
a point, and notify listeners with the new list of points.

#### pointselector.addCallback(event, callback)

Adds a callback that is called on changes to the pointselector contents.

_Arguments:_

* `event` is a string of the event you want to bind the callback to
* `callback` is a function that is called on the event specified by `event`

Event should be a String which is one of the following:

* `change`: whenever points are added or removed

Callback is a Function that is called with arguments depending on what `event` is bound:

* `drawn`: the layer object
* `locations`: a list of locations currently selected

_Returns_ the pointselector

#### pointselector.removeCallback(event, callback)

Remove a callback bound by `.addCallback(event, callback)`.

_Arguments:_

* `event` is a string of the event you want to bind the callback to
  This must be the same string that was given in `addCallback`

* `callback` is a function that is called on the event specified by `event`.
  This must be the same function as was given in `addCallback`. 

_Returns_ the pointselector

### map.ui.boxselector

Allow extents to be selected on the map.

#### boxselector.addCallback(event, callback)

Adds a callback that is called on changes to the boxselector contents.

_Arguments:_

* `event` is a string of the event you want to bind the callback to
* `callback` is a function that is called on the event specified by `event`

Event should be a String which is one of the following:

* `change`: whenever an extent is selected

Callback is a Function that is called with arguments depending on what `event` is bound:

* `drawn`: the layer object
* `extent`: the currently selected extent

_Returns_ the boxselector

#### boxselector.removeCallback(event, callback)

Remove a callback bound by `.addCallback(event, callback)`.

_Arguments:_

* `event` is a string of the event you want to bind the callback to
  This must be the same string that was given in `addCallback`

* `callback` is a function that is called on the event specified by `event`.
  This must be the same function as was given in `addCallback`.

_Returns_ the boxselector

### map.ui.refresh()

Refresh legend and attribution to reflect layer changes, merging and displaying legends and attribution for all enabled layers.

_Returns_ the ui object.

<div class="separator">Interaction</div>

### map.interaction

Interaction is what we call interactive parts of maps that are created
with the [powerful tooltips & regions system in TileMill](http://mapbox.com/tilemill/docs/crashcourse/tooltips/).
Under the hood, it's powered by the open [UTFGrid](https://github.com/mapbox/utfgrid-spec)
specification.

### map.interaction.auto()

Enable default settings - animated tooltips - for interaction with the map.
This internally calls [`interaction.refresh()`](#interaction.refresh) to set the interactivity for the top layer.

_Returns_ the interaction control

_Example:_

    var interaction = mapbox.interaction()
        .map(map)
        .auto();

_DOM Structure (tooltips)_:

    <div class="map-tooltip map-tooltip-0">
        <!-- Tooltip content -->
    </div>

### map.interaction.refresh()

Refresh interactivity control to reflect any layer changes.
If `auto` has not been called, this function will not change anything.

_Returns_ the interaction control

<div class="separator">Events</div>

### map.addCallback(event, callback)

Add a callback for a specific event type. Event types are listed further down.

_Arguments:_

* `event` is a string such as "zoomed" or "drawn".
* `callback` is function that gets called when the event is triggered.

_Returns_ the map object.

### map.removeCallback(event, callback)

Remove a previously added callback.

_Arguments:_

* `event` is the event type to remove the callback for.
* `callback` is the callback to be removed.

_Returns_ the map object.

### Event: zoomed

Fires when the map's zoom level changes. Callbacks receive two arguments:

* `map` is the map object.
* `zoomOffset` is the difference between zoom levels. Get the current zoom with `map.zoom()`.

**Example:**

    map.addCallback("zoomed", function(map, zoomOffset) {
        console.log("Map zoomed by", zoomOffset);
    });

### Event: panned

Fires when the map has been panned. Callbacks receive two arguments:

* `map` is the map object.
* `panOffset` is a two-element array in the form of `[dx, dy]`.

**Example:**

    map.addCallback("panned", function(map, panOffset) {
        console.log("map panned by x:", panOffset[0], "y:", panOffset[1]);
    });

### Event: resized

Fires when the map has been resized. Callbacks receive two arguments:

* `map` is the map object.
* `dimensions` is a new `MM.Point` with the map's new dimensions.

_Example:_

    map.addCallback("resized", function(map, dimensions) {
        console.log("map dimensions:", dimensions.x, "y:", dimensions.y);
    });

### Event: extentset

Fires when the map's extent is set. Callbacks receive two arguments:

* `map` is the map object.
* `extent` is an instance of `MM.Extent`.

_Example:_

    map.addCallback("extentset", function(map, extent) {
        console.log("Map's extent set to:", extent);
    });

### Event: drawn

Fires when the map is redrawn. Callbacks receive one argument:

* `map` is the map object.

_Example:_

    map.addCallback("drawn", function(map) {
      console.log("map drawn!");
    });

# Loading Utilities

To load information about a certain map you've created on MapBox, we provide `mapbox.load` and
`mapbox.auto`, which pull the [TileJSON](http://mapbox.com/wax/tilejson.html) file from a server and
auto-instantiate many of its features.

## mapbox.load(url, callback)

Load layer definitions and other map information from MapBox.

_Arguments:_

* `url` can be either be a full URL to a TileJSON file, like
  `http://a.tiles.mapbox.com/v3/tmcw.map-hehqnmda.jsonp`, or a bare id, like
  `tmcw.map-hehqnmda`, which will get expanded to the former. This can also
  accept an array of urls in the same format.
* `callback` must be a function that receives either a single object with details
  or an array of objects if an array of map ids was given as the first argument.

    {
      zoom: ZOOM_LEVEL,
      center: CENTER,

      // like you could create with mapbox.layer()
      layer: TILE_LAYER,

      // if present, like you would create with mapbox.markers()
      markers: MARKERS_LAYER
    }

_Example:_

    <div id='map' style='width:500px;height:400px;'></div>
    <script>
    mapbox.load('tmcw.map-hehqnmda', function(o) {
        var map = mapbox.map('map');
        map.addLayer(o.layer);
    });
    </script>

## mapbox.auto(element, url [, callback])

Load and create a map with sensible defaults.

_Arguments:_

* `element` must be the `id` of an element on the page, or an element itself. Typically maps are created within `<div>` elements
* `url` must be a TileJSON URL, the id of a MapBox map, multiple IDs and URLs in an array.
* `callback` if specified, receives the map as its first argument, and the same object as `mapbox.load` as the second argument. It is called after all resources have been loaded and the map is complete.

_Returns_ `undefined`: this is an asynchronous function without a useful return value.

**Example:**

    <div id='map' style='width:500px;height:400px;'></div>
    <script>
    mapbox.auto('map', 'http://a.tiles.mapbox.com/v3/tmcw.map-hehqnmda.jsonp');
    </script>

# Layer

`mapbox.layer` is a fast way to add layers to your map without having to deal with complex configuration.

## mapbox.layer()

You can add a tiled layer to your map with `mapbox.layer()`, a simple interface to
layers from MapBox and elsewhere.

_Returns_ a layer object, which has the following methods:

### layer.id(id, callback)

Get or set the layer ID, which corresponds to a MapBox map.

_Arguments:_

* `id` can be the id of a [MapBox](http://mapbox.com/) map, or omitted to get the current `id` value.
  This also calls [layer.named()](#layer.named) setting
  the name to be the same as the id - call `named()` to reset it. For instance, if you were trying
  to add the map at `https://tiles.mapbox.com/tmcw/map/map-hehqnmda`, you could create this layer like so:
* `callback`, if provided, is called after the layer has been asynchronously loaded from MapBox.
  It is called with on argument, the layer object.

_Returns_ the layer object if arguments are given, the layer's `id` otherwise.

_Example:_

    var layer = mapbox.layer().id('map-hehqnmda');

### layer.named([name])

Get or set the name of the layer, as referred to by the map.

_Arguments:_

* `name` can be a new name to call this layer

_Returns_ the layer object if arguments are given, the layer's `name` otherwise.

### layer.url([url, callback])

Pull a layer from a server besides MapBox that supports
[TileJSON](https://github.com/mapbox/tilejson-spec), like a self-hosted [TileStream](https://github.com/mapbox/tilestream).

_Arguments:_

* `url` can be a string value that is a fully-formed URL, or omitted to get the URL from which
  this layer was sourced.
* `callback`, if provided, is called with one argument, the layer object, after the
  TileJSON information has been asynchronously loaded.

_Returns_ the layer object if arguments are given, the pulled URL otherwise.

**Example:**

    var layer = mapbox.layer().url('http://a.tiles.mapbox.com/v3/tmcw.map-hehqnmda.jsonp');

### layer.tilejson([tilejson])

Set layer options directly from a [TileJSON](https://github.com/mapbox/tilejson-spec) object.

_Arguments:_

* `tilejson` must be a TileJSON object as a Javascript object.

_Returns_ the layer object if arguments are given, the layer's TileJSON settings otherwise.

### layer.composite(enabled)

Enable or disable compositing layers together on MapBox. Compositing
combines multiple tile images into one layer of blended images, increasing map
performance and reducing the number of requests the browser needs to make.

* `enabled` must be either true or false.

_Returns_ the layer object.

### layer.parent

The layer's parent DOM element.
