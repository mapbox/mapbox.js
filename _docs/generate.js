var marked = require('marked'),
    fs = require('fs');

var f = fs.readFileSync(process.argv[2], 'utf8'),
    lexed = marked.lexer(f);

var start = 0,
    l,
    anchor,
    matched,
    toParse,
    out = '',
    nav = '';


out += '<div>';

for (var i = 0; i < lexed.length; i++) {

    l = lexed[i];;

    matchedHeading = l.type === 'heading' && l.text.match(/(.*)\.([^\(]*)(\((.*)\))?/);
    matchedEvent = l.type === 'heading' && l.text.match(/Event:\s(.*)/);
    matchedSep = l.type === 'html' && l.text.match(/class=.separator.*>(.*)</);

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
                nav += '- ' + anchor + ':\n';
            } else if (l.depth == 3) {
                nav += '  - ' + anchor + '\n';
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
            out += '<div class="separator" id="' + anchor + '">' + matchedSep[1] + '</div>';
            nav += '  - Separator: ' + matchedSep[1] + '\n';
            l.depth = 0;

        } else {
            out += '<h' + l.depth + '>';
            out += l.text;
            out += '</h' + l.depth + '>\n';
        }

        start = i + 1;

        // End header and start next group
        out += '<div id="content-' + anchor + '"class="depth-' + l.depth + '">';
    }
}

toParse = lexed.slice(start, i);
toParse.links = lexed.links;
out += marked.parser(toParse);
out += '</div>';

fs.writeFileSync(process.argv[3], out);
fs.writeFileSync(process.argv[4], nav);
