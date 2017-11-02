'use strict';

var Feedback = L.Class.extend({
    includes: L.Evented.prototype || L.Mixin.Events,
    data: {},
    record: function(data) {
        L.extend(this.data, data);
        this.fire('change');
    }
});

module.exports = new Feedback();
