## JavaScript and MapBox.js Fundamentals

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
  return {
      name: name,
      age: age,
      girl: girl
  };
}

// get a new dog
var newDog = new Dog('Professor Barksalot', 1, false);
```

Classes make objects in a set way - if something is made with `Dog`, you know, for instance, that it has a `.name` you can grab and look at.

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

One of the main places where we see the existence of callbacks is in concert with AJAX, the way that JavaScript is able to download resources on the fly in order to show content. For instance, when you create a new `L.mapbox.markerLayer`, you might be tempted to do this:

```js
// get the markerlayer with the map id `foo.bar`
var markerLayer = L.mapbox.markerLayer('foo.bar');

// what GeoJSON content do those markers have?
var thatGeoJSON = markerLayer.getGeoJSON();
```

But you'll find, to your chagrin, that there's no content in that `getGeoJSON` call. That's because when JavaScript wants to download something like a bunch of markers from a server, it doesn't stop at the line

```js
var markerLayer = L.mapbox.markerLayer('foo.bar');
```

Before starting up and running the next line - it says "start downloading those markers!" and then keeps on keeping on.

So how do you know when the markers are downloaded? Events and callbacks.

```js
var markerLayer = L.mapbox.markerLayer('foo.bar');

markerLayer.on('ready', function() {
  // what GeoJSON content do those markers have?
  var thatGeoJSON = markerLayer.getGeoJSON();
}):
```

The `L.mapbox.markerLayer` class has a callback that fires right as soon as the markers are loaded in full. If you wait for this callback, then you can know for sure that `.getGeoJSON()` and all other functions that rely on those markers being fully downloaded will work just as expected.

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
markerLayer.setGeoJSON(geoJsonObject);
```

What it's really saying is that it expects a JavaScript object that's formatted like GeoJSON. It doesn't care how it got there, or what's in its past. Now is the time.