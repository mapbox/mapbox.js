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

        // Optimally smooth (constant perceived velocity) and
        // efficient (minimal path distance) zooming and panning.
        //
        // Based on "Smooth and efficient zooming and panning"
        // by Jarke J. van Wijk and Wim A.A. Nuij
        //
        // Model described in section 3, equations 1 through 5
        // Derived equation (9) of optimal path implemented below
        easey.optimal = function(V, rho, callback) {
            // Section 6 describes user testing of these tunable values
            V = V || 0.9;
            rho = rho || 1.42;

            function sqr(n) { return n*n; }
            function sinh(n) { return (Math.exp(n) - Math.exp(-n)) / 2; }
            function cosh(n) { return (Math.exp(n) + Math.exp(-n)) / 2; }
            function tanh(n) { return sinh(n) / cosh(n); }

            map.coordinate = from; // For when `from` not current coordinate

            // Width is measured in coordinate units at zoom 0
            var TL = map.pointCoordinate(new MM.Point(0, 0)).zoomTo(0),
                BR = map.pointCoordinate(map.dimensions).zoomTo(0),
                w0 = Math.max(BR.column - TL.column, BR.row - TL.row),
                w1 = w0 * Math.pow(2, from.zoom - to.zoom),
                start = from.zoomTo(0),
                end = to.zoomTo(0),
                c0 = {x: start.column, y: start.row},
                c1 = {x: end.column, y: end.row},
                u0 = 0,
                u1 = Math.sqrt(sqr(c1.x - c0.x) + sqr(c1.y - c0.y));

            function b(i) {
                var n = sqr(w1) - sqr(w0) + (i ? -1: 1) * Math.pow(rho, 4) * sqr(u1 - u0),
                    d = 2 * (i ? w1 : w0) * sqr(rho) * (u1 - u0);
                return n/d;
            }

            function r(i) {
                return Math.log(-b(i) + Math.sqrt(sqr(b(i)) + 1));
            }

            var r0 = r(0),
                r1 = r(1),
                S = (r1 - r0) / rho;

            // Width
            function w(s) {
                return w0 * cosh(r0) / cosh (rho * s + r0);
            }

            // Zoom
            function u(s) {
                return (w0 / sqr(rho)) * cosh(r0) * tanh(rho * s + r0) - (w0 / sqr(rho)) * sinh(r0) + u0;
            }

            // Special case, when no panning necessary
            if (Math.abs(u1) < 0.000001) {
                if (Math.abs(w0 - w1) < 0.000001) return;

                // Based on section 4
                var k = w1 < w0 ? -1 : 1;
                S = Math.abs(Math.log(w1/w0)) / rho;
                u = function(s) {
                    return u0;
                }
                w = function(s) {
                    return w0 * Math.exp(k * rho * s);
                }
            }

            path = function (a, b, t) {
                if (t == 1) return to;
                var s = t * S,
                    us = u(s),
                    z = a.zoom + (Math.log(w0/w(s)) / Math.LN2),
                    x = interp(c0.x, c1.x, us/u1),
                    y = interp(c0.y, c1.y, us/u1);
                return new MM.Coordinate(y, x, 0).zoomTo(z);
            }
            easey.easing('linear');
            easey.run(S / V * 1000, callback);
        }

        return easey;
    };

    this.easey = easey;
})(this, com.modestmaps);
