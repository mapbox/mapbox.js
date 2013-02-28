# build mapbox.js
NODE_PATH ?= ./node_modules
JS_UGLIFY = $(NODE_PATH)/uglify-js/bin/uglifyjs

# the default rule when someone runs simply `make`
all: \
	dist/mapbox.min.js

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
	src/geocoder.js \
	src/geocoder_control.js \
	src/hash.js \
	src/sanitize.js \
	src/map.js \
	src/legend.js \
	src/grid_layer.js \
	src/grid_control.js \
	src/marker.js \
	src/tile_layer.js \
	src/data_layer.js \

mapbox%js:
	@cat $(filter %.js,$^) > $@

dist:
	mkdir -p dist

# assemble an uncompressed but complete library for development
dist/mapbox.js: dist mapbox.core.js mapbox.lib.js
	cat src/comment.js \
		src/start.js \
		mapbox.lib.js \
		mapbox.core.js \
		src/end.js > dist/mapbox.js

# compress mapbox.js with [uglify-js](https://github.com/mishoo/UglifyJS),
# with name manging (m) and compression (c) enabled
dist/mapbox.min.js: dist dist/mapbox.js
	$(JS_UGLIFY) dist/mapbox.js -c -m -o dist/mapbox.min.js

clean:
	rm -f dist/*
