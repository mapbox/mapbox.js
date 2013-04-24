UGLIFY = node_modules/.bin/uglifyjs
BROWSERIFY = node_modules/.bin/browserify

# the default rule when someone runs simply `make`
all: \
	dist/mapbox.js \
	dist/mapbox.private.js \
	dist/mapbox.css \
	dist/mapbox.ie.css \
	dist/images

node_modules/.install: package.json
	npm install && npm install leaflet && npm install leaflet-hash && touch node_modules/.install

node_modules/Leaflet/dist/leaflet-src.js: node_modules/.install
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
dist/mapbox.uncompressed.js: node_modules/.install src/*.js dist index.js node_modules/Leaflet/dist/leaflet-src.js
	# terrible hack to undefine `define` so that json3 doesn't break when requirejs is present
	# pursuing a fix upstream
	echo ";(function() { var define;" > $@ && $(BROWSERIFY) --debug index.js >> $@ && echo "})()" >> $@;

# assemble an uncompressed but complete library for development
dist/mapbox.private.js: node_modules/.install src/*.js dist private.js
	$(BROWSERIFY) --debug private.js > $@

# compress mapbox.js with [uglify-js](https://github.com/mishoo/UglifyJS),
# with name manging (m) and compression (c) enabled
dist/mapbox.js: dist/mapbox.uncompressed.js
	$(UGLIFY) dist/mapbox.uncompressed.js -c -m -o dist/mapbox.js

clean:
	rm -f dist/*
