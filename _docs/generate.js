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

nav += '  - title: Overview\n' +
       '    id:\n';

var output = fs.createWriteStream(argv.o);
var landOutput = fs.createWriteStream(argv.l);

var header = fs.readFileSync('header', 'utf8').replace(/__TAG__/g, argv.t);
var writes = [];

landOutput.write(header);
output.write(header);
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
                chunk.text.push(transformLinks(lines[i]));
            }
        }
    }
    if (chunk) chunks.push(chunk);
    return chunks;
}

function transformLinks(line) {
    return line.replace(/href=['"]([^"']*)['"]/, function(all, content) {
        if (content.indexOf('#') === 0) {
            return all.replace(content, '/mapbox.js/api/' + argv.t + '/leaflet-' + content.replace('#', ''));
        } else {
            return all;
        }
    });
}

function readDocumentation(filename) {
    var f = fs.readFileSync(filename, 'utf8');
    var chunks;

    if (filename.match(/html$/)) {
        var lines = f.split('\n');
        chunks = splitChunks(lines);
        all += f;
        chunks.forEach(function(c) {
            nav += '  - title: ' + c.name + '\n';
            nav += '    id: ' + c.id + '\n';
            writes.push({
                file: argv.d + '/0200-01-01-' + c.id + '.html',
                contents: header.replace('All', c.name) + 'version: ' + argv.t + '\n' +
                    'permalink: /api/' + argv.t + '/' + c.id + '\n---\n' +
                    c.text.join('\n')
            });
        });
    } else {

        var renderer = new marked.Renderer();
        renderer.heading = function(text, level) {
            var escapedText;
            if (level == 2) {
                escapedText = text.replace(/\..*/, '').toLowerCase().replace(/[^\w]+/g, '-');
            }
            escapedText = text.replace(/\(.*/, '').toLowerCase().replace(/[^\w]+/g, '-');
            var html = '<h' + level + ' id="section-' + escapedText + '">' + text + '</h' + level + '>\n';
            var indent = (new Array(1 + (level * 2))).join(' ');
            nav += indent + '- title: "' + text + '"\n';
            nav += indent + '  id: ' + escapedText + '\n';
            nav += indent + '  nav:\n';
            return html;
        };

        var html = marked(f, { renderer: renderer });

        var chunks = [], chunk = '';
        var lines = f.split('\n');
        for (var i = 0; i < lines.length; i++) {
            if (lines[i].match(/^##\s/)) {
                if (chunk) chunks.push(chunk);
                chunk = lines[i] + '\n';
            } else if (lines[i].match(/^#\s/)) {
            } else {
                chunk += lines[i] + '\n';
            }
        }

        chunks.forEach(function(c) {
            var renderer = new marked.Renderer();
            var main = '';
            renderer.heading = function(text, level) {
                var escapedText;
                if (level == 3) {
                    escapedText = text.replace(/\..*/, '').toLowerCase().replace(/[^\w]+/g, '-');
                    main = text;
                }
                escapedText = text.replace(/\(.*/, '').toLowerCase().replace(/[^\w]+/g, '-');
                var html = '<h' + level + ' id="section-' + escapedText + '">' + text + '</h' + level + '>\n';
                var indent = (new Array(1 + (level * 2))).join(' ');
                return html;
            };
            var html = marked(f, { renderer: renderer });
            var escapedText = main.replace(/\..*/, '').toLowerCase().replace(/[^\w]+/g, '-');
            writes.push({
                file: argv.d + '/0200-01-01-' + escapedText + '.html',
                contents: header.replace('All', main) +
                    'version: ' + argv.t + '\n' +
                    'permalink: /api/' + argv.t + '/' + c.id + '\n---\n{% raw %}' +
                    html.replace('id="map"', '') + '{% endraw %}'
            });
        });

        all += html;
    }
}

landOutput.write('tags: ' + argv.t + '\n');
landOutput.write('intro: true\n');
landOutput.write(nav);
landOutput.write('---\n');
landOutput.write('{% include api.introduction.html %}');
output.write('---\n');
output.write('{% raw %}\n');
output.write(all + '\n');
output.write('{% endraw %}');

console.log(writes);
writes.forEach(function(w) {
    fs.writeFileSync(w.file, w.contents);
});
