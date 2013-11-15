---
---

(function(context) {
    var Docs = function() {};

    Docs.prototype = {
        copyCode: function() {
            $('#copy').click(function(e) {
                e.preventDefault();
                if (document.selection) {
                    var rangeD = document.body.createTextRange();
                    rangeD.moveToElementText(document.getElementById('code'));
                    rangeD.select();
                } else if (window.getSelection) {
                    var rangeW = document.createRange();
                    rangeW.selectNode(document.getElementById('code'));
                    window.getSelection().addRange(rangeW);
                }
            });
        },

        colorCode: function(cb) {
            $('pre').addClass('prettyprint');
            prettyPrint(cb);
        },

        bindSearch: function(input, menu, cb) {
            this.$el = input;
            this.$menu = menu;
            this.cb = cb;
            this.$el.on('keyup', $.proxy(this._keyup, this));
        },

        _keyup: function(e) {
          switch(e.keyCode) {
            case 40: // down arrow
            case 38: // up arrow
            case 13: // enter
              break;
            default:
              this._search(e);
          }
          return false;
        },

        _search: function(cb) {
            var q = this.$el.val() ? this.$el.val().toLowerCase() : null;
            this.$menu.find('[href]').each(function() {
                var $this = $(this),
                    id = $this.attr('href').replace('#', ''),
                    body = $(document.getElementById('content-' + id)).text();

                if (!q || body.toLowerCase().indexOf(q) !== -1 || id.toLowerCase().indexOf(q) !== -1) {
                    $this.addClass('filtered');
                    $this.show();
                } else {
                    $this.removeClass('filtered');
                    $this.hide();
                }
            });

            this.cb();
        },

        bindInlineCode: function() {
            var heading_index = {};
            function noparams(x) {
                return x.replace(/\(.*/g, '');
            }
            $('h1[id],h2[id],h3[id],h4[id]').each(function(i, h) {
                var txt = noparams($(h).text());
                heading_index[txt] = h;
            });
            $('code').each(function(i, c) {
                var txt = noparams($(c).text());
                if (heading_index[txt]) {
                    var inner = $('<a></a>').html($(c).html());
                    inner.attr('href', '#' + $(heading_index[txt]).attr('id'));
                    $(c).empty().append(inner);
                }
            });
        },

        // Automatically links example code to API reference
        bindHints: function(version) {

            // Inventory mapbox.js
            var things = {};
            function addThings(name, obj) {
                for (var p in obj) {
                    if (!things[p]) things[p] = {only: name};
                    else things[p].only = null;
                    things[p][name] = typeof obj[p];
                }
            }

            // mapbox.js v1
            if (typeof mapbox === 'undefined' || typeof mapbox.map === 'undefined') return;

            var map =  mapbox.map(document.createElement('div'));
            addThings('mapbox', mapbox);
            addThings('map', map);
            addThings('map.ui', map.ui);
            addThings('map.interaction', map.interaction);
            addThings('ease', easey());
            addThings('layer', mapbox.layer());
            addThings('mapbox.markers', mapbox.markers);
            addThings('markers', mapbox.markers.layer());
            addThings('interaction', mapbox.markers.interaction(mapbox.markers.layer()));

            // Cover a couple problematic cases
            delete things.markers;
            delete things.add;

            $('pre.prettyprint').each(function() {
                $(this).find('span.pln, span.kwd').each(function() {
                    var $this = $(this),
                        name = $this.text(),
                        object,
                        isFunction = $this.next().text()[0] == '(',
                        f = things[name];

                    // We have something with that name in our inventory
                    if (f) {
                        var pt = $this.prev().text();

                        // If its not preceded by a '.', its not an object method
                        if (pt[pt.length - 1] !== '.') return;

                        // Only one function with that name
                        if (f.only && (isFunction == (f[f.only] == 'function'))) {
                            object = f.only;

                        // No chaining
                        } else if (pt === '.') {
                            var t = $.trim($this.prev().prev().text());
                            if (f[t] && (isFunction == (f[t] == 'function'))) {
                                object = t;
                            }

                            // Handle cases such as `mapbox.makers.interaction`
                            for (var d in f) {
                                if (d.length > t.length && d.indexOf(t) == d.length - t.length) {
                                    object = d;
                                }
                            }

                        // Chaining
                        } else if (pt.slice(pt.length - 2, pt.length) == ').') {
                            // Keep track of open and close brackets
                            var opened = 0,
                                closed = 0;
                            $this.prevUntil().each(function() {
                                var t = $.trim($(this).text()),
                                    open = t[0] === '(',
                                    close = t.slice(t.length - 2, t.length) == ').';

                                if (open && close) null
                                else if (open) opened++;
                                else if (close) closed++;

                                if (opened == closed) {
                                    t = $.trim($(this).prev().text());
                                    if (things[t].only && (isFunction == (f[things[t].only]  == 'function'))) {
                                        object = things[t].only;
                                    }
                                    return false;
                                }
                            });
                        }
                    }
                    if (!object) return;
                    $this.html($('<a target="_blank" href="/mapbox.js/api/' + version + '/#' + object + '.' + name + '">' + name + '</a>'));
                });
            });
        },

        replaceDefaultID: function() {
            $('pre, code').each(function() {
                var content = $(this).html();
                content = content.replace(/'{{site.defaultid}}'/g, App.map ? App.map : '{{site.defaultid}}');
                $(this).html(content);
            });
        }
    };

    window.Docs = Docs;
})(window);
