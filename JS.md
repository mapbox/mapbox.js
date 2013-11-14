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
