#!/bin/bash
TAG=$1

echo "Checking out tag..."
git checkout $TAG

echo "Installing dependencies..."
npm install

echo "Concatenating mapbox.js..."

cat node_modules/bean/bean.min.js \
	node_modules/mustache/mustache.js \
	node_modules/reqwest/reqwest.min.js \
	node_modules/modestmaps/modestmaps.min.js \
	node_modules/wax/build/header.js \
	node_modules/wax/lib/*.js \
	node_modules/wax/control/lib/*.js \
	node_modules/wax/control/mm/*.js \
	node_modules/wax/connectors/mm/*.js \
	node_modules/easey/src/easey.js \
	node_modules/easey/src/easey.handlers.js \
	node_modules/markers/dist/markers.min.js \
	src/mapbox.js src/layer.js > mapbox.js

echo "Minifying mapbox.min.js"
./node_modules/.bin/uglifyjs mapbox.js > mapbox.min.js

# css
echo "Concatenating mapbox.css..."
cat node_modules/markers/dist/markers.css \
	theme/mapbox.css > mapbox.min.css

# bake a release
echo "Concatenating mapbox.css..."
cp mapbox.min.js mapbox.0.4.3.min.js
cp mapbox.min.css mapbox.0.4.3.min.css
