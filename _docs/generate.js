'use strict';

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

var header = fs.readFileSync('_docs/header', 'utf8').replace(/__TAG__/g, argv.t);
var writes = [];

landOutput.write(header);
output.write(header);

output.write('version: ' + argv.t + '\n');
landOutput.write('version: ' + argv.t + '\n');

output.write('description: Build anything with Mapbox.js ' + argv.t + ', a library for fast & interactive maps.\n');
landOutput.write('description: Build anything with Mapbox.js ' + argv.t + ', a library for fast & interactive maps.\n');

output.write('permalink: /api/' + argv.t + '/all/\n');

var BASE_URL = '/mapbox.js/api/' + argv.t + '/';

argv._.forEach(readDocumentation);

// Split Leaflet's HTML documentation by its `h2` elements into chunks
// that will be represented by individual pages
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
                id: 'l-' + match[1],
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

function transformLinks(line, relative) {
    return line.replace(/href=['"]([^"']*)['"]/g, function(all, content) {
        if (content.indexOf('#') === 0) {
            var replacement;
            if (content.match(/event$/)) {
                replacement = 'l-event-objects';
            } else if (content.match(/^#map/)) {
                replacement='l-map-class';
            } else {
                replacement = 'l-' + content.replace(/\-.*/g, '').replace('#', '');
            }
            if (relative) {
                return all.replace(content, '#' + replacement);
            } else {
                return all.replace(content, BASE_URL + replacement);
            }
        } else {
            return all;
        }
    });
}

function transformHeaders(text) {
    return text.replace(/<h2 id="([^"]+)">([^<]+)<\/h2>/, function(all, content) {
        return all.replace(content, 'l-' + content);
    });
}

function escapeFn(text) {
    // Special case for https://github.com/mapbox/mapbox.js/issues/661
    if (text === 'L.Map') {
        return "l-map-class";
    } else {
        return chopFn(text).toLowerCase().replace(/[^\w]+/g, '-');
    }
}

function chopFn(text) {
    return text.replace(/\(.*/, '');
}

function readDocumentation(filename) {
    var f = fs.readFileSync(filename, 'utf8');
    var chunks;

    if (filename.match(/html$/)) {
        var lines = f.split('\n');
        chunks = splitChunks(lines);
        all += lines.map(function(l) {
            return transformHeaders(transformLinks(l, true));
        }).join('\n');
        nav += '  - title: Leaflet\n';
        nav += '    nav:\n';
        chunks.forEach(function(c) {
            if (c.name.match(/\s/g)) {
                nav += '    - title: ' + c.name + '\n';
                nav += '      id: ' + c.id + '\n';
            } else {
                // code
                c.name = 'L.' + c.name;
                nav += '    - title: ' + c.name + '\n';
                nav += '      id: ' + c.id + '\n';
            }

            // remove extra tabs: https://github.com/mapbox/mapbox.js/issues/804
            c.text = c.text.join('\n').replace(/\t{2,}/g, '');

            writes.push({
                file: argv.d + '/0200-01-01-' + c.id + '.html',
                contents: header.replace('All', c.name) + 'version: ' + argv.t + '\n' +
                    'permalink: /api/' + argv.t + '/' + c.id + '\n---\n' + c.text
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
            var html = '<h' + level + ' id="' + escapeFn(text) + '">' + text + '</h' + level + '>\n';
            var indent = (new Array(1 + (level * 2))).join(' ');
            var cleanTitle = text.replace(/\(.*/, '');
            nav += indent + '- title: "' + cleanTitle + '"\n';
            nav += indent + '  id: ' + escapedText + '\n';
            nav += indent + '  nav:\n';
            return html;
        };

        renderer.codespan = function(text) {
            if (text.match(/^L\.mapbox/)) {
                return '<code><a href="#' + escapeFn(text) + '">' + text + '</a></code>';
            } else if (text.match(/^L\./)) {
                return '<code><a href="#' + escapeFn(text) + '">' + text + '</a></code>';
            }
            return '<code>' + text + '</code>';
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
        if (chunk) chunks.push(chunk);

        chunks.forEach(function(c) {
            var renderer = new marked.Renderer();
            var main = '';

            renderer.heading = function(text, level) {
                var escapedText;
                if (level == 2) {
                    escapedText = text.replace(/\..*/, '').toLowerCase().replace(/[^\w]+/g, '-');
                    main = text;
                }
                escapedText = escapeFn(text);
                var html = '<h' + level + ' id="section-' + escapedText + '">' + text + '</h' + level + '>\n';
                var indent = (new Array(1 + (level * 2))).join(' ');
                return html;
            };

            renderer.codespan = function(text) {
                if (text.match(/^L\.mapbox/)) {
                    return '<code><a href="' + BASE_URL + escapeFn(text) + '">' + text + '</a></code>';
                } else if (text.match(/^L\./)) {
                    return '<code><a href="' + BASE_URL + escapeFn(text) + '">' + text + '</a></code>';
                }
                return '<code>' + text + '</code>';
            };

            var html = marked(c, { renderer: renderer });
            var escapedText = escapeFn(main);
            writes.push({
                file: argv.d + '/0200-01-01-' + escapedText + '.html',
                contents: header.replace('All', main) +
                    'version: ' + argv.t + '\n' +
                    'permalink: /api/' + argv.t + '/' + escapedText + '\n---\n' +
                    html.replace('id="map"', '')
            });
        });

        all += html;
    }
}

landOutput.write('tags: ' + argv.t + '\n');
landOutput.write('splash: true\n');
landOutput.write(nav);
landOutput.write('---\n');
landOutput.write('{% include api.introduction.html %}\n');

output.write("---\n");
output.write(all + '\n');

writes.forEach(function(w) {
    fs.writeFileSync(w.file, w.contents);
});
