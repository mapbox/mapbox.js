#!/bin/bash
TAG=$1

if [ -z $TAG ]; then
    echo "Usage: build.sh <tag>"
    exit;
fi

if [ -e _posts/$TAG ]; then
    echo "rm -r _posts/$TAG if you want to re-build"
    exit;
fi

echo "--- BUILDING mapbox.js $TAG ---"

echo "Checking out tag..."
git checkout $TAG package.json

echo "Installing dependencies..."
npm install

echo "Creating _posts/$TAG"

mkdir "_posts/$TAG"

cat site/mapbox.yaml API.md \
    > _posts/$TAG/0200-01-01-mapbox.md

cat site/easey.yaml node_modules/easey/API.md \
    > _posts/$TAG/0200-01-02-easey.md

cat site/markers.yaml node_modules/markers/API.md \
    > _posts/$TAG/0200-01-03-markers.md
