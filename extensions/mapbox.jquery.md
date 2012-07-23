Three jQuery plugins that aim to simplify making map sites without imposing decisions on the developer.

**Attribute names, etc, are NOT final. Suggestions welcome.**

## Map

Initialize a map with jQuery within an element. It can do three things:

- Initialize, load and autoconfigure a map using mapbox.auto: `$(elem).mapbox(urls, callback)`
- Initialize an instance of mapbox.map: `$(elem).mapbox([layers[, dimensions[, handlers]]])`
- Get an already initialized map: `$(elem).mapbox()`

Examples:

```js
    var url1 = 'http...';  // TileJSON URL
    var url2 = 'http...';

    // Initialize using mapbox.auto
    $('#map').mapbox([url1, url2], function(map, tilejsons) {
        console.log("Got my map:", map);
    });

    // Initialize a map with a layer
    var map = $('#map').mapbox(mapbox.layer().tilejson(tj));
```
    

## Layer Switcher

A lightweight layer switcher that requires no initialization.

#### Map data attributes
- `data-control="switcher"`: Identify the control as a layer switcher.
- `data-map`: The id of the element containing the map.

#### Layer data attributes

- `href`: Name of layer (by default its the same as on MapBox hosting)  
- `data-group`: Group id. Only one layer per group is enabled at any time. (optional)

Example:

```html
    <div id="map"></div>
    <ul data-control='switcher' data-map="map">
        <li><a data-group="0" href='#trees'>Show me trees!</a></li>
        <li><a data-group="1" href='#bees'>Bees.</a></li>
    </ul>
```

### Styling
The class `active` gets added to all selected switchers.

## Easing links
Works well together with the layer switcher, but can also be used separately to link to locations.

- `data-map`: The id of the element the map is in (this attribute can be in a parent element)
- `data-lon`: Longitude to pan to.
- `data-lat`: Latitude to pan to.
- `data-zoom`: Zoom level to zoom to.

Example:

```html
    <a data-lon="-79" data-lat="42" data-zoom="10" href="#">Awesome place</a>
```

## TODO
- Geocoder?
- Hash control? Or more appropriate in Wax?
