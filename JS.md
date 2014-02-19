## JavaScript and Mapbox.js Fundamentals

Making maps is a great way to learn JavaScript. Along with specific guides, like [Codecademy](http://www.codecademy.com/tracks/javascript) and [Eloquent Javascript](http://eloquentjavascript.net/), it's useful to have some specific guidance on how mapping JavaScript works.

## Variables

You're likely familiar with the idea of variables: in programming languages, they're names that you can give to things, like

```js
var myName = 'Tom';
```

After you name something with a variable, you can modify it by that name and send it around to different functions.

```js
var myShoutingName = myName.toUpperCase();
```

Now `myName` is equal to `'Tom'` but `myShoutingName` is `'TOM'`.

## Objects

You might be familiar with some basic data in programming languages:

```js
var dogName = 'Barky';
var dogAge = 5;
var dogIsAGirl = true;
```

Objects are like 'bundles' of multiple different values that are grouped together. For instance, instead of the three facts about my dog Barky being separate variables, they can be stored in one object.

```js
var barky = {
  name: 'Barky',
  age: 5,
  girl: true
};

// you can access part of this dog and
// change it, if you get an electric fence
// for instance
barky.name = 'Yelpy';
```

## Classes

Classes are ways to make the same kind of object more than once. For instance, if you have ten dogs, you might grow tired of typing so much, so you can create a class:

```js
function Dog(name, age, girl) {
  this.name = name;
  this.age = age;
  this.girl = girl;
}

// get a new dog
var newDog = new Dog('Professor Barksalot', 1, false);
```

Classes make objects in a set way - if something is made with `Dog`, you know, for instance, that it has a `.name` you can grab and look at.

## new

Here's a little wrinkle that might be confusing: traditionally, when you create a JavaScript class like we did above, you then use `new`, a special operator in JavaScript, to create objects from it. To create a date, you would call

```js
var now = new Date();
```

`Date` is the class, `now` is the variable that you made that now contains the current date.

This is a little awkward, and when you forget to write `new` before a class, you run into the worst kind of bug: software that's neither completely working nor totally broken.

Because of this annoyance, a lot of classes that you run into will support what's called 'auto-new', which means, simply, that you don't need to write `new` in front of them to make one. In the case of maps and Leaflet/Mapbox.js, there's a little hint: any class that starts with a lowercase letter is initialized with auto-new, whereas any that begins with a capital is a traditional class. So, for instance:

```js
// a place, created with auto-new
var place = L.latLng(0, 0);

// another place, with a traditional constructor
var place2 = new L.LatLng(0, 0);
```

## In Situ

Let's look at examples of this in action:

```js
var map = L.mapbox.map('map');
```

`map` is a variable - that's what you're going to call your map. `L.mapbox.map` is a class - it's an automated way to say 'make me an object with all of the things I need in a map.' What you get out of this, the `map`, is an object: it has functions like `map.setZoom()` that are useful for doing mappy things.

## Callbacks

One of the things that might take you by surprise is that your code has to deal with the idea of _time_. Some parts of your code might only run after something has happened, like a file has been downloaded or someone clicks on the page. Some of it might never run.

JavaScript deals with this problem with an idea known as the _callback_. A callback is a JavaScript function like any other, but it's gets its name from the way that it's used.

This is probably the simplest possible callback: `window.setTimeout` is a built-in function that lets you set a timer for something to happen, and it takes as arguments another function, and a number of milliseconds.

When the number of milliseconds - here 1,000, so 1 second - has passed, the _page_ calls the function you provide. This is a vital detail of how callbacks work: they're functions that _you don't call directly_, but are called for you, when the time is right.

```js
window.setTimeout(function() {
  alert('hi');
}, 1000);
```

You'll see callbacks everywhere in maps: for instance, let's say you wanted to watch for every time that someone clicked a map.

```js
map.on('click', function() {
  alert('I was clicked!');
});
```

## AJAX & Downloads

One of the main places where we see the existence of callbacks is in concert with AJAX, the way that JavaScript is able to download resources on the fly in order to show content. For instance, when you create a new `L.mapbox.featureLayer`, you might be tempted to do this:

```js
// get the markerlayer with the map id `foo.bar`
var featureLayer = L.mapbox.featureLayer('foo.bar');

// what GeoJSON content do those markers have?
var thatGeoJSON = featureLayer.getGeoJSON();
```

But you'll find, to your chagrin, that there's no content in that `getGeoJSON` call. That's because when JavaScript wants to download something like a bunch of markers from a server, it doesn't stop at the line

```js
var featureLayer = L.mapbox.featureLayer('foo.bar');
```

Before starting up and running the next line - it says "start downloading those markers!" and then keeps on keeping on.

So how do you know when the markers are downloaded? Events and callbacks.

```js
var featureLayer = L.mapbox.featureLayer('foo.bar');

featureLayer.on('ready', function() {
  // what GeoJSON content do those markers have?
  var thatGeoJSON = featureLayer.getGeoJSON();
}):
```

The `L.mapbox.featureLayer` class has a callback that fires right as soon as the markers are loaded in full. If you wait for this callback, then you can know for sure that `.getGeoJSON()` and all other functions that rely on those markers being fully downloaded will work just as expected.

## JSON & GeoJSON

You'll likely see the terms [JSON](http://www.json.org/) & [GeoJSON](http://geojson.org/) when you hear about map data: GeoJSON is a very popular format for storing things like the lines, points, and polygons that make up map overlays.

GeoJSON is so-named because it's written in a more general language called JSON. JSON, which stands for JavaScript Object Notation, is a way of storing data that otherwise would be hardcoded into software, into standalone files that are easily readable not only by JavaScript but by other languages and systems.

So, GeoJSON is a subset of JSON, and JSON is a subset of what you can represent in JavaScript. Let's say that in JavaScript you have an object like:

```js
var myBird = {
   // this is the bird's age
   age: 10,
   // and its name
   name: 'Smokey'
};
```

JSON is like this but stricter: no `var`, no comments allowed, and you have to use `"` instead of `'` all the time:

```json
{
   "age": 10,
   "name": "Smokey"
}
```

GeoJSON unfortunately doesn't have a way to represent this bird: it's only for maps. Some GeoJSON might look like

```json
{
   "type": "Point",
   "coordinates": [0, 0]
}
```

That's a point at latitude=0, longitude=0.

The important aha moment to have with GeoJSON and JSON in general is that, while it's pretty strict for how you write it, once you bring a JSON object into JavaScript by AJAX or however, it's the same as any other JavaScript object: you can change it, use it as a variable in functions, or anything else. That's why when there's a function like

```js
featureLayer.setGeoJSON(geoJsonObject);
```

What it's really saying is that it expects a JavaScript object that's formatted like GeoJSON. It doesn't care how it got there, or what's in its past. Now is the time.

## The Parts of a L.mapbox.map

As we discussed earlier, the `L.mapbox.map` class includes 'everything that you need for a map'. What are these things, and what do we call them?

The map itself doesn't actually contain much: it basically keeps track of:

* Dimensions of the map in pixels
* Centerpoint & Zoom

Beyond those, it keeps references to other bits of code that do particulars, like:

* Layers, like `L.mapbox.tileLayer`
* Handlers, like `.scrollWheelZoom`
* Controls, like `L.mapbox.legend`

## LayerGroups and .eachLayer

One design quirk that might be unfamiliar coming from other systems is how Leaflet keeps track of 'layers' and 'layer groups'.

The most common kind of layer you have in a map is a tile layer, like `L.tileLayer` or `L.mapbox.tileLayer`. These layers are just themselves, so if you add a few to a map, the setup will look like:

* Map
 * tileLayer a
 * tileLayer b
 * tileLayer c

To access these layers, you could call

```js
map.eachLayer(function(l) {
  // here you have each layer object in order
  // this callback function is called with
  // a, b, and then c
});
```

For more complex layers, this gets a little bit trickier. For instance, for an `L.geoJson` layer, instead of having

* Map
 * tileLayer a
 * geojsonLayer b

Instead, a `L.geoJson` layer is actually a `L.layerGroup` behind the scenes: so it's really a collection of smaller layers representing each feature:

* Map
 * tileLayer a
 * geojsonLayer b
  * L.Path a
  * L.Circle b

So, for each `feature` in your GeoJSON data, the geojsonLayer actually has a specific little layer for that feature.

## L.geoJson, map.featureLayer, L.marker, and L.mapbox.featureLayer

Want to put a point on the map? There are quite a few ways! Let's nail down
when you'd want each of them.

The lowest-level interface is putting shape layers on the map: let's say you
add a marker and a line to the map:

```js
// a line
var polyline = L.polyline([[0,0], [10, 20]]).addTo(map);

// a marker
var marker = L.marker([0,0]).addTo(map);
```

These are the low-level interfaces to Leaflet's drawing code, and they're very
useful if you have basic ideas of what you want to draw, like 'a line from A to B'.

They have the drawback that there's no easy way to transfer this kind of
overlay as data, since there's no format for it, and it's not immediately
simple to manage what you put on the map. You can fix the management problem
by using a [L.layerGroup](http://leafletjs.com/reference.html#layergroup):

```js
var group = L.layerGroup([polyline, marker]);
```

If you want to transfer these overlays around, you'll want to use a real file
format: that's GeoJSON.

```js
var myVectors = L.geoJson({
  type: 'FeatureCollection',
  features: [{
      type: 'Feature',
      properties: {},
      geometry: {
          type: 'LineString',
          coordinates: [[0, 0], [10, 20]]
      }
  }, {
      type: 'Feature',
      properties: {},
      geometry: {
          type: 'Point',
          coordinates: [0, 0]
      }
  }]
})
```

The output of this is similar to the `group` we made before - the GeoJSON
data is, behind the scenes, instantiated with Leaflet's lower-level shapes but
kept in a group. This has the advantage that you can AJAX your data in or
manage it with any tool that knows how to talk GeoJSON.

How about nice-looking markers, and data that you've added in Mapbox?
Mapbox.js extends Leaflet with some simple abstractions to make this simpler.
The basic element is the [`L.mapbox.featureLayer()`](https://www.mapbox.com/mapbox.js/api/v1.5.0/#L.mapbox.featureLayer).
This is like a `L.geoJson` object but with some differences:

You can instantiate a `featureLayer` just with a map id, and it will magically
pull the markers down for you:

```js
var markers = L.mapbox.featureLayer('my.mapid').addTo(map);
// behind the scenes the markers are downloaded with AJAX, and when they're
// done, the `ready` event is fired.
```

You can do the same with another GeoJSON file:

```js
markers.loadURL('mymarkers.geojson');
// behind the scenes the markers are downloaded with AJAX, and when they're
// done, the `ready` event is fired.
```

Finally, a special convenience built in to `L.mapbox.map()` is that markers
for a given map ID are automatically loaded into `map.featureLayer`:

```js
var map = L.mapbox.map('my.mapofthings');

// this marker layer contains any markers that are saved along with the map
// mapofthings
map.featureLayer;
```

If you _don't_ want this to happen, it's easy to opt-out:

```js
var map = L.mapbox.map('my.mapofthings', {
    featureLayer: false
});
```

That said, if you want to _load custom GeoJSON data_, you should _not_ just
reuse `map.featureLayer`, because it'll get overwritten by the data automatically
downloaded. So just create a new `L.mapbox.featureLayer`, add it to the map
as demonstrated above, and load your custom data into it.

`L.mapbox.featureLayer` instances have the special feature that they will style
markers with [simplestyle](https://www.mapbox.com/developers/simplestyle/) and
will use the fancy [markers api](https://www.mapbox.com/developers/api/#Stand-alone.markers)
for marker icons.
