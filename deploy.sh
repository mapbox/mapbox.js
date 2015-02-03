#!/bin/bash
TAG=$1

if [ -z $TAG ]; then
    echo "Usage: deploy.sh <tag>"
    exit;
fi

existing=`aws s3 ls s3://mapbox-js/mapbox.js/$TAG/`

if [ "$existing" != "" ]; then
    echo "will not overwrite $TAG"
    echo "has content"
    echo "$existing"
    exit;
fi

echo "--- DEPLOYING mapbox.js $TAG ---"
echo ""
echo ""

aws s3 cp --acl=public-read dist/mapbox.js s3://mapbox-js/mapbox.js/$TAG/mapbox.js
aws s3 cp --acl=public-read dist/mapbox.js.map s3://mapbox-js/mapbox.js/$TAG/mapbox.js.map
aws s3 cp --acl=public-read dist/mapbox.uncompressed.js s3://mapbox-js/mapbox.js/$TAG/mapbox.uncompressed.js
aws s3 cp --acl=public-read dist/mapbox.standalone.js s3://mapbox-js/mapbox.js/$TAG/mapbox.standalone.js
aws s3 cp --acl=public-read dist/mapbox.standalone.js.map s3://mapbox-js/mapbox.js/$TAG/mapbox.standalone.js.map
aws s3 cp --acl=public-read dist/mapbox.standalone.uncompressed.js s3://mapbox-js/mapbox.js/$TAG/mapbox.standalone.uncompressed.js
aws s3 cp --acl=public-read dist/mapbox.css s3://mapbox-js/mapbox.js/$TAG/mapbox.css
aws s3 cp --acl=public-read dist/mapbox.standalone.css s3://mapbox-js/mapbox.js/$TAG/mapbox.standalone.css
aws s3 cp --acl=public-read dist/images/layers.png s3://mapbox-js/mapbox.js/$TAG/images/layers.png
aws s3 cp --acl=public-read dist/images/layers-2x.png s3://mapbox-js/mapbox.js/$TAG/images/layers-2x.png
aws s3 cp --acl=public-read dist/images/marker-icon.png s3://mapbox-js/mapbox.js/$TAG/images/marker-icon.png
aws s3 cp --acl=public-read dist/images/marker-icon-2x.png s3://mapbox-js/mapbox.js/$TAG/images/marker-icon-2x.png
aws s3 cp --acl=public-read dist/images/marker-shadow.png s3://mapbox-js/mapbox.js/$TAG/images/marker-shadow.png
aws s3 cp --acl=public-read dist/images/icons-000000@2x.png s3://mapbox-js/mapbox.js/$TAG/images/icons-000000@2x.png
aws s3 cp --acl=public-read dist/images/icons-ffffff@2x.png s3://mapbox-js/mapbox.js/$TAG/images/icons-ffffff@2x.png

echo ""
echo ""
echo "--- DEPLOYED mapbox.js $TAG ! ---"
