#!/bin/bash
TAG=$1

if [ -z $TAG ]; then
    echo "Usage: build.sh <tag>"
    echo "Tag must be in the form of v0.6.4"
    exit;
fi

if ! [[ $TAG =~ ^v[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
    echo "Tag must be in the form of v0.6.4"
    exit;
fi

if [ -e ../_posts/api/0200-01-01-$TAG.html ]; then
    echo "rm -r ../_posts/$TAG if you want to re-build"
    #exit;
fi

echo "--- BUILDING mapbox.js $TAG ---"


echo "Installing..."
npm install mapbox.js@$TAG

echo "Creating _posts/api/...$TAG"
sed "s/__TAG__/$TAG/" header > ../_posts/api/0200-01-01-$TAG.html
echo -e "version: $TAG" >> ../_posts/api/0200-01-01-$TAG.html

echo "Generating html..."
if ! `node generate.js \
    node_modules/mapbox.js/API.md \
    node_modules/mapbox.js/node_modules/markers/API.md \
    node_modules/mapbox.js/node_modules/easey/API.md \
    >> ../_posts/api/0200-01-01-$TAG.html`; then 

    rm ../_posts/api/0200-01-01-$TAG.html;
fi
