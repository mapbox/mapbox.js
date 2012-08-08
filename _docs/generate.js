var marked = require('marked'),
    fs = require('fs');

var f = fs.readFileSync(process.argv[2], 'utf8'),
    lexed = marked.lexer(f);

var start = 0,
    anchor,
    matched,
    toParse,
    out = '',
    nav = '';


out += '<div>';
for (var i = 0; i < lexed.length; i++) {

    if (lexed[i].type === 'heading') {

        toParse = lexed.slice(start, i);
        toParse.links = lexed.links;
        out += marked.parser(toParse);

        // End previous group
        out += '</div>';

        // Write header
        matched = lexed[i].text.match(/(.*)\.([^\(]*)(\((.*)\))?/);
        matchedEvent = lexed[i].text.match(/Event:\s(.*)/);
        out += '<h' + lexed[i].depth + '>';
        if (matched) {
            anchor = matched[1] + '.' + matched[2];
            out += '<a name="' + anchor + '" class="anchor" href="#' + anchor + '"></a>';
            out += '<span class="object">' + matched[1] + '</span>';
            out += '.';
            out += '<span class="name">' + matched[2] + '</span>';
            out += '<span class="bracket">(</span>';

            if (matched[3]) {
                out += '<span class="args">' + matched[4] + '</span>';
            }

            out += '<span class="bracket">)</span>';

            if (lexed[i].depth == 2) {
                nav += '  ' + anchor + ':\n';
            } else if (lexed[i].depth == 3) {
                nav += '  - ' + anchor + '\n';
            }

        } else if (matchedEvent) {
            anchor = 'event_"' + matchedEvent[1] + '"';
            out += "<a name='" + anchor + "' class='anchor' href='#" + anchor + "'></a>";
            out += lexed[i].text;
            nav += '  - Event "' + matchedEvent[1] + '"\n';
        } else {
            out += lexed[i].text;
        }
        out += '</h' + lexed[i].depth + '>\n';

        start = i + 1;

        // Start new group
        out += '<div class="depth-' + lexed[i].depth + '">';
    }
}

        toParse = lexed.slice(start, i);
        toParse.links = lexed.links;
        out += marked.parser(toParse);
        out += '</div>';

fs.writeFileSync(process.argv[3], out);
fs.writeFileSync(process.argv[4], nav);
