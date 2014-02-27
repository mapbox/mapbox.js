---
---

function load() {

    // We generate our API from github.com/mapbox/mapbox.js/API.md
    // so let prettyprint handle syntax highlighting.
    $('pre', '#api').addClass('prettyprint');
    prettyPrint();

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

    $('#docsearch').swiftype({
        autocompleteContainingElement: $('.search-field'),
        filters: {
          page: {
            type: ['examples', 'mapboxjs-api', 'mapboxjs-plugins']
          }
        },
        engineKey: 'ByE7bq3YmMASdFvY7L4h'
    });

    $('#docsearch').on('focus', function() {
        $('.js-title', '#site-nav').removeClass('col3').addClass('col2');
        $('.js-nav', '#site-nav').removeClass('col6').addClass('col5');
        $('.js-search', '#site-nav').removeClass('col3').addClass('col5');
    }).on('blur', function() {
        $('.js-title', '#site-nav').removeClass('col2').addClass('col3');
        $('.js-nav', '#site-nav').removeClass('col5').addClass('col6');
        $('.js-search', '#site-nav').removeClass('col5').addClass('col3');
    });
}

$(load);
