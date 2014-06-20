var helpers = {};

beforeEach(function() {
    L.mapbox.accessToken = 'key';
});

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
    "type": "FeatureCollection",
    "query": ["austin"],
    "features": [{
        "id": "city.78701",
        "type": "Feature",
        "text": "Austin",
        "place_name": "Austin, 78746, Texas, United States",
        "relevance": 1,
        "center": [-97.804206, 30.278855],
        "geometry": {
            "type": "Point",
            "coordinates": [-97.804206, 30.278855]
        },
        "bbox": [-98.0261839514054, 30.067858231996137, -97.54154705019376, 30.489398740397657],
        "properties": {
            "title": "Austin"
        },
        "context": [
            {"id": "postcode.2467801073", "text": "78746"},
            {"id": "province.1000418602", "text": "Texas"},
            {"id": "country.4150104525", "text": "United States"}
        ]}
    ],
    "attribution": "<a href='https://www.mapbox.com/about/maps/' target='_blank'>&copy; Mapbox &copy; OpenStreetMap</a> <a class='mapbox-improve-map' href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a>"
};

helpers.geocoderWhiteHouse = {
    "type":"FeatureCollection",
    "query":["1600","pennsylvania","ave","nw","washington","dc"],
    "features":[{
        "id":"address.1104748184898",
        "type":"Feature",
        "text":"Pennsylvania Ave NW",
        "place_name":"1600 Pennsylvania Ave NW, Washington, 20006, District of Columbia, United States",
        "relevance":0.8233333333333333,
        "center":[-77.035117,38.898761],
        "geometry":{"type":"Point","coordinates":[-77.035117,38.898761]},
        "address":"1600",
        "properties":{"title":"Pennsylvania Ave NW"},
        "context": [
            {"id": "city.20001", "text": "Washington"},
            {"id": "postcode.757789931", "text": "20006"},
            {"id": "province.1190806886", "text": "District of Columbia"},
            {"id": "country.4150104525", "text": "United States"}
        ]
    }],
    "attribution": "<a href='https://www.mapbox.com/about/maps/' target='_blank'>&copy; Mapbox &copy; OpenStreetMap</a> <a class='mapbox-improve-map' href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a>"
};

helpers.geocoderMulti = {"type": "FeatureCollection", "query": ["chester"], "features": [
    {"id": "city.59522", "type": "Feature", "text": "Chester", "place_name": "Chester, 59522, Montana, United States", "relevance": 1, "center": [-111.066126, 48.567267], "geometry": {"type": "Point", "coordinates": [-111.066126, 48.567267]}, "bbox": [-111.27381098268538, 48.13294600463663, -110.75525903776743, 48.997888893145074], "properties": {"title": "Chester"}, "context": [
        {"id": "postcode.1103465505", "text": "59522"},
        {"id": "province.2245263784", "text": "Montana"},
        {"id": "country.4150104525", "text": "United States"}
    ]},
    {"id": "city.29706", "type": "Feature", "text": "Chester", "place_name": "Chester, 29706, South Carolina, United States", "relevance": 1, "center": [-81.204641, 34.696862], "geometry": {"type": "Point", "coordinates": [-81.204641, 34.696862]}, "bbox": [-81.48828398154757, 34.56381461276174, -81.03240707648264, 34.82969600254277], "properties": {"title": "Chester"}, "context": [
        {"id": "postcode.523763059", "text": "29706"},
        {"id": "province.1316557862", "text": "South Carolina"},
        {"id": "country.4150104525", "text": "United States"}
    ]},
    {"id": "city.73838", "type": "Feature", "text": "Chester", "place_name": "Chester, 73838, Oklahoma, United States", "relevance": 1, "center": [-98.934343, 36.254612], "geometry": {"type": "Point", "coordinates": [-98.934343, 36.254612]}, "bbox": [-99.05097698315285, 36.161170747365105, -98.72566001698338, 36.34794223399628], "properties": {"title": "Chester"}, "context": [
        {"id": "postcode.614772849", "text": "73838"},
        {"id": "province.1788423601", "text": "Oklahoma"},
        {"id": "country.4150104525", "text": "United States"}
    ]},
    {"id": "city.75936", "type": "Feature", "text": "Chester", "place_name": "Chester, 75936, Texas, United States", "relevance": 1, "center": [-94.577634, 30.935564], "geometry": {"type": "Point", "coordinates": [-94.577634, 30.935564]}, "bbox": [-94.68985423880557, 30.811656288141105, -94.4422840876529, 31.05931168738785], "properties": {"title": "Chester"}, "context": [
        {"id": "postcode.1972121432", "text": "75936"},
        {"id": "province.1000418602", "text": "Texas"},
        {"id": "country.4150104525", "text": "United States"}
    ]},
    {"id": "city.5143", "type": "Feature", "text": "Chester", "place_name": "Chester, 05143, Vermont, United States", "relevance": 1, "center": [-72.636488, 43.288253], "geometry": {"type": "Point", "coordinates": [-72.636488, 43.288253]}, "bbox": [-72.76410797475299, 43.071092444196545, -72.49650604636136, 43.380981439197015], "properties": {"title": "Chester"}, "context": [
        {"id": "postcode.3372033110", "text": "05143"},
        {"id": "province.407302220", "text": "Vermont"},
        {"id": "country.4150104525", "text": "United States"}
    ]}
], "attribution": "<a href='https://www.mapbox.com/about/maps/' target='_blank'>&copy; Mapbox &copy; OpenStreetMap</a> <a class='mapbox-improve-map' href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a>"};

helpers.geocoderBulk = [
    {"type": "FeatureCollection", "query": ["austin"], "features": [
        {"id": "city.78701", "type": "Feature", "text": "Austin", "place_name": "Austin, 78746, Texas, United States", "relevance": 1, "center": [-97.804206, 30.278855], "geometry": {"type": "Point", "coordinates": [-97.804206, 30.278855]}, "bbox": [-98.0261839514054, 30.067858231996137, -97.54154705019376, 30.489398740397657], "properties": {"title": "Austin"}, "context": [
            {"id": "postcode.2467801073", "text": "78746"},
            {"id": "province.1000418602", "text": "Texas"},
            {"id": "country.4150104525", "text": "United States"}
        ]},
        {"id": "city.89310", "type": "Feature", "text": "Austin", "place_name": "Austin, 89310, Nevada, United States", "relevance": 1, "center": [-117.227194, 39.313976], "geometry": {"type": "Point", "coordinates": [-117.227194, 39.313976]}, "bbox": [-117.80679434924265, 38.62246699510231, -116.59003701731739, 39.99871687910863], "properties": {"title": "Austin"}, "context": [
            {"id": "postcode.766922274", "text": "89310"},
            {"id": "province.2975076950", "text": "Nevada"},
            {"id": "country.4150104525", "text": "United States"}
        ]},
        {"id": "city.16720", "type": "Feature", "text": "Austin", "place_name": "Austin, 16720, Pennsylvania, United States", "relevance": 1, "center": [-77.988041, 41.567676], "geometry": {"type": "Point", "coordinates": [-77.988041, 41.567676]}, "bbox": [-78.36877489826804, 41.3983272617798, -77.82614701689207, 41.73658270221914], "properties": {"title": "Austin"}, "context": [
            {"id": "postcode.3722401805", "text": "16720"},
            {"id": "province.2184819983", "text": "Pennsylvania"},
            {"id": "country.4150104525", "text": "United States"}
        ]},
        {"id": "city.55912", "type": "Feature", "text": "Austin", "place_name": "Austin, 55912, Minnesota, United States", "relevance": 1, "center": [-92.929212, 43.674029], "geometry": {"type": "Point", "coordinates": [-92.929212, 43.674029]}, "bbox": [-93.16910498309949, 43.526714505771395, -92.7681080168472, 43.82098238181999], "properties": {"title": "Austin"}, "context": [
            {"id": "postcode.1761474448", "text": "55912"},
            {"id": "province.4222030107", "text": "Minnesota"},
            {"id": "country.4150104525", "text": "United States"}
        ]},
        {"id": "city.72007", "type": "Feature", "text": "Austin", "place_name": "Austin, 72007, Arkansas, United States", "relevance": 1, "center": [-92.004189, 35.036604], "geometry": {"type": "Point", "coordinates": [-92.004189, 35.036604]}, "bbox": [-92.12039497936945, 34.90795563316439, -91.83894201687612, 35.07632430322719], "properties": {"title": "Austin"}, "context": [
            {"id": "postcode.1093362577", "text": "72007"},
            {"id": "province.3855330187", "text": "Arkansas"},
            {"id": "country.4150104525", "text": "United States"}
        ]}
    ], "attribution": "<a href='https://www.mapbox.com/about/maps/' target='_blank'>&copy; Mapbox &copy; OpenStreetMap</a> <a class='mapbox-improve-map' href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a>"},
    {"type": "FeatureCollection", "query": ["houston"], "features": [
        {"id": "city.77002", "type": "Feature", "text": "Houston", "place_name": "Houston, 77008, Texas, United States", "relevance": 1, "center": [-95.436742, 29.784969], "geometry": {"type": "Point", "coordinates": [-95.436742, 29.784969]}, "bbox": [-95.72045898294519, 29.52891526120573, -95.06120101856504, 30.04036964534467], "properties": {"title": "Houston"}, "context": [
            {"id": "postcode.2533555017", "text": "77008"},
            {"id": "province.1000418602", "text": "Texas"},
            {"id": "country.4150104525", "text": "United States"}
        ]},
        {"id": "city.38851", "type": "Feature", "text": "Houston", "place_name": "Houston, 38851, Mississippi, United States", "relevance": 1, "center": [-88.976638, 33.920944], "geometry": {"type": "Point", "coordinates": [-88.976638, 33.920944]}, "bbox": [-89.13825298311654, 33.79659653948, -88.79161411435722, 34.045110442750946], "properties": {"title": "Houston"}, "context": [
            {"id": "postcode.534502665", "text": "38851"},
            {"id": "province.788686416", "text": "Mississippi"},
            {"id": "country.4150104525", "text": "United States"}
        ]},
        {"id": "city.55943", "type": "Feature", "text": "Houston", "place_name": "Houston, 55943, Minnesota, United States", "relevance": 1, "center": [-91.553669, 43.782375], "geometry": {"type": "Point", "coordinates": [-91.553669, 43.782375]}, "bbox": [-91.73075598293974, 43.630618500142205, -91.39292801812475, 43.93374746914107], "properties": {"title": "Houston"}, "context": [
            {"id": "postcode.3730302102", "text": "55943"},
            {"id": "province.4222030107", "text": "Minnesota"},
            {"id": "country.4150104525", "text": "United States"}
        ]},
        {"id": "city.65483", "type": "Feature", "text": "Houston", "place_name": "Houston, 65483, Missouri, United States", "relevance": 1, "center": [-91.92426, 37.317564], "geometry": {"type": "Point", "coordinates": [-91.92426, 37.317564]}, "bbox": [-92.08846697978329, 37.2050039768753, -91.84117801818292, 37.42995600752302], "properties": {"title": "Houston"}, "context": [
            {"id": "postcode.610362344", "text": "65483"},
            {"id": "province.3294535744", "text": "Missouri"},
            {"id": "country.4150104525", "text": "United States"}
        ]},
        {"id": "city.35572", "type": "Feature", "text": "Houston", "place_name": "Houston, 35572, Alabama, United States", "relevance": 1, "center": [-87.264654, 34.183928], "geometry": {"type": "Point", "coordinates": [-87.264654, 34.183928]}, "bbox": [-87.39912489784082, 34.06685573423012, -87.20429004798204, 34.300837420778116], "properties": {"title": "Houston"}, "context": [
            {"id": "postcode.1726559867", "text": "35572"},
            {"id": "province.2667756795", "text": "Alabama"},
            {"id": "country.4150104525", "text": "United States"}
        ]}
    ], "attribution": "<a href='https://www.mapbox.com/about/maps/' target='_blank'>&copy; Mapbox &copy; OpenStreetMap</a> <a class='mapbox-improve-map' href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a>"}
];

helpers.geocoderReverse = {"type": "FeatureCollection", "query": [-97.7, 30.3], "features": [
    {"id": "city.78701", "type": "Feature", "text": "Austin", "place_name": "Austin, 78723, Texas, United States", "relevance": 1, "center": [-97.804206, 30.278855], "geometry": {"type": "Point", "coordinates": [-97.804206, 30.278855]}, "bbox": [-98.0261839514054, 30.067858231996137, -97.54154705019376, 30.489398740397657], "properties": {"title": "Austin"}, "context": [
        {"id": "postcode.497942221", "text": "78723"},
        {"id": "province.1000418602", "text": "Texas"},
        {"id": "country.4150104525", "text": "United States"}
    ]},
    {"id": "postcode.497942221", "type": "Feature", "text": "78723", "place_name": "78723, Texas, United States", "relevance": 1, "center": [-97.685712, 30.304148], "geometry": {"type": "Point", "coordinates": [-97.685712, 30.304148]}, "bbox": [-97.71207800000002, 30.282571999999977, -97.66096600000002, 30.325720000000018], "properties": {"title": "78723"}, "context": [
        {"id": "province.1000418602", "text": "Texas"},
        {"id": "country.4150104525", "text": "United States"}
    ]},
    {"id": "province.1000418602", "type": "Feature", "text": "Texas", "place_name": "Texas, United States", "relevance": 1, "center": [-99.810431, 31.319656], "geometry": {"type": "Point", "coordinates": [-99.810431, 31.319656]}, "bbox": [-106.645646, 25.83716399999999, -93.508039, 36.50070399999999], "properties": {"title": "Texas"}, "context": [
        {"id": "country.4150104525", "text": "United States"}
    ]},
    {"id": "country.4150104525", "type": "Feature", "text": "United States", "place_name": "United States", "relevance": 1, "center": [-99.041505, 37.940711], "geometry": {"type": "Point", "coordinates": [-99.041505, 37.940711]}, "bbox": [-179.23108600000003, 18.865459999999985, 179.85968099999997, 71.441059], "properties": {"title": "United States"}}
], "attribution": "<a href='https://www.mapbox.com/about/maps/' target='_blank'>&copy; Mapbox &copy; OpenStreetMap</a> <a class='mapbox-improve-map' href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a>"};

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
