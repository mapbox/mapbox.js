module.exports = L.Control.extend({
    options: {
        mapping: {
            mousemove: ['teaser'],
            click: ['full'],
            mouseout: [function() { return ''; }]
        },
        sanitizer: require('./sanitize')
    },

    initialize: function(_, options) {
        L.Util.setOptions(this, options);
        this._layer = _;
    },

    _handler: function(type, o) {
        var mapping = this.options.mapping[type];
        for (var i = 0; i < mapping.length; i++) {
            if (typeof mapping[i] === 'function') {
                var res = mapping[i](o);
                if (typeof res === 'string') {
                    this._container.innerHTML = this.options.sanitizer(res);
                }
            } else if (o[mapping[i]]) {
                if (mapping[i] === 'location') {
                    window.top.location.href = o[mapping[i]];
                } else {
                    this._container.innerHTML = this.options.sanitizer(o[mapping[i]]);
                }
            }
        }
    },

    _mousemove: function(o) { this._handler('mousemove', o); },
    _mouseout: function(o) { this._handler('mouseout', o); },
    _click: function(o) { this._handler('click', o); },

    onAdd: function(map) {
        this._map = map;

        var className = 'leaflet-control-grid',
            container = L.DomUtil.create('div', className);

        L.DomEvent.disableClickPropagation(container);

        this._layer
            .on('mousemove', this._mousemove, this)
            .on('mouseout', this._mouseout, this)
            .on('mousemove', this._click, this);

        return container;
    }
});
