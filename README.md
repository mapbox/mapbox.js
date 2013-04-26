# mapbox.js

[![Build Status](https://travis-ci.org/mapbox/mapbox.js.png?branch=v1)](https://travis-ci.org/mapbox/mapbox.js)

This is the MapBox Javascript API, version 1.x. It's built as a [Leaflet](http://leafletjs.com/)
plugin. You can [read about its launch](http://mapbox.com/blog/mapbox-js-with-leaflet/).

## [API](mapbox.com/mapbox.js/api/)

## [Examples](http://mapbox.com/mapbox.js/example/v1.0.0/)

## Building

    git clone https://github.com/mapbox/mapbox.js.git
    npm install
    make

This project uses [browserify](https://github.com/substack/node-browserify) to combine
dependencies and installs a local copy when you run `npm install`.
`make` will build the project in `dist/`.

### [API Documentation](http://mapbox.com/mapbox.js/api/v1.0.0/)

Our API documentation covers all of the code here, and is managed as Markdown
in `API.md`

### Tests

Test with [phantomjs](http://phantomjs.org/):

    npm test

To test in a browser, run a [local development server](https://gist.github.com/tmcw/4989751)
and go to `/test`.

### Version v0.x.x

[Version v0.x.x can be accessed in the old master branch.](https://github.com/mapbox/mapbox.js/tree/master).
