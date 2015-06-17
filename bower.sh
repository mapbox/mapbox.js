#!/bin/bash

# Script for updating the Mapboxjs bower repo from current local build.

echo "#################################"
echo "#### Update bower ###############"
echo "#################################"

ARG_DEFS=(
  "--action=(prepare|publish)"
)

function init {
  SCRIPT_DIR=$(resolveDir .)
  mkdir -p $SCRIPT_DIR/tmp
  TMP_DIR=$(resolveDir ./tmp)
  BUILD_DIR=$(resolveDir ./dist)
  NEW_VERSION=$(git describe --tags | sed 's/^v//')
  ORG=mapbox
  REPO=mapbox.js-bower
}


function prepare {
  #
  # prepare tmp folder
  #
  if [ -d $TMP_DIR/$REPO ]
    then
      rm -rf $TMP_DIR/$REPO
  fi

  #
  # clone repo
  #
  echo "-- Cloning $REPO"
  git clone git@github.com:$ORG/$REPO.git $TMP_DIR/$REPO

  #
  # clean up cloned files
  #
  rm -f $TMP_DIR/$REPO/*.js
  rm -f $TMP_DIR/$REPO/*.css
  rm -rf rm $TMP_DIR/$REPO/images

  # move js files from the build
  cp $BUILD_DIR/*.js $TMP_DIR/$REPO/
  cp $BUILD_DIR/*.js.map $TMP_DIR/$REPO/

  # move css files from the build
  cp $BUILD_DIR/*.css $TMP_DIR/$REPO/

  # move images folder from the build
  cp -R $BUILD_DIR/images $TMP_DIR/$REPO/

  cp -R bower.json $TMP_DIR/$REPO/bower.json

  cp -R LICENSE.md $TMP_DIR/$REPO/LICENSE.md

  #
  # update bower.json
  # tag repo
  #
  echo "-- Updating version in $REPO to $NEW_VERSION"
  cd $TMP_DIR/$REPO
  replaceJsonProp "bower.json" "version" ".*" "$NEW_VERSION"

  git add -A

  echo "-- Committing and tagging $REPO"
  git commit -m "v$NEW_VERSION"
  git tag v$NEW_VERSION
  cd $SCRIPT_DIR

}

function publish {
  echo "-- Pushing $REPO"
  cd $TMP_DIR/$REPO
  git push origin master
  git push origin v$NEW_VERSION
  cd $SCRIPT_DIR
}

source $(dirname $0)/bower-utils.inc
