---
---

(function(context) {
    var Docs = function() {};

    Docs.prototype = {
        copyCode: function(el) {
            if (window.getSelection && document.createRange) {
                el = document.getElementById(el);
                var range = document.createRange();
                range.selectNodeContents(el);
                var sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
            }
        },

        colorCode: function(cb) {
            $('pre', '#content-section').addClass('prettyprint');
            prettyPrint(cb);
        },

        bindSearch: function(input, menu) {
            this.$el = input;
            this.$menu = menu;
            this.$el.on('keyup', $.proxy(this._keyup, this));
        },

        _keyup: function(e) {
          switch(e.keyCode) {
            case 40: // down arrow
            case 38: // up arrow
            case 13: // enter
              break;
            default:
              this._search();
          }
          return false;
        },

        _search: function() {
            var query = this.$el.val() ? this.$el.val().toLowerCase().match(/(\w+)/g) : null;

            this.$menu.find('[href]').each(function() {
                var $this = $(this),
                    id = $this.attr('href').replace('#', '');

                if (query) {
                    _(query).each(function(q) {
                        if (id.toLowerCase().indexOf(q) !== -1) {
                            $this.show();
                        } else {
                            $this.hide();
                        }
                    });
                } else {
                    $this.show();
                }
            });

            if (query) {
                this.$menu.children().show();
                this.$menu.children('.section').each(function() {
                    var $this = $(this);
                    if ($this.children(':visible').length < 2) $this.hide();
                });
            } else {
                this.$menu.children().show();
            }
        },
    };

    window.Docs = Docs;
})(window);

function load() {
    var docs = new Docs();
        docs.colorCode();
    docs.bindSearch($('#filter-api'), $('.js-nav-docs'));

    if (!window.location.origin) {
        window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
    }

    ZeroClipboard.setDefaults({
        moviePath: window.location.origin + '/mapbox.js/assets/js/ZeroClipboard.swf',
        forceHandCursor: true
    });

    $('.js-clipboard').each(function() {
        var $clip = $(this);
        if (!$clip.data('zeroclipboard-bound')) {
            $clip.attr('data-clipboard-text', $('#' + $clip.data('ref-id')).text().trim());
            $clip.data('zeroclipboard-bound', true);
            var clip = new ZeroClipboard(this);
            clip.on('complete', function() {
                var $this = $(this);
                $this.siblings('input').select();
                var text = $this.text();
                $this.text('Copied to clipboard! ');
                setTimeout(function() {
                    $this.text(text);
                }, 1000);
                var type = (location.pathname.split('plugins').length > 1) ? 'plugin' : 'example';
                analytics.track('Copied ' + type + ' with clipboard');
            });
        }
    });

    var examples = new Docs();
    examples.bindSearch($('#filter-examples'), $('.js-nav-examples'));
}

$(load);
