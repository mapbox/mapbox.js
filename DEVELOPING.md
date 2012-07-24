## Build

Dependencies are managed in `package.json` and installed with `npm install`

To build the mapbox.js distributions, first create a new version of mapbox.js and make a new git tag. Then call

    ./build.sh v0.5.0

Or the tag you desire. This will build files in `dist/v0.5.0`

## Deploy

To deploy a specific version,

    ./deploy.sh v0.5.0

You'll need [s3cmd](http://s3tools.org/s3cmd) and a configuration suitable to push to the MapBox S3 bucket.
