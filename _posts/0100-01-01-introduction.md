---
category: introduction
navigation:
- title: 'Getting Started'
  items:
  - 'Prerequisites'
  - 'MapBox.js & Leaflet'
  - 'Getting started with the API'
  - 'Reading this documentation'
  - 'The ready event'
  - 'Tilejson & UTFGrid'
  - 'GeoJSON'
  - 'Mobile'
  - 'Retina'
  - 'Browser compatibility'
  - 'Viewport'
  - 'Scrolling'
  - 'Standalone MapBox.js'
---

# Getting started

This API documentation covers the MapBox Javascript API, an API for adding
MapBox maps to webpages.

## Prerequisites

In order to use this API, you'll need to understand basic Javascript and mapping concepts.
If you'd like to learn Javascript, start with [an interactive course](http://www.codecademy.com/tracks/javascript),
[a book](http://eloquentjavascript.net/) or [a printed book](http://www.amazon.com/dp/0596517742/?tag=stackoverfl08-20).
If you'd like to learn more about maps, [we've provided a helpful article explaining how web maps work](http://mapbox.com/developers/guide/).

## MapBox.js & Leaflet

The Javascript API is implemented as a [Leaflet](http://leafletjs.com/) plugin. Leaflet
is an open-source library that provides the basic ability to embed a map, like
a MapBox map or a map from OpenStreetMap, into a page. [The Leaflet API](http://leafletjs.com/reference.html)
handles much of the fundamental operations of using maps, so this API documentation is
meant to be used in conjunction with the [Leaflet](http://leafletjs.com/reference.html) API
reference.

The MapBox API includes Leaflet and makes it easier to integrate Leaflet with MapBox's
maps and services.

## Getting started with the API

Here's a simple page that you can set up with MapBox.js:

{% highlight html %}
<html>
<head>
  <link href='//api.tiles.mapbox.com/mapbox.js/v1.4.0/mapbox.css' rel='stylesheet' />
  <!--[if lte IE 8]>
    <link href='//api.tiles.mapbox.com/mapbox.js/v1.4.0/mapbox.ie.css' rel='stylesheet' />
  <![endif]-->
  <script src='//api.tiles.mapbox.com/mapbox.js/v1.4.0/mapbox.js'></script>
  <style>
  #map {
    width:600px;
    height:400px;
  }
  </style>
</head>
<body>
  <div id='map' class='dark'></div>
  <script type='text/javascript'>
  var map = L.mapbox.map('map', 'examples.map-y7l23tes')
      .setView([37.9, -77], 5);
  </script>
</body>
</html>
{% endhighlight %}

The necessary Javascript and CSS files for the map are hosted on MapBox's servers, so they're
served from a worldwide content-distribution network. There's no API key required to include
the Javascript API - you'll identify with MapBox's services simply by using your own custom
maps.

## Reading this documentation

This documentation is organized by _methods_ in the Javascript API. Each method
is shown with potential arguments, and their types. For instance, the `setFilter`
method on `L.mapbox.markerLayer` is documented as:

{% highlight javascript %}
markerLayer.setFilter(filter: function)
{% endhighlight %}

The format `filter: function` means that the single argument to `setFilter`, a filter
function, should be a Javascript function. Other kinds of arguments include
`object`, `string`, or `Element`.

When the API has a Javascript constructor function that returns an object, the constructor
is documented with its full name and the functions on the object are named with just
the type of the object. For instance, `L.mapbox.markerLayer` documents a function that
returns a layer for markers. The methods on that object are then documented as
`markerLayer.setFilter`, `markerLayer.getGeoJSON`, and so on.

## The ready event

Like many other Javascript libraries, some of what the MapBox.js plugin does
is [asynchronous](http://recurial.com/programming/understanding-callback-functions-in-javascript/) - when
you create a layer like `L.mapbox.tileLayer('examples.foo')`, the layer
doesn't immediately know which tiles to load and its attribution information.
Instead, it loads this information with an [AJAX](http://en.wikipedia.org/wiki/AJAX)
call.

For most things you'll write, this isn't a problem, since MapBox.js does a good
job of handling these on-the-fly updates. If you're writing code that needs
to know when layers and other dynamically-loaded objects are ready, you can
use the `ready` event to listen for their ready state. For instance:

{% highlight javascript %}
var layer = L.mapbox.tileLayer('examples.map-0l53fhk2');
layer.on('ready', function() {
    // the layer has been fully loaded now, and you can
    // call .getTileJSON and investigate its properties
});
{% endhighlight %}

Similarly, dynamically-loaded objects produce an `error` event if something
goes wrong, like if the map ID you provide is a 404:

{% highlight javascript %}
var layer = L.mapbox.tileLayer('examples.map-0l53fhk2');
layer.on('error', function(err) {
    // for some reason, this layer didn't load.
    // you can find out more with the 'err' argument
    // passed to this function
});
{% endhighlight %}

## TileJSON & UTFGrid

This library takes advantage of several open specifications, including
[TileJSON](http://mapbox.com/developers/tilejson/) and
[UTFGrid](http://mapbox.com/developers/utfgrid/).

For the purposes of this API, TileJSON is used as a way to _describe
maps and resources_, so it
is the configuration format given to layers, maps, and controls. UTFGrid
is _a fast way to interact with maps_ with tooltips and customizable behaviors,
and is easy to define and produce in [TileMill](http://mapbox.com/tilemill/).

## GeoJSON

The MapBox marker API and the `L.mapbox.markers` interface use [GeoJSON](http://www.geojson.org/),
a simple, open standard for geo-data based on [JSON](http://en.wikipedia.org/wiki/JSON)
and simple features, like Points and Polygons.

## Mobile

MapBox.js is optimized for mobile devices and small screens by default.
There are, however, best practices to make sure your map always looks its best.

## Retina

Having the ability to use retina tiles when the device supports them is easy.
When creating the map, use the `detectRetina` to verify if retina is available
and `retinaVersion` to use a tilelayer which is designed for retina screens.

{% highlight javascript %}
var map = L.mapbox.map('map', 'examples.map-y7l23tes', {
  detectRetina: true,
  retinaVersion: 'examples.map-zswgei2n'
}).setView([40, -74.50], 9);
{% endhighlight %}

Some MapBox maps support switching to retina scale automatically: if you're using
one of these maps, you can simply set `detectRetina` and the higher-scale
tiles will be used when retina is detected.

{% highlight javascript %}
var map = L.mapbox.map('map', 'examples.map-y7l23tes', {
  detectRetina: true
}).setView([40, -74.50], 9);
{% endhighlight %}

## Browser compatibility

MapBox.js aims to be compatible with **IE8+, Chrome, Safari, Firefox, Opera,
Mobile Safari, and other [modern browsers](http://browsehappy.com/)**. Browser-specific
issues should be reported [in the issue tracker](https://github.com/mapbox/mapbox.js/issues?state=open).

The fragility of Internet Explorer and programming in general makes it simple
to break code with subtle changes. We recommend checking code in [jshint](http://jshint.com/)
as a first-line measure and [enabling browser debug tools](http://debugbrowser.com)
to obtain precise error reports and debugging information that you should share
as part of your debugging.

## Viewport

Modern mobile browsers now support scaling of webpages by leveraging the meta tag `viewport`. This enlarges the window making your map look better on a mobile device. Simply include this in the head of your document:

{% highlight html %}
<meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' />
{% endhighlight %}

## Scrolling

If you're planning on having a page that has large amounts of scrolling, try to avoid a large map height. Having a 'tall' map can cause the user to get stuck on the map while scrolling. Another way around this is to disable `dragging` for mobile devices: `map.dragging.disable();`

## Standalone MapBox.js

By default, MapBox.js includes a bundled version of Leaflet that MapBox has ensured
is compatible. However, a standalone version of MapBox.js is also available without
Leaflet included, which you can use if you would like to supply your own version of
Leaflet. You will need to include Leaflet's JavaScript and CSS files, and Leaflet 0.6
or greater is required.

Here's an example of using standalone MapBox.js:

{% highlight html %}
<html>
<head>
  <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.6/leaflet.css" />
  <link href='//api.tiles.mapbox.com/mapbox.js/v1.2.0/mapbox.standalone.css' rel='stylesheet' />
  <!--[if lte IE 8]>
    <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.6/leaflet.ie.css" />
  <![endif]-->
  <script src="http://cdn.leafletjs.com/leaflet-0.6/leaflet.js"></script>
  <script src='//api.tiles.mapbox.com/mapbox.js/v1.2.0/mapbox.standalone.js'></script>
  <style>
  #map {
    width:600px;
    height:400px;
  }
  </style>
</head>
<body>
  <div id='map' class='dark'></div>
  <script type='text/javascript'>
  var map = L.mapbox.map('map', 'examples.map-y7l23tes')
      .setView([37.9, -77], 5);
  </script>
</body>
</html>
{% endhighlight %}
