var util = require('./util');

var GridControl = L.Control.extend({
    options: {
        mapping: {
            mousemove: ['teaser'],
            click: ['full'],
            mouseout: [function() { return ''; }]
        },
        sanitizer: require('./sanitize')
    },

    _currentContent: '',
    _hidden: true,

    initialize: function(_, options) {
        L.Util.setOptions(this, options);
        util.strict_instance(_, L.Class, 'mapbox.gridLayer');
        this._layer = _;
    },

    // change the content of the tooltip HTML if it has changed, otherwise
    // noop
    setContent: function(_) {
        if (!_) {
            this._hide();
            this._hidden = true;
            this._currentContent = '';
        } else if (_ !== this._currentContent) {
            if (this._hidden) this._show();
            this._currentContent = this._container.innerHTML = _;
        }
    },

    _show: function() {
        this._container.style.display = 'block';
    },

    _hide: function() {
        this._container.innerHTML = '';
        this._container.style.display = 'none';
        this._hidden = true;
    },

    _handler: function(type, o) {
        var mapping = this.options.mapping[type];
        for (var i = 0; i < mapping.length; i++) {
            if (typeof mapping[i] === 'function') {
                var res = mapping[i](o);
                if (typeof res === 'string') {
                    this.setContent(this.options.sanitizer(res));
                }
            } else if (o[mapping[i]]) {
                if (mapping[i] === 'location') {
                    window.top.location.href = o[mapping[i]];
                } else {
                    this.setContent(this.options.sanitizer(o[mapping[i]]));
                }
            }
        }
    },

    _mousemove: function(o) { this._handler('mousemove', o); },
    _mouseout: function(o) { this._handler('mouseout', o); },
    _click: function(o) { this._handler('click', o); },

    onAdd: function(map) {
        this._map = map;

        var className = 'leaflet-control-grid map-tooltip',
            container = L.DomUtil.create('div', className);

        // hide the container element initially
        container.style.display = 'none';

        L.DomEvent
            .disableClickPropagation(container)
            // allow people to scroll tooltips with mousewheel
            .addListener(container, 'mousewheel', L.DomEvent.stopPropagation);

        this._layer
            .on('mousemove', this._mousemove, this)
            .on('mouseout', this._mouseout, this)
            .on('click', this._click, this);

        return container;
    }
});

module.exports = function(_, options) {
    return new GridControl(_, options);
};
