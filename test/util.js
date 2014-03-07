var helpers = {};

// permissive test of leaflet-like location objects
expect.Assertion.prototype.near = function(expected, delta) {
    if (this.obj.lat !== undefined) {
        expect(this.obj.lat).to
            .be.within(expected.lat - delta, expected.lat + delta);
        expect(this.obj.lng).to
            .be.within(expected.lng - delta, expected.lng + delta);
    } else {
        expect(this.obj[0]).to
            .be.within(expected.lat - delta, expected.lat + delta);
        expect(this.obj[1]).to
            .be.within(expected.lng - delta, expected.lng + delta);
    }
};

helpers.geocoderAustin = {
"query": ["austin"],
"results": [[{
    "bounds": [-97.9383829999999, 30.098659, -97.5614889999999, 30.516863],
    "lat": 30.3071816,
    "lon": -97.7559964,
    "name": "Austin",
    "score": 600000790107194.8,
    "type": "city",
    "id": "mapbox-places.4201"
}]]};

helpers.geocoderWhiteHouse = {
  "results": [
    [
      {
        "type": "address",
        "name": "1600 Pennsylvania Ave NW",
        "lat": 38.898761,
        "lon": -77.035117,
        "id": "address.1104748184898"
      },
      {
        "type": "city",
        "name": "Washington",
        "id": "mapbox-places.20001"
      },
      {
        "type": "province",
        "name": "District of Columbia",
        "id": "province.1190806886"
      },
      {
        "type": "country",
        "name": "United States",
        "id": "country.4150104525"
      }
    ]
  ],
  "attribution": {
    "mapbox-places": "<a href='https://www.mapbox.com/about/maps/' target='_blank'>&copy; Mapbox &copy; OpenStreetMap</a> <a class='mapbox-improve-map' href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a>"
  },
  "query": [
    "1600",
    "pennsylvania",
    "ave",
    "nw",
    "washington",
    "dc",
    "20500"
  ]
};

helpers.tileJSON = {
    "attribution":"Data provided by NatureServe in collaboration with Robert Ridgely",
    "bounds":[-180,-85.0511,180,85.0511],
    "center":[-98.976,39.386,4],
    "data":["http://a.tiles.mapbox.com/v3/examples.map-8ced9urs/markers.geojsonp"],
    "description":"Bird species of North America, gridded by species count.",
    "geocoder":"http://a.tiles.mapbox.com/v3/examples.map-8ced9urs/geocode/{query}.jsonp",
    "grids":["http://a.tiles.mapbox.com/v3/examples.map-8ced9urs/{z}/{x}/{y}.grid.json",
        "http://b.tiles.mapbox.com/v3/examples.map-8ced9urs/{z}/{x}/{y}.grid.json",
        "http://c.tiles.mapbox.com/v3/examples.map-8ced9urs/{z}/{x}/{y}.grid.json",
        "http://d.tiles.mapbox.com/v3/examples.map-8ced9urs/{z}/{x}/{y}.grid.json"],
    "id":"examples.map-8ced9urs",
    "maxzoom":17,
    "minzoom":0,
    "name":"Bird species",
    "private":true,
    "scheme":"xyz",
    "template":"{{#__l0__}}{{#__location__}}{{/__location__}}{{#__teaser__}}<div class='birds-tooltip'>\n  <strong>{{name}}</strong>\n  <strong>{{count}} species</strong>\n  <small>{{species}}</small>\n  <div class='carmen-fields' style='display:none'>\n  {{search}} {{lon}} {{lat}} {{bounds}}\n  </div>\n</div>\n<style type='text/css'>\n.birds-tooltip strong { display:block; font-size:16px; }\n.birds-tooltip small { font-size:10px; display:block; overflow:hidden; max-height:90px; line-height:15px; }\n</style>{{/__teaser__}}{{#__full__}}{{/__full__}}{{/__l0__}}",
    "tilejson":"2.0.0",
    "tiles":["http://a.tiles.mapbox.com/v3/examples.map-8ced9urs/{z}/{x}/{y}.png",
        "http://b.tiles.mapbox.com/v3/examples.map-8ced9urs/{z}/{x}/{y}.png",
        "http://c.tiles.mapbox.com/v3/examples.map-8ced9urs/{z}/{x}/{y}.png",
        "http://d.tiles.mapbox.com/v3/examples.map-8ced9urs/{z}/{x}/{y}.png"],
    "webpage":"http://tiles.mapbox.com/examples/map/map-8ced9urs"
};

helpers.tileJSON_improvemap = {
    "attribution": "<a href='https://www.mapbox.com/about/maps/' target='_blank'>&copy; Mapbox &copy; OpenStreetMap</a> <a class='mapbox-improve-map' href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a>",
    "autoscale": true,
    "bounds": [-180, -85.0511, 180, 85.0511],
    "center": [0, 0, 3],
    "data": ["http://a.tiles.mapbox.com/v3/examples.h8e9h88l/markers.geojsonp"],
    "geocoder": "http://a.tiles.mapbox.com/v3/examples.h8e9h88l/geocode/{query}.jsonp",
    "id": "examples.h8e9h88l",
    "maxzoom": 22,
    "minzoom": 0,
    "name": "My Mapbox Streets Map",
    "private": true,
    "scheme": "xyz",
    "tilejson": "2.0.0",
    "tiles": ["http://a.tiles.mapbox.com/v3/examples.h8e9h88l/{z}/{x}/{y}.png"],
    "webpage": "http://a.tiles.mapbox.com/v3/examples.h8e9h88l/page.html"
};

helpers.tileJSON_autoscale = {
  "webpage": "http://a.tiles.mapbox.com/v3/tmcw.map-oitj0si5/page.html",
  "tiles": [
    "http://a.tiles.mapbox.com/v3/tmcw.map-oitj0si5/{z}/{x}/{y}.png",
    "http://b.tiles.mapbox.com/v3/tmcw.map-oitj0si5/{z}/{x}/{y}.png",
    "http://c.tiles.mapbox.com/v3/tmcw.map-oitj0si5/{z}/{x}/{y}.png",
    "http://d.tiles.mapbox.com/v3/tmcw.map-oitj0si5/{z}/{x}/{y}.png"
  ],
  "tilejson": "2.0.0",
  "scheme": "xyz",
  "private": true,
  "name": "dot default",
  "minzoom": 0,
  "attribution": "<a href='http://mapbox.com/about/maps' target='_blank'>Terms & Feedback</a>",
  "autoscale": true,
  "bounds": [
    -180,
    -85,
    180,
    85
  ],
  "center": [
    0,
    0,
    3
  ],
  "data": [
    "http://a.tiles.mapbox.com/v3/tmcw.map-oitj0si5/markers.geojsonp"
  ],
  "geocoder": "http://a.tiles.mapbox.com/v3/tmcw.map-oitj0si5/geocode/{query}.jsonp",
  "id": "tmcw.map-oitj0si5",
  "maxzoom": 19
};

helpers.tileJSON_nocenter = {
    "attribution": "<a href='https://www.mapbox.com/about/maps/' target='_blank'>&copy; Mapbox &copy; OpenStreetMap</a> <a class='mapbox-improve-map' href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a>",
    "autoscale": true,
    "bounds": [-180, -85.0511, 180, 85.0511],
    "data": ["http://a.tiles.mapbox.com/v3/examples.h8e9h88l/markers.geojsonp"],
    "geocoder": "http://a.tiles.mapbox.com/v3/examples.h8e9h88l/geocode/{query}.jsonp",
    "id": "examples.h8e9h88l",
    "maxzoom": 22,
    "minzoom": 0,
    "name": "My Mapbox Streets Map",
    "private": true,
    "scheme": "xyz",
    "tilejson": "2.0.0",
    "tiles": ["http://a.tiles.mapbox.com/v3/examples.h8e9h88l/{z}/{x}/{y}.png"],
    "webpage": "http://a.tiles.mapbox.com/v3/examples.h8e9h88l/page.html"
};

helpers.geoJson = {
    type: 'FeatureCollection',
    features: [{
        type: 'Feature',
        properties: {
            title: 'foo',
            'marker-color': '#f00',
            'marker-size': 'large'
        },
        geometry: {
            type: 'Point',
            coordinates: [-77.0203, 38.8995]
        }
    }]
};

helpers.geoJsonPoly = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "stroke-width": 1,
        "stroke": "#f00"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -16.171875,
              31.653381399664
            ],
            [
              -16.171875,
              46.07323062540838
            ],
            [
              5.2734375,
              46.07323062540838
            ],
            [
              5.2734375,
              31.653381399664
            ],
            [
              -16.171875,
              31.653381399664
            ]
          ]
        ]
      }
    }]};


helpers.gridJson = { "grid": [
    "                                                    !!!#########",
    "                                                    !!!#########",
    "                                                   !!!!#########",
    "                                                   !!!##########",
    "                        !!                         !!!##########",
    "                                                    !!!#########",
    "                                                    !!######### ",
    "                            !                      !!! #######  ",
    "                                                       ###      ",
    "                                                        $       ",
    "                                                        $$    %%",
    "                                                       $$$$$$$%%",
    "                                                       $$$$$$$%%",
    "                                                     $$$$$$$$$%%",
    "                                                    $$$$$$$$$$%%",
    "                                                   $$$$$$$$$$$$%",
    "                                                   $$$$$$$$$%%%%",
    "                                                  $$$$$$$$$%%%%%",
    "                                                  $$$$$$$$%%%%%%",
    "                                                  $$$$$$$%%%%%%%",
    "                                                  $$$$%%%%%%%%%%",
    "                                                 $$$$%%%%%%%%%%%",
    "                                        # # #  $$$$$%%%%%%%%%%%%",
    "                                             $$$$$$$%%%%%%%%%%%%",
    "                                             $$$&&&&'%%%%%%%%%%%",
    "                                            $$$$&&&&'''%%%%%%%%%",
    "                                           $$$$'''''''''%%%%%%%%",
    "                                           $$$$'''''''''''%%%%%%",
    "                                          $$$$&''''''''((((%%%%%",
    "                                          $$$&&''''''''(((((%%%%",
    "                                         $$$&&'''''''''(((((((%%",
    "                                         $$$&&''''''''''(((((((%",
    "                                        $$$&&&''''''''''((((((((",
    "                                        ''''''''''''''''((((((((",
    "                                         '''''''''''''''((((((((",
    "                                         '''''''''''''''((((((((",
    "                                         '''''''''''''''((((((((",
    "                                         '''''''''''''''((((((((",
    "                                         '''''''''''''''((((((((",
    "                            )            '''''''''''''''((((((((",
    "                                         ***'''''''''''''(((((((",
    "                                         *****'''''''''''(((((((",
    "                              ))        ******'''(((((((((((((((",
    "                                        *******(((((((((((((((++",
    "                                        *******(((((((((((((++++",
    "                                        ********((((((((((((++++",
    "                                        ***,,-**((((((((((++++++",
    "                                         ,,,,-------(((((+++++++",
    "                                         ,,---------(((((+++++.+",
    "                                            --------(((((+++....",
    "                                             -///----0000000....",
    "                                             ////----0000000....",
    "                                             /////1---0000000...",
    "                                              ///11--0000000....",
    "                                                111110000000....",
    "                                                 11110000000....",
    "                                                  1111000000....",
    "                                                    1100     .  ",
    "                                                                ",
    "                                                                ",
    "                                                                ",
    "                                                                ",
    "                                                                ",
    "                                                                " ],
    "keys": [ "",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16" ],
    "data": { "1": { "admin": "Portugal" },
        "2": { "admin": "Spain" },
        "3": { "admin": "Morocco" },
        "4": { "admin": "Algeria" },
        "5": { "admin": "Western Sahara" },
        "6": { "admin": "Mauritania" },
        "7": { "admin": "Mali" },
        "8": { "admin": "Cape Verde" },
        "9": { "admin": "Senegal" },
        "10": { "admin": "Burkina Faso" },
        "11": { "admin": "Guinea Bissau" },
        "12": { "admin": "Guinea" },
        "13": { "admin": "Ghana" },
        "14": { "admin": "Sierra Leone" },
        "15": { "admin": "Ivory Coast" },
        "16": { "admin": "Liberia" } }
};
