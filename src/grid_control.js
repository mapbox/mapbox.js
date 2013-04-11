'use strict';

var util = require('./util');

var GridControl = L.Control.extend({

    options: {
        mapping: {
            mousemove: {
                format: 'teaser',
                pin: false
            },
            click: {
                format: 'full',
                pin: true
            },
            mouseout: {
                format: function() { return ''; },
                poin: false
            }
        },
        sanitizer: require('./sanitize')
    },

    _currentContent: '',

    // is this control hidden? when true, the control has display:none
    _hidden: true,

    // pinned means that this control is on a feature and the user has likely
    // clicked. pinned will not become false unless the user clicks off
    // of the feature onto another or clicks x
    _pinned: false,

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
        } else if (_ !== this._currentContent) {
            if (this._hidden) this._show();
            this._currentContent = this._contentWrapper.innerHTML = _;
        }
    },

    _show: function() {
        this._hidden = false;
        this._container.style.display = 'block';
    },

    _hide: function() {
        this._currentContent = '';
        this._hidden = true;
        this._pinned = false;
        this._contentWrapper.innerHTML = '';
        this._container.style.display = 'none';
        L.DomUtil.removeClass(this._container, 'closable');
    },

    _handler: function(type, o) {
        var mapping = this.options.mapping[type],
            format = mapping.format,
            formatted;
        // mousemoves do not close or affect this control when
        // a tooltip is pinned open
        if ((type === 'mousemove' ||
             type === 'mouseout') && this._pinned) return;
        if (typeof format === 'function') {
            formatted = format(o);
            if (typeof formatted === 'string') {
                this.setContent(this.options.sanitizer(formatted));
            }
        // a template. in this case, the content will already be templated
        // by `mapbox.gridLayer`
        } else if (o[format]) {
            formatted = o[format];
            if (format === 'location') {
                window.top.location.href = formatted;
            } else {
                this.setContent(this.options.sanitizer(formatted));
            }
        // a click outside of valid features while the map is pinned
        // should unpin the tooltip
        } else if (type === 'click' &&
            o.data === null &&
            this._pinned) {
            this.setContent('');
        }

        if (mapping.pin && o.data) {
            L.DomUtil.addClass(this._container, 'closable');
            this._pinned = true;
        } else {
            L.DomUtil.removeClass(this._container, 'closable');
        }
    },

    _mousemove: function(o) { this._handler('mousemove', o); },
    _mouseout: function(o) { this._handler('mouseout', o); },
    _click: function(o) { this._handler('click', o); },

    _createClosebutton: function(container, fn) {
        var link = L.DomUtil.create('a', 'close', container);

        link.innerHTML = 'close';
        link.href = '#';
        link.title = 'close';

        L.DomEvent
            .on(link, 'click', L.DomEvent.stopPropagation)
            .on(link, 'mousedown', L.DomEvent.stopPropagation)
            .on(link, 'dblclick', L.DomEvent.stopPropagation)
            .on(link, 'click', L.DomEvent.preventDefault)
            .on(link, 'click', fn, this);

        return link;
    },

    onAdd: function(map) {
        this._map = map;

        var className = 'leaflet-control-grid map-tooltip',
            container = L.DomUtil.create('div', className),
            contentWrapper = L.DomUtil.create('div', 'map-tooltip-content');

        // hide the container element initially
        container.style.display = 'none';
        this._createClosebutton(container, this._hide);
        container.appendChild(contentWrapper);

        this._contentWrapper = contentWrapper;

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
