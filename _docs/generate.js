var fs = require('fs');

try {
    var marked = require('marked');
} catch(e) {
    console.error("Missing dependency: marked");
    console.error("Install using `npm install`");
    process.exit(1);
}

marked.setOptions({
    gfm: true,
    tables: true
});

var start, l, anchor, matched, toParse,
    out = '',
    nav = 'navigation:\n';

for (var j = 2; j < process.argv.length; j ++) {

var f = fs.readFileSync(process.argv[j], 'utf8'),
    lexed = marked.lexer(f);

    out += '<div>';
    start = 0;

    for (var i = 0; i < lexed.length; i++) {

        l = lexed[i];

        matchedHeading = l.type === 'heading' && l.text.match(/([^\(]*)\.([^\(]*)(\((.*)\))?/);
        matchedEvent = l.type === 'heading' && l.text.match(/Event:\s(.*)/);
        matchedSep = l.type === 'html' && l.text.match(/class=.separator.*>(.*)</);

        if (l.depth && l.depth == 1) {
            nav += '  - title: ' + l.text + '\n';
            nav += '    nav:\n';
        }

        if (l.type === 'heading' || matchedSep) {

            toParse = lexed.slice(start, i);
            toParse.links = lexed.links;
            out += marked.parser(toParse);

            // End previous group
            out += '</div>';

            // Header is a function or property
            if (matchedHeading) {

                anchor = matchedHeading[1] + '.' + matchedHeading[2];
                out += '<h' + l.depth + ' id="' + anchor + '">';
                out += anchor;

                if (matchedHeading[3]) {
                    out += '<span class="bracket">(</span>';
                    out += '<span class="args">' + matchedHeading[4] + '</span>';
                    out += '<span class="bracket">)</span>';
                }

                out += '</h' + l.depth + '>\n';

                // Add to navigation tree
                if (l.depth == 2) {
                    nav += '      - title: ' + anchor + '\n';
                    nav += '        sub:\n';
                } else if (l.depth == 3) {
                    nav += '        - ' + anchor + '\n';
                }

            // Header is for an event
            } else if (matchedEvent) {
                anchor = 'Event_"' + matchedEvent[1] + '"';
                out += '<h' + l.depth + " id='" + anchor + "'>";
                out += l.text;
                out += '</h' + l.depth + '>\n';
                nav += '  - Event "' + matchedEvent[1] + '"\n';

            // Separator
            } else if (matchedSep) {
                anchor = matchedSep[1].replace(' ', '_');
                out += '<div class="separator keyline-bottom" id="' + anchor + '">' + matchedSep[1] + '</div>';
                nav += '  - Separator: ' + matchedSep[1] + '\n';
                l.depth = 0;

            } else {
                anchor = l.text.toLowerCase();
                out += '<h' + l.depth + ' id="section-' + anchor + '">';
                out += l.text;
                out += '</h' + l.depth + '>\n';

                // Add to navigation tree
                if (l.depth == 2) {
                    nav += '      - title: "section-' + anchor + '"\n';
                    nav += '        sub:\n';
                } else if (l.depth == 3) {
                    nav += '        - "section-' + anchor + '"\n';
                }
            }

            start = i + 1;

            // End header and start next group
            out += '<div class="space-bottom api-group-content depth-' + l.depth + '">';
        }
    }

    toParse = lexed.slice(start, i);
    toParse.links = lexed.links;
    out += marked.parser(toParse);
    out += '</div>';
}

console.log(nav);
console.log("---");
console.log("{% raw %}");
console.log(out);
console.log("{% endraw %}");
