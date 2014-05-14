# Map Object

## L.mapbox.map(element, id|url|tilejson, options)

Create and automatically configure a map with layers, markers, and
interactivity.

<span class='leaflet'>_Extends_: `L.Map`</span>

| Options | Value | Description |
| ---- | ---- | ---- |
| element (_required_) | string | Must be the id of an element, or a DOM element reference. |
| id _or_ url _or_ tilejson | __string__ if _id_ or _url_ __object__ if _tilejson_ | url can be <ul><li>a map `id` string `examples.map-foo`</li><li> a URL to TileJSON, like `http://a.tiles.mapbox.com/v3/examples.map-0l53fhk2.json`</li><li>a [TileJSON](https://www.mapbox.com/developers/tilejson/) object, from your own Javascript code</li></ul> |
| options | object | If provided, it is the same options as provided to L.Map with the following additions: <ul><li>`tileLayer` L.TileLayer options. Options passed to a `L.mapbox.tileLayer` based on the TileJSON. Set to `false` to disable the `L.mapbox.tileLayer`.</li><li>`featureLayer` `L.mapbox.featureLayer` options. Options passed to a `L.mapbox.featureLayer` based on the TileJSON. Set to `false` to disable the `L.mapbox.featureLayer`.</li><li>`gridLayer` `L.mapbox.gridLayer`. Options passed to a `L.mapbox.gridLayer` based on the TileJSON. Set to `false` to disable the `L.mapbox.gridLayer`.</li><li>`legendControl` `L.mapbox.legendControl` options. Options passed to a `L.mapbox.legendControl` based on the TileJSON. Set to `false` to disable the `L.mapbox.legendControl`.</li><li>`shareControl`: Options passed to a `L.mapbox.shareControl`. Set to `true` to enable the `L.mapbox.shareControl`.</li><li>`infoControl`: Options passed to a `L.mapbox.infoControl`. Set to `true` to enable the `L.mapbox.infoControl`.</li> |

_Example_:

    // map refers to a <div> element with the ID map
    // examples.map-4l7djmvo is the ID of a map on Mapbox.com
    var map = L.mapbox.map('map', 'examples.map-4l7djmvo');

    // map refers to a <div> element with the ID map
    // This map will have no layers initially
    var map = L.mapbox.map('map');

_Returns_: a map object

_Class_: `L.mapbox.Map`

### map.getTileJSON()

Returns this map's TileJSON object which determines its tile source,
zoom bounds and other metadata.

_Returns_: the TileJSON object

# Layers

## L.mapbox.tileLayer(id|url|tilejson, options)

You can add a tiled layer to your map with `L.mapbox.tileLayer()`, a simple
interface to layers from Mapbox and elsewhere.

<span class='leaflet'>_Extends_: `L.TileLayer`</span>

| Options | Value | Description |
| ---- | ---- | ---- |
| id _or_ url _or_ tilejson (_required_) | __string__ if _id_ or _url_ __object__ if _tilejson_ | Value must be <ul><li>An `id` string `examples.map-foo`</li><li>A URL to TileJSON, like `http://a.tiles.mapbox.com/v3/examples.map-0l53fhk2.json`</li><li>A TileJSON object, from your own Javascript code</li></ul> |
| options | object | The second argument is optional. If provided, it is the same options as provided to `L.TileLayer` with one addition: <ul><li>`retinaVersion`, if provided, is an alternative value for the first argument to `L.mapbox.tileLayer` which, if retina is detected, is used instead.</li></ul>

If `detectRetina` is set to true and the map in question supports auto-scaling, then a scaled version will automatically be useful if retina is detected and you don't provide an explicit `retinaVersion` to be used.

_Example_:

    // the second argument is optional
    var layer = L.mapbox.tileLayer('examples.map-20v6611k');

    // you can also provide a full url to a TileJSON resource
    var layer = L.mapbox.tileLayer('http://a.tiles.mapbox.com/v3/examples.map-0l53fhk2.json');

    // if provided, you can support retina tiles
    var layer = L.mapbox.tileLayer('examples.map-20v6611k', {
        detectRetina: true,
        // if retina is detected, this layer is used instead
        retinaVersion: 'examples.map-zswgei2n'
    });

    // if this map supports auto-scaling, `detectRetina` will automatically
    // use scaled tiles when retina is detected.
    var layer = L.mapbox.tileLayer('examples.map-20v6611k', {
        detectRetina: true,
    });

_Returns_ a `L.mapbox.tileLayer` object.

_Class_: `L.mapbox.TileLayer`

### tileLayer.getTileJSON()

Returns this layer's TileJSON object which determines its tile source,
zoom bounds and other metadata.

_Example_:

    var layer = L.mapbox.tileLayer('examples.map-20v6611k')
        // since layers load asynchronously through AJAX, use the
        // `.on` function to listen for them to be loaded before
        // calling `getTileJSON()`
        .on('load', function() {
        // get TileJSON data from the loaded layer
        var TileJSON = layer.getTileJSON();
    });

_Returns_: the TileJSON object

### tileLayer.setFormat(format)

Set the image format of tiles in this layer. You can use lower-quality tiles
in order to load maps faster

| Options | Value | Description |
| ---- | ---- | ---- |
| format | string | `string` an image format. valid options are: 'png', 'png32', 'png64', 'png128', 'png256', 'jpg70', 'jpg80', 'jpg90' |

_Example_:

    // Downsample tiles for faster loading times on slow
    // internet connections
    var layer = L.mapbox.tileLayer('examples.map-20v6611k', {
        format: 'jpg70'
    });

[Live example of .setFormat in use](https://www.mapbox.com/mapbox.js/example/v1.0.0/tilelayer-setformat/)

_Returns_: the layer object

## L.mapbox.gridLayer(id|url|tilejson, options)

An `L.mapbox.gridLayer` loads [UTFGrid](http://mapbox.com/developers/utfgrid/) tiles of
interactivity into your map, which you can easily access with `L.mapbox.gridControl`.

| Options | Value | Description |
| ---- | ---- | ---- |
| id _or_ url _or_ tilejson (_required_) | __string__ if _id_ or _url_ __object__ if _tilejson_ | <ul><li>An `id` string `examples.map-foo`</li><li>A URL to TileJSON, like `http://a.tiles.mapbox.com/v3/examples.map-0l53fhk2.json`</li><li>A TileJSON object, from your own Javascript code</li></ul> |

_Example_:

    // the second argument is optional
    var layer = L.mapbox.gridLayer('examples.map-20v6611k');

_Returns_ a `L.mapbox.gridLayer` object.

_Class_: `L.mapbox.GridLayer`

### gridLayer.on(event, handler, context)

Bind an event handler to a given event on this `L.mapbox.gridLayer` instance.
GridLayers expose a number of useful events that give you access to UTFGrid
data as the user interacts with the map.

| Options | Value | Description |
| ---- | ---- | ---- |
| event (_required_) | __string__ | the event name |
| handler (_required_) | __function__ | a callback function run every time that the event is fired |
| context (_optional_) | __object__ | the context of the handler function: this is the value of `this` when that function returns |

After binding an event with `.on`, you can unbind it with `.off`, with the
same argument structure.

The default events are:

* `click`: mouse has clicked while on a feature in UTFGrid. Event has `{ latLng: location, data: featureData }` as its data.
* `mouseover`: mouse has moved onto a new feature in UTFGrid. Event has `{ latLng: location, data: featureData }` as its data.
* `mousemove`: mouse has moved within a feature in UTFGrid. Event has `{ latLng: location, data: featureData }` as its data.
* `mouseout`: mouse has moved from a feature to an area without any features. Event has `{ latLng: location, data: featureData }` as its data, in which `featureData` is the feature data the mouse was previously on.

_Example_:

    map.gridLayer.on('click', function(e) {
        if (e.data && e.data.url) {
            window.open(e.data.url);
        }
    });

### gridLayer.getTileJSON()

Returns this layer's TileJSON object which determines its tile source,
zoom bounds and other metadata.

_Example_:

    var layer = L.mapbox.gridLayer('examples.map-20v6611k')
        // since layers load asynchronously through AJAX, use the
        // `.on` function to listen for them to be loaded before
        // calling `getTileJSON()`
        .on('load', function() {
        // get TileJSON data from the loaded layer
        var TileJSON = layer.getTileJSON();
    });

_Returns_: the TileJSON object

### gridLayer.getData(latlng, callback)

Load data for a given latitude, longitude point on the map, and call the callback
function with that data, if any.

| Options | Value | Description |
| ---- | ---- | ---- |
| latlng | object | `latlng` a L.LatLng object |
| callback | function | `callback` a function that is called with the grid data as an argument |

_Returns_: the L.mapbox.gridLayer object

## L.mapbox.featureLayer(id|url|geojson, options)

<span class='leaflet'>_Extends_: `L.FeatureGroup`</span>

**NOTE: in version 1.6.0, `L.mapbox.markerLayer` was renamed to `L.mapbox.featureLayer`
to signal the addition of support for lines and polygons. The `L.mapbox.markerLayer`
alias will be removed in Mapbox.js 2.0.0**

`L.mapbox.featureLayer` provides an easy way to integrate [GeoJSON](http://www.geojson.org/)
from Mapbox and elsewhere into your map.

| Options | Value | Description |
| ---- | ---- | ---- |
| id _or_ url _or_ geojson | __string__ if _id_ or _url_ __object__ if _tilejson_ | Must be either <ul><li>An id string examples.map-foo</li><li>A URL to TileJSON, like `http://a.tiles.mapbox.com/v3/examples.map-0l53fhk2.json`</li><li>A GeoJSON object, from your own Javascript code</li><li>`null`, if you wish to only provide `options` and not initial data.</li></ul> |
| options | object | If provided, it is the same options as provided to `L.FeatureGroup`, as well as: <ul><li>`filter`: A function that accepts a feature object and returns `true` or `false` to indicate whether it should be displayed on the map. This can be changed later using `setFilter`.</li><li>`sanitizer`: A function that accepts a string containing tooltip data, and returns a sanitized result for HTML display. The default will remove dangerous script content, and is recommended.</li></ul> |

_Example_:

    var featureLayer = L.mapbox.featureLayer(geojson)
        .addTo(map);

_Returns_ a `L.mapbox.featureLayer` object.

_Class_: `L.mapbox.FeatureLayer`

### featureLayer.loadURL(url)

Load GeoJSON data for this layer from the URL given by `url`.

| Options | Value | Description |
| ---- | ---- | ---- |
| url | string | A map id |

_Example_:

    var featureLayer = L.mapbox.featureLayer()
        .addTo(map);

    featureLayer.loadURL('my_local_markers.geojson');

_Returns_: the layer object

### featureLayer.loadID(id)

Load marker GeoJSON data from a map with the given `id` on Mapbox.

| Options | Value | Description |
| ---- | ---- | ---- |
| url (_required_) | string | A map id |

_Example_:

    var featureLayer = L.mapbox.featureLayer()
        .addTo(map);

    // loads markers from the map `examples.map-0l53fhk2` on Mapbox,
    // if that map has markers
    featureLayer.loadID('examples.map-0l53fhk2');

_Returns_: the layer object

### featureLayer.setFilter(filter)

Sets the filter function for this data layer.

| Options | Value | Description |
| ---- | ---- | ---- |
| filter (_required_) | function |  a function that takes GeoJSON features and returns true to show and false to hide features. |

_Example_:

    var featureLayer = L.mapbox.featureLayer(geojson)
        // hide all markers
        .setFilter(function() { return false; })
        .addTo(map);

[See a live example of .setFilter](https://www.mapbox.com/mapbox.js/example/v1.0.0/multiple-marker-filters/)

_Returns_ the featureLayer object.

### featureLayer.getFilter()

Gets the filter function for this data layer.

_Example_:

    var featureLayer = L.mapbox.featureLayer(geojson)
        // hide all markers
        .setFilter(function() { return false; })
        .addTo(map);

    // get the filter function
    var fn = featureLayer.getFilter()

_Returns_ the filter function.

### featureLayer.setGeoJSON(geojson)

Set the contents of a markers layer: run the provided
features through the filter function and then through the factory function to create elements
for the map. If the layer already has features, they are replaced with the new features.
An empty array will clear the layer of all features.

| Options | Value | Description |
| ---- | ---- | ---- |
| geojson (_required_) | object | `features`, an array of [GeoJSON feature objects](http://geojson.org/geojson-spec.html#feature-objects), or omitted to get the current value. |

_Example_:

    var featureLayer = L.mapbox.featureLayer(geojson)
        .addTo(map);
    // a simple GeoJSON featureset with a single point
    // with no properties
    featureLayer.setGeoJSON({
        type: "FeatureCollection",
        features: [{
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: [102.0, 0.5]
            },
            properties: { }
        }]
    });

_Returns_ the featureLayer object

### featureLayer.getGeoJSON()

Get the contents of this layer as GeoJSON data.

_Returns_ the GeoJSON represented by this layer

# Geocoding

## L.mapbox.geocoder(id|url)

A low-level interface to geocoding, useful for more complex uses and reverse-geocoding.

| Options | Value | Description |
| ---- | ---- | ---- |
| id _or_ url | string | Value must be <ul><li>An `id` string `examples.map-foo`</li><li>A URL to TileJSON, like `http://a.tiles.mapbox.com/v3/examples.map-0l53fhk2.json`</li></ul> |

_Returns_ a `L.mapbox.geocoder` object.

### geocoder.query(queryString, callback)

Queries the geocoder with a query string, and returns its result, if any.

| Options | Value | Description |
| ---- | ---- | ---- |
| queryString (_required_) | string | a query, expressed as a string, like 'Arkansas' |
| callback (_required_) | function | a callback |

The callback is called with arguments

1. An error, if any
2. The result. This is an object with the following members:

        {
            results: // raw results
            latlng: // a map-friendly latlng array
            bounds: // geojson-style bounds of the first result
            lbounds: // leaflet-style bounds of the first result
        }

_Example_: [Live example of geocoder.query centering a map.](https://www.mapbox.com/mapbox.js/example/v1.0.0/map-center-geocoding/)

_Returns_: the geocoder object. The return value of this function is not useful - you must use a callback to get results.

### geocoder.reverseQuery(location, callback)

Queries the geocoder with a location, and returns its result, if any.

| Options | Value | Description |
| ---- | ---- | ---- |
| location (_required_) | object | A query, expressed as an object:<ul><li><pre>[lon, lat] // an array of lon, lat</pre></li><li><pre>{ lat: 0, lon: 0 } // a lon, lat object</pre></li><li><pre>{ lat: 0, lng: 0 } // a lng, lat object</pre></li></ul> The first argument can also be an array of objects in that form to geocode more than one item. |
| callback (_required_) | function | The callback is called with arguments <ul><li>An error, if any</li><li>The result. This is an object of the raw result from Mapbox.</li></ul>

_Returns_: the geocoder object. The return value of this function is not useful - you must use a callback to get results.

# Controls

## L.mapbox.infoControl(options)

<span class='leaflet'>_Extends_: `L.Control`</span>

A map control that shows a toggleable info container. If set, attribution is auto-detected from active layers and added to the info container.

| Options | Value | Description |
| ---- | ---- | ---- |
| options _optional_ | object | An options object. Beyond the default options for map controls, this object has a one additional parameter: <ul><li>`sanitizer`: A function that accepts a string, and returns a sanitized result for HTML display. The default will remove dangerous script content, and is recommended.</li></ul> |

_Example_:

    var map = L.mapbox.map('map').setView([38, -77], 5);
    map.addControl(L.mapbox.infoControl().addInfo('foo'));

_Returns_: a `L.mapbox.infoControl` object.

_Class_: `L.mapbox.InfoControl`

### infoControl.addInfo(info)
Adds an info string to infoControl.

| Options | Value | Description |
| ---- | ---- | ---- |
| info _required_ | string | A string which may contain HTML. It will be sanitized by the infoControl's sanitizer option. |

### infoControl.removeInfo(info)
Removes an info string from infoControl.

| Options | Value | Description |
| ---- | ---- | ---- |
| info _required_ | string | Info to remove. |

## L.mapbox.legendControl(options)

<span class='leaflet'>_Extends_: L.Control</span>

A map control that shows legends added to maps in Mapbox. Legends are auto-detected from active layers.

| Options | Value | Description |
| ---- | ---- | ---- |
| options _optional_ | object | An options object. Beyond the default options for map controls, this object has one special parameter: `sanitizer`: A function that accepts a string, and returns a sanitized result for HTML display. The default will remove dangerous script content, and is recommended. |

_Example_:

    var map = L.mapbox.map('map').setView([38, -77], 5);
    map.addControl(L.mapbox.legendControl());

_Returns_: a `L.mapbox.legendControl` object.

_Class_: `L.mapbox.LegendControl`

### legendControl.addLegend(legend)
Adds a legend to the legendControl.

| Options | Value | Description |
| ---- | ---- | ---- |
| legend _required_ | string | A string which may contain HTML. It will be sanitized by the legendControl's sanitizer option. |


### legendControl.removeLegend(legend)
Removes a legend from the legendControl.

| Options | Value | Description |
| ---- | ---- | ---- |
| legend _required_ | string | legend data to remove. |

## L.mapbox.gridControl(layer, options)

<span class='leaflet'>_Extends_: `L.Control`</span>

Interaction is what we call interactive parts of maps that are created with the powerful [tooltips &amp; regions](http://mapbox.com/tilemill/docs/crashcourse/tooltips/) system in [TileMill](http://mapbox.com/tilemill/). Under the hood, it's powered by the open [UTFGrid specification](https://github.com/mapbox/utfgrid-spec/).

| Options | Value | Description |
| ---- | ---- | ---- |
| layer | `L.mapbox.gridLayer` | The first argument must be a layer created with `L.mapbox.gridLayer()` |
| options | object | Valid options are:<ul><li>`sanitizer`: A function that accepts a string containing interactivity data, and returns a sanitized result for HTML display. The default will remove dangerous script content, and is recommended.</li><li>`template`: A string in the Mustache template language that will be evaluated with data from the grid to produce HTML for the interaction.</li><li>`follow`: Whether the tooltip should follow the mouse in a constant relative position, or should be fixed in the top-right side of the map. By default, this is `false` and the tooltip is stationary.</li><li>`pinnable`: Whether clicking will 'pin' the tooltip open and expose a 'close' button for the user to close the tooltip. By default, this is `true`.</li><li>`touchTeaser`: On touch devices, show the teaser formatter if there is no output from the full formatter. By default, this is `true`.</li><li>`location`: Evaluate the location formatter on click events, and if it provides output, navigate to that location. By default, this is `true`.</li></ul> |

_Example_:

    var map = L.mapbox.map('map').setView([38, -77], 5);
    var gridLayer = L.mapbox.gridLayer('examples.map-8ced9urs');
    map.addLayer(L.mapbox.tileLayer('examples.map-8ced9urs'));
    map.addLayer(gridLayer);
    map.addControl(L.mapbox.gridControl(gridLayer));

_Returns_: a `L.mapbox.gridControl` object.

_Class_: `L.mapbox.GridControl`

### gridControl.hide()

If a tooltip is currently shown by the gridControl, hide and close it.

_Returns_: the `L.mapbox.gridControl` object.

### gridControl.setTemplate(template)

Change the [Mustache template](http://mustache.github.io/) used to transform
the UTFGrid data in the map's interactivity into HTML for display.

| Options | Value | Description |
| ---- | ---- | ---- |
| template | string | A string of Mustache template code for popups. |

_Returns_: the `L.mapbox.gridControl` object.

## L.mapbox.geocoderControl(id|url, options)

Adds geocoder functionality as well as a UI element to a map. This uses
the [Mapbox Geocoding API](http://mapbox.com/developers/api/#geocoding).

<div class='note warning'>
This function is currently in private beta: [Contact Mapbox](https://mapbox.com/contact/) before using this functionality.
</div>

| Options | Value | Description |
| ---- | ---- | ---- |
| id _or_ url (_required_) | string | Either a <ul><li>An `id` string `examples.map-foo`</li><li>A URL to TileJSON, like `http://a.tiles.mapbox.com/v3/examples.map-0l53fhk2.json`</li></ul> |
| options | object | An options argument with the same options as the `L.Control` class, as well as: <ul><li>`keepOpen`: a boolean for whether the control will stay open always rather than being toggled. Default `false`. See <a href='https://www.mapbox.com/mapbox.js/example/v1.0.0/geocoder-keep-open/'>live example</a>.<li></ul> |

_Example_:

    var map = L.map('map')
        .setView([37, -77], 5)
        .addControl(L.mapbox.geocoderControl('examples.map-i875kd35'));

_Returns_ a `L.mapbox.geocoderControl` object.

_Class_: `L.mapbox.GeocoderControl`

### geocoderControl.setURL(url)

Set the url used for geocoding.

| Options | Value | Description |
| ---- | ---- | ---- |
| url | string | A geocoding url |

_Returns_: the geocoder control object

### geocoderControl.setID(id)

Set the map id used for geocoding.

| Options | Value | Description |
| ---- | ---- | ---- |
| id | string | A map id to geocode from |

_Returns_: the geocoder control object

### geocoderControl.setTileJSON(tilejson)

Set the TileJSON used for geocoding.

| Options | Value | Description |
| ---- | ---- | ---- |
| tilejson | object | A TileJSON object |

_Returns_: the geocoder object

### geocoderControl.on(event, callback)
Bind a listener to an event emitted by the geocoder control. Supported additional events are

| Options | Value | Description |
| ---- | ---- | ---- |
| event | string | <ul><li><code>found</code>: success in finding a location. Called with a single argument, the result.</li><li><code>error</code>: failure to find a location. Called with the raw HTTP error from Mapbox.</li></ul> |
| event | string | <ul><li><code>select</code>: fired when the user selects a location from a list of options returned from a geocoding request. The geocoding data is attached to the `data` property of the event.
| event | string | <ul><li><code>autoselect</code>: fired when the geocoder control automatically chooses the first result of a query that returns only one result, and repositions the map accordingly. The geocoding data is attached to the `data` property of the event.

## L.mapbox.shareControl(id|url, options)

Adds a "Share" button to the map, which can be used to share the map to Twitter or Facebook, or generate HTML for a map embed.

<span class='leaflet'>_Extends_: `L.Control`</span>

| Options | Value | Description |
| ---- | ---- | ---- |
| id _or_ url _optional_ | string | Either a <ul><li><code>id</code> string <code>examples.map-foo</code></li><li>A URL to TileJSON, like <code>https://a.tiles.mapbox.com/v3/examples.map-0l53fhk2.json</code> If not supplied, the TileJSON from the map is used.</li></ul> |
| options | object | Options for L.Control</span> Also accepts the following options:<ul><li>url: the <code>URL</code> of a page to which the share control will link instead of the URL of the current page or that specified in TileJSON data.</li></ul> |

_Example_:

    var map = L.map('map', 'examples.map-i875kd35')
        .setView([37, -77], 5)
        .addControl(L.mapbox.shareControl());

_Returns_:
Returns a `L.mapbox.shareControl` object.

# Markers

## L.mapbox.marker.icon(properties)

A core icon generator used in `L.mapbox.marker.style`

| Options | Value | Description |
| ---- | ---- | ---- |
| feature | object | A GeoJSON feature object |

_Returns_:

A `L.Icon` object with custom settings for `iconUrl`, `iconSize`, `iconAnchor`,
and `popupAnchor`.

[A working example of L.mapbox.marker.icon in use](https://www.mapbox.com/mapbox.js/example/v1.0.0/l-mapbox-marker/)

## L.mapbox.marker.style(feature, latlng)

An icon generator for use in conjunction with `pointToLayer` to generate
markers from the [Mapbox Markers API](http://mapbox.com/developers/api/#markers)
and support the [simplestyle-spec](https://github.com/mapbox/simplestyle-spec) for
features.

| Options | Value | Description |
| ---- | ---- | ---- |
| feature | object | A GeoJSON feature object |
| latlng | object | The latitude, longitude position of the marker |

_Examples_:

    L.geoJson(geoJson, {
        pointToLayer: L.mapbox.marker.style,
    });



_Returns_:

A `L.Marker` object with the latitude, longitude position and a styled marker

# Simplestyle

The other sections of the [simplestyle-spec](https://github.com/mapbox/simplestyle-spec) are implemented
by `L.mapbox.simplestyle.style`

## L.mapbox.simplestyle.style(feature)

Given a GeoJSON Feature with optional simplestyle-spec properties, return an
options object formatted to be used as [Leaflet Path options](http://leafletjs.com/reference.html#path).

| Options | Value | Description |
| ---- | ---- | ---- |
| feature | object | A GeoJSON feature object |

_Examples_:

    L.geoJson(geoJson, {
        pointToLayer: L.mapbox.simplestyle.style,
    });

[A working example of L.mapbox.simplestyle in use](https://www.mapbox.com/mapbox.js/example/v1.0.0/geojson-simplestyle/)

_Returns_:

An object formatted to be used as [Leaflet Path options](http://leafletjs.com/reference.html#path).

# Utility

## L.mapbox.sanitize(string)

A HTML sanitization function, with the same effect as the default value of the `sanitizer` option of `L.mapbox.featureLayer`, `L.mapbox.gridControl`, and `L.mapbox.legendControl`.

| Options | Value | Description |
| ---- | ---- | ---- |
| text | string | String of content you wish to sanitize. |

## L.mapbox.template(template, data)

A [mustache](http://mustache.github.io/) template rendering function, as used by the templating feature provided by `L.mapbox.gridControl`.

| Options | Value | Description |
| ---- | ---- | ---- |
| template | string | The template string |
| data | object | Data you wish to pass into the template string |

_Example_:

    var output = L.mapbox.template('Name: {{name}}', {name: 'John'});
    // output is "Name: John"

# Configuration

## L.mapbox.config.FORCE_HTTPS

By default, this is `false`. Mapbox.js auto-detects whether the page your map
is embedded in is using HTTPS or SSL, and matches: if you use HTTPS on your site,
it uses HTTPS resources.

Setting `FORCE_HTTPS` to `true` makes Mapbox.js always require HTTPS resources,
regardless of the host page's scheme.

_Example_:

    L.mapbox.config.FORCE_HTTPS = true;

## L.mapbox.config.HTTP_URLS

An array of base URLs. By default, these point to the [Mapbox Web Services](https://www.mapbox.com/developers/api/).
When you refer to a tileset, grid, marker, or geocoding endpoint, a URL
from this array is chosen.

## L.mapbox.config.HTTPS_URLS

The same as `L.mapbox.config.HTTP_URLS`, but used when SSL mode is detected or
`FORCE_HTTPS` is set to `true`.

# Guides

## Mobile

Mapbox.js is optimized for mobile devices and small screens by default.
There are, however, best practices to make sure your map always looks its best.

### Viewport
Modern mobile browsers now support scaling of webpages by leveraging the meta
tag `viewport`. This enlarges the window making your map look better on a
mobile device. Simply include this in the head of your document:

    <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' />

### Scrolling
If you&#39;re planning on having a page that has large amounts of scrolling,
try to avoid a large map height. Having a &#39;tall&#39; map can cause the user
to get stuck on the map while scrolling. Another way around this is to disable
`dragging` for mobile devices: `map.dragging.disable();`

### Retina
Having the ability to use retina tiles when the device supports them is easy.
When creating the map, use the `detectRetina` to verify if retina is available
and `retinaVersion` to use a tilelayer which is designed for retina screens.

    var map = L.mapbox.map('map', 'your.mapid', {
        tileLayer: {
            detectRetina: true,
            retinaVersion: 'your.mapid'
        }
    }).setView([40, -74.50], 9);

Some Mapbox maps support switching to retina scale automatically: if you're using
one of these maps, you can simply set `detectRetina` and the higher-scale
tiles will be used when retina is detected.

    var map = L.mapbox.map('map', 'your.mapid', {
        tileLayer: {
            detectRetina: true
        }
    }).setView([40, -74.50], 9);

## Theming

### Dark theme

Mapbox.js implements a simple, light style on all interaction elements. A dark theme
is available by applying `class="dark"` to the map div.

_Example_:

    <div id="map" class="dark"></div>

