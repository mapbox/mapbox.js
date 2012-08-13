(function(context) {
    var Docs = function() {};

    Docs.prototype = {

        queryExamples: function () {
            var search = $('#search');
            var tExamples = _.template($('#examples').html());
            var tags = [], data;

            var fullResult = $.ajax({
                url: 'examples.json',
                dataType: 'json',
                success: function(r) {
                    data = _(r).chain()
                    .compact()
                    .map(function(r) {
                        r.words = (r.title.toLowerCase() + ' ' + (r.tags.toString()).toLowerCase()).match(/(\w+)/g);
                        return r;
                    })
                    .value();
                    _.delay(function () {tagList(tags);}, 10);
                    _.each(data, function(result){
                        $('#results').append(tExamples(result));
                        tags.push(result.tags);
                    });
                }
            });

            var tagList = function (tags) {
                var tTags = _.template($('#tags').html());

                var f = _.flatten(tags);
                var u = _.uniq(f);

                _.each(u, function(tag) {
                    $('#tag-list').append(tTags({'tag': tag}));
                });

                _.delay(function () {
                    $('#tag-list').find('a').on('click', tagFilter);
                }, 1);

                var tagFilter = function(e) {
                    e.preventDefault();
                    $('#results').empty();
                    var tag = $(this).attr('data-tag');

                    if (!$(this).hasClass('active')) {
                        $('#tag-list').find('a').removeClass('active');
                        $(this).addClass('active');

                        var filtered = find(tag.toLowerCase().match(/(\w+)/g));
                        _(filtered).each(function(p) {
                            $('#results').append(tExamples(p));
                        });
                    } else {
                        $(this).removeClass('active');
                        _.each(data, function(result){
                            $('#results').append(tExamples(result));
                        });
                    }
                };
            };

            var find = function(phrase) {
                var matches = _(data).filter(function(p) {
                    return _(phrase).filter(function(a) {
                        return _(p.words).any(function(b) {
                            return a === b || b.indexOf(a) === 0;
                        });
                    }).length === phrase.length;
                });

                return matches;
            };

            $('input', search).keyup(_(function() {
                $('#results').empty();
                var phrase = $('input', search).val();

                if (phrase.length >= 2) {
                    var matches = find(phrase.toLowerCase().match(/(\w+)/g));
                    $('#tag-list').find('a').removeClass('active');
                    _(matches).each(function(p) {
                        $('#results').append(tExamples(p));
                    });
                    if (matches.length) return;
                } else {
                    _.each(data, function(result){
                        $('#results').append(tExamples(result));
                    });
                }

                return false;
            }).debounce(100));
        },

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
            $('#copy').click(function() {
                if (document.selection) {
                    var rangeD = document.body.createTextRange();
                    rangeD.moveToElementText(document.getElementById('code'));
                    rangeD.select();
                } else if (window.getSelection) {
                    var rangeW = document.createRange();
                    rangeW.selectNode(document.getElementById('code'));
                    window.getSelection().addRange(rangeW);
                }
                return false;
            });
        },

        colorCode: function(cb) {
            $('pre').addClass('prettyprint');
            prettyPrint(cb);
        },

        search: function() {
            var q = this.value ? this.value.toLowerCase() : null;
            $('.doc-nav').find('[href]').each(function() {
                var $this = $(this),
                    id = $this.attr('href').replace('#', ''),
                    body = $(document.getElementById('content-' + id)).text();

                if (!q || body.toLowerCase().indexOf(q) !== -1 || id.toLowerCase().indexOf(q) !== -1) {
                    if ($this.parent().prop('tagName') == 'H3') {
                        $this.css('color', '');
                    } else {
                        $this.css('display', '');
                    }

                } else {
                    if ($this.parent().prop('tagName') == 'H3') {
                        $this.css('color', '#BDBDBD');
                    } else {
                        $this.css('display', 'none');
                    }
                }
            });

            // Hide headers if no children matched
            $('.doc-nav').find('h3').each(function() {
                var $this = $(this),
                    next = $this.next(),
                    none = true;
                if (next.prop('tagName') === 'UL') {
                    next.children().each(function() {
                        if ($(this).find('a').css('display') !== 'none') return none = false;
                    });
                }
                $this.css('display', none ? 'none' : '');
            });
        },

        bindSearch: function() {
            $('.doc-search input[type=text]').bind('keyup', this.search);
        },

        bindHeadings: function() {
            $('h1[id],h2[id],h3[id],h4[id]').click(function(ev) {
                window.location.hash = $(ev.currentTarget).attr('id');
            });
        },

        // Automatically links example code to API reference
        bindHints: function() {

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
                            var t = $this.prev().prev().text().trim();
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
                                var t = $(this).text().trim(),
                                    open = t[0] === '(',
                                    close = t.slice(t.length - 2, t.length) == ').';

                                if (open && close) null
                                else if (open) opened++;
                                else if (close) closed++;

                                if (opened == closed) {
                                    t = $(this).prev().text().trim();
                                    if (things[t].only && (isFunction == (f[things[t].only]  == 'function'))) {
                                        object = things[t].only;
                                    }
                                    return false;
                                }
                            });
                        }
                    }
                    if (!object) return;
                    $this.html($('<a target="_blank" href="/mapbox.js/api/v0.6.3/#' + object + '.' + name + '">' + name + '</a>'));
                });
            });
        }
    };

    window.Docs = Docs;
})(window);
