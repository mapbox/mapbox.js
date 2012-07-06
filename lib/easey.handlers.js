(function(context, MM) {

    easey.TouchHandler = function() {
        var handler = {},
            map,
            prevT = 0,
            acceleration = 25.0,
            speed = null,
            maxTapTime = 250,
            maxTapDistance = 30,
            maxDoubleTapDelay = 350,
            drag = 0.10,
            locations = {},
            taps = [],
            wasPinching = false,
            nowPoint = null,
            oldPoint = null,
            lastMove = null,
            lastPinchCenter = null;

        function animate(t) {
            var dir = { x: 0, y: 0 };
            var dt = Math.max(0.001, (t - prevT) / 1000.0);
            if (nowPoint && oldPoint &&
                (lastMove > (+new Date() - 50))) {
                dir.x = nowPoint.x - oldPoint.x;
                dir.y = nowPoint.y - oldPoint.y;
                speed.x = dir.x;
                speed.y = dir.y;
            } else {
                speed.x -= speed.x * drag;
                speed.y -= speed.y * drag;
                if (Math.abs(speed.x) < 0.001) {
                    speed.x = 0;
                }
                if (Math.abs(speed.y) < 0.001) {
                    speed.y = 0;
                }
            }
            if (speed.x || speed.y) {
                map.panBy(speed.x, speed.y);
            }
            prevT = t;
            // tick every frame for time-based anim accuracy
            MM.getFrame(animate);
        }

        // Test whether touches are from the same source -
        // whether this is the same touchmove event.
        function sameTouch (event, touch) {
            return (event && event.touch) &&
                (touch.identifier == event.touch.identifier);
        }

        function updateTouches (e) {
            for (var i = 0; i < e.touches.length; i += 1) {
                var t = e.touches[i];
                if (t.identifier in locations) {
                    var l = locations[t.identifier];
                    l.x = t.clientX;
                    l.y = t.clientY;
                    l.scale = e.scale;
                } else {
                    locations[t.identifier] = {
                        scale: e.scale,
                        startPos: { x: t.clientX, y: t.screenY },
                        x: t.clientX,
                        y: t.clientY,
                        time: new Date().getTime()
                    };
                }
            }
        }

        function touchStartMachine(e) {
            updateTouches(e);
            return MM.cancelEvent(e);
        }

        function touchMoveMachine(e) {
            switch (e.touches.length) {
                case 1:
                    onPanning(e.touches[0]);
                break;
                case 2:
                    onPinching(e);
                break;
            }
            updateTouches(e);
            return MM.cancelEvent(e);
        }

        // Handle a tap event - mainly watch for a doubleTap
        function onTap(tap) {
            if (taps.length &&
                (tap.time - taps[0].time) < maxDoubleTapDelay) {
                onDoubleTap(tap);
            taps = [];
            return;
            }
            taps = [tap];
        }

        // Handle a double tap by zooming in a single zoom level to a
        // round zoom.
        function onDoubleTap(tap) {
            // zoom in to a round number
            easey().map(map)
            .to(map.pointCoordinate(tap).zoomTo(map.getZoom() + 1))
            .path('about').run(200, function() {
                map.dispatchCallback('zoomed');
            });
        }

        function isTouchable () {
            var el = document.createElement('div');
            el.setAttribute('ongesturestart', 'return;');
            return (typeof el.ongesturestart === 'function');
        }


        // Re-transform the actual map parent's CSS transformation
        function onPanning(touch) {
            lastMove = +new Date();
            oldPoint = nowPoint;
            nowPoint = { x: touch.clientX, y: touch.clientY };
        }

        function onPinching(e) {
            // use the first two touches and their previous positions
            var t0 = e.touches[0],
            t1 = e.touches[1],
            p0 = new MM.Point(t0.clientX, t0.clientY),
            p1 = new MM.Point(t1.clientX, t1.clientY),
            l0 = locations[t0.identifier],
            l1 = locations[t1.identifier];

            // mark these touches so they aren't used as taps/holds
            l0.wasPinch = true;
            l1.wasPinch = true;

            // scale about the center of these touches
            var center = MM.Point.interpolate(p0, p1, 0.5);

            map.zoomByAbout(
                Math.log(e.scale) / Math.LN2 -
                Math.log(l0.scale) / Math.LN2,
                center);

                // pan from the previous center of these touches
                var prevCenter = MM.Point.interpolate(l0, l1, 0.5);

                map.panBy(center.x - prevCenter.x,
                          center.y - prevCenter.y);
                          wasPinching = true;
                          lastPinchCenter = center;
        }

        // When a pinch event ends, round the zoom of the map.
        function onPinched(p) {
            // TODO: easing
            if (true) {
                var z = map.getZoom(), // current zoom
                tz = Math.round(z);     // target zoom
                map.zoomByAbout(tz - z, p);
            }
            wasPinching = false;
        }

        function touchEndMachine(e) {
            var now = new Date().getTime();
            // round zoom if we're done pinching
            if (e.touches.length === 0 && wasPinching) {
                onPinched(lastPinchCenter);
            }

            oldPoint = nowPoint = null;

            // Look at each changed touch in turn.
            for (var i = 0; i < e.changedTouches.length; i += 1) {
                var t = e.changedTouches[i],
                loc = locations[t.identifier];
                // if we didn't see this one (bug?)
                // or if it was consumed by pinching already
                // just skip to the next one
                if (!loc || loc.wasPinch) {
                    continue;
                }

                // we now know we have an event object and a
                // matching touch that's just ended. Let's see
                // what kind of event it is based on how long it
                // lasted and how far it moved.
                var pos = { x: t.clientX, y: t.clientY },
                time = now - loc.time,
                travel = MM.Point.distance(pos, loc.startPos);
                if (travel > maxTapDistance) {
                    // we will to assume that the drag has been handled separately
                } else if (time > maxTapTime) {
                    // close in space, but not in time: a hold
                    pos.end = now;
                    pos.duration = time;
                    onHold(pos);
                } else {
                    // close in both time and space: a tap
                    pos.time = now;
                    onTap(pos);
                }
            }

            // Weird, sometimes an end event doesn't get thrown
            // for a touch that nevertheless has disappeared.
            // Still, this will eventually catch those ids:

            var validTouchIds = {};
            for (var j = 0; j < e.touches.length; j++) {
                validTouchIds[e.touches[j].identifier] = true;
            }
            for (var id in locations) {
                if (!(id in validTouchIds)) {
                    delete validTouchIds[id];
                }
            }

            return MM.cancelEvent(e);
        }

        handler.init = function(x) {
            map = x;
            // Fail early if this isn't a touch device.
            // TODO: move to add fn
            if (!isTouchable()) return false;

            MM.addEvent(map.parent, 'touchstart',
                touchStartMachine);
            MM.addEvent(map.parent, 'touchmove',
                touchMoveMachine);
            MM.addEvent(map.parent, 'touchend',
                touchEndMachine);

            prevT = new Date().getTime();
            speed = { x: 0, y: 0 };
            MM.getFrame(animate);
        };

        handler.remove = function() {
            // Fail early if this isn't a touch device.
            if (!isTouchable()) return false;

            MM.removeEvent(map.parent, 'touchstart',
                touchStartMachine);
            MM.removeEvent(map.parent, 'touchmove',
                touchMoveMachine);
            MM.removeEvent(map.parent, 'touchend',
                touchEndMachine);
        };

        return handler;
    };

    easey.DoubleClickHandler = function() {
        var handler = {},
            map;

        function doubleClick(e) {
            // Ensure that this handler is attached once.
            // Get the point on the map that was double-clicked
            var point = MM.getMousePoint(e, map);
            z = map.getZoom() + (e.shiftKey ? -1 : 1);
            // use shift-double-click to zoom out
            easey().map(map)
                .to(map.pointCoordinate(MM.getMousePoint(e, map)).zoomTo(z))
                .path('about').run(100, function() {
                map.dispatchCallback('zoomed');
            });
            return MM.cancelEvent(e);
        }

        handler.init = function(x) {
            map = x;
            MM.addEvent(map.parent, 'dblclick', doubleClick);
            return handler;
        };

        handler.remove = function() {
            MM.removeEvent(map.parent, 'dblclick', doubleClick);
        };

        return handler;
    };

    easey.MouseWheelHandler = function() {
        var handler = {},
            map,
            _zoomDiv,
            ea = easey(),
            prevTime,
            precise = false;

        function mouseWheel(e) {
            var delta = 0;
            prevTime = prevTime || new Date().getTime();

            try {
                _zoomDiv.scrollTop = 1000;
                _zoomDiv.dispatchEvent(e);
                delta = 1000 - _zoomDiv.scrollTop;
            } catch (error) {
                delta = e.wheelDelta || (-e.detail * 5);
            }

            // limit mousewheeling to once every 200ms
            var timeSince = new Date().getTime() - prevTime;
            var point = MM.getMousePoint(e, map);

            function dispatchZoomed() {
                map.dispatchCallback('zoomed');
            }

            if (!ea.running()) {
              var point = MM.getMousePoint(e, map),
                  z = map.getZoom();
              ea.map(map)
                .easing('easeOut')
                .to(map.pointCoordinate(MM.getMousePoint(e, map)).zoomTo(z + (delta > 0 ? 1 : -1)))
                .path('about').run(100, dispatchZoomed);
                prevTime = new Date().getTime();
            } else if (timeSince > 150){
                ea.zoom(ea.to().zoom + (delta > 0 ? 1 : -1)).from(map.coordinate).resetRun();
                prevTime = new Date().getTime();
            }

            // Cancel the event so that the page doesn't scroll
            return MM.cancelEvent(e);
        }

        handler.init = function(x) {
            map = x;
            _zoomDiv = document.body.appendChild(document.createElement('div'));
            _zoomDiv.style.cssText = 'visibility:hidden;top:0;height:0;width:0;overflow-y:scroll';
            var innerDiv = _zoomDiv.appendChild(document.createElement('div'));
            innerDiv.style.height = '2000px';
            MM.addEvent(map.parent, 'mousewheel', mouseWheel);
            return handler;
        };

        handler.precise = function(x) {
            if (!arguments.length) return precise;
            precise = x;
            return handler;
        };

        handler.remove = function() {
            MM.removeEvent(map.parent, 'mousewheel', mouseWheel);
            _zoomDiv.parentNode.removeChild(_zoomDiv);
        };

        return handler;
    };

    easey.DragHandler = function() {
        var handler = {},
            map,
            prevT = 0,
            speed = null,
            drag = 0.15,
            removed = false,
            mouseDownPoint = null,
            mouseDownTime = 0,
            mousePoint = null,
            prevMousePoint = null,
            moveTime = null,
            prevMoveTime = null,
            animatedLastPoint = true;

        function focusMap(e) {
            map.parent.focus();
        }

        function mouseDown(e) {
            if (e.shiftKey || e.button == 2) return;
            MM.addEvent(document, 'mousemove', mouseMove);
            MM.addEvent(document, 'mouseup', mouseUp);
            mousePoint = prevMousePoint = MM.getMousePoint(e, map);
            moveTime = prevMoveTime = +new Date();
            map.parent.style.cursor = 'move';
            return MM.cancelEvent(e);
        }

        function mouseMove(e) {
            if (mousePoint) {
                if (animatedLastPoint) {
                    prevMousePoint = mousePoint;
                    prevMoveTime = moveTime;
                    animatedLastPoint = false;
                }
                mousePoint = MM.getMousePoint(e, map);
                moveTime = +new Date();
                return MM.cancelEvent(e);
            }
        }

        function mouseUp(e) {
            MM.removeEvent(document, 'mousemove', mouseMove);
            MM.removeEvent(document, 'mouseup', mouseUp);
            if (+new Date() - prevMoveTime < 50) {
                dt = Math.max(1, moveTime - prevMoveTime);
                var dir = { x: 0, y: 0 };
                dir.x = mousePoint.x - prevMousePoint.x;
                dir.y = mousePoint.y - prevMousePoint.y;
                speed.x = dir.x / dt;
                speed.y = dir.y / dt;
            } else {
                speed.x = 0;
                speed.y = 0;
            }
            mousePoint = prevMousePoint = null;
            moveTime = lastMoveTime = null;
            map.parent.style.cursor = '';
            return MM.cancelEvent(e);
        }

        function animate(t) {
            var dir = { x: 0, y: 0 };
            var dt = Math.max(1, t - prevT);
            if (mousePoint && prevMousePoint) {
                if (!animatedLastPoint) {
                    dir.x = mousePoint.x - prevMousePoint.x;
                    dir.y = mousePoint.y - prevMousePoint.y;
                    map.panBy(dir.x, dir.y);
                    animatedLastPoint = true;
                }
            } else {
                // Rough time based animation accuracy
                // using a linear approximation approach
                speed.x *= Math.pow(1 - drag, dt * 60 / 1000);
                speed.y *= Math.pow(1 - drag, dt * 60 / 1000);
                if (Math.abs(speed.x) < 0.001) {
                    speed.x = 0;
                }
                if (Math.abs(speed.y) < 0.001) {
                    speed.y = 0;
                }
                if (speed.x || speed.y) {
                    map.panBy(speed.x * dt, speed.y * dt);
                }
            }
            prevT = t;
            if (!removed) MM.getFrame(animate);
        }

        handler.init = function(x) {
            map = x;
            MM.addEvent(map.parent, 'click', focusMap);
            MM.addEvent(map.parent, 'mousedown', mouseDown);
            prevT = new Date().getTime();
            speed = { x: 0, y: 0 };
            removed = false;
            MM.getFrame(animate);
        };

        handler.remove = function() {
            MM.removeEvent(map.parent, 'click', focusMap);
            MM.removeEvent(map.parent, 'mousedown', mouseDown);
            removed = true;
        };

        return handler;
    };

})(this, MM);
