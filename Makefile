UGLIFY = node_modules/.bin/uglifyjs
CLEANCSS = node_modules/.bin/cleancss
BROWSERIFY = node_modules/.bin/browserify

# the default rule when someone runs simply `make`
all: \
	dist/mapbox.js \
	dist/mapbox.internals.js \
	dist/mapbox.standalone.js \
	dist/mapbox.css \
	dist/mapbox.standalone.css \
	dist/images/icons-404040.png

node_modules/.install: package.json
	npm install && touch node_modules/.install

mapbox%js:
	@cat $(filter %.js,$^) > $@

dist:
	mkdir -p dist

dist/mapbox.css: dist/mapbox.uncompressed.css
	$(CLEANCSS) dist/mapbox.uncompressed.css -o dist/mapbox.css

dist/mapbox.uncompressed.css: theme/style.css
	cat theme/style.css > dist/mapbox.uncompressed.css

dist/mapbox.standalone.css: theme/style.css
	cat theme/style.css | $(CLEANCSS) > dist/mapbox.standalone.css

theme/images: theme/images/icons.svg
	./theme/images/render.sh

dist/images/icons-404040.png: theme/images
	cp -r theme/images/ dist/images
	cp -r node_modules/leaflet/dist/images/ dist/images

# assemble an uncompressed but complete library for development
dist/mapbox.uncompressed.js: node_modules/.install dist $(shell $(BROWSERIFY) --list index.js)
	$(BROWSERIFY) --debug index.js > $@

# assemble an uncompressed library without bundled leaflet
dist/mapbox.standalone.uncompressed.js: node_modules/.install dist $(shell $(BROWSERIFY) --list mapbox.js)
	$(BROWSERIFY) --debug mapbox.js > $@

# assemble an uncompressed but complete library for development
dist/mapbox.internals.js: node_modules/.install dist $(shell $(BROWSERIFY) --list internals.js)
	$(BROWSERIFY) --debug internals.js > $@

# compress mapbox.js with [uglify-js](https://github.com/mishoo/UglifyJS),
# with name manging (m) and compression (c) enabled
dist/mapbox.js: dist/mapbox.uncompressed.js
	$(UGLIFY) $< -c -m -o $@

# compress mapbox.standalone.js
dist/mapbox.standalone.js: dist/mapbox.standalone.uncompressed.js
	$(UGLIFY) $< -c -m -o $@

clean:
	rm -rf dist/*
