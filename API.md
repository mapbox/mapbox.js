# Layer

`mapbox.layer` is a fast way to add layers to your map without having to
deal with complex configuration.

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


## mapbox.geocoder(id | url)

Adds geocoder functionality as well as a UI element to a map.

_Arguments_:

The first argument is required and must be:

* An `id` string `examples.map-foo`
* A URL to TileJSON, like `http://a.tiles.mapbox.com/v3/examples.map-0l53fhk2.json`

_Example_

    var map = L.map('map')
        .setView([37, -77], 5)
        .addControl(new mapbox.geocoder('examples.map-vyofok3q'));

_Returns_ a `mapbox.geocoder` object.


## mapbox.hash()

Adds hash functionality to the map, so that pan and zoom state are copied
when the URL of the page is copied

_Arguments_: none

_Example_

    var map = L.map('map')
        .setView([37, -77], 5)
        .addControl(new mapbox.hash());

_Returns_ a `mapbox.hash` object.
