## DOCUMENTATION STANDARDS

Components:

* Heading - h3 for functions, h2 for object creation, h1 for topics
* Short description. For functions, this should start with a verb, like
  'Set the center of the map.'
* Arguments, if any
* Return value
* Example, in 4-indent

## LOCAL SETUP

The API documentation is fed by `API.md` in the `master` branch, and built by a
script in the `gh-pages` branch. To see your changes requires running
Jekyll on the `gh-pages` branch, but referencing your adjusted version of `API.md`.

Follow these instructions to make changes to the docs locally and see what
you've done before commiting anything to this repository.

1. Clone the repository, make a new branch, and make some changes

```sh
cd ~
git clone git@github.com:mapbox/mapbox.js && cd mapbox.js
git checkout -b my-work
# ... make some changes ...
git commit -am "adjusted the API docs"
```

2. Link your adjusted version of mapbox.js on you computer

```sh
npm link
```

3. Clone the repo again, this time checking out the `gh-pages` branch.

```sh
cd ~
git clone git@github.com:mapbox.js mapbox.js.docs -b gh-pages
```

4. Setup the small node app that builds the documentation for you,
   linking to your locally changed version of mapbox.js.

```sh
cd ~/mapbox.js.docs/_docs
npm install
npm link mapbox.js
```

5. Build the docs and serve the Jekyll site

```sh
./build.sh v1.6.0
cd ~/mapbox.js.docs
jekyll serve
```

When you're happy with your changes, you can make a pull request to get your
changes merged from the `my-work` branch into `master`.

## Deploying Docs

Docs are only deployed **with tagged versions of mapbox.js, once**. Only
extremely unusual circumstances would cause them to be updated in place or
changed after being pushed.

If you have used `npm link` to include a working copy of `mapbox.js` for
testing, unlink it, and run

```sh
./build.sh v1.6.0
```

Replacing `v1.6.0` with the version of docs in question.
