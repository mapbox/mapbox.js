build:
	cat lib/modestmaps.min.js lib/easey.js lib/easey.handlers.js lib/mmg.js lib/mmg_interaction.js lib/simplestyle_factory.js lib/wax.mm.min.js mapbox.js | uglifyjs > mapbox.min.js
