## v1.6.2

* Removes `editLink` option for `L.mapbox.infoControl`
* Recognizes and updates `Improve this Map` link in `L.mapbox.infoControl`

## v1.6.1

* Adds `select` and `autoselect` events to the geocoderControl to allow for
  finer-tuned listening for user actions around geocoding.
* Improved documentation
* Updated to [Leaflet 0.7.2](https://github.com/Leaflet/Leaflet/blob/master/CHANGELOG.md#072-january-17-2014)

## v1.6.0

* Added support for [simplestyle-spec](https://github.com/mapbox/simplestyle-spec) 1.1.0,
  with Polygon and LineString featuretype support.
* `L.mapbox.markerLayer` is now `L.mapbox.featureLayer`. An alias from the former
  to the latter is in place and will be removed at `v2.0.0`.

## v1.5.2

* Updated to [Leaflet 0.7.1](https://github.com/Leaflet/Leaflet/blob/master/CHANGELOG.md#071-december-6-2013)
* Improved performance of adding `markerLayer`. [#595](https://github.com/mapbox/mapbox.js/issues/595)
* Added `max-width` to the legend. [#592](https://github.com/mapbox/mapbox.js/issues/592)
* Started maintaining a [FAQ](https://github.com/mapbox/mapbox.js/blob/master/FAQ.md).

## v1.5.1

* Adjusted infoControls default position to the bottom right.
* New hover style on map controls.
* Fix bug setGeoJSON should return `this` [#586](https://github.com/mapbox/mapbox.js/issues/586)

## v1.5.0

* Updates to [Leaflet 0.7](http://leafletjs.com/2013/11/18/leaflet-0-7-released-plans-for-future.html)
* Fixes shareControl & design bugs #550 #547 #549 #501 #551
* First release of [JS.md](https://github.com/mapbox/mapbox.js/blob/f54fdaa7f8c0e57ab07089a9acdcebe6a9c09808/JS.md)
* Fix documentation bugs #562
* [Enforce JSHint validity with Travis](https://github.com/mapbox/mapbox.js/commit/2e3e243909ac431776cebf821028b98471a6910f)
* Updated attribution control and edit on OSM functionality #485

## v1.4.2

* Address overrides to leaflet.css when mapbox.standalone.css is used.
* Fix Geocoder container results when the `dark` theme is used.

## v1.4.1

* Consistify colors in the stylesheet
* Use the border-box model throughout
* Consistify Leaflet controls and ui
* Sprite icons [#364](https://github.com/mapbox/mapbox.js/issues/507)
* Contain font sizes to the highest level and avoid defining specific cases so they may be overridden more easily
* Removed IE stylesheet. Fix up cases where this is needed or write in changes to a browser section at the bottom of the stylesheet.
* Remove duplicate max-width [#501](https://github.com/mapbox/mapbox.js/issues/507)
* Add pinterest share button
* Rewrite share modal to use `_.createPane`
* Fix event binding [#514](https://github.com/mapbox/mapbox.js/issues/507)

## v1.4.0

* Update to [Leaflet v0.6.4](https://github.com/Leaflet/Leaflet/blob/master/CHANGELOG.md#064-july-25-2013)
* Simpler support for retina displays #507
* `gridControl` wraps coordinates so world copies also get interaction #510
* Documentation improvements #412 #495
* Fix share control toggling #471
* Fix marker race condition #481
* Support `keepOpen` option for `geocoderControl` #497
* Fix illegal character in style [db335](https://github.com/mapbox/mapbox.js/commit/db335c4a8ae04d822d50e857ed18b5fa5045e6d7)

## v1.3.1

* Fix markerLayer bug with popups #465
* Test location formatter #458
* Icon improvements #466
* Informative geocoder error #402
* Other style tweaks and improvements

## v1.3.0

* Redesigned geocoder control #449
* Rewritten share control #448
* Touch fallback for grid control #441
* Location formatter for grid control #335
* Custom url option for share control #451

## v1.2.0

* Updated Leaflet dependency to v0.6.2
* Added L.mapbox.sanitize and L.mapbox.template
* Fix event removal in grid control (#440)

## v1.1.0

* Updated Leaflet dependency to v0.6.1
* New standalone Mapbox.js without bundled Leaflet dependency
* Simpler SSL Support (#428)
* Share Control (#432)

## v1.0.4

* Documentation fixes
* Fix calculation of mouse Y position (#411)
* Preserve manually-set marker layer GeoJSON (#394)

## v1.0.3

* Fix calculation of tooltip position on fixed-width layouts (#383)
* L.mapbox.gridControl now avoids showing empty tooltips (fixes #392)
* Ensure new tile layers have the correct z-index (#388)
* Fixed click behavior of movable tooltips (#382)
* Improve how L.mapbox.gridControl manages the template (#381, #384)
* Sanitization no longer strips http URLs (#378)
* Fix L.mapbox.addLayer for layers that don't support events (#372)
* L.mapbox.setGeoJSON now removes existing layers (#369)
* L.mapbox.tileLayer now handles negative tile coordinates

## v1.0.2

* Update Leaflet, includes fixes for wrapping bugs

## v1.0.1

* Fix for use with RequireJS present
* Fix for "SCRIPT5: Access is denied" issue in IE8/9
* Fix for default image path

## v1.0.0

**This is a breaking release that should be treated as a clean rewrite
of Mapbox.js. Existing code that uses Mapbox v0.6.x will need to be rewritten.**

Consult documentation for the new API.

### v0.6.7

* Fix for JSONP issues in IE9 and IE10 in upstream libraries
* Fix bug in `layer.disable` and `layer.enable` when layer not attached to a map
* Fix bug where disabling a layer didn't update compositing
* Automatic compositing now checks that a layer is hosted by Mapbox hosting

### v0.6.6

* Fix dragging and zooming on Android
* Fix touch interaction in Wax
* Re-add max-width to legend
* Marker tooltips now stop mousedown/touchstart events
* Add API for checking if map is fullscreen

### v0.6.5

* Fix bug where `layer.tilejson` could overwrite a composited provider
* Fix bug where layer compositing would make unecessary tilejson requests
* Adds backwards-compatibility for Wax CSS classes for existing maps.
* Expands markers API with 0.14.3
* `mapbox.interaction()` now automatically includes location handling as well.

### v0.6.4

* `map.auto` now adds legend and attribution, if available in tilejson
* `map.setPanLimits` now sorts locations internally, if given locations
* Documentation improvements
* Fix `layer.refresh` callback
* Update ModestMaps, Wax, markers.js, easey

### v0.6.3

* `ui.refresh` only adds enabled layers to legend and attribution
* `mapbox.auto` doesn't return opts in an array if there is only one
* can now peacefully coexist with require.js
* `map.addLayer` no longer uses addTileLayer for tile layers
* Update ModestMaps to 3.3.4 fixing clipping issue in swipe example
* Default zoom range is now 0 - 17

### v0.6.2

* Update easey to 2.0.2 with `easey.optimal()` bugfix

### v0.6.1

* Updated ModestMaps to 3.3.3 fixing problem with empty gif
  and hiding parent tiles

### v0.6.0

* Add automatic support for Mapbox hosting composting
* Update Wax to 7.0.0dev7
* New api for `mapbox.ui`
* Name layers using IDs instead of names
* Remove `mapbox.provider`
* Add callbacks to async layer functions

### v0.5.5

* `mapbox.auto` now takes an optional callback and calls it with
  `map, augmented tilejson`
* Fixes various map issues in the Modest Maps wrapping of `mapbox.map`

### v0.5.4

* Update Modest Maps to 3.3.1

### v0.5.2

* Update Wax to dev2

### v0.4.1

* Do not proxy `mapbox.markers` call anymore

### v0.4.0 and v0.3.0

* Update markers.js to bleeding-edge versions.

### v0.2.0

* mapbox.load now adds `.thumbnail` to its result

### v0.1.1

* Calls the callback to `mapbox.auto()` with map, options instead of
  just map.

### v0.1.0

* Adds `.center()` `.zoom()` and `.centerzoom()` with easing parameters
* Supports bare ids for the `mapbox.load()` function.
