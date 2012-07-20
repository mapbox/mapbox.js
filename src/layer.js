if (typeof mapbox === 'undefined') mapbox = {};

mapbox.provider = function(options) {
    this.options = {
        tiles: options.tiles,
        scheme: options.scheme || 'xyz',
        minzoom: options.minzoom || 0,
        maxzoom: options.maxzoom || 22,
        bounds: options.bounds || [-180, -90, 180, 90]
    };
};

mapbox.provider.prototype = {

    // these are limits for available *tiles*
    // panning limits will be different (since you can wrap around columns)
    // but if you put Infinity in here it will screw up sourceCoordinate
    tileLimits: [
        new MM.Coordinate(0,0,0),             // top left outer
        new MM.Coordinate(1,1,0).zoomTo(18)   // bottom right inner
    ],

    releaseTile: function(c) { },

    getTile: function(c) {
        var coord;
        if (!(coord = this.sourceCoordinate(c))) return null;
        if (coord.zoom < this.options.minzoom || coord.zoom > this.options.maxzoom) return null;

        return this.options.tiles[parseInt(Math.pow(2, coord.zoom) * coord.row + coord.column, 10) %
            this.options.tiles.length]
            .replace('{z}', coord.zoom.toFixed(0))
            .replace('{x}', coord.column.toFixed(0))
            .replace('{y}', coord.row.toFixed(0));
    },

    // use this to tell MapProvider that tiles only exist between certain zoom levels.
    // should be set separately on Map to restrict interactive zoom/pan ranges
    setZoomRange: function(minZoom, maxZoom) {
        this.tileLimits[0] = this.tileLimits[0].zoomTo(minZoom);
        this.tileLimits[1] = this.tileLimits[1].zoomTo(maxZoom);
    },

    // return null if coord is above/below row extents
    // wrap column around the world if it's outside column extents
    // ... you should override this function if you change the tile limits
    // ... see enforce-limits in examples for details
    sourceCoordinate: function(coord) {
        var TL = this.tileLimits[0].zoomTo(coord.zoom).container(),
            BR = this.tileLimits[1].zoomTo(coord.zoom).container().right().down(),
            columnSize = Math.pow(2, coord.zoom),
            wrappedColumn;

        if (coord.column < 0) {
            wrappedColumn = ((coord.column % columnSize) + columnSize) % columnSize;
        } else {
            wrappedColumn = coord.column % columnSize;
        }

        if (coord.row < TL.row || coord.row >= BR.row) {
            return null;
        } else if (wrappedColumn < TL.column || wrappedColumn >= BR.column) {
            return null;
        } else {
            return new MM.Coordinate(coord.row, wrappedColumn, coord.zoom);
        }
    }
};

mapbox.layer = function() {
    if (!(this instanceof mapbox.layer)) {
        return new mapbox.layer();
    }
    // instance variables
    this._tilejson = {};
    this._url = '';
    this._id = '';

    this.name = '';
    this.parent = document.createElement('div');
    this.parent.style.cssText = 'position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; margin: 0; padding: 0; z-index: 0';
    this.levels = {};
    this.requestManager = new MM.RequestManager();
    this.requestManager.addCallback('requestcomplete', this.getTileComplete());
    this.requestManager.addCallback('requesterror', this.getTileError());
    this.setProvider(new mapbox.provider({
        tiles: ['data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=']
    }));
};

mapbox.layer.prototype.refresh = function(callback) {
    var that = this;
    // When the async request for a TileJSON blob comes back,
    // this resets its own tilejson and calls setProvider on itself.
    wax.tilejson(this._url, function(o) {
        that.tilejson(o);
        if (callback) callback(this);
    });
    return this;
};

mapbox.layer.prototype.url = function(x, callback) {
    if (!arguments.length) return this.url;
    this._url = x;
    return this.refresh(callback);
};

mapbox.layer.prototype.id = function(x, callback) {
    if (!arguments.length) return this._id;
    this.url('http://a.tiles.mapbox.com/v3/' + x + '.jsonp');
    this.named(x);
    this._id = x;
    return this.refresh(callback);
};

mapbox.layer.prototype.named = function(x) {
    if (!arguments.length) return this.name;
    this.name = x;
    return this;
};

mapbox.layer.prototype.tilejson = function(x) {
    if (!arguments.length) return this._tilejson;
    this.setProvider(new mapbox.provider(x));
    this._tilejson = x;

    if (x.name) this.name = x.name;
    if (x.id) this._id = x.id;
    if (x.bounds) {
        var proj = new MM.MercatorProjection(0,
            MM.deriveTransformation(
                -Math.PI,  Math.PI, 0, 0,
                Math.PI,  Math.PI, 1, 0,
                -Math.PI, -Math.PI, 0, 1));

        this.provider.tileLimits = [
            proj.locationCoordinate(new MM.Location(x.bounds[3], x.bounds[0]))
                .zoomTo(x.minzoom ? x.minzoom : 0),
            proj.locationCoordinate(new MM.Location(x.bounds[1], x.bounds[2]))
                .zoomTo(x.maxzoom ? x.maxzoom : 18),
        ];
    }

    return this;
};

MM.extend(mapbox.layer, MM.Layer);
