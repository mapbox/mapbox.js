#!/bin/bash
TAG=$1

echo $TAG

if [ -z $TAG ]; then
    echo "Usage: build.sh <tag>"
    echo "Tag must be in the form of v1.0.0"
    exit;
fi

if [ -e ../_posts/api/0200-01-01-$TAG.html ]; then
    echo "rm -r ../_posts/$TAG if you want to re-build"
    #exit;
fi

echo "--- BUILDING mapbox.js $TAG ---"

mkdir -p ../_posts/api/$TAG

echo "Installing..."
# npm install mapbox.js@$TAG

echo "Generating html..."

node generate.js node_modules/mapbox.js/API.md leaflet-reference.html -l ../_posts/api/0200-01-01-$TAG.html -o ../_posts/api/0200-01-01-$TAG-all.html -d ../_posts/api/$TAG -t $TAG
