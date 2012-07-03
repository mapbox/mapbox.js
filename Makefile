build:
	cat lib/*.js mapbox.js | uglifyjs > mapbox.min.js
