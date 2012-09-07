(function(context) {
    var Docs = function() {};

    Docs.prototype = {

        page: function() {
            $('#toggle-sections').find('a').click(function() {
                if ($('#demo').hasClass('active')) {
                    $(this).text('Back to demo');
                    $('#demo').removeClass('active');
                    $('#snippet').addClass('active');
                } else {
                    $(this).text('View the code');
                    $('#snippet').removeClass('active');
                    $('#demo').addClass('active');
                }
                return false;
            });
        },

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

        bindSearch: function(input, menu, anchor) {
            this.$el = input;
            this.$menu = menu;
            this.anchor = anchor;
            this.$el
                .on('keypress', $.proxy(this._keypress, this))
                .on('keyup', $.proxy(this._keyup, this));

              if ($.browser.webkit || $.browser.msie) {
                this.$el.on('keydown', $.proxy(this._keydown, this));
              }

              this.$menu.on('mouseenter', 'li', $.proxy(this._mouseenter, this));
        },

        _keydown: function(e) {
            this.keyRepeat = !~$.inArray(e.keyCode, [40,38,13]);
            this._move(e);
        },

        _keypress: function(e) {
            // Surpress keys from being fired off twice.
            if (this.keyRepeat) return;
            this._move(e);
        },

        _move: function(e, doc) {
            switch(e.keyCode) {
                case 13: // enter
                e.preventDefault();
                break

                case 38: // up arrow
                e.preventDefault();
                this._prev();
                break

                case 40: // down arrow
                e.preventDefault();
                this._next();
                break
            }
          e.stopPropagation();
        },

        _keyup: function(e) {
          switch(e.keyCode) {
            case 40: // down arrow
            case 38: // up arrow
              break;

            case 13: // enter
              this._select(e);
              break

            default:
              this._search(e);
          }
          return false;
        },

        _next: function() {
            var active = this.$menu.find('.active').removeClass('active'),
                next = active.nextAll('li.filtered').first();

            if (!next.length) {
                next = $(this.$menu.find('li')[0]);
                next.addClass('active');
                $('html, body').animate({
                    scrollTop: 0
                }, {
                    duration: 300
                });
            } else {
                next.addClass('active');
                var windowOffset = $(window).scrollTop() + $(window).height(),
                    offset = next.offset();

                if ((offset.top + 28) > windowOffset) {
                    $('html, body').animate({
                        scrollTop: offset.top
                    }, 300);
                }
            }
        },

        _prev: function() {
            var active = this.$menu.find('.active').removeClass('active'),
                prev = active.prevAll('li.filtered').first();

            if (!prev.length) {
                prev = this.$menu.find('li').last();
                prev.addClass('active');
                $('html, body').animate({
                    scrollTop: this.$menu.height()
                }, {
                    duration: 300
                });

            } else {
                prev.addClass('active');

                var windowOffset = $(window).scrollTop();
                var offset = prev.offset();

                if ((offset.top) < windowOffset) {
                    $('html, body').animate({
                        scrollTop: (offset.top + 28) - $(window).height()
                    }, 300);
                }
            }
        },

        _select: function(e) {
            var v = this.$menu.find('.active a').attr('href');
            this.anchor ?
                window.location.hash = v :
                window.location = v
        },

        _mouseenter: function(e) {
            this.$menu.find('.active').removeClass('active');
            $(e.currentTarget).addClass('active');
        },

        _search: function() {
            var q = this.$el.val() ? this.$el.val().toLowerCase() : null;
            this.$menu.find('[href]').each(function() {
                var $this = $(this),
                    id = $this.attr('href').replace('#', ''),
                    body = $(document.getElementById('content-' + id)).text();

                if (!q || body.toLowerCase().indexOf(q) !== -1 || id.toLowerCase().indexOf(q) !== -1) {
                    $this.parent().addClass('filtered');
                    if ($this.parent().hasClass('heading')) {
                        $this.css('color', '');
                    } else {
                        $this.show();
                    }
                } else {
                    $this.parent().removeClass('filtered');
                    if ($this.parent().hasClass('heading')) {
                        $this.css('color', '#BDBDBD');
                    } else {
                        $this.hide();
                    }
                }
            });

            // Hide headers if no children matched
            this.$menu.find('li.heading').each(function() {
                var $this = $(this),
                    next = $this.next();

                if (next.hasClass('heading')) $this.css('display', 'none');
            });
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
        }
    };

    window.Docs = Docs;
})(window);
