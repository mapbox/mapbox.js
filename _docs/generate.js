var marked = require('marked'),
    fs = require('fs');

var f = fs.readFileSync(process.argv[2], 'utf8'),
    lexed = marked.lexer(f);

var start = 0,
    matched,
    toParse,
    out = '';


out += '<div>';
for (var i = 0; i < lexed.length; i++) {

    if (lexed[i].type === 'heading') {

        toParse = lexed.slice(start, i);
        toParse.links = lexed.links;
        out += marked.parser(toParse);

        // End previous group
        out += '</div>';

        // Write header
        matched = lexed[i].text.match(/(.*)\.(.*)\((.*)\)/);
        out += '<h' + lexed[i].depth + '>';
        if (matched) {
        out += '<a name="' + matched[1] + '.' + matched[2] + '" class="anchor" href="#' +  matched[1] + '.' + matched[2] + '"></a>';
            out += '<span class="object">' + matched[1] + '</span>';
            out += '.';
            out += '<span class="name">' + matched[2] + '</span>';
            out += '<span class="bracket">(</span>';
            out += '<span class="args">' + matched[3] + '</span>';
            out += '<span class="bracket">)</span>';

        } else {
            out += lexed[i].text;
        }
        out += '</h' + lexed[i].depth + '>';

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
