# mapbox.js

[![Build Status](https://travis-ci.org/mapbox/mapbox.js.svg?branch=v1)](https://travis-ci.org/mapbox/mapbox.js) [![Average time to resolve an issue](http://isitmaintained.com/badge/resolution/mapbox/mapbox.js.svg)](http://isitmaintained.com/project/mapbox/mapbox.js "Average time to resolve an issue")

This is the Mapbox Javascript API, version 2.x. It's built as a [Leaflet](http://leafletjs.com/)
plugin. You can [read about its launch](http://mapbox.com/blog/mapbox-js-with-leaflet/).

## [API](http://mapbox.com/mapbox.js/api/)

Managed as Markdown in `API.md`, following the standards in `DOCUMENTING.md`

## [Examples](http://mapbox.com/mapbox.js/example/v1.0.0/)

## Usage

Recommended usage is via the Mapbox CDN:

```html
<script src='https://api.mapbox.com/mapbox.js/v2.2.1/mapbox.js'></script>
<link href='https://api.mapbox.com/mapbox.js/v2.2.1/mapbox.css' rel='stylesheet' />
```

The `mapbox.js` file includes the Leaflet library. Alternatively, you can use `mapbox.standalone.js`, which does not include Leaflet (you will have to provide it yourself).

See the [API documentation](http://mapbox.com/mapbox.js/api/) and [Examples](http://mapbox.com/mapbox.js/example/v1.0.0/) for further help.

## Usage with [Browserify](http://browserify.org/)

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

## Usage with Bower

You can install `mapbox.js` with [bower](http://bower.io/) by running

```sh
bower install mapbox.js
```

## Usage as Download

You can [download a built release at the mapbox.js-bower repository](https://github.com/mapbox/mapbox.js-bower/releases).

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

[Version v0.x.x can be accessed in the v0 branch.](https://github.com/mapbox/mapbox.js/tree/v0).

### Editing Icons

Requirements:

    inkscape
    pngquant
    convert (part of imagemagick)

1. Make edits to `theme/images/icons.svg`.
2. Run `./theme/images/render.sh` to update sprites from your edits.
3. Add a CSS reference with the appropriate pixel coordinate if adding a new icon.
