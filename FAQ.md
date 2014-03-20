## I'm hiding my map initially, then showing it with jQuery or another script. Why doesn't it show full-size?

Reason: The map can't figure out its own size when it's hidden from the page, since
it doesn't have a size in the browser's calculation.

Solution: Call `map.invalidateSize()` after showing the map:

```js
// your code that shows the map div
$('#map-div').show();

// invalidate the size of your map
map.invalidateSize();
```

## I'm copying coordinates from GeoJSON to Leaflet's L.marker or setView function, and the latitude and longitude are swapped

Reason: the [GeoJSON](http://geojson.org/) specification says that coordinates
must be in `longitude, latitude` order, while Leaflet uses `latitiude, longitude`

Solution: swap the order of coordinates when traveling between GeoJSON & Leaflet

```js
L.marker([coords[1], coords[0]]);
```

## Can Mapbox.js read [MBTiles](https://www.mapbox.com/mbtiles-spec/)?

No: MBTiles files are meant to be read by server-side applications like [Mapbox](https://www.mapbox.com/)
or [TileStache](http://tilestache.org/) and delivered as individual tiles to
Mapbox.js. Reading straight from MBTiles would be inefficient since potentially
millions of tiles must be transferred in order to view just one.
