var html_sanitize = require('../ext/sanitizer/html-sanitizer-bundle.js');

module.exports = (function() {
    var enabled = true;
    // https://bugzilla.mozilla.org/show_bug.cgi?id=255107
    function cleanUrl(url) {
        if (/^(https?:\/\/|data:image)/.test(url)) return url;
    }
    function cleanId(id) { return id; }

    function sanitize(_) {
        if (!enabled) return _;
        if (!_) return '';
        return html_sanitize(_, cleanUrl, cleanId);
    }

    sanitize.enable = function(_) {
        if (!arguments.length) return enabled;
        if (typeof _ === 'boolean') {
            enabled = _;
        }
        return sanitize;
    };

    sanitize.off = function() { sanitize.enable(false); };
    sanitize.on = function() { sanitize.enable(true); };

    return sanitize;
})();
