(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else {
        root.mapbox = factory();
    }
}(this, function() {
