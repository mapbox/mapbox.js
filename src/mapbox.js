var mapbox = {};

mapbox.base = function(hash) {
    var subdomains = ['a', 'b', 'c', 'd'];
    if (hash === undefined || typeof hash !== 'number') {
        return 'http://a.tiles.mapbox.com/v3/';
    } else {
        return 'http://' +
            subdomains[hash % subdomains.length] + '.tiles.mapbox.com/v3/';
    }
};
