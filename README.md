# mapbox.js

[![Build Status](https://travis-ci.org/mapbox/mapbox.js.png?branch=v1)](https://travis-ci.org/mapbox/mapbox.js)

This is the MapBox Javascript API, version 1.x. It's built as a [Leaflet](http://leafletjs.com/)
plugin. You can [read about its launch](http://mapbox.com/blog/mapbox-js-with-leaflet/).

## [API](http://mapbox.com/mapbox.js/api/)

Managed as Markdown in `API.md`, following the standards in `DOCUMENTING.md`

## [Examples](http://mapbox.com/mapbox.js/example/v1.0.0/)

## Usage with Browserify

Install the mapbox.js module and add it to `dependencies` in package.json:

```sh
npm install mapbox.js --save
```

Require mapbox in your script:

```js
// main.js

require('mapbox.js'); // <-- auto-attaches to window.L
```

Browserify it:

```sh
browserify main.js -o bundle.js
```

## Building

Requires [node.js](http://nodejs.org/) installed on your system.

``` sh
git clone https://github.com/mapbox/mapbox.js.git
cd mapbox.js
npm install
make
```

This project uses [browserify](https://github.com/substack/node-browserify) to combine
dependencies and installs a local copy when you run `npm install`.
`make` will build the project in `dist/`.

### Tests

Test with [phantomjs](http://phantomjs.org/):

``` sh
npm test
```

To test in a browser, run a [local development server](https://gist.github.com/tmcw/4989751)
and go to `/test`.

### Version v0.x.x

[Version v0.x.x can be accessed in the old master branch.](https://github.com/mapbox/mapbox.js/tree/master).
