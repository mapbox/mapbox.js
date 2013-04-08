UGLIFY = node_modules/.bin/uglifyjs
BROWSERIFY = node_modules/.bin/browserify

# the default rule when someone runs simply `make`
all: \
	dist/mapbox.js \
	dist/mapbox.private.js \
	dist/mapbox.css \
	dist/mapbox.ie.css \
	dist/images

node_modules/Leaflet/dist/leaflet-src.js:
	cd node_modules/Leaflet && npm install && npm run-script prepublish

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
dist/mapbox.uncompressed.js: Makefile src/*.js dist index.js node_modules/Leaflet/dist/leaflet-src.js
	$(BROWSERIFY) --debug index.js > $@

# assemble an uncompressed but complete library for development
dist/mapbox.private.js: Makefile src/*.js dist private.js
	$(BROWSERIFY) --debug private.js > $@

# compress mapbox.js with [uglify-js](https://github.com/mishoo/UglifyJS),
# with name manging (m) and compression (c) enabled
dist/mapbox.js: dist dist/mapbox.uncompressed.js
	$(UGLIFY) dist/mapbox.uncompressed.js -c -m -o dist/mapbox.js

clean:
	rm -f dist/*
