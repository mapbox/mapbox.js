var fs = require('fs'),
    marked = require('marked'),
    argv = require('minimist')(process.argv.slice(2));

marked.setOptions({
    gfm: true,
    tables: true
});

var start, l, anchor, matched, toParse,
    matchedHeading, matchedEvent, matchedSep,
    out = '',
    all = '',
    nav = 'navigation:\n';

var output = fs.createWriteStream(argv.o);
var landOutput = fs.createWriteStream(argv.l);

var headerSummary = fs.readFileSync('header', 'utf8').replace(/__TAG__/g, argv.t);
var headerAll = fs.readFileSync('header-all', 'utf8').replace(/__TAG__/g, argv.t);
var writes = [];

landOutput.write(headerSummary);
output.write(headerAll);
output.write('version: ' + argv.t + '\n');
landOutput.write('version: ' + argv.t + '\n');
output.write('permalink: /api/' + argv.t + '/all/\n');

argv._.forEach(readDocumentation);

function splitChunks(lines) {
    var chunks = [], chunk;
    var re = /<h2 id="([^"]+)">([^<]+)<\/h2>/;
    for (var i = 0; i < lines.length; i++) {
        var match = lines[i].match(re);
        if (match) {
            if (chunk) {
                chunks.push(chunk);
            }
            chunk = {
                id: 'leaflet-' + match[1],
                name: match[2],
                text: [lines[i]]
            };
        } else {
            if (chunk) {
                chunk.text.push(lines[i]);
            }
        }
    }
    if (chunk) chunks.push(chunk);
    return chunks;
}


function readDocumentation(filename) {
    var f = fs.readFileSync(filename, 'utf8');

    if (filename.match(/html$/)) {
        var lines = f.split('\n');
        var chunks = splitChunks(lines);
        all += f;
        nav += '  - title: Leaflet\n';
        nav += '    nav:\n';
        chunks.forEach(function(c) {
            nav += '      - title: ' + c.name + '\n';
            nav += '        id: leaflet-' + c.name.toLowerCase() + '\n';
            writes.push({
                file: argv.d + '/0200-01-01-' + c.id + '.html',
                contents: headerAll.replace('All', c.name) + 'version: ' + argv.t + '\n' +
                    'permalink: /api/' + argv.t + '/' + c.id + '\n__NAV__\n---\n' +
                    c.text.join('\n')
            });
        });
    } else {
        var mdout = '';
        var lexed = marked.lexer(f);
        mdout += '<div>';
        start = 0;
        var chunks = [], chunk;

        for (var i = 0; i < lexed.length; i++) {

            l = lexed[i];

            if (l.type === 'heading') matchedHeading = l.text.match(/([^\(]*)\.([^\(]*)(\((.*)\))?/);
            if (l.type === 'heading') matchedEvent = l.text.match(/Event:\s(.*)/);
            if (l.type === 'html') matchedSep = l.text.match(/class=.separator.*>(.*)</);

            if (l.depth && l.depth == 1) {
                nav += '  - title: ' + l.text + '\n';
                nav += '    id: mapbox-' + l.text.toLowerCase() + '\n';
                nav += '    nav:\n';
            }

            if (l.type === 'heading' || matchedSep) {

                toParse = lexed.slice(start, i);
                toParse.links = lexed.links;
                mdout += marked.parser(toParse);

                // End previous group
                mdout += '</div>';

                if (l.depth === 1) {
                    if (chunk) {
                        chunks.push(chunk);
                    }
                    chunk = {
                        id: 'mapbox-' + l.text.toLowerCase(),
                        name: l.text,
                        chunks: [l]
                    };
                } else if (chunk) {
                    chunk.chunks.push(l);
                }

                // Header is a function or property
                if (matchedHeading) {

                    anchor = matchedHeading[1] + '.' + matchedHeading[2];
                    mdout += '<h' + l.depth + ' id="section-' + anchor + '">';
                    mdout += anchor;

                    if (matchedHeading[3]) {
                        mdout += '<span class="bracket">(</span>';
                        mdout += '<span class="args">' + matchedHeading[4] + '</span>';
                        mdout += '<span class="bracket">)</span>';
                    }

                    mdout += '</h' + l.depth + '>\n';

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
                    mdout += '<h' + l.depth + " id='section-" + anchor + "'>";
                    mdout += l.text;
                    mdout += '</h' + l.depth + '>\n';
                    nav += '  - Event "' + matchedEvent[1] + '"\n';

                // Separator
                } else if (matchedSep) {
                    anchor = matchedSep[1].replace(' ', '_');
                    out += '<div class="separator keyline-bottom" id="section-' + anchor + '">' + matchedSep[1] + '</div>';
                    nav += '  - Separator: ' + matchedSep[1] + '\n';
                    l.depth = 0;

                } else {
                    anchor = l.text.toLowerCase();
                    mdout += (l.depth === 1) ?
                        '<h' + l.depth + ' id="section-' + anchor + '">' :
                        '<h' + l.depth + '>';
                    mdout += l.text;
                    mdout += '</h' + l.depth + '>\n';
                }

                start = i + 1;

                // End header and start next group
                mdout += '<div class="space-bottom api-group-content depth-' + l.depth + '">';
            } else {
                if (chunk) {
                    chunk.chunks.push(l);
                }
            }
        }

        chunks.forEach(function(c) {
            nav += '      - title: ' + c.name + '\n';
            c.chunks.links = lexed.links;
            writes.push({
                file: argv.d + '/0200-01-01-' + c.id + '.html',
                contents: headerAll.replace('All', c.name) +
                    'version: ' + argv.t + '\n' +
                    'permalink: /api/' + argv.t + '/' + c.id + '\n__NAV__\n---\n' +
                    marked.parser(c.chunks)
            });
        });
        toParse = lexed.slice(start, i);
        toParse.links = lexed.links;
        mdout += marked.parser(toParse);
        mdout += '</div>\n';
        all += mdout;
    }
}


landOutput.write(nav);
output.write(nav);
landOutput.write("---\n");
output.write("---\n");
output.write("{% raw %}\n");
output.write(all + '\n');
output.write("{% endraw %}");

writes.forEach(function(w) {
    fs.writeFileSync(w.file, w.contents.replace('__NAV__', nav));
});
