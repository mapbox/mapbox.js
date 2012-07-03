function mmg_interaction(mmg) {

    var mi = {},
        tooltips = [],
        exclusive = true,
        hide_on_move = true,
        show_on_hover = true,
        close_timer = null,
        formatter;

    mi.formatter = function(x) {
        if (!arguments.length) return formatter;
        formatter = x;
        return mi;
    };
    mi.formatter(function(feature) {
        var o = '',
            props = feature.properties;

        if (props.title) {
            o += '<div class="mmg-title">' + props.title + '</div>';
        }
        if (props.description) {
            o += '<div class="mmg-description">' + props.description + '</div>';
        }

        if (typeof html_sanitize !== undefined) {
            o = html_sanitize(o,
                function(url) {
                    if (/^(https?:\/\/|data:image)/.test(url)) return url;
                },
                function(x) { return x; });
        }

        return o;
    });

    mi.hide_on_move = function(x) {
        if (!arguments.length) return hide_on_move;
        hide_on_move = x;
        return mi;
    };

    mi.exclusive = function(x) {
        if (!arguments.length) return exclusive;
        exclusive = x;
        return mi;
    };

    mi.show_on_hover = function(x) {
        if (!arguments.length) return show_on_hover;
        show_on_hover = x;
        return mi;
    };

    mi.hide_tooltips = function() {
        while (tooltips.length) mmg.remove(tooltips.pop());
        for (var i = 0; i < markers.length; i++) {
            delete markers[i].clicked;
        }
    };

    mi.bind_marker = function(marker) {
        var delayed_close = function() {
            if (!marker.clicked) close_timer = window.setTimeout(function() {
                mi.hide_tooltips();
            }, 200);
        };

        var show = function(e) {
            var content = formatter(marker.data);
            // Don't show a popup if the formatter returns an
            // empty string. This does not do any magic around DOM elements.
            if (!content) return;

            if (exclusive && tooltips.length > 0) {
                mi.hide_tooltips();
                // We've hidden all of the tooltips, so let's not close
                // the one that we're creating as soon as it is created.
                if (close_timer) window.clearTimeout(close_timer);
            }

            var tooltip = document.createElement('div');
            tooltip.className = 'wax-movetip';
            tooltip.style.width = '100%';

            var wrapper = tooltip.appendChild(document.createElement('div'));
            wrapper.style.cssText = 'position: absolute; pointer-events: none;';

            var intip = wrapper.appendChild(document.createElement('div'));
            intip.className = 'wax-intip';
            intip.style.cssText = 'pointer-events: auto;';

            if (typeof content == 'string') {
                intip.innerHTML = content;
            } else {
                intip.appendChild(content);
            }

            // Align the bottom of the tooltip with the top of its marker
            wrapper.style.bottom = marker.element.offsetHeight / 2 + 20 + 'px';

            if (show_on_hover) {
                tooltip.onmouseover = function() {
                    if (close_timer) window.clearTimeout(close_timer);
                };
                tooltip.onmouseout = delayed_close;
            }

            var t = {
                element: tooltip,
                data: {},
                location: marker.location.copy()
            };
            tooltips.push(t);
            mmg.add(t);
            mmg.draw();
        };

        marker.element.onclick = function() {
            show();
            marker.clicked = true;
        };

        if (show_on_hover) {
            marker.element.onmouseover = show;
            marker.element.onmouseout = delayed_close;
        }
    };

    function bindPanned() {
        mmg.map.addCallback('panned', function() {
            if (hide_on_move) {
                while (tooltips.length) {
                    mmg.remove(tooltips.pop());
                }
            }
        });
    }

    if (mmg) {
        // Remove tooltips on panning
        mmg.addCallback('drawn', bindPanned);
        mmg.removeCallback('drawn', bindPanned);

        // Bind present markers
        var markers = mmg.markers();
        for (var i = 0; i < markers.length; i++) {
            mi.bind_marker(markers[i]);
        }

        // Bind future markers
        mmg.addCallback('markeradded', function(_, marker) {
            mi.bind_marker(marker);
        });
    }

    return mi;
}
