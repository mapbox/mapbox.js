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

## Specifying the map element
All the following controls need to know what map they are being applied to. This is specified by putting the `data-map` attribute in any parent element to the controls:

- `data-map`: The id of the element the map is in (this attribute can be in a parent element)
    

## Layer Switcher

A simple layer switcher that requires no initialization.

#### Map data attributes
- `data-control="switcher"`: Identify the control as a layer switcher.

#### Layer data attributes

- `href`: Name of layer (by default its the same as on MapBox hosting)  
- `data-group`: Group id. Only one layer per group is enabled at any time. (optional)
- `data-toggle="true"`: Allow layer to be toggled off. (optional)

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

- `data-lon`: Longitude to pan to.
- `data-lat`: Latitude to pan to.
- `data-zoom`: Zoom level to zoom to.

Example:

```html
    <a data-lon="-79" data-lat="42" data-zoom="10" href="#">Awesome place</a>
```

## Geocoder
Searches for a location, and then centers on it with a marker. Specify a geocoder by setting `data-control="geocode"`.

```html
<div data-control="geocode">
    <form class="geocode">
        <input placeholder="Search for an address" type="text">
        <input type="submit" />
        <div id="geocode-error"></div>
    </form>
</div>
```

#TODO
- Hash control? What format should it use?
