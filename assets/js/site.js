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

    $('#docs-search input').swiftype({
        autocompleteContainingElement: $('#docs-search'),
        filters: {
          page: {
            type: ['examples', 'mapboxjs-api', 'mapboxjs-plugins']
          }
        }
    });
}

$(load);
