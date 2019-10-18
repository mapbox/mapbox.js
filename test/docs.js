// makes sure documentation is generated when `mapboxjs: v#.#.#` is updated in _config.publisher-production.yml
var fs = require('fs');
var jsyaml = require('js-yaml');
var assert = require('assert');

// get mapbox.js version from config
var config = fs.readFileSync('./_config.publisher-production.yml');
var yaml = jsyaml.load(config);
var mapboxjs = yaml.mapboxjs;
// assert that that docs/_posts/api/v#.#.# exists
describe('Documentation is generated', function() {
  it('Documentation for ' + mapboxjs + ' exists', function() {
    assert.equal(fs.existsSync('./docs/_posts/api/' + mapboxjs), true);
  });
});
