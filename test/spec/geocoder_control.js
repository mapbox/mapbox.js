describe('L.mapbox.geocoderControl', function() {
    'use strict';
    var server;

    beforeEach(function() {
        server = sinon.fakeServer.create();
    });

    afterEach(function() {
        server.restore();
    });

    var json_multi = {"query":["chester"],"results":[[{"bounds":[-2.998194,53.146961,-2.79233999999999,53.2355309999999],"lat":53.1891648678537,"lon":-2.88012205997425,"name":"Chester","score":200000073770758.4,"type":"place","id":"mapbox-places.218041"},{"bounds":[-3.09595536924484,52.9471560733941,-1.97088192386167,53.3882660996009],"lat":53.1677110864975,"lon":-2.526958424051,"name":"Cheshire","score":2155482431.21742,"type":"province","id":"province.2594"},{"bounds":[-13.6913559567794,49.9096161909876,1.77170536308596,60.8475532028857],"lat":54.3177967325959,"lon":-1.91064039912679,"name":"United Kingdom","population":61113205,"type":"country","id":"country.152"}],[{"bounds":[-64.323967,44.4881779999999,-64.1653059999999,44.606724],"lat":44.5398571332729,"lon":-64.2406178841662,"name":"Chester","score":47818432.564384,"type":"place","id":"mapbox-places.30118"},{"bounds":[-66.3275996571984,43.422156073544,-59.6886250476078,47.0349071318587],"lat":44.7382514511936,"lon":-64.3284164961136,"name":"Nova Scotia","score":55090187731.4764,"type":"province","id":"province.671"},{"bounds":[-141.005548666451,41.6690855919108,-52.615930948992,83.1161164353916],"lat":56.8354595949484,"lon":-110.424643384994,"name":"Canada","population":33487208,"type":"country","id":"country.16"}],[{"bounds":[-77.4804519999999,37.307314,-77.3997099999999,37.390638],"lat":37.3520452,"lon":-77.4336955,"name":"Chester","score":34389516.1200854,"type":"CDP","id":"mapbox-places.2631"},{"bounds":[-83.6674744083173,36.539774595821,-75.2339539000524,39.4508341656643],"lat":37.9953043807426,"lon":-78.4596117783831,"name":"Virginia","score":104078089371.712,"type":"province","id":"province.570"},{"bounds":[-179.142471477264,18.9301376341111,179.781149943574,71.412179667309],"lat":37.2453246055115,"lon":-99.693233713229,"name":"United States of America","population":307212123,"type":"country","id":"country.89"}],[{"bounds":[-121.263445,40.266583,-121.205218,40.3310289999999],"lat":40.3016748,"lon":-121.2325025,"name":"Chester","score":19084313.7489157,"type":"CDP","id":"mapbox-places.3257"},{"bounds":[-124.399408001878,32.5321329942423,-114.119061321723,41.9995402205048],"lat":37.2658366073735,"lon":-119.983556605127,"name":"California","score":409444778581.494,"type":"province","id":"province.564"},{"bounds":[-179.142471477264,18.9301376341111,179.781149943574,71.412179667309],"lat":37.2453246055115,"lon":-99.693233713229,"name":"United States of America","population":307212123,"type":"country","id":"country.89"}],[{"bounds":[-76.3106439999999,38.942523,-76.2420339999999,38.9975799999999],"lat":38.9601773,"lon":-76.287364,"name":"Chester","score":17612533.6190795,"type":"CDP","id":"mapbox-places.14033"},{"bounds":[-79.487933392512,37.931254087706,-75.0438660095087,39.7217570175724],"lat":38.8265055526392,"lon":-76.740875753608,"name":"Maryland","score":25256311071.7445,"type":"province","id":"province.573"},{"bounds":[-179.142471477264,18.9301376341111,179.781149943574,71.412179667309],"lat":37.2453246055115,"lon":-99.693233713229,"name":"United States of America","population":307212123,"type":"country","id":"country.89"}],[{"bounds":[-75.4081019999999,39.815948,-75.3414329999999,39.875822],"lat":39.8455581,"lon":-75.3718821,"name":"Chester","score":15554668.136646,"type":"city","id":"mapbox-places.23336"},{"bounds":[-80.5202331974041,39.7210490101038,-74.6985535096367,42.5383341657892],"lat":41.1296915879465,"lon":-77.7282056767405,"name":"Pennsylvania","score":119360061468.717,"type":"province","id":"province.3560"},{"bounds":[-179.142471477264,18.9301376341111,179.781149943574,71.412179667309],"lat":37.2453246055115,"lon":-99.693233713229,"name":"United States of America","population":307212123,"type":"country","id":"country.89"}],[{"bounds":[-89.8731619999999,37.888748,-89.7823529999999,37.9399179999999],"lat":37.9256054,"lon":-89.8276927,"name":"Chester","score":15087603.0494204,"type":"city","id":"mapbox-places.97"},{"bounds":[-91.5189392515452,36.9783244005507,-87.0390808529989,42.5117716657298],"lat":39.7450480331403,"lon":-89.4545683866039,"name":"Illinois","score":150070216548.949,"type":"province","id":"province.3543"},{"bounds":[-179.142471477264,18.9301376341111,179.781149943574,71.412179667309],"lat":37.2453246055115,"lon":-99.693233713229,"name":"United States of America","population":307212123,"type":"country","id":"country.89"}],[{"bounds":[-98.9387429999999,36.20199,-98.9028559999999,36.231035],"lat":36.2156763,"lon":-98.9213413,"name":"Chester","score":10322106.9260688,"type":"CDP","id":"mapbox-places.22453"},{"bounds":[-103.000799603419,33.6474161968,-94.4390808534986,36.9998087752548],"lat":35.3236124860274,"lon":-97.220613027884,"name":"Oklahoma","score":180638729066.51,"type":"province","id":"province.3544"},{"bounds":[-179.142471477264,18.9301376341111,179.781149943574,71.412179667309],"lat":37.2453246055115,"lon":-99.693233713229,"name":"United States of America","population":307212123,"type":"country","id":"country.89"}],[{"bounds":[-71.2813569999999,42.941422,-71.216637,42.985153],"lat":42.9650689562076,"lon":-71.2472887473659,"name":"Chester","score":9239339.62640994,"type":"place","id":"mapbox-places.127291"},{"bounds":[-72.55617069702,42.7008585802593,-70.7040466738149,45.3046671742507],"lat":44.002762877255,"lon":-71.5535924434625,"name":"New Hampshire","score":24269490480.7089,"type":"province","id":"province.3550"},{"bounds":[-179.142471477264,18.9301376341111,179.781149943574,71.412179667309],"lat":37.2453246055115,"lon":-99.693233713229,"name":"United States of America","population":307212123,"type":"country","id":"country.89"}],[{"bounds":[-84.8865509999999,42.594479,-84.8102649999999,42.654034],"lat":42.619096177003,"lon":-84.854914803921,"name":"Chester","score":9045818.64057712,"type":"place","id":"mapbox-places.127289"},{"bounds":[-90.4125427672349,41.7003947128457,-82.1461121033908,48.3054484237059],"lat":45.0029215682758,"lon":-84.5182928555787,"name":"Michigan","score":250047568235.618,"type":"province","id":"province.1068"},{"bounds":[-179.142471477264,18.9301376341111,179.781149943574,71.412179667309],"lat":37.2453246055115,"lon":-99.693233713229,"name":"United States of America","population":307212123,"type":"country","id":"country.89"}],[{"bounds":[-81.2352879999999,34.690789,-81.1907809999999,34.719226],"lat":34.7049965,"lon":-81.2134154,"name":"Chester","score":8461791.4265261,"type":"city","id":"mapbox-places.25087"},{"bounds":[-83.355487103447,32.0324747906791,-78.5731628849591,35.2183146349125],"lat":33.6253947127958,"lon":-80.5680402522774,"name":"South Carolina","score":80192911555.2005,"type":"province","id":"province.894"},{"bounds":[-179.142471477264,18.9301376341111,179.781149943574,71.412179667309],"lat":37.2453246055115,"lon":-99.693233713229,"name":"United States of America","population":307212123,"type":"country","id":"country.89"}],[{"bounds":[-74.2988529999999,41.341991,-74.2494109999999,41.3712739999999],"lat":41.3569422,"lon":-74.2769204,"name":"Chester","score":5563656.14638667,"type":"village","id":"mapbox-places.19331"},{"bounds":[-79.7630066345485,40.5092570177972,-71.8573425717023,45.0104288928791],"lat":42.8628702988752,"lon":-76.105151694761,"name":"New York","score":136819594169.11,"type":"province","id":"province.582"},{"bounds":[-179.142471477264,18.9301376341111,179.781149943574,71.412179667309],"lat":37.2453246055115,"lon":-99.693233713229,"name":"United States of America","population":307212123,"type":"country","id":"country.89"}],[{"bounds":[-92.3457489999999,43.977345,-92.2909929999999,44.021427],"lat":43.9944827719806,"lon":-92.320403456633,"name":"Chester","score":4663424.84864271,"type":"place","id":"mapbox-places.127290"},{"bounds":[-97.2292175720333,43.5001261581957,-89.4987244079051,49.3698527207266],"lat":46.4349894394611,"lon":-94.5007364880397,"name":"Minnesota","score":224794768292.76,"type":"province","id":"province.498"},{"bounds":[-179.142471477264,18.9301376341111,179.781149943574,71.412179667309],"lat":37.2453246055115,"lon":-99.693233713229,"name":"United States of America","population":307212123,"type":"country","id":"country.89"}],[{"bounds":[-74.7093689999999,40.777383,-74.6696629999999,40.795012],"lat":40.7905356,"lon":-74.6899229,"name":"Chester","score":4131380.32465345,"type":"borough","id":"mapbox-places.17986"},{"bounds":[-75.5581238224564,38.9244669786682,-73.9070007748658,41.3562540880558],"lat":40.140360533362,"lon":-74.3812161074177,"name":"New Jersey","score":19717777580.2762,"type":"province","id":"province.3559"},{"bounds":[-179.142471477264,18.9301376341111,179.781149943574,71.412179667309],"lat":37.2453246055115,"lon":-99.693233713229,"name":"United States of America","population":307212123,"type":"country","id":"country.89"}],[{"bounds":[-94.6305199999999,30.897152,-94.5727449999999,30.931157],"lat":30.9213186,"lon":-94.6000961,"name":"Chester","score":4078834.49168288,"type":"town","id":"mapbox-places.27440"},{"bounds":[-106.662176556903,25.8442423690901,-93.5147644471215,36.5001994003821],"lat":31.1722208847361,"lon":-99.6488931863184,"name":"Texas","score":685285922156.206,"type":"province","id":"province.3547"},{"bounds":[-179.142471477264,18.9301376341111,179.781149943574,71.412179667309],"lat":37.2453246055115,"lon":-99.693233713229,"name":"United States of America","population":307212123,"type":"country","id":"country.89"}],[{"bounds":[-72.9929029999999,42.266814,-72.9686459999999,42.3050749999999],"lat":42.2806865,"lon":-72.9801767,"name":"Chester","score":3696209.79040428,"type":"CDP","id":"mapbox-places.14079"},{"bounds":[-73.5072449155204,41.2480997913723,-69.9245300723049,42.8868204945702],"lat":42.1970011583268,"lon":-72.0891960342118,"name":"Massachusetts","score":21154809877.3125,"type":"province","id":"province.495"},{"bounds":[-179.142471477264,18.9301376341111,179.781149943574,71.412179667309],"lat":37.2453246055115,"lon":-99.693233713229,"name":"United States of America","population":307212123,"type":"country","id":"country.89"}],[{"bounds":[-92.3761949999999,43.483899,-92.3504389999999,43.500623],"lat":43.4918436,"lon":-92.3639506,"name":"Chester","score":3465033.5217311,"type":"city","id":"mapbox-places.11538"},{"bounds":[-96.6379578063077,40.3795206890286,-90.1402771420764,43.5009562360415],"lat":41.9402384625351,"lon":-93.1564191586743,"name":"Iowa","score":145449306222.174,"type":"province","id":"province.914"},{"bounds":[-179.142471477264,18.9301376341111,179.781149943574,71.412179667309],"lat":37.2453246055115,"lon":-99.693233713229,"name":"United States of America","population":307212123,"type":"country","id":"country.89"}],[{"bounds":[-72.6165829999999,43.2521549999999,-72.5788019999999,43.27774],"lat":43.2691995,"lon":-72.5962961,"name":"Chester","score":3352412.23417989,"type":"CDP","id":"mapbox-places.28706"},{"bounds":[-73.4385437438986,42.7292765489736,-71.5046570250017,45.0141642440846],"lat":43.8717203965291,"lon":-72.7815128876555,"name":"Vermont","score":24621864390.4893,"type":"province","id":"province.3553"},{"bounds":[-179.142471477264,18.9301376341111,179.781149943574,71.412179667309],"lat":37.2453246055115,"lon":-99.693233713229,"name":"United States of America","population":307212123,"type":"country","id":"country.89"}],[{"bounds":[-80.5816579999999,40.6043149999999,-80.5469269999999,40.624698],"lat":40.6129239,"lon":-80.5627301,"name":"Chester","score":2587588.99608741,"type":"city","id":"mapbox-places.30322"},{"bounds":[-82.6373718693163,37.2047648298331,-77.7346863218162,40.646781431418],"lat":38.9257731306255,"lon":-80.2957388605577,"name":"West Virginia","score":62735203325.2232,"type":"province","id":"province.3549"},{"bounds":[-179.142471477264,18.9301376341111,179.781149943574,71.412179667309],"lat":37.2453246055115,"lon":-99.693233713229,"name":"United States of America","population":307212123,"type":"country","id":"country.89"}],[{"bounds":[-83.1699429999999,32.387366,-83.1450409999999,32.401975],"lat":32.394447,"lon":-83.1556823,"name":"Chester","score":2264738.50351861,"type":"town","id":"mapbox-places.8796"},{"bounds":[-85.605682415511,30.3626994000573,-80.8355164006613,35.0004435414363],"lat":32.6815714707468,"lon":-83.2503387913911,"name":"Georgia","score":152322993191.646,"type":"province","id":"province.1064"},{"bounds":[-179.142471477264,18.9301376341111,179.781149943574,71.412179667309],"lat":37.2453246055115,"lon":-99.693233713229,"name":"United States of America","population":307212123,"type":"country","id":"country.89"}],[{"bounds":[-96.9470279999999,43.891785,-96.9149519999999,43.9063089999999],"lat":43.8995868,"lon":-96.9278195,"name":"Chester","score":2113407.17645034,"type":"CDP","id":"mapbox-places.25670"},{"bounds":[-104.056658978529,42.5183390486082,-96.453558392106,45.9420206896031],"lat":44.2301798691057,"lon":-100.2544093248,"name":"South Dakota","score":199304740262.011,"type":"province","id":"province.3545"},{"bounds":[-179.142471477264,18.9301376341111,179.781149943574,71.412179667309],"lat":37.2453246055115,"lon":-99.693233713229,"name":"United States of America","population":307212123,"type":"country","id":"country.89"}],[{"bounds":[-97.6234399999999,40.0020409999999,-97.6126249999999,40.020505],"lat":40.0102146,"lon":-97.618092,"name":"Chester","score":1516664.54654701,"type":"village","id":"mapbox-places.14439"},{"bounds":[-104.053729291274,40.0001017441003,-95.3172546815583,43.0003702990501],"lat":41.5002360215752,"lon":-100.02860265189,"name":"Nebraska","score":200968727686.403,"type":"province","id":"province.3542"},{"bounds":[-179.142471477264,18.9301376341111,179.781149943574,71.412179667309],"lat":37.2453246055115,"lon":-99.693233713229,"name":"United States of America","population":307212123,"type":"country","id":"country.89"}],[{"bounds":[-106.266701,38.385895,-106.247185,38.407604],"lat":38.3968120142373,"lon":-106.255306712652,"name":"Chester","score":1470070.37093992,"type":"place","id":"mapbox-places.127288"},{"bounds":[-109.046624798995,36.9998087752548,-102.039569134208,40.9998331892503],"lat":38.9998209822526,"lon":-105.54695406288,"name":"Colorado","score":269200741095.102,"type":"province","id":"province.3470"},{"bounds":[-179.142471477264,18.9301376341111,179.781149943574,71.412179667309],"lat":37.2453246055115,"lon":-99.693233713229,"name":"United States of America","population":307212123,"type":"country","id":"country.89"}],[{"bounds":[-94.1897079999999,35.670228,-94.1650969999999,35.684547],"lat":35.6776668,"lon":-94.1774683,"name":"Chester","score":1247763.48239675,"type":"town","id":"mapbox-places.5949"},{"bounds":[-94.6183289006582,33.0109415879839,-89.6673035098491,36.4998331892503],"lat":34.7553873886171,"lon":-92.4572365810465,"name":"Arkansas","score":137542002546.358,"type":"province","id":"province.3539"},{"bounds":[-179.142471477264,18.9301376341111,179.781149943574,71.412179667309],"lat":37.2453246055115,"lon":-99.693233713229,"name":"United States of America","population":307212123,"type":"country","id":"country.89"}],[{"bounds":[-110.978883,48.5054939999999,-110.953844,48.520136],"lat":48.5112757,"lon":-110.9665123,"name":"Chester","score":1233834.23314505,"type":"town","id":"mapbox-places.17065"},{"bounds":[-116.048944134764,44.3766154157689,-104.03859257169,48.9929728380261],"lat":46.6847941268975,"lon":-109.342969447946,"name":"Montana","score":379530333098.087,"type":"province","id":"province.499"},{"bounds":[-179.142471477264,18.9301376341111,179.781149943574,71.412179667309],"lat":37.2453246055115,"lon":-99.693233713229,"name":"United States of America","population":307212123,"type":"country","id":"country.89"}],[{"bounds":[-84.9092099999999,39.889,-84.8919219999999,39.898071],"lat":39.8934949377598,"lon":-84.9003004977619,"name":"Chester","score":559830.22533136,"type":"place","id":"mapbox-places.127261"},{"bounds":[-88.1118591737618,37.7819376815787,-84.7839538998526,41.7597208847111],"lat":39.7708292831449,"lon":-86.1735472987228,"name":"Indiana","score":94362453056.7807,"type":"province","id":"province.3556"},{"bounds":[-179.142471477264,18.9301376341111,179.781149943574,71.412179667309],"lat":37.2453246055115,"lon":-99.693233713229,"name":"United States of America","population":307212123,"type":"country","id":"country.89"}],[{"bounds":[-81.9252089999999,39.087372,-81.9213179999999,39.104153],"lat":39.0931335806039,"lon":-81.9228317618105,"name":"Chester","score":252288.980188733,"type":"place","id":"mapbox-places.127292"},{"bounds":[-84.8235290952915,38.4055216662919,-80.5202331974041,42.3242716661046],"lat":40.3648966661982,"lon":-82.7094822904598,"name":"Ohio","score":116154204914.781,"type":"province","id":"province.3557"},{"bounds":[-179.142471477264,18.9301376341111,179.781149943574,71.412179667309],"lat":37.2453246055115,"lon":-99.693233713229,"name":"United States of America","population":307212123,"type":"country","id":"country.89"}],[{"bounds":[-92.3859409999999,43.438438,-92.3834299999999,43.4434779999999],"lat":43.4407426311093,"lon":-92.3848120139512,"name":"Chester","score":63709.6006482947,"type":"place","id":"mapbox-places.127274"},{"bounds":[-96.6379578063077,40.3795206890286,-90.1402771420764,43.5009562360415],"lat":41.9402384625351,"lon":-93.1564191586743,"name":"Iowa","score":145449306222.174,"type":"province","id":"province.914"},{"bounds":[-179.142471477264,18.9301376341111,179.781149943574,71.412179667309],"lat":37.2453246055115,"lon":-99.693233713229,"name":"United States of America","population":307212123,"type":"country","id":"country.89"}]],"attribution":{"mapbox-places":"<a href='http://mapbox.com/about/maps' target='_blank'>Terms & Feedback</a>"}};

    it('performs forward geolocation, centering the map on the first result', function() {
        var map = new L.Map(document.createElement('div')),
            control = L.mapbox.geocoderControl('http://api.tiles.mapbox.com/v3/examples.map-i875kd35/geocode/{query}.json').addTo(map);

        expect(control instanceof L.mapbox.GeocoderControl).to.eql(true);

        server.respondWith('GET',
            'http://api.tiles.mapbox.com/v3/examples.map-i875kd35/geocode/austin.json',
            [200, { "Content-Type": "application/json" }, JSON.stringify(helpers.geocoderAustin)]);

        control._input.value = 'austin';
        happen.once(control._form, { type: 'submit' });
        server.respond();

        expect(map.getCenter()).to.be.near({lat: 30.3, lng: -97.7}, 1e-1);
    });

    it('performs forward geolocation, centering the map on the first result even if a point', function() {
        var map = new L.Map(document.createElement('div')),
            control = L.mapbox.geocoderControl('http://api.tiles.mapbox.com/v3/examples.map-i875kd35/geocode/{query}.json').addTo(map);

        server.respondWith('GET',
            'http://api.tiles.mapbox.com/v3/examples.map-i875kd35/geocode/white%20house.json',
            [200, { "Content-Type": "application/json" }, JSON.stringify(helpers.geocoderWhiteHouse)]);

        control._input.value = 'white house';
        happen.once(control._form, { type: 'submit' });
        server.respond();

        expect(map.getCenter()).to.be.near({lat:  38.898761, lng: -77.035117}, 1e-1);
        expect(map.getZoom()).to.eql(16);
    });

    it('supports the pointzoom option for preferred zoom for point results', function() {
        var map = new L.Map(document.createElement('div')),
            control = L.mapbox.geocoderControl('http://api.tiles.mapbox.com/v3/examples.map-i875kd35/geocode/{query}.json', {
                pointZoom: 10
            }).addTo(map);

        server.respondWith('GET',
            'http://api.tiles.mapbox.com/v3/examples.map-i875kd35/geocode/white%20house.json',
            [200, { "Content-Type": "application/json" }, JSON.stringify(helpers.geocoderWhiteHouse)]);

        control._input.value = 'white house';
        happen.once(control._form, { type: 'submit' });
        server.respond();

        expect(map.getCenter()).to.be.near({lat:  38.898761, lng: -77.035117}, 1e-1);
        expect(map.getZoom()).to.eql(10);
    });

    it('pointzoom does not zoom out zoomed-in maps', function() {
        var map = new L.Map(document.createElement('div')),
            control = L.mapbox.geocoderControl('http://api.tiles.mapbox.com/v3/examples.map-i875kd35/geocode/{query}.json', {
                pointZoom: 10
            }).addTo(map);

        map.setView([0, 0], 14);

        server.respondWith('GET',
            'http://api.tiles.mapbox.com/v3/examples.map-i875kd35/geocode/white%20house.json',
            [200, { "Content-Type": "application/json" }, JSON.stringify(helpers.geocoderWhiteHouse)]);

        control._input.value = 'white house';
        happen.once(control._form, { type: 'submit' });
        server.respond();

        expect(map.getCenter()).to.be.near({lat:  38.898761, lng: -77.035117}, 1e-1);
        expect(map.getZoom()).to.eql(14);
    });

    it('sets url based on an id', function() {
        var control = L.mapbox.geocoderControl('examples.map-i875kd35');
        expect(control.getURL()).to.equal('http://a.tiles.mapbox.com/v3/examples.map-i875kd35/geocode/{query}.json');
    });

    it('#setURL', function() {
        var control = L.mapbox.geocoderControl('examples.map-i875kd35');
        control.setURL('foo/{query}.json');
        expect(control.getURL()).to.equal('foo/{query}.json');
    });

    it('#setID', function() {
        var control = L.mapbox.geocoderControl('examples.map-i875kd35');
        expect(control.setID('foobar')).to.eql(control);
        expect(control.getURL()).to.equal('http://a.tiles.mapbox.com/v3/foobar/geocode/{query}.json');
    });

    it('#getID', function() {
        var control = L.mapbox.geocoderControl('examples.map-i875kd35');
        expect(control.getURL()).to.equal('http://a.tiles.mapbox.com/v3/examples.map-i875kd35/geocode/{query}.json');
        expect(control.setID('foobar')).to.eql(control);
        expect(control.getURL()).to.equal('http://a.tiles.mapbox.com/v3/foobar/geocode/{query}.json');
    });

    it('is by default in the top left', function() {
        var control = L.mapbox.geocoderControl('examples.map-i875kd35');
        expect(control.options.position).to.equal('topleft');
    });

    it('supports an options object', function() {
        var control = L.mapbox.geocoderControl('examples.map-i875kd35', {
            position: 'bottomright'
        });
        expect(control.options.position).to.equal('bottomright');
    });

    describe('#keepOpen', function(done) {
        it('true', function() {
            var map = new L.Map(document.createElement('div'));
            var control = L.mapbox.geocoderControl('http://example.com/{query}.json', {
                keepOpen: true
            }).addTo(map);
            expect(control._container.className).to.eql('leaflet-control-mapbox-geocoder leaflet-bar leaflet-control active');
        });
        it('false', function() {
            var map = new L.Map(document.createElement('div'));
            var control = L.mapbox.geocoderControl('http://example.com/{query}.json').addTo(map);
            expect(control._container.className).to.eql('leaflet-control-mapbox-geocoder leaflet-bar leaflet-control');
        });
    });

    describe('events', function() {
        var map, control;

        beforeEach(function() {
            map = new L.Map(document.createElement('div'));
            control = L.mapbox.geocoderControl('http://example.com/{query}.json').addTo(map);
        });


        it('emits a "found" event when geocoding succeeds', function(done) {
            control.on('found', function(result) {
                expect(result.latlng).to.eql([30.3071816, -97.7559964]);
                done();
            });

            control._input.value = 'austin';
            happen.once(control._form, { type: 'submit' });

            server.respondWith('GET', 'http://example.com/austin.json',
                [200, { "Content-Type": "application/json" }, JSON.stringify(helpers.geocoderAustin)]);
            server.respond();
        });

        it('emits a "autoselect" event when geocoding succeeds', function(done) {
            control.on('autoselect', function(result) {
                expect(result.data.latlng).to.eql([30.3071816, -97.7559964]);
                done();
            });

            control._input.value = 'austin';
            happen.once(control._form, { type: 'submit' });

            server.respondWith('GET', 'http://example.com/austin.json',
                [200, { "Content-Type": "application/json" }, JSON.stringify(helpers.geocoderAustin)]);
            server.respond();
        });

        it('emits a "select" event when a result is clicked', function(done) {
            control._input.value = 'chester';
            happen.once(control._form, { type: 'submit' });

            server.respondWith('GET', 'http://example.com/chester.json',
                [200, { "Content-Type": "application/json" }, JSON.stringify(json_multi)]);
            server.respond();

            control.on('select', function(result) {
                expect(result.data[0].name).to.eql('Chester');
                expect(result.data[1].name).to.eql('Cheshire');
                done();
            });

            happen.click(control._container.getElementsByTagName('a')[1]);
        });

        it('emits an "error" event when geocoding fails', function(done) {
            control.on('error', function(e) {
                expect(e.error.status).to.eql(400);
                done();
            });

            control._input.value = 'austin';
            happen.once(control._form, { type: 'submit' });

            server.respondWith('GET', 'http://example.com/austin.json',
                [400, { "Content-Type": "application/json" }, JSON.stringify(helpers.geocoderAustin)]);
            server.respond();
        });
    });
});
