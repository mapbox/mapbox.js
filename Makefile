build:
	echo
	# javascript
	cat node_modules/bean/bean.min.js \
		node_modules/mustache/mustache.js \
		node_modules/reqwest/reqwest.min.js \
		node_modules/modestmaps/modestmaps.min.js \
		node_modules/wax/dist/wax.mm.min.js \
		node_modules/easey/src/easey.js \
		node_modules/easey/src/easey.handlers.js \
		node_modules/markers/dist/markers.min.js \
		src/mapbox.js src/layer.js > mapbox.js
	uglifyjs mapbox.js > mapbox.min.js
	# css
	cat node_modules/markers/dist/markers.css \
		node_modules/wax/theme/controls.css > mapbox.min.css
	# bake a release
	cp mapbox.min.js mapbox.0.4.3.min.js
	cp mapbox.min.css mapbox.0.4.3.min.css
