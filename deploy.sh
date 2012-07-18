#!/bin/bash
TAG=$1

if [ -z $TAG ]; then
    echo "Usage: deploy.sh <tag>"
    exit;
fi

if [ ! -e dist/$TAG ]; then
    echo "dists for $TAG not found, not deploying"
    exit;
else
    echo "dists for $TAG found, deploying"
fi

echo "--- DEPLOYING mapbox.js $TAG ---"
echo ""
echo ""

s3cmd put --acl-public --mime-type "application/javascript" dist/$TAG/mapbox.js s3://mapbox-js/mapbox.js/$TAG/mapbox.js
s3cmd put --acl-public --mime-type "application/javascript" dist/$TAG/mapbox.uncompressed.js s3://mapbox-js/mapbox.js/$TAG/mapbox.uncompressed.js
s3cmd put --acl-public --mime-type "text/css" dist/$TAG/mapbox.css s3://mapbox-js/mapbox.js/$TAG/mapbox.css
s3cmd put --acl-public --mime-type "image/png" dist/$TAG/map-controls.png s3://mapbox-js/mapbox.js/$TAG/map-controls.png

echo ""
echo ""
echo "--- DEPLOYED mapbox.js $TAG !! ---"
