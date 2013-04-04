# build mapbox.js
NODE_PATH ?= ./node_modules
JS_UGLIFY = $(NODE_PATH)/uglify-js/bin/uglifyjs

# the default rule when someone runs simply `make`
all: \
	dist/mapbox.js \
	dist/mapbox.css \
	dist/mapbox.ie.css \
	dist/images

.INTERMEDIATE dist/mapbox.min.js: \
	mapbox.lib.js \
	mapbox.core.js

node_modules/Leaflet/dist/leaflet-src.js:
	cd node_modules/Leaflet && npm install && jake

# external libraries. it is assumed that these are needed by all
# components, so they're included first
mapbox.lib.js: \
	ext/sanitizer/html-sanitizer-bundle.js \
	ext/sanitizer/html-sanitizer-loosen.js \
	node_modules/Leaflet/dist/leaflet-src.js \
	node_modules/mustache/mustache.js \
	node_modules/leaflet-hash/leaflet-hash.js \
	node_modules/leaflet-fullscreen/src/Leaflet.fullscreen.js \
	node_modules/reqwest/reqwest.js

# mapbox.js-specific code
mapbox.core.js: \
	src/mapbox.js \
	src/request.js \
	src/geocoder.js \
	src/geocoder_control.js \
	src/hash.js \
	src/sanitize.js \
	src/map.js \
	src/legend_control.js \
	src/grid_layer.js \
	src/grid_control.js \
	src/marker.js \
	src/tile_layer.js \
	src/marker_layer.js \

mapbox%js:
	@cat $(filter %.js,$^) > $@

dist:
	mkdir -p dist

dist/mapbox.css: node_modules/Leaflet/dist/leaflet.css \
	theme/style.css
	cat node_modules/Leaflet/dist/leaflet.css \
		theme/style.css > dist/mapbox.css

dist/images:
	cp -r node_modules/Leaflet/dist/images/ dist/images

dist/mapbox.ie.css: node_modules/Leaflet/dist/leaflet.ie.css
	cp node_modules/Leaflet/dist/leaflet.ie.css dist/mapbox.ie.css

# assemble an uncompressed but complete library for development
dist/mapbox.uncompressed.js: dist mapbox.core.js mapbox.lib.js
	cat src/comment.js \
		src/start.js \
		mapbox.lib.js \
		mapbox.core.js \
		src/end.js > dist/mapbox.uncompressed.js

# compress mapbox.js with [uglify-js](https://github.com/mishoo/UglifyJS),
# with name manging (m) and compression (c) enabled
dist/mapbox.js: dist dist/mapbox.uncompressed.js
	$(JS_UGLIFY) dist/mapbox.uncompressed.js -c -m -o dist/mapbox.js

clean:
	rm -f dist/*
