module.exports = {
    log: function(_) {
        if (console && typeof console.error === 'function') {
            console.error(_);
        }
    },
    strict: function(_, type) {
        if (typeof _ !== type) {
            throw Error('Invalid argument: ' + type + ' expected');
        }
    }
};
