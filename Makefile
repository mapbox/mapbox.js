# build mapbox.js
NODE_PATH ?= ./node_modules
JS_UGLIFY = $(NODE_PATH)/uglify-js/bin/uglifyjs

# the default rule when someone runs simply `make`
all: \
	dist/mapbox.min.js

# external libraries. it is assumed that these are needed by all
# components, so they're included first
build/lib.js:
	cat \
		ext/sanitizer/html-sanitizer-bundle.js \
		ext/sanitizer/html-sanitizer-loosen.js \
		ext/leaflet/leaflet.js \
		node_modules/leaflet-fullscreen/src/Leaflet.fullscreen.js \
		node_modules/reqwest/reqwest.js > build/lib.js

# mapbox.js-specific code
build/mapbox.core.js:
	mkdir -p build
	cat src/mapbox.js \
		src/auto.js \
		src/geocoder.js \
		src/geocoder_control.js \
		src/hash.js \
		src/layer_group.js \
		src/legend.js \
		src/marker.js \
		src/tile_layer.js > build/mapbox.core.js

# assemble an uncompressed but complete library for development
dist/mapbox.js: build/mapbox.core.js build/lib.js
	mkdir -p dist
	cat src/comment.js \
		src/start.js \
		build/lib.js \
		build/mapbox.core.js \
		src/end.js > dist/mapbox.js

# compress mapbox.js with [uglify-js](https://github.com/mishoo/UglifyJS),
# with name manging (m) and compression (c) enabled
dist/mapbox.min.js: dist/mapbox.js
	$(JS_UGLIFY) dist/mapbox.js -c -m -o dist/mapbox.min.js

clean:
	rm -f build/*
