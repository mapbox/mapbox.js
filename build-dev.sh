#!/bin/bash
TAG="dev"

if [ ! -e dist/$TAG ]; then
    mkdir -p "dist/$TAG"
fi

echo "--- BUILDING DEV mapbox.js $TAG ---"

echo "Installing dependencies..."
echo ""
echo ""
npm install

echo "Concatenating mapbox.js..."
cat src/comment.js \
    src/start.js \
    node_modules/bean/bean.js \
	node_modules/reqwest/reqwest.js \
    src/end.js \
	node_modules/mustache/mustache.js \
	node_modules/modestmaps/modestmaps.js \
	node_modules/wax/lib/html-sanitizer-bundle.js \
	node_modules/wax/lib/html-sanitizer-loosen.js \
	node_modules/wax/control/lib/*.js \
	node_modules/wax/control/mm/*.js \
	node_modules/wax/connectors/mm/*.js \
	node_modules/easey/src/easey.js \
	node_modules/easey/src/easey.handlers.js \
	node_modules/markers/dist/markers.js \
	src/map.js src/load.js src/ui.js src/util.js \
	src/interaction.js src/layer.js > mapbox.js

echo "Minifying mapbox.min.js"
./node_modules/.bin/uglifyjs mapbox.js > mapbox.min.js

# css
echo "Concatenating mapbox.css..."
cat node_modules/markers/dist/markers.css \
    node_modules/wax/theme/controls.css \
	theme/mapbox.css > mapbox.min.css


# bake a release
cp mapbox.min.js "dist/$TAG/mapbox.js"
cp mapbox.js "dist/$TAG/mapbox.uncompressed.js"
cp mapbox.min.css "dist/$TAG/mapbox.css"
cp node_modules/wax/theme/map-controls.png "dist/$TAG/map-controls.png"

set -- `wc -c mapbox.min.js`
echo "mapbox.min.js size:"
units "$1 bytes" "kilobytes"
