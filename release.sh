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

echo "Commiting publishers _config files"
echo "Bumping version in publishers _config files"
find . -name '_config*.yml' -exec sed -i '' "s/^\\(\\s*mapboxjs\\s*:\\s*\\).*/\\1 ${version}/" {} \;

echo "Building docs"
./_docs/build.sh "$tag"

git add _config*.yml docs/*
git commit -m "Update docs: ${tag}"

echo "Bumping version in package.json and package-lock.json, commiting and tagging"
npm version "$version"
git push origin publisher-production --tags

echo "Do you want to publish to our CDN? (y/n)"
read -r should_publish_cdn

if [[ "$should_publish_cdn" == "y" ]]; then
  make
  ./deploy.sh "$tag"
fi

echo "Do you want to publish NPM? (y/n)"
read -r should_publish_npm

if [[ "$should_publish_npm" == "y" ]]; then
  mbx npm publish
fi