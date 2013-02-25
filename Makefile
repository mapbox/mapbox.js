# build mapbox.js
NODE_PATH ?= ./node_modules
JS_UGLIFY = $(NODE_PATH)/uglify-js/bin/uglifyjs

# the default rule when someone runs simply `make`
all: \
	build/mapbox.min.js

# external libraries. it is assumed that these are needed by all
# components, so they're included first
build/lib.js:
	cat node_modules/leaflet-fullscreen/src/Leaflet.fullscreen.js \
		node_modules/reqwest/reqwest.js > build/lib.js

# mapbox.js-specific code
build/mapbox.core.js:
	cat src/mapbox.js \
		src/geocoder.js \
		src/hash.js \
		src/layer_group.js \
		src/legend.js \
		src/marker.js \
		src/tile_layer.js > build/mapbox.core.js

# assemble an uncompressed but complete library for development
build/mapbox.js: build/mapbox.core.js build/lib.js
	cat src/comment.js \
		build/lib.js \
		build/mapbox.core.js > build/mapbox.js

# compress mapbox.js with [uglify-js](https://github.com/mishoo/UglifyJS),
# with name manging (m) and compression (c) enabled
build/mapbox.min.js: build/mapbox.js
	$(JS_UGLIFY) build/mapbox.js -c -m -o build/mapbox.min.js

clean:
	rm -f build/*
