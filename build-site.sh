#!/bin/bash
TAG=$1

if [ -z $TAG ]; then
    echo "Usage: build-site.sh <tag>"
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

cat site/frontmatter/mapbox.yaml API.md \
    > _posts/$TAG/0200-01-01-mapbox.md

cat site/frontmatter/easey.yaml node_modules/easey/API.md \
    > _posts/$TAG/0200-01-02-easey.md

cat site/frontmatter/markers.yaml node_modules/markers/API.md \
    > _posts/$TAG/0200-01-03-markers.md

cat site/markers_style.yaml node_modules/markers/STYLE.md \
    > _posts/$TAG/0200-01-03-markers-style.md

cat site/mapbox_style.yaml STYLE.md \
    > _posts/$TAG/0200-01-02-mapbox-style.md
