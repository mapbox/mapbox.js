# Map

## mapbox.map(element, id | url | tilejson, [options])

Create and automatically configure a map with layers, markers, and
interactivity.

_Arguments_:

The first argument is required and must be the id of an element, or a DOM element
reference.

The second argument is required and must be:

* An `id` string `examples.map-foo`
* A URL to TileJSON, like `http://a.tiles.mapbox.com/v3/examples.map-0l53fhk2.json`
* A TileJSON object, from your own Javascript code

The third argument is optional. If provided, it is the same options
as provided to [L.Map](http://leafletjs.com/reference.html#map-options)
with the following additions:

* `tileLayer` (boolean). Whether or not to add a `mapbox.tileLayer` based on
  the TileJSON. Default: `true`.
* `markerLayer` (boolean). Whether or not to add a `mapbox.markerLayer` based on
  the TileJSON. Default: `true`.
* `gridLayer` (boolean). Whether or not to add a `mapbox.gridLayer` based on
  the TileJSON. Default: `true`.
* `legendControl` (boolean). Whether or not to add a `mapbox.legendControl`.
  Default: `true`.

# Layers

## mapbox.tileLayer(id | url | tilejson, [options])

You can add a tiled layer to your map with `mapbox.tileLayer()`, a simple
interface to layers from MapBox and elsewhere.

_Arguments_:

The first argument is required and must be:

* An `id` string `examples.map-foo`
* A URL to TileJSON, like `http://a.tiles.mapbox.com/v3/examples.map-0l53fhk2.json`
* A TileJSON object, from your own Javascript code

The second argument is optional. If provided, it is the same options
as provided to [L.TileLayer](http://leafletjs.com/reference.html#tilelayer)
with one addition:

* `retinaVersion`, if provided, is an alternative value for the first argument
  to `mapbox.tileLayer` which, if retina is detected, is used instead.

_Example_:

    // the second argument is optional
    var layer = new mapbox.tileLayer('examples.map-20v6611k');

    // you can also provide a full url to a tilejson resource
    var layer = new mapbox.tileLayer('http://a.tiles.mapbox.com/v3/examples.map-0l53fhk2.json');

    // if provided,you can support retina tiles
    var layer = new mapbox.tileLayer('examples.map-20v6611k', {
        detectRetina: true,
        // if retina is detected, this layer is used instead
        retinaVersion: 'examples.map-zswgei2n'
    });

_Returns_ a `mapbox.tileLayer` object.


### tileLayer.loadURL(`url`, [callback])

Load tiles from a map with its tiles described by a TileJSON object at the
given `url`. If a callback function are provided as the second argument, it's
called after the request completes and the changes are applied to the layer.

_Arguments_:

1. `string` a map id

_Returns_: the layer object

### tileLayer.loadID(id, [callback])

Load tiles from a map with the given `id` on MapBox. If a callback function
are provided as the second argument, it's called after the request completes
and the changes are applied to the layer.

_Arguments_:

1. `string` a map id

_Returns_: the layer object

### tileLayer.getTileJSON()

Returns this layer's TileJSON object which determines its tile source,
zoom bounds and other metadata.

_Arguments_: none

_Returns_: the TileJSON object

## mapbox.markerLayer(id | url | tilejson, [options])

`mapbox.markerLayer` provides an easy way to integrate [GeoJSON](http://www.geojson.org/)
from MapBox and elsewhere into your map.

_Arguments_:

1. required and must be:

* An `id` string `examples.map-foo`
* A URL to TileJSON, like `http://a.tiles.mapbox.com/v3/examples.map-0l53fhk2.json`
* A GeoJSON object, from your own Javascript code

The second argument is optional. If provided, it is the same options
as provided to [L.FeatureGroup](http://leafletjs.com/reference.html#featuregroup)
with one addition:

_Example_:

    var markerLayer = (new mapbox.markerLayer(geojson))
        .addTo(map);

_Returns_ a `mapbox.markerLayer` object.

### markerLayer.loadURL(`url`, [callback])

Load tiles from a map with its tiles described by a TileJSON object at the
given `url`. If a callback function are provided as the second argument, it's
called after the request completes and the changes are applied to the layer.

_Arguments_:

1. `string` a map id

_Returns_: the layer object

### markerLayer.loadID(id, [callback])

Load tiles from a map with the given `id` on MapBox. If a callback function
are provided as the second argument, it's called after the request completes
and the changes are applied to the layer.

_Arguments_:

1. `string` a map id

_Returns_: the layer object

## mapbox.markerLayer.setFilter(function)

Sets the filter function for this data layer.

_Arguments_:

1. a function that takes GeoJSON features and
  returns true to show and false to hide features.

_Example_:

    var markerLayer = (new mapbox.markerLayer(geojson))
        // hide all markers
        .setFilter(function() { return false; })
        .addTo(map);

_Returns_ the markerLayer object.

## mapbox.markerLayer.getFilter()

Gets the filter function for this data layer.

_Arguments_: none

_Example_:

    var markerLayer = (new mapbox.markerLayer(geojson))
        // hide all markers
        .setFilter(function() { return false; })
        .addTo(map);

    // get the filter function
    var fn = markerLayer.getFilter()

_Returns_ the filter function.

## mapbox.markerLayer.setGeoJSON(features)

Set the contents of a markers layer: run the provided
features through the filter function and then through the factory function to create elements
for the map. If the layer already has features, they are replaced with the new features.
An empty array will clear the layer of all features.

_Arguments:_

* `features`, an array of [GeoJSON feature objects](http://geojson.org/geojson-spec.html#feature-objects),
  or omitted to get the current value.

_Returns_ the markerLayer object

## mapbox.markerLayer.getGeoJSON(features)

Get the contents of this layer as GeoJSON data.

_Arguments:_ none

_Returns_ the GeoJSON represented by this layer

# Geocoding

## mapbox.geocoder(id | url)

A low-level interface to geocoding, useful for more complex uses and reverse-geocoding.

1. (required) must be:

* An `id` string `examples.map-foo`
* A URL to TileJSON, like `http://a.tiles.mapbox.com/v3/examples.map-0l53fhk2.json`

_Returns_ a `mapbox.geocoder` object.

## mapbox.geocoder.query(queryString, callback)

Queries the geocoder with a query string, and returns its result, if any.

_Arguments_:

1. (required) a query, expressed as a string, like 'Arkansas'
2. (required) a callback

The callback is called with arguments

1. An error, if any
2. The result. This is an object with the following members:

        { results: // raw results
        latlng: // a map-friendly latlng array
        bounds: // geojson-style bounds of the first result
        lbounds: // leaflet-style bounds of the first result
        }

_Returns_: the geocoder object. The return value of this function is not useful - you must use a callback to get results.

## mapbox.geocoder.reverseQuery(location, callback)

Queries the geocoder with a location, and returns its result, if any.

_Arguments_:

1. (required) a query, expressed as an object:

         [lon, lat] // an array of lon, lat
         { lat: 0, lon: 0 } // a lon, lat object
         { lat: 0, lng: 0 } // a lng, lat object

The first argument can also be an array of objects in that
form to geocode more than one item.

2. (required) a callback

The callback is called with arguments

1. An error, if any
2. The result. This is an object of the raw result from MapBox.

_Returns_: the geocoder object. The return value of this function is not useful - you must use a callback to get results.

# Controls

## mapbox.hash()

Adds hash functionality to the map, so that pan and zoom state are copied
when the URL of the page is copied.

_Arguments_: none

_Example_

    var map = L.map('map')
        .setView([37, -77], 5)
        .addControl(new mapbox.hash());

_Returns_ a `mapbox.hash` object.

_Ref_: this code uses [Leaflet.hash](https://github.com/mlevans/leaflet-hash)
internally.

## mapbox.legendControl()

A map control that shows legends added to maps in MapBox. Legends are auto-detected from active layers.

_Arguments_:

1. (optional) an options object. Beyond the default options for map controls,
   this object has one special parameter:

* `sanitize`: enable or disable HTML sanitization of legend data before
  display. The default, `true`, is recommended.

_Returns_: a `mapbox.Legend` object.

## mapbox.interactionControl()

Interaction is what we call interactive parts of maps that are created with
the powerful [tooltips & regions system](http://mapbox.com/tilemill/docs/crashcourse/tooltips/)
in TileMill. Under the hood, it's powered by
the [open UTFGrid specification.](https://github.com/mapbox/utfgrid-spec).

_Arguments_:

* The first argument must be a layer created with `mapbox.interaction()`
* The second argument can be an options object. Valid options are:

* `sanitize`: enable or disable HTML sanitization of interactivity data before display. The default, `true`, is recommended.
* `mapping`: an object of the types of interaction showed on each interaction. The default is

        mapping: {
          mousemove: ['teaser'],
          click: ['full'],
          mouseout: [function() { return ''; }]
        }

Each mapping is from an event type, like `mousemove`, to an array of options
to try. To fall-back the `teaser` formatter to `full`, one could write
`['teaser', 'full']`. `location` can be specified to use the location
formatter and change page location.

_Returns_: a `mapbox.interactionControl` object.

## mapbox.geocoderControl(id | url)

Adds geocoder functionality as well as a UI element to a map. This uses
the [MapBox Geocoding API](http://mapbox.com/developers/api/#geocoding).

This function is currently in private beta:
[contact MapBox](http://mapbox.com/about/contact/) before using this functionality.

_Arguments_:

1. (required) either:

* An `id` string `examples.map-foo`
* A URL to TileJSON, like `http://a.tiles.mapbox.com/v3/examples.map-0l53fhk2.json`

_Example_

    var map = L.map('map')
        .setView([37, -77], 5)
        .addControl(new mapbox.geocoder('examples.map-vyofok3q'));

_Returns_ a `mapbox.geocoderControl` object.

## mapbox.geocoder.setURL(id)

Set the url used for geocoding.

_Arguments_:

1. a geocoding url

_Returns_: the geocoder control object

## mapbox.geocoder.setID(id)

Set the map id used for geocoding.

_Arguments_:

1. a map id to geocode from

_Returns_: the geocoder control object

## mapbox.geocoder.setTileJSON(tilejson)

Set the TileJSON used for geocoding.

_Arguments_:

1. A TileJSON object

_Returns_: the geocoder object

## mapbox.geocoder.setErrorHandler(id)

Set the function called if a geocoding request returns an error.

_Arguments_:

1. a function that takes an error object - typically an XMLHttpRequest, and
   handles it.

_Returns_: the geocoder control object

## mapbox.geocoder.getErrorHandler(id)

Returns the current function used by this geocoderControl for error handling.

_Arguments_: none

_Returns_: the geocoder control's error handler

# Markers

## mapbox.marker.icon

A core icon generator used in `mapbox.marker.style`

_Arguments_:

1. A GeoJSON feature object

_Returns_:

A `L.Icon` object with custom settings for `iconUrl`, `iconSize`, `iconAnchor`,
and `popupAnchor`.

## mapbox.marker.style

An icon generator for use in conjunction with `pointToLayer` to generate
markers from the [MapBox Markers API](http://mapbox.com/developers/api/#markers)
and support the [simplestyle-spec](https://github.com/mapbox/simplestyle-spec) for
features.

_Arguments_:

1. A GeoJSON feature object
2. The latitude, longitude position of the marker

_Examples_:

    L.geoJson(geoJson, {
        pointToLayer: mapbox.marker.style,
    });

_Returns_:

A `L.Marker` object with the latitude, longitude position and a styled marker
