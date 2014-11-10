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

    ZeroClipboard.config({
        swfPath: window.location.origin + '/mapbox.js/assets/js/ZeroClipboard.swf',
        forceHandCursor: true
    });

    $('.js-clipboard').each(function() {
        var $clip = $(this);
        if (!$clip.data('zeroclipboard-bound')) {
            $clip.data('zeroclipboard-bound', true);
            var clip = new ZeroClipboard(this);
            clip.on('aftercopy', function() {
                $clip.siblings('input').select();
                var text = $clip.text();
                $clip.text('Copied to clipboard! ');
                setTimeout(function() {
                    $clip.text(text);
                }, 1000);
                var type = (location.pathname.split('plugins').length > 1) ? 'plugin' : 'example';
                analytics.track('Copied ' + type + ' with clipboard');
            });
        }
    });

    $('.js-clipboard').on('click', function() {
        return false;
    });

    $('#docs-search input').swiftype({
        autocompleteContainingElement: $('#docs-search'),
        filters: {
          page: {
            type: ['mapboxjs'],
            info: ['{{site.mapboxjs}}', 'latest']
          }
        }
    });

    $('.js-signup').on('click',function() {
        $('a.action.signup').trigger('click');
        return false;
    });
}

$(load);
