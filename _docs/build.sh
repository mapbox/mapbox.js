#!/bin/bash
TAG=$1

echo $TAG

if [ -z $TAG ]; then
    echo "Usage: build.sh <tag>"
    echo "Tag must be in the form of v1.0.0"
    exit;
fi

echo "--- BUILDING mapbox.js $TAG ---"

mkdir -p docs/_posts/api/$TAG

echo "Generating html..."

node _docs/generate.js API.md _docs/leaflet-reference.html \
 -l docs/_posts/api/0200-01-01-$TAG.html \
 -o docs/_posts/api/0200-01-01-$TAG-all.html \
 -d docs/_posts/api/$TAG -t $TAG
