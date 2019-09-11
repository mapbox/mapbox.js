# mapbox.js

[![Build Status](https://travis-ci.org/mapbox/mapbox.js.svg?branch=publisher-production)](https://travis-ci.org/mapbox/mapbox.js)

A Mapbox plugin for [Leaflet](http://leafletjs.com/), a lightweight JavaScript library for traditional raster maps.

For the state-of-the-art Mapbox vector maps library, see [Mapbox GL JS](https://github.com/mapbox/mapbox-gl-js).

## [API](http://mapbox.com/mapbox.js/api/)

Managed as Markdown in `API.md`, following the standards in `DOCUMENTING.md`

## [Examples](http://mapbox.com/mapbox.js/example/v1.0.0/)

## Usage

Recommended usage is via the Mapbox CDN, with [code snippets available on the official documentation page](https://www.mapbox.com/mapbox.js/)

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

1. Make edits to `theme/images/icons.svg`.
2. Run `./theme/images/render.sh` to update sprites from your edits.
3. Add a CSS reference with the appropriate pixel coordinate if adding a new icon.

### Running documentation locally

Documentation is powered by [Jekyll](http://jekyllrb.com/). Running using the
following command:


``` sh
./jekyll.sh
```
