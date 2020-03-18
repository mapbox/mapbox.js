#!/usr/bin/env bash

set -e

version="$1"
tag="v${version}"

if [[ -z $version ]]; then
  echo "First order argument of version required. i.e. ./bump 3.2.0"
fi

if [[ $(git status --porcelain) ]]; then
  echo "You cannot have any local changes to run release. Stash or commmit and rerun."
  exit 1
fi

echo "Have you updated and commited the CHANGELOG? (y/n)"
read -r changelog_updated

if [[ "$changelog_updated" != "y" ]]; then
  echo "Update the changelog and commit then run release again."
  exit 1
fi

echo "Creating release branch ${tag}."
git checkout -b "$tag"

echo "Bumping version in package.json and package-lock.json, tagging, comiting and pushing to remote"
npm version --no-git-tag-version "$version"
$ git add package*.json
$ git commit -m "Update package*.json: <MAJOR.MINOR.PATCH>"
git push origin "$tag"

echo "Do you want to publish NPM? (y/n)"
read -r should_publish_npm

if [[ "$should_publish_npm" == "y" ]]; then
  npm login
  npm publish
fi

echo "Do you want to publish to the Mapbox CDN? (y/n)"
read -r should_publish_cdn

if [[ "$should_publish_cdn" == "y" ]]; then
  make
  ./deploy.sh "$tag"
fi

echo "Do you want to update and commit the documentation pages? (y/n)"
read -r should_update_documentation

if [[ "$should_update_documentation" == "y" ]]; then
  echo "Building docs"
  ./_docs/build.sh "$tag"

  echo "Bumping version in publishers _config files"
  find . -name '_config*.yml' -exec sed -i '' "s/^\\(\\s*mapboxjs\\s*:\\s*\\).*/\\1 ${version}/" {} \;

  echo "Commiting publisher _config files"
  git add _config*.yml docs/*
  git commit -m "Update docs: ${tag}"

  echo "Bumping version in package.json and package-lock.json, commiting and tagging"
  npm version "$version"
  git push origin "$tag"
fi
