#!/bin/bash

mkdir -p docs
mv _includes _layouts _posts api assets changelog data examples plugins index.html docs
rm .gitignore .travis.yml LICENSE README.md
