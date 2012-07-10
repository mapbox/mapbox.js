build:
	cp ~/Code/js/modestmaps-js/modestmaps.js lib/modestmaps.js
	cp ~/Code/js/wax/dist/wax.mm.js lib/wax.mm.js
	cp ~/Code/js/markers.js/src/*.js lib/
	cat lib/modestmaps.js lib/easey.js lib/easey.handlers.js \
		lib/mmg.js lib/mmg_interaction.js lib/simplestyle_factory.js \
		lib/wax.mm.js src/mapbox.js src/layer.js | uglifyjs > mapbox.min.js
	cat theme/mmg.css theme/controls.css > mapbox.min.css
	# bake a release
	cp mapbox.min.js mapbox.dev.min.js
	cp mapbox.min.css mapbox.dev.min.css
