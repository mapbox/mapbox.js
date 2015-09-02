# Deploying Mapbox.js

You need `aws`

    pip install awscli

Then make the release with `make`

* Write a `CHANGELOG.md` entry that describes your changes and links to
  issues in question

* Bump `package.json` version

# rebuild

Mapbox.js uses a version number pulled from `package.json`, so _after_ updating package.json,
rebuild it.

    make

# git tag & npm package

    git tag v1.your.version -s -m "Version v1.your.version, with xxx changes"
    git push origin mb-pages --tags
    npm publish

# deploying to the cdn

    ./deploy.sh v1.your.version

# deploying to bower

    ./bower.sh --action=prepare
    ./bower.sh --action=publish

# deploying to the web

```sh
$ ./_docs/build.sh v1.your.version
```

Then `git add` the new generated files in the docs directory.

Then update the version number in `_config.yml` and its variants,
and then in the relevant server software.
