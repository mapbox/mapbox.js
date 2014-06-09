var helpers = {};

before(function() {
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

helpers.geocoderMulti = {"query": ["chester"], "results": [
    [
        {"bounds": [-2.998194, 53.146961, -2.79233999999999, 53.2355309999999], "lat": 53.1891648678537, "lon": -2.88012205997425, "name": "Chester", "score": 200000073770758.4, "type": "place", "id": "mapbox-places.218041"},
        {"bounds": [-3.09595536924484, 52.9471560733941, -1.97088192386167, 53.3882660996009], "lat": 53.1677110864975, "lon": -2.526958424051, "name": "Cheshire", "score": 2155482431.21742, "type": "province", "id": "province.2594"},
        {"bounds": [-13.6913559567794, 49.9096161909876, 1.77170536308596, 60.8475532028857], "lat": 54.3177967325959, "lon": -1.91064039912679, "name": "United Kingdom", "population": 61113205, "type": "country", "id": "country.152"}
    ],
    [
        {"bounds": [-64.323967, 44.4881779999999, -64.1653059999999, 44.606724], "lat": 44.5398571332729, "lon": -64.2406178841662, "name": "Chester", "score": 47818432.564384, "type": "place", "id": "mapbox-places.30118"},
        {"bounds": [-66.3275996571984, 43.422156073544, -59.6886250476078, 47.0349071318587], "lat": 44.7382514511936, "lon": -64.3284164961136, "name": "Nova Scotia", "score": 55090187731.4764, "type": "province", "id": "province.671"},
        {"bounds": [-141.005548666451, 41.6690855919108, -52.615930948992, 83.1161164353916], "lat": 56.8354595949484, "lon": -110.424643384994, "name": "Canada", "population": 33487208, "type": "country", "id": "country.16"}
    ],
    [
        {"bounds": [-77.4804519999999, 37.307314, -77.3997099999999, 37.390638], "lat": 37.3520452, "lon": -77.4336955, "name": "Chester", "score": 34389516.1200854, "type": "CDP", "id": "mapbox-places.2631"},
        {"bounds": [-83.6674744083173, 36.539774595821, -75.2339539000524, 39.4508341656643], "lat": 37.9953043807426, "lon": -78.4596117783831, "name": "Virginia", "score": 104078089371.712, "type": "province", "id": "province.570"},
        {"bounds": [-179.142471477264, 18.9301376341111, 179.781149943574, 71.412179667309], "lat": 37.2453246055115, "lon": -99.693233713229, "name": "United States of America", "population": 307212123, "type": "country", "id": "country.89"}
    ]
], "attribution": {"mapbox-places": "<a href='http://mapbox.com/about/maps' target='_blank'>Terms & Feedback</a>"}};

helpers.geocoderBulk = [
    {"query": ["austin"], "attribution": {"mapbox-places": "<a href='https://www.mapbox.com/about/maps/' target='_blank'>&copy; Mapbox &copy; OpenStreetMap</a> <a class='mapbox-improve-map' href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a>"}, "results": [
        [
            {"id": "mapbox-places.78701", "bounds": [-98.0261839514054, 30.067858231996137, -97.54154705019376, 30.489398740397657], "lon": -97.804206, "lat": 30.278855, "name": "Austin", "type": "city"},
            {"id": "province.1000418602", "name": "Texas", "type": "province"},
            {"id": "country.4150104525", "name": "United States", "type": "country"}
        ],
        [
            {"id": "mapbox-places.89310", "bounds": [-117.80679434924265, 38.62246699510231, -116.59003701731739, 39.99871687910863], "lon": -117.227194, "lat": 39.313976, "name": "Austin", "type": "city"},
            {"id": "province.2975076950", "name": "Nevada", "type": "province"},
            {"id": "country.4150104525", "name": "United States", "type": "country"}
        ],
        [
            {"id": "mapbox-places.16720", "bounds": [-78.36877489826804, 41.3983272617798, -77.82614701689207, 41.73658270221914], "lon": -77.988041, "lat": 41.567676, "name": "Austin", "type": "city"},
            {"id": "province.2184819983", "name": "Pennsylvania", "type": "province"},
            {"id": "country.4150104525", "name": "United States", "type": "country"}
        ],
        [
            {"id": "mapbox-places.55912", "bounds": [-93.16910498309949, 43.526714505771395, -92.7681080168472, 43.82098238181999], "lon": -92.929212, "lat": 43.674029, "name": "Austin", "type": "city"},
            {"id": "province.4222030107", "name": "Minnesota", "type": "province"},
            {"id": "country.4150104525", "name": "United States", "type": "country"}
        ],
        [
            {"id": "mapbox-places.72007", "bounds": [-92.12039497936945, 34.90795563316439, -91.83894201687612, 35.07632430322719], "lon": -92.004189, "lat": 35.036604, "name": "Austin", "type": "city"},
            {"id": "province.3855330187", "name": "Arkansas", "type": "province"},
            {"id": "country.4150104525", "name": "United States", "type": "country"}
        ]
    ]},
    {"query": ["houston"], "attribution": {"mapbox-places": "<a href='https://www.mapbox.com/about/maps/' target='_blank'>&copy; Mapbox &copy; OpenStreetMap</a> <a class='mapbox-improve-map' href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a>"}, "results": [
        [
            {"id": "mapbox-places.77002", "bounds": [-95.72045898294519, 29.52891526120573, -95.06120101856504, 30.04036964534467], "lon": -95.436742, "lat": 29.784969, "name": "Houston", "type": "city"},
            {"id": "province.1000418602", "name": "Texas", "type": "province"},
            {"id": "country.4150104525", "name": "United States", "type": "country"}
        ],
        [
            {"id": "mapbox-places.38851", "bounds": [-89.13825298311654, 33.79659653948, -88.79161411435722, 34.045110442750946], "lon": -88.976638, "lat": 33.920944, "name": "Houston", "type": "city"},
            {"id": "province.788686416", "name": "Mississippi", "type": "province"},
            {"id": "country.4150104525", "name": "United States", "type": "country"}
        ],
        [
            {"id": "mapbox-places.55943", "bounds": [-91.73075598293974, 43.630618500142205, -91.39292801812475, 43.93374746914107], "lon": -91.553669, "lat": 43.782375, "name": "Houston", "type": "city"},
            {"id": "province.4222030107", "name": "Minnesota", "type": "province"},
            {"id": "country.4150104525", "name": "United States", "type": "country"}
        ],
        [
            {"id": "mapbox-places.65483", "bounds": [-92.08846697978329, 37.2050039768753, -91.84117801818292, 37.42995600752302], "lon": -91.92426, "lat": 37.317564, "name": "Houston", "type": "city"},
            {"id": "province.3294535744", "name": "Missouri", "type": "province"},
            {"id": "country.4150104525", "name": "United States", "type": "country"}
        ],
        [
            {"id": "mapbox-places.35572", "bounds": [-87.39912489784082, 34.06685573423012, -87.20429004798204, 34.300837420778116], "lon": -87.264654, "lat": 34.183928, "name": "Houston", "type": "city"},
            {"id": "province.2667756795", "name": "Alabama", "type": "province"},
            {"id": "country.4150104525", "name": "United States", "type": "country"}
        ]
    ]}
];

helpers.geocoderReverse = {
    "query":[-97.7,30.3],
    "results":[[{
        "bounds":[-97.9383829999999,30.098659,-97.5614889999999,30.516863],
        "lat":30.3071816,
        "lon":-97.7559964,
        "name":"Austin",
        "score":600000790107194.8,
        "type":"city",
        "id":"mapbox-places.4201"
    }]],"attribution":{"mapbox-places":"<a href='http://mapbox.com/about/maps' target='_blank'>Terms & Feedback</a>"}};

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
