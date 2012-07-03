(function(context, MM) {

    var easey = function() {
        var easey = {},
            running = false,
            abort = false; // killswitch for transitions

        var easings = {
            easeIn: function(t) { return t * t; },
            easeOut: function(t) { return Math.sin(t * Math.PI / 2); },
            easeInOut: function(t) { return (1 - Math.cos(Math.PI * t)) / 2; },
            linear: function(t) { return t; }
        };
        var easing = easings.easeOut;

        // to is the singular coordinate that any transition is based off
        // three dimensions:
        //
        // * to
        // * time
        // * path
        var from, to, map;

        easey.stop = function() {
            abort = true;
        };

        easey.running = function() {
            return running;
        };

        easey.point = function(x) {
            to = map.pointCoordinate(x);
            return easey;
        };

        easey.zoom = function(x) {
            to = map.enforceZoomLimits(to.zoomTo(x));
            return easey;
        };

        easey.location = function(x) {
            to = map.locationCoordinate(x);
            return easey;
        };

        easey.from = function(x) {
            if (!arguments.length) return from.copy();
            from = x.copy();
            return easey;
        };

        easey.to = function(x) {
            if (!arguments.length) return to.copy();
            to = map.enforceZoomLimits(x.copy());
            return easey;
        };

        easey.path = function(x) {
            path = paths[x];
            return easey;
        };

        easey.easing = function(x) {
            easing = easings[x];
            return easey;
        };

        easey.map = function(x) {
            if (!arguments.length) return map;
            map = x;
            from = map.coordinate.copy();
            to = map.coordinate.copy();
            return easey;
        };

        function interp(a, b, p) {
            if (p === 0) return a;
            if (p === 1) return b;
            return a + ((b - a) * p);
        }

        var paths = {};

        // The screen path simply moves between
        // coordinates in a non-geographical way
        paths.screen = function(a, b, t) {
            var zoom_lerp = interp(a.zoom, b.zoom, t);
            var az = a.copy();
            var bz = b.copy().zoomTo(a.zoom);
            return (new MM.Coordinate(
                interp(az.row, bz.row, t),
                interp(az.column, bz.column, t),
                az.zoom)).zoomTo(zoom_lerp);
        };

        function ptWithCoords(a, b) {
            // distance from the center of the map
            var point = new MM.Point(map.dimensions.x / 2, map.dimensions.y / 2);
            point.x += map.tileSize.x * (b.column - a.column);
            point.y += map.tileSize.y * (b.row - a.row);
            return point;
        }

        // The screen path means that the b
        // coordinate should maintain its point on screen
        // throughout the transition, but the map
        // should move to its zoom level
        paths.about = function(a, b, t) {
            var zoom_lerp = interp(a.zoom, b.zoom, t);

            var bs = b.copy().zoomTo(a.zoom);
            var az = a.copy().zoomTo(zoom_lerp);
            var bz = b.copy().zoomTo(zoom_lerp);
            var start = ptWithCoords(a, bs);
            var end = ptWithCoords(az, bz);

            az.column -= (start.x - end.x) / map.tileSize.x;
            az.row -= (start.y - end.y) / map.tileSize.y;

            return az;
        };

        var path = paths.screen;

        easey.t = function(t) {
            map.coordinate = path(from, to, easing(t));
            map.draw();
            return easey;
        };

        easey.future = function(parts) {
            var futures = [];
            for (var t = 0; t < parts; t++) {
                futures.push(path(from, to, t / (parts - 1)));
            }
            return futures;
        };

        var start;
        easey.resetRun = function () {
            start = (+ new Date()); 
            return easey;
        };

        easey.run = function(time, callback) {

            time = time || 1000;

            start = (+new Date());

            running = true;

            function tick() {
                var delta = (+new Date()) - start;
                if (abort) {
                    return void (abort = running = false);
                } else if (delta > time) {
                    running = false;
                    map.coordinate = path(from, to, 1);
                    map.draw();
                    if (callback) return callback(map);
                } else {
                    map.coordinate = path(from, to, easing(delta / time));
                    map.draw();
                    MM.getFrame(tick);
                }
            }

            MM.getFrame(tick);
        };

        return easey;
    };

    this.easey = easey;
})(this, com.modestmaps);
